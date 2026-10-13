(function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon, Store = ERMIS.Store;
  var isNew = u.param('new') === '1';
  if (!ERMIS.Shell.mount({ active: isNew ? 'review' : '', crumbs: [{ label: 'Dashboard', href: 'dashboard.html' }, { label: 'New ERM review' }] })) return;

  var review;
  if (isNew) {
    review = Store.createReview();
    history.replaceState(null, '', 'review.html?id=' + encodeURIComponent(review.id));
  } else {
    review = Store.getReview(u.param('id')) || Store.latestDraft() || Store.createReview();
  }

  var STEPS = [
    { label: 'Description & goal', title: 'Description and goal', intro: 'Describe the project, area, programme or initiative under review and its goal.' },
    { label: 'Objectives & risks', title: 'Objectives and risks', intro: 'Set the objectives of the review and identify the risks that could prevent them being achieved.' },
    { label: 'Current controls', title: 'Current controls', intro: 'Describe the controls already in place for each risk and rate how effective they are.' },
    { label: 'Additional controls', title: 'Additional controls', intro: 'Propose additional or changed controls where current controls are not adequate.' },
    { label: 'KRM plan', title: 'KRM plan', intro: 'Set the key risk indicators or outcome measures used to monitor each risk.' },
    { label: 'Review & submit', title: 'Review & submit', intro: 'Check the generated Key Risk Mitigation (KRM) Plan, print it for endorsement and submit it to the risk register.' }
  ];
  var step = Math.min(6, Math.max(1, parseInt(u.param('step'), 10) || review.step || 1));
  var stepEl = u.qs('#step');

  /* ---------- Helpers ---------- */
  function generic(placeholder) {
    return '<option value="">' + esc(placeholder) + '</option><option>Option 1</option><option>Option 2</option><option>Option 3</option>';
  }
  function label(id, text, req) {
    return '<label class="field-label" for="' + id + '">' + esc(text) + (req ? ' <span class="req">*</span>' : '') + '</label>';
  }
  function input(id, bind, text, req, ph, type) {
    return '<div class="field">' + label(id, text, req) + '<input class="input" id="' + id + '" ' + bind + ' type="' + (type || 'text') + '" placeholder="' + esc(ph || '') + '"></div>';
  }
  function textarea(id, bind, text, req, ph, assist, hint) {
    return '<div class="field">' + label(id, text, req) + '<textarea class="textarea" id="' + id + '" ' + bind + (assist ? ' data-assist="' + assist + '"' : '') + ' placeholder="' + esc(ph) + '"></textarea>' + (hint ? '<span class="field-hint">' + esc(hint) + '</span>' : '') + '</div>';
  }
  function select(id, bind, text, req, ph) {
    return '<div class="field">' + label(id, text, req) + '<select class="select" id="' + id + '" ' + bind + '>' + generic(ph) + '</select></div>';
  }
  // Binding attributes for a risk field; fields with ERMIS Assist also carry the risk id for context.
  function rb(r, f) {
    var assisted = ['statement', 'consequence', 'currentControls', 'addControls', 'kri'].indexOf(f) > -1;
    return 'data-risk="' + r.id + '" data-field="' + f + '"' + (assisted ? ' data-risk-id="' + r.id + '"' : '');
  }
  function getRisk(id) { return review.risks.filter(function (x) { return x.id === id; })[0]; }
  function riskNo(r) { return review.risks.indexOf(r) + 1; }
  function valOrBar(v, w) { return v && v.trim() ? '<span class="ctx-value">' + esc(v) + '</span>' : '<span class="ph ph-w' + (w || 70) + '"></span>'; }

  function riskContext(r) {
    return '<div class="risk-ctx"><div class="risk-ctx-top"><h3>Risk ' + riskNo(r) + '</h3><span class="chip">Not rated</span></div>' +
      '<div class="risk-ctx-statement">' + valOrBar(r.statement, 60) + '</div>' +
      '<div class="risk-ctx-grid">' +
      '<div><span class="ctx-label">Potential consequences</span>' + valOrBar(r.consequence, 80) + '</div>' +
      '<div><span class="ctx-label">Impact</span>' + valOrBar(r.impact, 80) + '</div>' +
      '<div><span class="ctx-label">Likelihood</span>' + valOrBar(r.likelihood, 80) + '</div>' +
      '<div><span class="ctx-label">Risk owner</span>' + valOrBar(r.owner, 80) + '</div></div></div>';
  }

  function head(n) {
    return '<div class="step-head"><h2>Step ' + n + ': ' + esc(STEPS[n - 1].title) + '</h2><p>' + esc(STEPS[n - 1].intro) + '</p></div>';
  }
  function infoCallout() {
    return '<div class="callout">' + icon('info') + '<span>Risks identified in Step 2 are listed below. Add or edit the details for each risk.</span></div>';
  }

  /* ---------- Steps ---------- */
  function step1() {
    return head(1) + '<section class="card form-card"><div class="form-grid">' +
      '<div class="span-2">' + textarea('i-desc', 'data-bind="info.description"', 'Description', true, 'Describe the project, area, programme or initiative', 'description') + '</div>' +
      input('i-loc', 'data-bind="info.location"', 'Location', true, 'Enter location') +
      select('i-period', 'data-bind="info.period"', 'Review period', true, 'Select period') +
      '<div class="span-2">' + textarea('i-vision', 'data-bind="info.vision"', 'Vision / Mission / Strategic priorities / Goal', true, 'Enter the goal of the project, area, programme or initiative', 'vision') + '</div>' +
      select('i-inst', 'data-bind="info.institution"', 'Institution', true, 'Select institution') +
      input('i-dept', 'data-bind="info.department"', 'Division / Department / Unit', true, 'Enter division, department or unit') +
      input('i-by', 'data-bind="info.completedBy"', 'Person(s) completing this review', true, 'Enter name(s)') +
      input('i-date', 'data-bind="info.dateCompleted"', 'Date completed', true, '', 'date') +
      '<div class="span-2">' + input('i-inv', 'data-bind="info.involvedText"', 'Person(s) involved in the review', false, 'Enter names, separated by commas') + '</div>' +
      '</div></section>';
  }

  function step2() {
    var objs = review.objectives.map(function (o, k) {
      return '<div class="obj-row"><span class="obj-num">' + (k + 1) + ')</span>' +
        '<label class="sr-only" for="o-' + o.id + '">Objective ' + (k + 1) + '</label><input class="input grow" id="o-' + o.id + '" data-obj="' + o.id + '" data-assist="objective" placeholder="Enter objective">' +
        '<button class="btn btn-ghost btn-icon btn-sm" data-remove-obj="' + o.id + '" aria-label="Remove objective"' + (review.objectives.length === 1 ? ' disabled' : '') + '>' + icon('trash', 'icon-sm') + '</button></div>';
    }).join('');
    var risks = review.risks.map(function (r) {
      return '<article class="risk-card"><header class="risk-card-head"><h3>Risk ' + riskNo(r) + '</h3>' +
        '<button class="btn btn-ghost btn-sm btn-danger" data-remove-risk="' + r.id + '"' + (review.risks.length === 1 ? ' disabled' : '') + '>' + icon('trash', 'icon-sm') + 'Remove</button></header>' +
        '<div class="risk-card-body">' +
        textarea('r-' + r.id + '-statement', rb(r, 'statement'), 'Risk statement', true, '[EVENT] due to [CAUSES] resulting in [CONSEQUENCES]', 'riskStatement') +
        textarea('r-' + r.id + '-consequence', rb(r, 'consequence'), 'Potential consequences if the risk occurs', true, 'Describe what would happen if the risk occurs', 'consequence') +
        '<div class="form-grid cols-3">' + select('r-' + r.id + '-domain', rb(r, 'domain'), 'Risk domain', true, 'Select domain') +
        select('r-' + r.id + '-impact', rb(r, 'impact'), 'Impact', true, 'Select impact') +
        select('r-' + r.id + '-likelihood', rb(r, 'likelihood'), 'Likelihood', true, 'Select likelihood') + '</div>' +
        input('r-' + r.id + '-owner', rb(r, 'owner'), 'Risk owner(s)', true, 'Enter name and designation') +
        '</div></article>';
    }).join('');
    return head(2) +
      '<section class="card form-card"><h3 class="section-title">Objectives</h3><div class="obj-list">' + objs + '</div>' +
      (review.objectives.length < 10 ? '<button class="btn btn-sm add-obj" id="add-obj">' + icon('plus', 'icon-sm') + 'Add objective</button>' : '') + '</section>' +
      '<h3 class="section-title section-out">Identified risks</h3>' + risks +
      '<button class="btn add-risk" id="add-risk">' + icon('plus') + 'Add risk</button>';
  }

  function step3() {
    return head(3) + infoCallout() + review.risks.map(function (r) {
      return '<article class="risk-card">' + riskContext(r) + '<div class="risk-card-body"><div class="form-grid">' +
        textarea('r-' + r.id + '-cc', rb(r, 'currentControls'), 'Current controls', true, 'Enter controls already in place (one per line)', 'currentControls', 'List each control on a new line.') +
        '<div class="stack">' + select('r-' + r.id + '-ce', rb(r, 'currentEff'), 'Effectiveness rating', true, 'Select rating') +
        '<div class="calc-box">Rating will be calculated based on impact, likelihood and effectiveness</div></div>' +
        '</div></div></article>';
    }).join('');
  }

  function step4() {
    return head(4) + infoCallout() + review.risks.map(function (r) {
      return '<article class="risk-card">' + riskContext(r) + '<div class="risk-card-body"><div class="form-grid">' +
        textarea('r-' + r.id + '-ac', rb(r, 'addControls'), 'Additional controls', false, 'Enter new or changed controls (one per line)', 'additionalControls', 'Optional. List each control on a new line.') +
        '<div class="stack">' + select('r-' + r.id + '-ach', rb(r, 'addChange'), 'Effectiveness of additional controls', false, 'Select rating') +
        '<div class="calc-box">Rating after control changes will be calculated here</div></div>' +
        input('r-' + r.id + '-td', rb(r, 'targetDate'), 'Target completion date', false, '', 'date') +
        input('r-' + r.id + '-ab', rb(r, 'actionBy'), 'Action by', false, 'Enter person implementing the controls') +
        '</div></div></article>';
    }).join('');
  }

  function step5() {
    return head(5) + infoCallout() + review.risks.map(function (r) {
      return '<article class="risk-card">' + riskContext(r) + '<div class="risk-card-body">' +
        textarea('r-' + r.id + '-kri', rb(r, 'kri'), 'Key risk indicators (threshold) / key outcome measures (target)', true, 'Enter indicators (one per line)', 'kri') +
        '<div class="form-grid">' + select('r-' + r.id + '-fq', rb(r, 'frequency'), 'Frequency of tracking', true, 'Select frequency') +
        input('r-' + r.id + '-mb', rb(r, 'monitoredBy'), 'Monitored by', true, 'Enter person monitoring the indicators') + '</div>' +
        '</div></article>';
    }).join('');
  }

  function krmDoc() {
    var objCells = '';
    for (var n = 0; n < 10; n++) {
      var o = review.objectives[n];
      objCells += '<div class="kd-obj">' + (n + 1) + ') ' + (o && o.text.trim() ? esc(o.text) : '') + '</div>';
    }
    function cell(v, w) { return v && v.trim() ? esc(v).replace(/\n/g, '<br>') : '<span class="ph ph-sm ph-w' + w + '"></span>'; }
    var rows = review.risks.map(function (r) {
      return '<tr><td>' + cell(r.statement, 90) + '</td><td>' + cell(r.currentControls, 80) + '</td><td>' + cell(r.addControls, 80) + '</td><td>' + cell(r.targetDate, 70) +
        '</td><td>' + cell(r.kri, 90) + '</td><td>' + cell(r.frequency, 70) + '</td><td>' + cell(r.monitoredBy, 80) + '</td><td></td></tr>';
    }).join('');
    function line(lbl) { return '<div class="kd-field"><span class="kd-line"></span><span class="kd-label">' + lbl + '</span></div>'; }
    return '<div class="krm-doc"><div class="kd-top"><div class="kd-fields">' + line('Institution / Department') + line('Signature / Name / Designation') + line('Date of endorsement') + line('Reporting period (FYXXQX)') + '</div>' +
      '<h2 class="kd-title">Key Risk Mitigation (KRM) Plan</h2><div class="kd-fields">' + line('Name and designation of staff submitting plan') + line('Contact / Phone / Email') + line('Date') + '</div></div>' +
      '<div class="kd-objectives"><span class="kd-label">Objectives</span><div class="kd-obj-grid">' + objCells + '</div></div>' +
      '<div class="table-wrap"><table class="kd-table"><thead><tr><th>Risks</th><th>Current controls</th><th>Additional controls</th><th>Target date of additional control completion</th><th>Key risk indicators (threshold) / Key outcome measures (target)</th><th>Frequency of tracking</th><th>Monitored by</th><th>Remarks</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }

  function step6() {
    return head(6) + '<section class="card form-card no-print"><h3 class="section-title">Plan details</h3><div class="form-grid">' +
      input('k-name', 'data-bind="krm.name"', 'Name of staff submitting plan', true, 'Enter name') +
      input('k-desig', 'data-bind="krm.designation"', 'Designation', true, 'Enter designation') +
      input('k-contact', 'data-bind="krm.contact"', 'Contact / phone / email', true, 'Enter contact details') +
      input('k-period', 'data-bind="krm.period"', 'Reporting period', true, 'FYXXQX') +
      input('k-hod', 'data-bind="krm.hod"', 'Endorsed by (Head of Department)', false, 'Enter name') +
      input('k-edate', 'data-bind="krm.endorsementDate"', 'Date of endorsement', false, '', 'date') +
      '</div></section>' +
      '<section class="card krm-card"><div class="krm-actions no-print"><h3>Generated KRM Plan</h3><div class="row gap-8">' +
      '<button class="btn" id="btn-print">' + icon('printer') + 'Print KRM plan</button>' +
      '<button class="btn btn-primary" id="btn-submit">' + icon('send') + 'Submit to risk register</button></div></div>' +
      '<div class="krm-scroll">' + krmDoc() + '</div></section>';
  }

  /* ---------- Render ---------- */
  function renderMeta() {
    var i = review.info;
    var place = [i.department, i.institution].filter(function (x) { return x && x.trim(); }).join(', ');
    u.qs('#rv-meta').innerHTML = esc(review.id) + '<span class="sep">|</span>' + (place ? esc(place) : '<span class="ph ph-inline" style="width:180px"></span>');
  }

  function renderStepper() {
    u.qs('#stepper').innerHTML = '<ol>' + STEPS.map(function (s, k) {
      var n = k + 1;
      return '<li class="step' + (n === step ? ' is-current' : '') + '"><button data-goto="' + n + '"' + (n === step ? ' aria-current="step"' : '') + '><span class="step-num">' + n + '</span><span class="step-label">' + esc(s.label) + '</span></button></li>';
    }).join('') + '</ol>';
  }

  function renderFooter() {
    u.qs('#review-footer').innerHTML = (step > 1 ? '<button class="btn" id="btn-back">' + icon('arrow-left') + 'Back</button>' : '<span></span>') +
      (step < 6 ? '<button class="btn btn-primary" id="btn-next">Next: ' + esc(STEPS[step].label) + icon('arrow-right') + '</button>' : '<span></span>');
    var b = u.qs('#btn-back'), n = u.qs('#btn-next');
    if (b) b.addEventListener('click', function () { go(step - 1); });
    if (n) n.addEventListener('click', function () { go(step + 1); });
  }

  function fill() {
    u.qsa('[data-bind]', stepEl).forEach(function (el) { var p = el.getAttribute('data-bind').split('.'); el.value = (review[p[0]] || {})[p[1]] || ''; });
    u.qsa('[data-risk]', stepEl).forEach(function (el) { var r = getRisk(el.getAttribute('data-risk')); if (r) el.value = r[el.getAttribute('data-field')] || ''; });
    u.qsa('[data-obj]', stepEl).forEach(function (el) {
      var o = review.objectives.filter(function (x) { return x.id === el.getAttribute('data-obj'); })[0];
      if (o) el.value = o.text;
    });
  }

  function renderStep() {
    stepEl.innerHTML = [step1, step2, step3, step4, step5, step6][step - 1]();
    fill();
    u.qs('#review-layout').classList.toggle('is-wide', step === 6);
    ERMIS.Assist.reset();
    bindStep();
  }

  function render() { renderMeta(); renderStepper(); renderStep(); renderFooter(); }

  function go(n) {
    if (n < 1 || n > 6) return;
    save();
    step = n;
    review.step = n;
    history.replaceState(null, '', 'review.html?id=' + encodeURIComponent(review.id) + '&step=' + n);
    render();
    window.scrollTo(0, 0);
  }

  /* ---------- Data ---------- */
  function save() { Store.saveReview(review); }
  var saveSoon = u.debounce(save, 400);
  window.addEventListener('pagehide', save);

  function onInput(e) {
    var el = e.target;
    if (el.hasAttribute('data-bind')) {
      var p = el.getAttribute('data-bind').split('.');
      review[p[0]][p[1]] = el.value;
      if (p[0] === 'info') renderMeta();
    } else if (el.hasAttribute('data-risk')) {
      var r = getRisk(el.getAttribute('data-risk'));
      if (r) r[el.getAttribute('data-field')] = el.value;
    } else if (el.hasAttribute('data-obj')) {
      var o = review.objectives.filter(function (x) { return x.id === el.getAttribute('data-obj'); })[0];
      if (o) o.text = el.value;
    } else return;
    saveSoon();
  }
  stepEl.addEventListener('input', onInput);
  stepEl.addEventListener('change', onInput);

  function bindStep() {
    var addRisk = u.qs('#add-risk'), addObj = u.qs('#add-obj');
    if (addRisk) addRisk.addEventListener('click', function () {
      var r = Store.blankRisk();
      review.risks.push(r);
      save(); renderStep();
      var t = u.qs('#r-' + r.id + '-statement');
      t.scrollIntoView({ block: 'center' });
      t.focus({ preventScroll: true });
    });
    if (addObj) addObj.addEventListener('click', function () {
      var o = { id: u.uid('obj'), text: '' };
      review.objectives.push(o);
      save(); renderStep();
      u.qs('#o-' + o.id).focus();
    });
    u.qsa('[data-remove-risk]', stepEl).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-remove-risk');
        var n = riskNo(getRisk(id));
        ERMIS.Shell.confirm({ title: 'Remove Risk ' + n + '?', message: 'It will also be removed from all later steps.', confirmLabel: 'Remove risk' }).then(function (ok) {
          if (!ok) return;
          review.risks = review.risks.filter(function (x) { return x.id !== id; });
          save(); renderStep();
          ERMIS.Shell.toast('Risk ' + n + ' removed from all steps');
        });
      });
    });
    u.qsa('[data-remove-obj]', stepEl).forEach(function (b) {
      b.addEventListener('click', function () {
        review.objectives = review.objectives.filter(function (x) { return x.id !== b.getAttribute('data-remove-obj'); });
        save(); renderStep();
      });
    });
    var pr = u.qs('#btn-print');
    if (pr) pr.addEventListener('click', function () { save(); window.print(); });
    var sb = u.qs('#btn-submit');
    if (sb) sb.addEventListener('click', function () {
      ERMIS.Shell.confirm({ title: 'Submit this review?', message: 'The risks in this review will be added to the department risk register and shown on the dashboard.', confirmLabel: 'Submit review' }).then(function (ok) {
        if (!ok) return;
        review.status = 'submitted';
        save();
        location.href = 'dashboard.html?submitted=1';
      });
    });
  }

  document.addEventListener('click', function (e) {
    var g = e.target.closest('#stepper [data-goto]');
    if (g) go(+g.getAttribute('data-goto'));
  });
  u.qs('#btn-refs').innerHTML = icon('book') + 'References';
  u.qs('#btn-refs').addEventListener('click', ERMIS.Shell.openReference);

  /* ---------- Find similar risks (placeholder results) ---------- */
  function openSimilar(riskId) {
    var r = getRisk(riskId);
    if (!r) return;
    var n = riskNo(r);
    var controlField = step === 4 ? 'addControls' : 'currentControls';
    var d = ERMIS.Shell.drawer({ title: 'Similar risks in the register', subtitle: 'Comparable risks for Risk ' + n + ', with the controls and indicators used' });
    var results = '';
    for (var k = 0; k < 3; k++) {
      results += '<article class="result"><div><div class="result-chips"><span class="ph"></span><span class="ph"></span></div>' + ERMIS.Shell.phLines([100, 80]) +
        '<div class="result-details">' +
        '<div class="detail-row"><span class="detail-label">Control</span><span class="ph"></span><button class="btn btn-sm" data-add="control">' + icon('plus', 'icon-sm') + 'Add</button></div>' +
        '<div class="detail-row"><span class="detail-label">Indicator</span><span class="ph"></span><button class="btn btn-sm" data-add="kri">' + icon('plus', 'icon-sm') + 'Add</button></div></div></div>' +
        '<div class="result-score"><span class="ph ph-lg"></span><span class="result-score-label">Similarity</span></div></article>';
    }
    d.body.innerHTML = '<div class="similar-form"><div class="input-group grow">' + icon('search') + '<input class="input" placeholder="Describe the risk" value="' + esc(r.statement) + '" aria-label="Search query"></div><button class="btn btn-primary">Search</button></div>' +
      '<p class="secondary" style="margin-bottom:12px">Risks with a similar meaning will be listed here, most similar first.</p><div class="results">' + results + '</div>';
    u.qsa('[data-add]', d.body).forEach(function (b) {
      b.addEventListener('click', function () {
        var kri = b.getAttribute('data-add') === 'kri';
        var field = kri ? 'kri' : controlField;
        var text = kri ? '[Indicator from a similar risk]' : '[Control from a similar risk]';
        r[field] = r[field].trim() ? r[field].replace(/\s+$/, '') + '\n' + text : text;
        save();
        var inp = u.qs('[data-risk="' + r.id + '"][data-field="' + field + '"]', stepEl);
        if (inp) inp.value = r[field];
        b.disabled = true;
        b.innerHTML = icon('check', 'icon-sm') + 'Added';
        ERMIS.Shell.toast('Added to Risk ' + n);
      });
    });
  }

  /* ---------- Side panel ---------- */
  function bullets(n) {
    var s = '<div class="bullet-ph">';
    for (var i = 0; i < n; i++) s += '<span><span class="ph" style="width:' + (70 - i * 8) + '%"></span></span>';
    return s + '</div>';
  }
  var PH = ERMIS.Shell.phLines;
  var GUIDANCE = {
    1: { title: 'About this step', body: PH([100, 100, 70]) + bullets(3) },
    2: { title: 'Writing risk statements', body: PH([100, 90]) + '<div class="formula">Risk statement format:<br>[EVENT] due to [CAUSES] resulting in [CONSEQUENCES]</div>' + bullets(3) },
    3: { title: 'How the rating works', body: PH([100, 100, 70]) + '<div class="formula">Rating formula:<br>(Impact + Likelihood) × (1 − Effectiveness)</div>' + bullets(3) },
    4: { title: 'How the rating works', body: PH([100, 100, 70]) + '<div class="formula">Rating after control changes uses the combined effectiveness of current and additional controls.</div>' + bullets(3) },
    5: { title: 'Good key indicators', body: PH([100, 90, 60]) + bullets(4) },
    6: null
  };

  ERMIS.Assist.init(u.qs('#rail'), {
    guidance: function () { return GUIDANCE[step]; },
    context: function (el) {
      var r = getRisk(el.getAttribute('data-risk-id'));
      if (r) return { riskId: r.id, label: 'Risk ' + riskNo(r) };
      var objId = el.getAttribute('data-obj');
      if (objId) return { label: 'Objective ' + (review.objectives.findIndex(function (o) { return o.id === objId; }) + 1) };
      return {};
    },
    onFindSimilar: openSimilar
  });

  render();
})();
