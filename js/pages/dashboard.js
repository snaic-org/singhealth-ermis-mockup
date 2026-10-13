(function () {
  if (!ERMIS.Shell.mount({ active: 'dashboard', crumbs: [{ label: 'Dashboard' }] })) return;
  var u = ERMIS.u, icon = u.icon;

  u.qs('#btn-start').innerHTML = icon('plus') + 'Start new ERM review';
  u.qs('#btn-search').innerHTML = icon('search') + 'Search risk register';

  var KPIS = ['Active risks', 'Very High & High', 'Under-controlled', 'Control actions overdue', 'Reviews in progress'];
  u.qs('#kpis').innerHTML = KPIS.map(function (k) {
    return '<div class="kpi"><span class="kpi-label">' + k + '</span><span class="ph ph-xl ph-w40"></span><span class="ph ph-sm ph-w70 ph-light"></span></div>';
  }).join('');

  var rows = '';
  for (var i = 1; i <= 5; i++) {
    rows += '<tr><td class="muted">' + i + '</td><td class="col-wide"><span class="ph ph-w90"></span><span class="ph ph-sm ph-w50 ph-light" style="margin-top:7px"></span></td>' +
      '<td><span class="ph ph-w80"></span></td><td><span class="ph ph-w70"></span></td><td><span class="chip">Level</span></td><td><span class="chip">Class</span></td><td><span class="ph ph-w60"></span></td></tr>';
  }
  u.qs('#top-risks tbody').innerHTML = rows;

  var draft = ERMIS.Store.latestDraft();
  var resumeHref = draft ? 'review.html?id=' + encodeURIComponent(draft.id) : 'review.html?new=1';
  var r = '';
  [['Draft', 50], ['Draft', 20], ['Submitted', 100]].forEach(function (row) {
    var submitted = row[0] === 'Submitted';
    r += '<tr><td class="col-wide"><span class="ph ph-w80"></span><span class="ph ph-sm ph-w40 ph-light" style="margin-top:7px"></span></td>' +
      '<td><span class="chip">' + row[0] + '</span></td>' +
      '<td><span class="progress"><span style="width:' + row[1] + '%"></span></span></td>' +
      '<td><span class="ph ph-w60"></span></td>' +
      '<td class="col-actions">' + (submitted ? '<button class="btn btn-sm" disabled>View</button>' : '<a class="btn btn-sm" href="' + resumeHref + '">Resume</a>') + '</td></tr>';
  });
  u.qs('#my-reviews tbody').innerHTML = r;

  var li = '';
  for (var j = 0; j < 4; j++) li += '<li><span class="ph-stack grow"><span class="ph ph-w90"></span><span class="ph ph-sm ph-w50 ph-light"></span></span><span class="ph ph-w20" style="width:64px"></span></li>';
  u.qs('#actions-due').innerHTML = li;

  if (u.param('submitted')) ERMIS.Shell.toast('Review submitted to the risk register');
})();
