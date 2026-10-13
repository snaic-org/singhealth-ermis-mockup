(function () {
  var user = ERMIS.Shell.mount({ active: 'search', crumbs: [{ label: 'Dashboard', href: 'dashboard.html' }, { label: 'Risk search' }] });
  if (!user) return;

  var u = ERMIS.u, esc = u.esc, icon = u.icon, REF = ERMIS.REF, Rating = ERMIS.Rating;
  u.qsa('[data-icon]').forEach(function (el) { el.outerHTML = u.icon(el.getAttribute('data-icon')); });

  var EXAMPLES = ['staff burnout in ICU', 'medication mix-up at dispensing', 'ransomware on patient records', 'supplier delay for critical consumables', 'patient falls in wards', 'research consent lapses'];
  u.qs('#examples').innerHTML = '<span class="muted">Try</span>' + EXAMPLES.map(function (e) { return '<button type="button" class="example">' + esc(e) + '</button>'; }).join('');

  var form = u.qs('#search-form'), input = form.q, results = u.qs('#results');
  var sel = { domain: u.qs('#sf-domain'), institution: u.qs('#sf-inst'), band: u.qs('#sf-band'), adequacy: u.qs('#sf-adequacy'), period: u.qs('#sf-period') };
  sel.domain.innerHTML = '<option value="">All domains</option>' + REF.DOMAINS.map(function (d) { return '<option>' + esc(d.name) + '</option>'; }).join('');
  sel.institution.innerHTML = '<option value="">All institutions</option>' + REF.INSTITUTIONS.map(function (i) { return '<option value="' + i.code + '">' + esc(i.name) + '</option>'; }).join('');
  sel.band.innerHTML = '<option value="">Any level</option>' + REF.BANDS.map(function (b) { return '<option>' + b.name + '</option>'; }).join('');
  sel.adequacy.innerHTML = '<option value="">Any</option>' + REF.ADEQUACY.map(function (a) { return '<option>' + esc(a.name) + '</option>'; }).join('');
  sel.period.innerHTML = '<option value="">All periods</option><option value="last4">Last 4 quarters</option><option value="FY2026">FY2026</option><option value="FY2025">FY2025</option><option value="FY2024">FY2024</option>';

  var sortSel = u.qs('#sr-sort');
  var PERIOD_INDEX = {};
  REF.PERIODS.forEach(function (p, i) { PERIOD_INDEX[p] = i; });
  function pidx(p) { return p in PERIOD_INDEX ? PERIOD_INDEX[p] : 99; }

  function filters() {
    return { domain: sel.domain.value, institution: sel.institution.value, band: sel.band.value, adequacy: sel.adequacy.value, period: sel.period.value };
  }
  function hasFilters() { var f = filters(); return Object.keys(f).some(function (k) { return f[k]; }); }

  function residual(rec) { var r = Rating.forRisk(rec).residual; return r ? r.score : 0; }

  function sortItems(items, mode) {
    if (mode === 'rating') return items.slice().sort(function (a, b) { return residual(b.rec) - residual(a.rec); });
    if (mode === 'recent') return items.slice().sort(function (a, b) { return pidx(b.rec.period) - pidx(a.rec.period); });
    return items;
  }

  var timer = null;
  function run(opts) {
    opts = opts || {};
    var q = input.value.trim();
    var url = 'search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    history.replaceState(null, '', url);
    u.qs('#sf-clear').classList.toggle('hidden', !hasFilters());
    var topInput = u.qs('#global-search input');
    if (topInput) topInput.value = q;

    if (!q) {
      sortSel.disabled = true;
      var recent = ERMIS.Store.register().filter(function (r) { return ERMIS.Search.passes(r, filters()); })
        .sort(function (a, b) { return pidx(b.period) - pidx(a.period); }).slice(0, 8);
      u.qs('#sr-title').textContent = hasFilters() ? 'Risks matching your filters' : 'Recently added to the register';
      u.qs('#sr-sub').textContent = hasFilters() ? 'Most recent first. Describe a risk above to rank by similarity.' : 'Describe a risk above to find comparable risks by meaning.';
      results.innerHTML = recent.length ? recent.map(function (r) { return ERMIS.SearchUI.renderResult({ rec: r, score: null, matched: [] }); }).join('') : noResults();
      ERMIS.SearchUI.remember(results);
      return;
    }
    sortSel.disabled = false;
    u.qs('#sr-title').textContent = 'Searching';
    u.qs('#sr-sub').textContent = '';
    results.innerHTML = ERMIS.SearchUI.skeleton(4);
    clearTimeout(timer);
    timer = setTimeout(function () {
      var items = sortItems(ERMIS.Search.query(q, filters()), sortSel.value);
      u.qs('#sr-title').innerHTML = items.length ? u.plural(items.length, 'comparable risk') + ' for “' + esc(q) + '”' : 'No comparable risks for “' + esc(q) + '”';
      u.qs('#sr-sub').textContent = items.length ? 'Ranked by semantic similarity, including related terms. Expand a result to see the controls and indicators used.' : '';
      results.innerHTML = items.length ? items.map(function (x) { return ERMIS.SearchUI.renderResult(x); }).join('') : noResults();
      ERMIS.SearchUI.remember(results);
    }, opts.instant ? 0 : 380);
  }

  function noResults() {
    return '<div class="card"><div class="empty">' + icon('search') + '<h3>No matching risks</h3><p>' + (hasFilters() ? 'Clear some filters, or describe' : 'Describe') + ' the risk event, its causes or its consequences in different words.</p>' +
      '<div class="examples examples-center">' + EXAMPLES.slice(0, 3).map(function (e) { return '<button type="button" class="example">' + esc(e) + '</button>'; }).join('') + '</div></div></div>';
  }

  ERMIS.SearchUI.bind(results, null);
  form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  Object.keys(sel).forEach(function (k) { sel[k].addEventListener('change', function () { run({ instant: true }); }); });
  sortSel.addEventListener('change', function () { run({ instant: true }); });
  u.qs('#sf-clear').addEventListener('click', function () { Object.keys(sel).forEach(function (k) { sel[k].value = ''; }); run({ instant: true }); });
  document.addEventListener('click', function (e) {
    var ex = e.target.closest('.example');
    if (ex) { input.value = ex.textContent; run(); input.focus(); }
  });

  // The topbar search submits to this page; handle it in place.
  var top = u.qs('#global-search');
  top.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    input.value = top.q.value;
    run();
  }, true);

  input.value = u.param('q') || '';
  run({ instant: true });
  if (!input.value) input.focus();
})();
