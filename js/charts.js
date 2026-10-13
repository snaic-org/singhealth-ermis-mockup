/* Lightweight chart components (HTML/CSS), with hover tooltips */
window.ERMIS = window.ERMIS || {};

ERMIS.Charts = (function () {
  var u = ERMIS.u, esc = u.esc;

  function bindTips(root) {
    root.addEventListener('mousemove', function (e) {
      var t = e.target.closest('[data-tip]');
      if (!t || !root.contains(t)) return ERMIS.Shell.tooltip.hide();
      ERMIS.Shell.tooltip.show(t.getAttribute('data-tip'), e.clientX, e.clientY);
    });
    root.addEventListener('mouseleave', ERMIS.Shell.tooltip.hide);
  }

  function legend(series) {
    return '<div class="legend">' + series.map(function (s) {
      return '<span class="legend-item"><span class="legend-swatch" style="background:' + s.color + '"></span>' + esc(s.label) + '</span>';
    }).join('') + '</div>';
  }

  /* Horizontal stacked bars. rows: [{label, key, values:{seriesKey:n}}], series: [{key,label,color}] */
  function stackedBars(el, rows, series, opts) {
    opts = opts || {};
    var max = 0;
    rows.forEach(function (r) {
      r.total = series.reduce(function (a, s) { return a + (r.values[s.key] || 0); }, 0);
      if (r.total > max) max = r.total;
    });
    var html = (opts.legend === false ? '' : legend(series)) + '<div class="hbars' + (opts.percent ? ' is-percent' : '') + '">';
    rows.forEach(function (r) {
      var segs = series.filter(function (s) { return r.values[s.key]; });
      var tipRows = series.map(function (s) {
        var v = r.values[s.key] || 0;
        var pct = r.total ? Math.round(v / r.total * 100) : 0;
        return '<div class="tt-row"><span class="tt-key"><span class="tt-swatch" style="background:' + s.color + '"></span>' + esc(s.label) + '</span><span class="num">' + v + (opts.percent ? ' (' + pct + '%)' : '') + '</span></div>';
      }).join('');
      var tip = '<strong>' + esc(r.label) + '</strong>' + tipRows;
      var width = opts.percent ? 100 : (max ? r.total / max * 100 : 0);
      html += '<div class="hbar-row' + (opts.clickable ? ' is-clickable' : '') + '" data-key="' + esc(r.key || r.label) + '" data-tip="' + esc(tip) + '"' + (opts.clickable ? ' tabindex="0" role="button" aria-label="' + esc(r.label + ': ' + r.total + ' risks') + '"' : '') + '>' +
        '<span class="hbar-label">' + esc(r.label) + '</span>' +
        '<span class="hbar-track"><span class="hbar-fill" style="width:' + width + '%">' +
        segs.map(function (s) { return '<span class="hbar-seg" style="flex:' + r.values[s.key] + ';background:' + s.color + '"></span>'; }).join('') +
        '</span>' + (opts.percent ? '' : '<span class="hbar-total num">' + r.total + '</span>') + '</span></div>';
    });
    html += '</div>';
    el.innerHTML = html;
    bindTips(el);
    if (opts.onClick) {
      el.addEventListener('click', function (e) { var r = e.target.closest('.hbar-row'); if (r) opts.onClick(r.getAttribute('data-key')); });
      el.addEventListener('keydown', function (e) { var r = e.target.closest('.hbar-row'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); opts.onClick(r.getAttribute('data-key')); } });
    }
  }

  /* Vertical columns, single series. items: [{label, value, sub, emphasis}] */
  function columns(el, items, opts) {
    opts = opts || {};
    var max = Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    var step = max <= 10 ? 2 : max <= 25 ? 5 : max <= 50 ? 10 : 20;
    var nice = Math.ceil(max / step / 2) * step * 2 || 4;
    var html = '<div class="vcols"><div class="vcols-grid">' + [nice, Math.round(nice / 2), 0].map(function (t) {
      return '<span class="vcols-gridline"><span class="num">' + t + '</span></span>';
    }).join('') + '</div><div class="vcols-plot">';
    items.forEach(function (it) {
      var h = it.value / nice * 100;
      var tip = '<strong>' + esc(it.label) + '</strong><div class="tt-row"><span class="tt-key">Risks</span><span class="num">' + it.value + '</span></div>' + (it.sub ? '<div style="color:#cfd5df;margin-top:2px">' + esc(it.sub) + '</div>' : '');
      html += '<div class="vcol' + (opts.clickable ? ' is-clickable' : '') + '" data-key="' + esc(it.key || it.label) + '" data-tip="' + esc(tip) + '"' + (opts.clickable ? ' tabindex="0" role="button" aria-label="' + esc(it.label + ': ' + it.value + ' risks') + '"' : '') + '>' +
        '<span class="vcol-value num">' + it.value + '</span>' +
        '<span class="vcol-bar' + (it.emphasis ? ' is-emphasis' : '') + '" style="height:' + h + '%"></span></div>';
    });
    html += '</div></div><div class="vcols-labels">' + items.map(function (it) { return '<span>' + esc(it.label) + '</span>'; }).join('') + '</div>';
    el.innerHTML = html;
    bindTips(el);
    if (opts.onClick) {
      el.addEventListener('click', function (e) { var r = e.target.closest('.vcol'); if (r) opts.onClick(r.getAttribute('data-key')); });
      el.addEventListener('keydown', function (e) { var r = e.target.closest('.vcol'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); opts.onClick(r.getAttribute('data-key')); } });
    }
  }

  /* 5x5 heat map. cells[impactLevel][likelihoodLevel] = risks[] */
  function heatmap(el, cells, opts) {
    var REF = ERMIS.REF, R = ERMIS.Rating;
    var imps = REF.IMPACT.slice(0, 5), liks = REF.LIKELIHOOD.slice(0, 5).slice().reverse();
    var html = '<div class="heat"><div class="heat-y" aria-hidden="true">Impact</div><div class="heat-grid" role="grid" aria-label="Risk heat map, impact by likelihood">';
    imps.forEach(function (im) {
      html += '<div class="heat-rowlabel" role="rowheader">' + esc(im.name) + '</div>';
      liks.forEach(function (lk) {
        var list = cells[im.level][lk.level] || [];
        var band = R.bandFor(im.level, lk.level);
        var n = list.length;
        var tip = '<strong>' + esc(im.name) + ' impact, ' + esc(lk.name.toLowerCase()) + '</strong><div class="tt-row"><span class="tt-key">Risk level</span><span>' + esc(band) + '</span></div><div class="tt-row"><span class="tt-key">Risks</span><span class="num">' + n + '</span></div>' + (n ? '<div style="color:#cfd5df;margin-top:4px">Select to view risks</div>' : '');
        html += '<button class="heat-cell band-' + R.bandKey(band) + (n ? ' has-risks' : '') + '" role="gridcell" data-i="' + im.level + '" data-l="' + lk.level + '" data-tip="' + esc(tip) + '" aria-label="' + esc(im.name + ' impact, ' + lk.name + ' likelihood, ' + band + ': ' + n + ' risks') + '"' + (n ? '' : ' disabled') + '>' +
          (n ? '<span class="heat-count num">' + n + '</span>' : '') + '</button>';
      });
    });
    html += '<div></div>' + liks.map(function (lk) { return '<div class="heat-collabel">' + esc(lk.name) + '</div>'; }).join('') + '</div><div class="heat-x" aria-hidden="true">Likelihood</div></div>';
    el.innerHTML = html;
    bindTips(el);
    el.addEventListener('click', function (e) {
      var c = e.target.closest('.heat-cell');
      if (c && !c.disabled && opts && opts.onClick) opts.onClick(+c.getAttribute('data-i'), +c.getAttribute('data-l'));
    });
  }

  return { stackedBars: stackedBars, columns: columns, heatmap: heatmap, legend: legend };
})();
