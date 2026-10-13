(function () {
  if (!ERMIS.Shell.mount({ active: 'search', crumbs: [{ label: 'Dashboard', href: 'dashboard.html' }, { label: 'Risk search' }] })) return;
  var u = ERMIS.u, esc = u.esc, icon = u.icon;
  u.qsa('[data-icon]').forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-icon')); });

  var form = u.qs('#search-form'), results = u.qs('#results'), title = u.qs('#sr-title');

  function resultCard() {
    return '<article class="result"><div>' +
      '<div class="result-chips"><span class="ph"></span><span class="ph"></span><span class="ph"></span></div>' +
      ERMIS.Shell.phLines([100, 90, 50]) +
      '<button class="result-toggle" aria-expanded="false">' + icon('chevron-down', 'icon-sm') + '<span>Show controls and indicators</span></button>' +
      '<div class="result-details" hidden>' +
      '<div class="detail-row"><span class="detail-label">Current control</span><span class="ph"></span></div>' +
      '<div class="detail-row"><span class="detail-label">Additional control</span><span class="ph"></span></div>' +
      '<div class="detail-row"><span class="detail-label">Key risk indicator</span><span class="ph"></span></div></div>' +
      '</div><div class="result-score"><span class="ph ph-lg"></span><span class="result-score-label">Similarity</span></div></article>';
  }

  function render() {
    var q = form.q.value.trim();
    history.replaceState(null, '', 'search.html' + (q ? '?q=' + encodeURIComponent(q) : ''));
    if (!q) {
      title.textContent = '';
      results.innerHTML = '<div class="card"><div class="empty"><span class="ph-sq ph-sq-lg"></span><h3>Search for comparable risks</h3><p>Describe a risk to find comparable risks by meaning.</p></div></div>';
      return;
    }
    title.innerHTML = 'Results for “' + esc(q) + '”';
    results.innerHTML = resultCard() + resultCard() + resultCard() + resultCard();
  }

  results.addEventListener('click', function (e) {
    var t = e.target.closest('.result-toggle');
    if (!t) return;
    var det = t.parentNode.querySelector('.result-details');
    var open = det.hasAttribute('hidden');
    if (open) det.removeAttribute('hidden'); else det.setAttribute('hidden', '');
    t.setAttribute('aria-expanded', String(open));
    t.querySelector('span').textContent = open ? 'Hide controls and indicators' : 'Show controls and indicators';
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); render(); });

  // The top bar search submits to this page; handle it in place.
  var top = u.qs('#global-search');
  top.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    form.q.value = top.q.value;
    render();
  }, true);

  form.q.value = u.param('q') || '';
  render();
})();
