(function () {
  var user = ERMIS.Shell.mount({ active: 'dashboard', crumbs: [{ label: 'Dashboard' }] });
  if (!user) return;

  var u = ERMIS.u, esc = u.esc, icon = u.icon, REF = ERMIS.REF, Rating = ERMIS.Rating;
  var BAND_COLORS = { 'Very High': '#da2221', 'High': '#f6a700', 'Medium': '#f3e03d', 'Low': '#00ae64' };
  var ADEQ_COLORS = { 'Under-controlled': '#da2221', 'Potentially under-controlled': '#f6a700', 'Adequately controlled': '#00ae64', 'Potentially over-controlled': '#5b7db1' };
  var PERIOD_INDEX = {};
  REF.PERIODS.forEach(function (p, i) { PERIOD_INDEX[p] = i; });

  var state = { institution: '', domain: '', period: REF.CURRENT_PERIOD };

  /* ---------- Header ---------- */
  var h = new Date().getHours();
  var first = user.name.split(' ').slice(-2).join(' ');
  u.qs('#greeting').textContent = (h < 12 ? 'Good morning, ' : h < 18 ? 'Good afternoon, ' : 'Good evening, ') + first;
  u.qs('#btn-start').innerHTML = icon('plus') + 'Start new ERM review';
  u.qs('#btn-search').innerHTML = icon('search') + 'Search risk register';

  /* ---------- Filters ---------- */
  var fi = u.qs('#f-inst'), fd = u.qs('#f-domain'), fp = u.qs('#f-period');
  fi.innerHTML = '<option value="">All institutions</option>' + REF.INSTITUTIONS.map(function (i) { return '<option value="' + i.code + '">' + esc(i.name) + '</option>'; }).join('');
  fd.innerHTML = '<option value="">All domains</option>' + REF.DOMAINS.map(function (d) { return '<option>' + esc(d.name) + '</option>'; }).join('');
  fp.innerHTML = REF.PERIODS.slice(4).reverse().map(function (p) { return '<option value="' + p + '">' + REF.formatPeriod(p) + (p === REF.CURRENT_PERIOD ? ' (current)' : '') + '</option>'; }).join('');
  function onFilter() {
    state.institution = fi.value; state.domain = fd.value; state.period = fp.value;
    render();
  }
  [fi, fd, fp].forEach(function (s) { s.addEventListener('change', onFilter); });
  u.qs('#f-clear').addEventListener('click', function () { fi.value = ''; fd.value = ''; fp.value = REF.CURRENT_PERIOD; onFilter(); });

  function data() {
    return ERMIS.Store.register().filter(function (r) {
      if (state.institution && r.institution !== state.institution) return false;
      if (state.domain && r.domain !== state.domain) return false;
      if (PERIOD_INDEX[r.period] > PERIOD_INDEX[state.period]) return false;
      return true;
    });
  }

  function scopeLabel() {
    var parts = [];
    if (state.domain) parts.push(state.domain);
    parts.push(state.institution ? REF.institutionName(state.institution) : 'all institutions');
    return parts.join(' risks, ');
  }

  /* ---------- Resume banner ---------- */
  function renderResume() {
    var drafts = ERMIS.Store.getReviews().filter(function (r) { return r.status === 'draft'; });
    var el = u.qs('#resume');
    if (!drafts.length) { el.innerHTML = ''; return; }
    var r = drafts[0], p = ERMIS.Store.progress(r);
    var stepIdx = p.steps.findIndex(function (s) { return s.issues.length; });
    var stepName = stepIdx > -1 ? ERMIS.Store.STEP_NAMES[stepIdx] : 'Generate KRM Plan';
    el.innerHTML = '<div class="resume">' +
      '<div class="resume-icon">' + icon('file') + '</div>' +
      '<div class="resume-text"><strong>Continue your review: ' + esc(r.info.title || 'Untitled review') + '</strong>' +
      '<span>Next up: ' + esc(stepName) + '. Last edited ' + esc(u.relTime(r.updatedAt)) + '.</span></div>' +
      '<div class="resume-progress"><span class="mini-progress"><span style="width:' + Math.max(p.pct, 4) + '%"></span></span><span class="num">' + p.pct + '%</span></div>' +
      '<a class="btn" href="review.html?id=' + encodeURIComponent(r.id) + '">Resume review</a></div>';
  }

  /* ---------- KPIs ---------- */
  var kpiLists = {};
  function renderKPIs(list) {
    var insts = {}, depts = {};
    list.forEach(function (r) { insts[r.institution] = 1; depts[r.institution + r.department] = 1; });
    var high = list.filter(function (r) { var b = Rating.inherentBand(r.impact, r.likelihood); return b === 'Very High' || b === 'High'; });
    var vh = high.filter(function (r) { return Rating.inherentBand(r.impact, r.likelihood) === 'Very High'; }).length;
    var under = list.filter(function (r) { var c = Rating.forRisk(r).current; return c && c.label === 'Under-controlled'; });
    var potUnder = list.filter(function (r) { var c = Rating.forRisk(r).current; return c && c.label === 'Potentially under-controlled'; });
    var withActions = list.filter(function (r) { return r.addControls && r.addControls.length && r.targetDate; });
    var overdue = withActions.filter(function (r) { return u.daysFromToday(r.targetDate) < 0; });
    var due = withActions.filter(function (r) { var d = u.daysFromToday(r.targetDate); return d >= 0 && d <= 90; });
    var reviews = ERMIS.Store.getReviews();
    var drafts = reviews.filter(function (r) { return r.status === 'draft'; }).length;
    var submitted = reviews.filter(function (r) { return r.status === 'submitted'; }).length;

    kpiLists = {
      all: { title: 'Active risks', list: list },
      high: { title: 'Very High and High risks', list: high },
      under: { title: 'Under-controlled risks', list: under.concat(potUnder) },
      actions: { title: 'Control actions overdue or due within 90 days', list: overdue.concat(due) }
    };

    function tile(key, label, value, sub, tone) {
      return '<button class="kpi" data-kpi="' + key + '"><span class="kpi-label">' + (tone ? '<span class="kpi-dot" style="background:' + tone + '"></span>' : '') + esc(label) + '</span>' +
        '<span class="kpi-value">' + value + '</span><span class="kpi-sub">' + sub + '</span></button>';
    }
    var pct = list.length ? Math.round(high.length / list.length * 100) : 0;
    u.qs('#kpis').innerHTML =
      tile('all', 'Active risks', list.length, 'In ' + u.plural(Object.keys(depts).length, 'department') + ' across ' + u.plural(Object.keys(insts).length, 'institution')) +
      tile('high', 'Very High and High', high.length, vh + ' Very High, ' + pct + '% of active risks', BAND_COLORS['Very High']) +
      tile('under', 'Under-controlled', under.length, '+' + potUnder.length + ' potentially under-controlled', ADEQ_COLORS['Under-controlled']) +
      tile('actions', 'Control actions overdue', overdue.length, due.length + ' more due within 90 days', overdue.length ? '#c4231f' : null) +
      tile('reviews', 'Reviews in progress', drafts, u.plural(submitted, 'review') + ' submitted to the register');
    u.qsa('.kpi', u.qs('#kpis')).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-kpi');
        if (k === 'reviews') { u.qs('#my-reviews-card').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        var info = kpiLists[k];
        ERMIS.RiskDetail.openList(info.title, u.plural(info.list.length, 'risk') + ', ' + esc(scopeLabel()), info.list);
      });
    });
  }

  /* ---------- Heat map ---------- */
  function renderHeatmap(list) {
    var cells = {}, unsure = 0;
    [1, 2, 3, 4, 5].forEach(function (i) { cells[i] = {}; [1, 2, 3, 4, 5].forEach(function (l) { cells[i][l] = []; }); });
    list.forEach(function (r) {
      var im = Rating.find(REF.IMPACT, r.impact), lk = Rating.find(REF.LIKELIHOOD, r.likelihood);
      if (!im || !lk || !im.level || !lk.level) { unsure++; return; }
      cells[im.level][lk.level].push(r);
    });
    var el = u.qs('#heatmap');
    var fresh = el.cloneNode(false);
    el.parentNode.replaceChild(fresh, el);
    ERMIS.Charts.heatmap(fresh, cells, {
      onClick: function (i, l) {
        var im = REF.IMPACT.filter(function (x) { return x.level === i; })[0], lk = REF.LIKELIHOOD.filter(function (x) { return x.level === l; })[0];
        ERMIS.RiskDetail.openList(im.name + ' impact, ' + lk.name.toLowerCase(), esc(Rating.bandFor(i, l)) + ' risk level, ' + u.plural(cells[i][l].length, 'risk'), cells[i][l]);
      }
    });
    var counts = { 'Very High': 0, 'High': 0, 'Medium': 0, 'Low': 0 };
    list.forEach(function (r) { var b = Rating.inherentBand(r.impact, r.likelihood); if (b) counts[b]++; });
    u.qs('#heat-legend').innerHTML = Object.keys(counts).map(function (b) {
      return '<span class="heat-legend-item"><span class="legend-swatch" style="background:' + BAND_COLORS[b] + '"></span>' + b + ' <span class="num muted">' + counts[b] + '</span></span>';
    }).join('') + (unsure ? '<span class="heat-legend-note">' + u.plural(unsure, 'risk') + ' rated "Unsure" not plotted</span>' : '');
  }

  /* ---------- Domain summary ---------- */
  function renderDomains(list) {
    var by = {};
    list.forEach(function (r) {
      var b = Rating.inherentBand(r.impact, r.likelihood) || 'Low';
      by[r.domain] = by[r.domain] || { 'Very High': 0, 'High': 0, 'Medium': 0, 'Low': 0 };
      by[r.domain][b]++;
    });
    var rows = Object.keys(by).map(function (d) { return { label: d, key: d, values: by[d] }; });
    rows.sort(function (a, b) {
      var ta = a.values['Very High'] * 1000 + a.values.High * 100, tb = b.values['Very High'] * 1000 + b.values.High * 100;
      var sa = a.values['Very High'] + a.values.High + a.values.Medium + a.values.Low, sb = b.values['Very High'] + b.values.High + b.values.Medium + b.values.Low;
      return (sb - sa) || (tb - ta);
    });
    var series = ['Very High', 'High', 'Medium', 'Low'].map(function (b) { return { key: b, label: b, color: BAND_COLORS[b] }; });
    var el = u.qs('#domain-chart');
    var fresh = el.cloneNode(false);
    el.parentNode.replaceChild(fresh, el);
    if (!rows.length) { fresh.innerHTML = emptyState(); }
    else ERMIS.Charts.stackedBars(fresh, rows, series, {
      clickable: true,
      onClick: function (d) {
        var l = list.filter(function (r) { return r.domain === d; });
        ERMIS.RiskDetail.openList(d + ' risks', u.plural(l.length, 'risk') + ', ' + esc(state.institution ? REF.institutionName(state.institution) : 'all institutions'), l);
      }
    });
    u.qs('#domain-table').innerHTML = '<div class="table-wrap"><table class="table"><thead><tr><th>Domain</th><th class="col-num">Very High</th><th class="col-num">High</th><th class="col-num">Medium</th><th class="col-num">Low</th><th class="col-num">Total</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var v = r.values;
        return '<tr><td>' + esc(r.label) + '</td><td class="col-num">' + v['Very High'] + '</td><td class="col-num">' + v.High + '</td><td class="col-num">' + v.Medium + '</td><td class="col-num">' + v.Low + '</td><td class="col-num"><strong>' + (v['Very High'] + v.High + v.Medium + v.Low) + '</strong></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  u.qsa('.segmented button').forEach(function (b) {
    b.addEventListener('click', function () {
      u.qsa('.segmented button').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', String(x === b)); });
      var table = b.getAttribute('data-view') === 'table';
      u.qs('#domain-chart').classList.toggle('hidden', table);
      u.qs('#domain-table').classList.toggle('hidden', !table);
    });
  });

  /* ---------- Top risks ---------- */
  function residualScore(r) { var x = Rating.forRisk(r); return x.residual ? x.residual.score : 0; }
  function renderTop(list) {
    var top = list.slice().sort(function (a, b) {
      return (residualScore(b) - residualScore(a)) ||
        (Rating.bandOrder(Rating.inherentBand(b.impact, b.likelihood)) - Rating.bandOrder(Rating.inherentBand(a.impact, a.likelihood))) ||
        ((Rating.rawScore(b.impact, b.likelihood) || 0) - (Rating.rawScore(a.impact, a.likelihood) || 0));
    }).slice(0, 10);
    if (!top.length) { u.qs('#top-risks').innerHTML = emptyState(); return; }
    u.qs('#top-risks').innerHTML = '<table class="table top-table"><thead><tr><th class="col-rank">#</th><th>Risk</th><th>Domain</th><th>Risk owner</th><th>Inherent</th><th>Control adequacy, now and after changes</th><th>Control status</th></tr></thead><tbody>' +
      top.map(function (r, i) {
        var R = Rating.forRisk(r);
        var status = controlStatus(r);
        return '<tr class="is-clickable" data-i="' + i + '" tabindex="0">' +
          '<td class="col-rank num">' + (i + 1) + '</td>' +
          '<td class="col-risk"><p class="clamp-2">' + esc(r.statement) + '</p><span class="muted">' + esc(r.department) + ', ' + esc(r.institution) + '</span></td>' +
          '<td><span class="tag">' + esc(r.domain) + '</span></td>' +
          '<td class="col-owner">' + esc(r.owner.split(',')[0]) + '<span class="muted">' + esc(r.owner.split(',').slice(1).join(',').trim()) + '</span></td>' +
          '<td>' + u.bandChip(R.band) + '</td>' +
          '<td class="col-adequacy"><span class="adq-line"><span class="adq-when">Now</span>' + (R.current ? u.adequacyChip(R.current.label, R.current.display) : '') + '</span>' +
          '<span class="adq-line"><span class="adq-when">After</span>' + (R.after ? u.adequacyChip(R.after.label, R.after.display) : '<span class="muted">No change proposed</span>') + '</span></td>' +
          '<td>' + status + '</td></tr>';
      }).join('') + '</tbody></table>';
    u.qsa('#top-risks tbody tr').forEach(function (tr) {
      function go() { ERMIS.RiskDetail.open(top[+tr.getAttribute('data-i')]); }
      tr.addEventListener('click', go);
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    });
  }
  function controlStatus(r) {
    if (!r.addControls || !r.addControls.length) return '<span class="status">' + icon('check-circle', 'icon-sm') + 'Current controls only</span>';
    var d = u.daysFromToday(r.targetDate);
    if (d < 0) return '<span class="status status-danger">' + icon('alert', 'icon-sm') + 'Overdue since ' + u.fmtDate(r.targetDate) + '</span>';
    if (d <= 90) return '<span class="status status-warn">' + icon('clock', 'icon-sm') + 'Due ' + u.fmtDate(r.targetDate) + '</span>';
    return '<span class="status">' + icon('calendar', 'icon-sm') + 'On track, due ' + u.fmtDate(r.targetDate) + '</span>';
  }

  /* ---------- Control effectiveness ---------- */
  function renderEffectiveness(list) {
    var weak = { 'Minor': 1, 'Minimal': 1, 'None': 1 };
    var counts = {};
    list.forEach(function (r) { var e = Rating.find(REF.EFFECTIVENESS, r.currentEff); if (e) counts[e.name] = (counts[e.name] || 0) + 1; });
    var items = REF.EFFECTIVENESS.map(function (e) {
      return { key: e.name, label: e.name, value: counts[e.name] || 0, sub: e.desc + '. ' + e.def, emphasis: !!weak[e.name] };
    });
    var weakN = items.filter(function (i) { return i.emphasis; }).reduce(function (a, i) { return a + i.value; }, 0);
    u.qs('#eff-sub').textContent = weakN ? u.plural(weakN, 'risk') + ' rely on current controls rated Minor or weaker.' : 'Effectiveness of current controls across active risks.';
    u.qs('#eff-legend').innerHTML = '<span class="legend-item"><span class="legend-swatch" style="background:#8b93e8"></span>Moderate or stronger</span><span class="legend-item"><span class="legend-swatch" style="background:#da2221"></span>Minor or weaker</span>';
    var el = u.qs('#eff-chart');
    var fresh = el.cloneNode(false);
    el.parentNode.replaceChild(fresh, el);
    ERMIS.Charts.columns(fresh, items, {
      clickable: true,
      onClick: function (k) {
        var l = list.filter(function (r) { var e = Rating.find(REF.EFFECTIVENESS, r.currentEff); return e && e.name === k; });
        ERMIS.RiskDetail.openList('Current controls rated ' + k, u.plural(l.length, 'risk'), l);
      }
    });
  }

  /* ---------- Adequacy now vs after ---------- */
  function renderAdequacy(list) {
    var cur = {}, aft = {};
    list.forEach(function (r) {
      var R = Rating.forRisk(r);
      if (R.current) cur[R.current.label] = (cur[R.current.label] || 0) + 1;
      if (R.residual) aft[R.residual.label] = (aft[R.residual.label] || 0) + 1;
    });
    var series = REF.ADEQUACY.map(function (a) { return { key: a.name, label: a.name, color: ADEQ_COLORS[a.name] }; });
    var el = u.qs('#adequacy-chart');
    var fresh = el.cloneNode(false);
    el.parentNode.replaceChild(fresh, el);
    ERMIS.Charts.stackedBars(fresh, [
      { label: 'With current controls', values: cur },
      { label: 'After control changes', values: aft }
    ], series, { percent: true });
    var a = cur['Under-controlled'] || 0, b = aft['Under-controlled'] || 0;
    var pa = (cur['Potentially under-controlled'] || 0), pb = (aft['Potentially under-controlled'] || 0);
    u.qs('#adequacy-insight').innerHTML = list.length ?
      icon('activity', 'icon-sm') + '<span>Once proposed controls are in place, under-controlled risks go from <strong>' + a + '</strong> to <strong>' + b + '</strong>, and potentially under-controlled risks from <strong>' + pa + '</strong> to <strong>' + pb + '</strong>.</span>' : '';
  }

  /* ---------- My reviews ---------- */
  function renderMyReviews() {
    var reviews = ERMIS.Store.getReviews();
    var el = u.qs('#my-reviews');
    if (!reviews.length) {
      el.innerHTML = '<div class="empty">' + icon('file') + '<h3>No reviews yet</h3><p>Start a new ERM review to identify and assess risks for your project or area.</p></div>';
      return;
    }
    el.innerHTML = '<div class="table-wrap"><table class="table"><thead><tr><th>Review</th><th>Status</th><th>Progress</th><th>Last updated</th><th></th></tr></thead><tbody>' +
      reviews.map(function (r) {
        var p = ERMIS.Store.progress(r);
        var submitted = r.status === 'submitted';
        return '<tr><td class="col-review"><a href="review.html?id=' + encodeURIComponent(r.id) + (submitted ? '&step=6' : '') + '"><strong>' + esc(r.info.title || 'Untitled review') + '</strong></a><span class="muted">' + esc(r.id) + ', ' + u.plural(r.risks.length, 'risk') + '</span></td>' +
          '<td>' + (submitted ? '<span class="chip chip-adequate">Submitted</span>' : '<span class="chip chip-primary">Draft</span>') + '</td>' +
          '<td>' + (submitted ? '<span class="muted">' + esc(u.fmtDate(new Date(r.submittedAt))) + '</span>' : '<span class="progress-cell"><span class="mini-progress"><span style="width:' + Math.max(p.pct, 4) + '%"></span></span><span class="num">' + p.pct + '%</span></span>') + '</td>' +
          '<td class="muted">' + esc(u.relTime(r.updatedAt)) + '</td>' +
          '<td class="col-actions">' + (submitted ?
            '<a class="btn btn-sm" href="review.html?id=' + encodeURIComponent(r.id) + '&step=6">' + icon('file', 'icon-sm') + 'View KRM Plan</a>' :
            '<a class="btn btn-sm" href="review.html?id=' + encodeURIComponent(r.id) + '">Resume</a><button class="btn btn-ghost btn-icon btn-sm" data-del="' + esc(r.id) + '" aria-label="Delete draft">' + icon('trash', 'icon-sm') + '</button>') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    u.qsa('[data-del]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-del'), r = ERMIS.Store.getReview(id);
        ERMIS.Shell.confirm({ title: 'Delete this draft?', message: '"' + (r.info.title || 'Untitled review') + '" and everything entered in it will be permanently deleted.', confirmLabel: 'Delete draft', danger: true }).then(function (ok) {
          if (!ok) return;
          ERMIS.Store.deleteReview(id);
          ERMIS.Shell.toast('Draft deleted');
          ERMIS.Shell.refreshSidebar('dashboard');
          render();
        });
      });
    });
  }

  /* ---------- Deadlines ---------- */
  function renderDeadlines(list) {
    var items = list.filter(function (r) { return r.addControls && r.addControls.length && r.targetDate && u.daysFromToday(r.targetDate) <= 90; })
      .sort(function (a, b) { return u.parseISO(a.targetDate) - u.parseISO(b.targetDate); });
    var el = u.qs('#deadlines');
    if (!items.length) { el.innerHTML = '<div class="empty">' + icon('check-circle') + '<h3>Nothing due</h3><p>No additional controls are overdue or due within 90 days.</p></div>'; return; }
    el.innerHTML = '<ul class="deadlines">' + items.slice(0, 6).map(function (r, i) {
      var d = u.daysFromToday(r.targetDate);
      var when = d < 0 ? '<span class="due due-over">Overdue ' + u.plural(-d, 'day') + '</span>' : '<span class="due">' + (d === 0 ? 'Due today' : 'In ' + u.plural(d, 'day')) + '</span>';
      return '<li><button data-i="' + i + '"><span class="dl-main"><span class="dl-title">' + esc(r.addControls[0]) + '</span><span class="dl-meta">' + esc(r.actionBy ? r.actionBy.split(',')[0] : r.owner.split(',')[0]) + ', ' + esc(r.department) + ' (' + esc(r.institution) + ')</span></span>' +
        '<span class="dl-date">' + when + '<span class="muted">' + u.fmtDate(r.targetDate) + '</span></span></button></li>';
    }).join('') + '</ul>' + (items.length > 6 ? '<div class="card-footer"><button class="btn btn-ghost btn-sm" id="dl-all">View all ' + items.length + ' control actions</button></div>' : '');
    u.qsa('.deadlines button', el).forEach(function (b) { b.addEventListener('click', function () { ERMIS.RiskDetail.open(items[+b.getAttribute('data-i')]); }); });
    var all = u.qs('#dl-all', el);
    if (all) all.addEventListener('click', function () { ERMIS.RiskDetail.openList('Control actions due', u.plural(items.length, 'risk') + ' with additional controls overdue or due within 90 days', items); });
  }

  function emptyState() {
    return '<div class="empty">' + icon('filter') + '<h3>No risks match these filters</h3><p>Choose another institution, domain or period.</p></div>';
  }

  function render() {
    var list = data();
    var filtered = state.institution || state.domain || state.period !== REF.CURRENT_PERIOD;
    u.qs('#f-clear').classList.toggle('hidden', !filtered);
    u.qs('#f-count').textContent = 'Showing ' + u.plural(list.length, 'active risk') + ' as at ' + REF.formatPeriod(state.period);
    u.qs('#page-sub').textContent = 'Enterprise risk position for ' + scopeLabel() + ', as at ' + REF.formatPeriod(state.period) + '.';
    renderResume();
    renderKPIs(list);
    renderHeatmap(list);
    renderDomains(list);
    renderTop(list);
    renderEffectiveness(list);
    renderAdequacy(list);
    renderMyReviews();
    renderDeadlines(list);
  }

  render();
  if (u.param('submitted')) ERMIS.Shell.toast('Review submitted. The risk register and dashboard are updated.');
})();
