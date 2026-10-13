/* Shared rendering for semantic search results (search page and in-review drawer) */
window.ERMIS = window.ERMIS || {};

ERMIS.SearchUI = (function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon;

  function useBtn(kind, text, label) {
    return '<button class="btn btn-sm result-use" data-use="' + kind + '" data-text="' + esc(text) + '">' + icon('plus', 'icon-sm') + esc(label) + '</button>';
  }

  function renderResult(item, opts) {
    opts = opts || {};
    var rec = item.rec, R = ERMIS.Rating.forRisk(rec);
    var use = opts.use || null;
    var cc = rec.currentControls || [], ac = rec.addControls || [], kris = rec.kris || [];

    var details =
      '<div class="result-details" hidden>' +
      '<div class="detail-block"><h4>Current controls <span class="muted">' + esc(rec.currentEff || '') + ' effectiveness</span></h4><ul>' +
      cc.map(function (c) { return '<li><span>' + esc(c) + '</span>' + (use && use.control ? useBtn('control', c, use.control) : '') + '</li>'; }).join('') + '</ul></div>' +
      (ac.length ? '<div class="detail-block"><h4>Additional controls <span class="muted">' + esc(rec.addChange || '') + '</span></h4><ul>' +
        ac.map(function (c) { return '<li><span>' + esc(c) + '</span>' + (use && use.control ? useBtn('control', c, use.control) : '') + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="detail-block"><h4>Key risk indicators</h4><ul>' +
      kris.map(function (k) { return '<li><span>' + esc(k.text) + (k.freq ? ' <span class="muted">(' + esc(k.freq) + ')</span>' : '') + '</span>' + (use && use.kri ? useBtn('kri', k.text, use.kri) : '') + '</li>'; }).join('') + '</ul></div>' +
      '<dl class="detail-meta"><div><dt>Risk owner</dt><dd>' + esc(rec.owner) + '</dd></div>' +
      (rec.monitoredBy ? '<div><dt>Monitored by</dt><dd>' + esc(rec.monitoredBy) + '</dd></div>' : '') +
      (R.residual ? '<div><dt>Rating after control changes</dt><dd>' + u.adequacyChip(R.residual.label, R.residual.display) + '</dd></div>' : '') +
      '</dl></div>';

    var hasScore = item.score != null;
    var pct = hasScore ? Math.round(item.score * 100) : 0;
    return '<article class="result' + (hasScore ? '' : ' no-score') + '" data-id="' + esc(rec.id) + '">' +
      '<div class="result-main">' +
      '<div class="result-chips"><span class="tag">' + esc(rec.domain) + '</span>' + u.bandChip(R.band) + (R.current ? u.adequacyChip(R.current.label) : '') +
      (rec.isNew ? '<span class="chip chip-primary no-dot">From your review</span>' : '') + '</div>' +
      '<p class="result-statement">' + ERMIS.Search.highlight(rec.statement, item.matched) + '</p>' +
      '<p class="result-meta">' + icon('building', 'icon-sm') + esc(rec.department) + ', ' + esc(ERMIS.REF.institutionName(rec.institution)) +
      '<span class="result-period">' + icon('calendar', 'icon-sm') + esc(ERMIS.REF.formatPeriod(rec.period)) + '</span></p>' +
      (item.related && item.related.length ? '<p class="result-related">Related concepts matched: ' + item.related.slice(0, 5).map(function (r) { return '<span class="tag">' + esc(r) + '</span>'; }).join(' ') + '</p>' : '') +
      '<button class="result-toggle" aria-expanded="false">' + icon('chevron-down', 'icon-sm') + '<span>Show controls (' + (cc.length + ac.length) + ') and indicators (' + kris.length + ')</span></button>' +
      details +
      '</div>' +
      (hasScore ? '<div class="result-score" title="Semantic similarity to your query"><span class="result-score-value num">' + item.score.toFixed(2) + '</span>' +
      '<span class="result-score-bar"><span style="width:' + pct + '%"></span></span><span class="result-score-label">Similarity</span></div>' : '') +
      '</article>';
  }

  function bind(container, onUse) {
    container.addEventListener('click', function (e) {
      var t = e.target.closest('.result-toggle');
      if (t) {
        var det = t.parentNode.querySelector('.result-details');
        var open = det.hasAttribute('hidden');
        if (open) det.removeAttribute('hidden'); else det.setAttribute('hidden', '');
        t.setAttribute('aria-expanded', String(open));
        t.querySelector('span').textContent = open ? 'Hide controls and indicators' : t.querySelector('span').getAttribute('data-label') || t.querySelector('span').textContent;
        return;
      }
      var b = e.target.closest('.result-use');
      if (b && onUse) {
        onUse(b.getAttribute('data-use'), b.getAttribute('data-text'));
        b.disabled = true;
        b.innerHTML = icon('check', 'icon-sm') + 'Added';
      }
    });
  }

  function remember(container) {
    u.qsa('.result-toggle span', container).forEach(function (s) { s.setAttribute('data-label', s.textContent); });
  }

  function skeleton(n) {
    var out = '';
    for (var i = 0; i < (n || 3); i++) {
      out += '<div class="result result-skel"><div class="result-main"><div class="skeleton" style="width:38%;height:18px"></div>' +
        '<div class="skeleton" style="width:92%;height:14px;margin-top:14px"></div><div class="skeleton" style="width:70%;height:14px;margin-top:8px"></div>' +
        '<div class="skeleton" style="width:45%;height:12px;margin-top:14px"></div></div></div>';
    }
    return out;
  }

  return { renderResult: renderResult, bind: bind, remember: remember, skeleton: skeleton };
})();
