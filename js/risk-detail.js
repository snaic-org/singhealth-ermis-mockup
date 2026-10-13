/* Risk detail and risk list drawers (register records) */
window.ERMIS = window.ERMIS || {};

ERMIS.RiskDetail = (function () {
  var u = ERMIS.u, esc = u.esc;

  function ratingBox(label, chip) {
    return '<div class="rd-rating"><span>' + esc(label) + '</span>' + chip + '</div>';
  }

  function list(items, empty) {
    if (!items || !items.length) return '<p class="muted">' + esc(empty) + '</p>';
    return '<ul class="rd-list">' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
  }

  function open(rec, back) {
    var R = ERMIS.Rating.forRisk(rec);
    var due = rec.targetDate ? u.daysFromToday(rec.targetDate) : null;
    var dueText = rec.targetDate ? u.fmtDate(rec.targetDate) + (due < 0 ? ' (overdue by ' + u.plural(-due, 'day') + ')' : due <= 90 ? ' (due in ' + u.plural(due, 'day') + ')' : '') : 'Not applicable';
    var action = R.band ? ERMIS.Rating.recommendedAction(R.band) : null;

    var html =
      '<div class="rd-chips"><span class="tag">' + esc(rec.domain) + '</span><span class="tag">' + esc(rec.id) + '</span><span class="tag">' + esc(ERMIS.REF.formatPeriod(rec.period)) + '</span></div>' +
      '<p class="rd-statement">' + esc(rec.statement) + '</p>' +
      '<div class="rd-section"><h3>Potential consequences</h3><p>' + esc(rec.consequence) + '</p></div>' +
      '<div class="rd-section"><h3>Risk rating</h3><div class="rd-ratings">' +
      ratingBox('Inherent (' + rec.impact + ' impact, ' + rec.likelihood.toLowerCase() + ')', u.bandChip(R.band)) +
      ratingBox('With current controls', R.current ? u.adequacyChip(R.current.label, R.current.display) : u.adequacyChip('')) +
      ratingBox('After control changes', R.after ? u.adequacyChip(R.after.label, R.after.display) : '<span class="muted">No change proposed</span>') +
      '</div>' + (action ? '<p class="muted" style="margin-top:8px;font-size:12.5px">Recommended review timeline: ' + esc(action.timeline) + '</p>' : '') + '</div>' +
      '<div class="rd-section"><h3>Current controls <span class="muted" style="font-weight:400">' + esc(rec.currentEff) + ' effectiveness</span></h3>' + list((rec.currentControls || []).map(esc), 'No current controls recorded') + '</div>' +
      '<div class="rd-section"><h3>Additional controls' + (rec.addChange ? ' <span class="muted" style="font-weight:400">' + esc(rec.addChange) + '</span>' : '') + '</h3>' + list((rec.addControls || []).map(esc), 'No additional controls proposed') + '</div>' +
      '<div class="rd-section"><h3>Key risk indicators</h3>' + list((rec.kris || []).map(function (k) { return esc(k.text) + (k.freq ? '<span class="muted">Tracked ' + esc(k.freq.toLowerCase()) + '</span>' : ''); }), 'No indicators recorded') + '</div>' +
      '<div class="rd-section"><h3>Ownership</h3><dl class="rd-grid">' +
      '<div><dt>Risk owner</dt><dd>' + esc(rec.owner) + '</dd></div>' +
      '<div><dt>Action by</dt><dd>' + esc(rec.actionBy || 'Not applicable') + '</dd></div>' +
      '<div><dt>Monitored by</dt><dd>' + esc(rec.monitoredBy) + '</dd></div>' +
      '<div><dt>Target date for additional controls</dt><dd>' + esc(dueText) + '</dd></div>' +
      '</dl></div>' +
      (back ? '<div class="rd-section"><button class="btn btn-sm" id="rd-back">' + u.icon('arrow-left', 'icon-sm') + 'Back to list</button></div>' : '');

    var d = ERMIS.Shell.drawer({
      title: 'Risk details',
      subtitle: esc(rec.department) + ', ' + esc(ERMIS.REF.institutionName(rec.institution)),
      wide: true
    });
    d.body.innerHTML = html;
    if (back) u.qs('#rd-back', d.body).addEventListener('click', back);
    return d;
  }

  function openList(title, subtitle, recs) {
    var d = ERMIS.Shell.drawer({ title: title, subtitle: subtitle, wide: true });
    var sorted = recs.slice().sort(function (a, b) {
      var ra = ERMIS.Rating.forRisk(a).residual, rb = ERMIS.Rating.forRisk(b).residual;
      return (rb ? rb.score : 0) - (ra ? ra.score : 0);
    });
    d.body.innerHTML = sorted.length ? '<div class="risk-list">' + sorted.map(function (r, i) {
      var R = ERMIS.Rating.forRisk(r);
      return '<button class="risk-list-item" data-i="' + i + '"><p>' + esc(r.statement) + '</p><div class="rl-meta">' + u.bandChip(R.band) +
        (R.current ? u.adequacyChip(R.current.label) : '') + '<span>' + esc(r.department) + ', ' + esc(r.institution) + '</span><span>' + esc(r.domain) + '</span></div></button>';
    }).join('') + '</div>' : '<div class="empty">' + u.icon('search') + '<h3>No risks match</h3><p>Adjust the dashboard filters to widen the view.</p></div>';
    u.qsa('.risk-list-item', d.body).forEach(function (b) {
      b.addEventListener('click', function () {
        var rec = sorted[+b.getAttribute('data-i')];
        open(rec, function () { openList(title, subtitle, recs); });
      });
    });
    return d;
  }

  return { open: open, openList: openList };
})();
