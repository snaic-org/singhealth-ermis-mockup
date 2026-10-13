(function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon, REF = ERMIS.REF, Rating = ERMIS.Rating, Store = ERMIS.Store;
  var isNew = u.param('new') === '1';
  var activeNav = isNew ? 'review' : '';
  var user = ERMIS.Shell.mount({ active: activeNav, crumbs: [{ label: 'Dashboard', href: 'dashboard.html' }, { label: 'ERM review' }] });
  if (!user) return;

  var review = null;
  if (isNew) {
    review = Store.createReview(user);
    history.replaceState(null, '', 'review.html?id=' + encodeURIComponent(review.id));
    ERMIS.Shell.refreshSidebar(activeNav);
  } else {
    review = Store.getReview(u.param('id'));
  }

  var stepEl = u.qs('#step');
  if (!review) {
    u.qs('#rv-title').textContent = 'Review not found';
    u.qs('#rv-meta').textContent = 'This review may have been deleted.';
    u.qs('#stepper').remove();
    u.qs('#review-footer').remove();
    u.qs('#assist-rail').remove();
    u.qs('.review-actions').remove();
    stepEl.innerHTML = '<div class="card"><div class="empty">' + icon('file') + '<h3>We could not find that review</h3><p>Return to the dashboard to open one of your reviews or start a new one.</p><p style="margin-top:16px"><a class="btn btn-primary" href="dashboard.html">Go to dashboard</a></p></div></div>';
    return;
  }

  var readOnly = review.status === 'submitted';
  var STEP_META = [
    { short: 'Description & goal', title: 'Description and goal', intro: 'Describe the project, area, programme or initiative under review, and the goal it serves.' },
    { short: 'Objectives & risks', title: 'Objectives and risk identification', intro: 'Set the objectives of this review, then identify the risk events that could prevent you from achieving them.' },
    { short: 'Current controls', title: 'Evaluate current controls', intro: 'For each risk, describe the controls already in place and rate how effective they are. The risk rating is calculated as you go.' },
    { short: 'Additional controls', title: 'Addition / change to controls', intro: 'Where current controls cannot adequately control a risk, propose additional controls and rate their effect. The rating after control changes is calculated as you go.' },
    { short: 'KRM Plan', title: 'Key Risk Mitigation (KRM) Plan', intro: 'Identify the key risk indicators or outcome measures that show whether each risk is well managed, how often they are tracked and who monitors them.' },
    { short: 'Generate & submit', title: 'Generate KRM Plan', intro: 'Complete the plan details and check the generated KRM Plan. Print it for endorsement by your Head of Department, then submit the review to the risk register.' }
  ];
  var step = readOnly ? 6 : Math.min(6, Math.max(1, parseInt(u.param('step'), 10) || review.step || 1));
  var validated = {};
  var nextArmed = false;

  /* ---------- Header ---------- */
  u.qs('#btn-refs').innerHTML = icon('book') + '<span>References</span>';
  u.qs('#btn-exit').innerHTML = readOnly ? icon('arrow-left') + 'Back to dashboard' : icon('save') + 'Save and exit';
  u.qs('#btn-refs').addEventListener('click', function () {
    ERMIS.Shell.openReference({ 1: 'glossary', 2: 'impact', 3: 'effectiveness', 4: 'effectiveness', 5: 'glossary', 6: 'rating' }[step]);
  });
  u.qs('#btn-exit').addEventListener('click', function (e) {
    if (readOnly) return;
    e.preventDefault();
    flush();
    location.href = 'dashboard.html';
  });

  function renderHeader() {
    var title = review.info.title.trim() || 'New ERM review';
    u.qs('#rv-title').textContent = title;
    document.title = title + ' · ERMIS';
    var crumb = u.qs('#topbar .crumbs .current');
    if (crumb) crumb.textContent = title;
    var inst = review.info.institution ? REF.institutionName(review.info.institution) : '';
    u.qs('#rv-meta').innerHTML = (readOnly ? '<span class="chip chip-adequate">Submitted</span>' : '<span class="chip chip-primary">Draft</span>') +
      '<span>' + esc(review.id) + '</span>' + (inst ? '<span>' + esc(review.info.department ? review.info.department + ', ' + inst : inst) + '</span>' : '');
  }

  /* ---------- Saving ---------- */
  var saveTimer = null, pending = false, lastSaved = review.updatedAt;
  var saveEl = u.qs('#save-state');
  function setSaveState(s) {
    if (readOnly) { saveEl.innerHTML = icon('lock', 'icon-sm') + 'Read only'; return; }
    saveEl.innerHTML = s === 'saving' ? '<span class="save-dot"></span>Saving' : icon('check', 'icon-sm') + 'Saved ' + u.relTime(lastSaved);
  }
  function flush() {
    if (!pending) return;
    clearTimeout(saveTimer);
    pending = false;
    Store.saveReview(review);
    lastSaved = review.updatedAt;
    setSaveState('saved');
  }
  function touch() {
    if (readOnly) return;
    pending = true;
    setSaveState('saving');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      flush();
      ERMIS.Shell.refreshSidebar(activeNav);
    }, 450);
  }
  setInterval(function () { if (!pending) setSaveState('saved'); }, 30000);
  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);
  setSaveState('saved');

  /* ---------- Helpers ---------- */
  function getRisk(id) { for (var i = 0; i < review.risks.length; i++) if (review.risks[i].id === id) return review.risks[i]; return null; }
  function riskIndex(id) { for (var i = 0; i < review.risks.length; i++) if (review.risks[i].id === id) return i + 1; return 0; }
  function getObj(id) { for (var i = 0; i < review.objectives.length; i++) if (review.objectives[i].id === id) return review.objectives[i]; return null; }

  function options(list, value, placeholder) {
    return (placeholder ? '<option value=""' + (value ? '' : ' selected') + '>' + esc(placeholder) + '</option>' : '') +
      list.map(function (o) {
        var v = typeof o === 'string' ? o : o.value, l = typeof o === 'string' ? o : o.label;
        return '<option value="' + esc(v) + '"' + (v === value ? ' selected' : '') + '>' + esc(l) + '</option>';
      }).join('');
  }
  function infoBtn(tab, riskId) {
    return '<button type="button" class="info-btn" data-ref="' + tab + '"' + (riskId ? ' data-risk-id="' + riskId + '"' : '') + ' aria-label="Open ' + tab + ' reference">' + icon('info', 'icon-sm') + '</button>';
  }
  function label(id, text, required, extra) {
    return '<span class="field-label"><label for="' + id + '">' + esc(text) + '</label>' + (required ? '<span class="req" aria-hidden="true">*</span>' : '') + (extra || '') + '</span>';
  }
  function fid(riskId, field) { return 'f-' + riskId + '-' + field; }

  function riskContext(r, opts) {
    opts = opts || {};
    var idx = riskIndex(r.id);
    var R = Rating.forRisk(r);
    return '<div class="risk-context">' +
      '<div class="rc-top"><span class="risk-num">Risk ' + idx + '</span>' + (r.domain ? '<span class="tag">' + esc(r.domain) + '</span>' : '') +
      u.bandChip(R.band) + (opts.current ? '<span data-live="curchip:' + r.id + '">' + (R.current ? u.adequacyChip(R.current.label, R.current.display) : '') + '</span>' : '') +
      (readOnly ? '' : '<button type="button" class="rc-edit" data-goto="2" data-focus="' + fid(r.id, 'statement') + '">' + icon('edit', 'icon-sm') + 'Edit in Step 2</button>') + '</div>' +
      '<p class="rc-statement">' + (r.statement.trim() ? esc(r.statement) : '<span class="muted">No risk statement yet</span>') + '</p>' +
      (opts.details ? '<dl class="rc-meta">' +
        '<div><dt>Potential consequences</dt><dd>' + (esc(r.consequence) || '<span class="muted">Not provided</span>') + '</dd></div>' +
        '<div><dt>Impact</dt><dd>' + (esc(r.impact) || '<span class="muted">Not rated</span>') + '</dd></div>' +
        '<div><dt>Likelihood</dt><dd>' + (esc(r.likelihood) || '<span class="muted">Not rated</span>') + '</dd></div>' +
        '<div><dt>Risk owner</dt><dd>' + (esc(r.owner) || '<span class="muted">Not assigned</span>') + '</dd></div></dl>' : '') +
      '</div>';
  }

  function structureChip(text) {
    if (!text.trim()) return '<span class="struct struct-idle">' + icon('info', 'icon-sm') + 'Write as [EVENT] due to [CAUSES] resulting in [CONSEQUENCES]</span>';
    var dueTo = /\bdue to\b/i.test(text), res = /\bresulting in\b/i.test(text);
    if (dueTo && res) return '<span class="struct struct-ok">' + icon('check-circle', 'icon-sm') + 'Follows the standard risk statement structure</span>';
    var miss = [];
    if (!dueTo) miss.push('"due to [CAUSES]"');
    if (!res) miss.push('"resulting in [CONSEQUENCES]"');
    return '<span class="struct struct-warn">' + icon('alert', 'icon-sm') + 'Add ' + miss.join(' and ') + ' to complete the structure</span>';
  }

  function fmtScore(n) { return (Math.round(n * 1000) / 1000).toString(); }

  function currentPanel(r) {
    var cur = Rating.current(r.impact, r.likelihood, r.currentEff);
    if (!cur) {
      var why = !r.impact || !r.likelihood ? 'Rate impact and likelihood in Step 2, then select the effectiveness of current controls to calculate the rating.' : 'Select the effectiveness of current controls to calculate the rating.';
      return '<div class="rating-panel is-pending"><span class="rp-label">Risk rating with current controls</span><p class="muted">' + why + '</p></div>';
    }
    var im = Rating.find(REF.IMPACT, r.impact), lk = Rating.find(REF.LIKELIHOOD, r.likelihood);
    var adq = REF.ADEQUACY.filter(function (a) { return a.name === cur.label; })[0];
    return '<div class="rating-panel rp-' + Rating.adequacyKey(cur.label) + '"><div class="rp-row"><span class="rp-label">Risk rating with current controls</span>' + u.adequacyChip(cur.label, cur.display) + '</div>' +
      '<p class="rp-formula num">(' + esc(im.name) + ' ' + im.score + ' + ' + esc(lk.name) + ' ' + lk.score + ') × (1 − ' + cur.eff.toFixed(2) + ') = ' + fmtScore(cur.score) + '</p>' +
      '<p class="rp-action">' + esc(adq.action) + '</p></div>';
  }

  function afterPanel(r) {
    var cur = Rating.current(r.impact, r.likelihood, r.currentEff);
    var aft = Rating.after(r.impact, r.likelihood, r.currentEff, r.addChange);
    var left = cur ? '<span class="chip-score">' + u.adequacyChip(cur.label, cur.display) + '</span>' : '<span class="chip chip-neutral">Pending</span>';
    var right = aft ? '<span class="chip-score">' + u.adequacyChip(aft.label, aft.display) + '</span>' : '<span class="chip chip-neutral">' + (cur ? 'Rate additional controls' : 'Pending') + '</span>';
    var formula = '';
    if (aft) {
      var ch = Rating.find(REF.CONTROL_CHANGE, r.addChange);
      var raw = Rating.rawScore(r.impact, r.likelihood);
      var effExpr = ch.value === 0 ? cur.eff.toFixed(2) + ' (no change)' : ch.value > 0 ?
        cur.eff.toFixed(2) + ' + (1 − ' + cur.eff.toFixed(2) + ') × ' + ch.value.toFixed(2) + ' = ' + fmtScore(aft.eff) :
        cur.eff.toFixed(2) + ' × (1 − ' + Math.abs(ch.value).toFixed(2) + ') = ' + fmtScore(aft.eff);
      formula = '<p class="rp-formula num">Effectiveness ' + effExpr + '<br>Rating ' + raw + ' × (1 − ' + fmtScore(aft.eff) + ') = ' + aft.score.toFixed(1) + '</p>';
    }
    return '<div class="rating-compare"><div class="rc-col"><span class="rp-label">With current controls</span>' + left + '</div>' +
      '<span class="rc-arrow">' + icon('arrow-right') + '</span>' +
      '<div class="rc-col"><span class="rp-label">After control changes</span>' + right + '</div></div>' + formula;
  }

  function monitorWarning(r) {
    if (r.monitoredBy.trim() && r.actionBy.trim() && r.monitoredBy.trim().toLowerCase() === r.actionBy.trim().toLowerCase()) {
      return '<div class="callout callout-warning compact">' + icon('alert', 'icon-sm') + '<span>The same person is implementing and monitoring this risk\'s controls. Where possible, assign a different person to monitor them as a check and balance.</span></div>';
    }
    return '';
  }

  function stepHead(n) {
    var m = STEP_META[n - 1];
    var intro = readOnly && n === 6 ? 'The KRM Plan generated from this review, in the endorsement format for printing and sign-off by your Head of Department.' : m.intro;
    return '<div class="step-head"><span class="step-kicker">' + (n <= 5 ? 'Step ' + n + ' of 5' : 'Final step') + '</span><h2>' + esc(m.title) + '</h2><p>' + esc(intro) + '</p></div>';
  }

  /* ---------- Step 1 ---------- */
  function renderStep1() {
    var i = review.info;
    var periods = REF.PERIODS.slice(-4).map(function (p) { return { value: p, label: REF.formatPeriod(p) }; });
    return stepHead(1) + '<section class="card form-card"><div class="form-grid">' +
      '<div class="field span-2">' + label('f-title', 'Review title', true) + '<input class="input" id="f-title" data-bind="info.title" data-required value="' + esc(i.title) + '" placeholder="e.g. Opening of the Geriatric Specialist Outpatient Medical Centre"><span class="field-error">Enter a title for this review.</span></div>' +
      '<div class="field span-2">' + label('f-desc', 'Description', true) + '<textarea class="textarea" id="f-desc" rows="3" data-bind="info.description" data-assist="description" data-required placeholder="Describe the project, area, programme or initiative under review">' + esc(i.description) + '</textarea><span class="field-error">Describe the project, area, programme or initiative.</span></div>' +
      '<div class="field">' + label('f-loc', 'Location', true) + '<input class="input" id="f-loc" data-bind="info.location" data-required value="' + esc(i.location) + '" placeholder="e.g. SGH Block 3, Level 1"><span class="field-error">Enter the location.</span></div>' +
      '<div class="field">' + label('f-period', 'Review period', true) + '<select class="select" id="f-period" data-bind="info.period" data-required>' + options(periods, i.period, 'Select period') + '</select><span class="field-error">Select the review period.</span></div>' +
      '<div class="field span-2">' + label('f-vision', 'Vision / Mission / Strategic Priorities / Goal', true) + '<textarea class="textarea" id="f-vision" rows="3" data-bind="info.vision" data-assist="vision" data-required placeholder="The goal of the project, area, programme or initiative">' + esc(i.vision) + '</textarea><span class="field-error">Enter the vision, mission, strategic priorities or goal.</span></div>' +
      '<div class="field">' + label('f-inst', 'Institution', true) + '<select class="select" id="f-inst" data-bind="info.institution" data-required>' + options(REF.INSTITUTIONS.map(function (x) { return { value: x.code, label: x.name }; }), i.institution, 'Select institution') + '</select><span class="field-error">Select the institution.</span></div>' +
      '<div class="field">' + label('f-dept', 'Division / Department / Unit', true) + '<input class="input" id="f-dept" data-bind="info.department" data-required value="' + esc(i.department) + '" placeholder="e.g. Pharmacy"><span class="field-error">Enter the division, department or unit.</span></div>' +
      '<div class="field">' + label('f-by', 'Person(s) completing this review', true) + '<input class="input" id="f-by" data-bind="info.completedBy" data-required value="' + esc(i.completedBy) + '"><span class="field-error">Enter who is completing this review.</span></div>' +
      '<div class="field">' + label('f-date', 'Date completed', true) + '<input class="input" type="date" id="f-date" data-bind="info.dateCompleted" data-required value="' + esc(i.dateCompleted) + '"><span class="field-error">Enter the date.</span></div>' +
      '<div class="field span-2">' + label('f-involved', 'Person(s) involved in the review') + '<div class="tag-input" id="tag-input">' +
      '<span class="tag-chips" id="tag-chips">' + tagChips() + '</span>' +
      '<input id="f-involved" placeholder="Type a name and press Enter" autocomplete="off"></div><span class="field-hint">Include everyone who took part, for example in the review workshop.</span></div>' +
      '</div></section>';
  }

  function tagChips() {
    return (review.info.involved || []).map(function (n, k) {
      return '<span class="tag-chip">' + esc(n) + (readOnly ? '' : '<button type="button" data-untag="' + k + '" aria-label="Remove ' + esc(n) + '">' + icon('x', 'icon-sm') + '</button>') + '</span>';
    }).join('');
  }
  function renderTags() { var c = u.qs('#tag-chips'); if (c) c.innerHTML = tagChips(); }
  function addTag(v) {
    v = String(v || '').replace(/,$/, '').trim();
    if (!v) return;
    review.info.involved = review.info.involved || [];
    review.info.involved.push(v);
    touch();
    renderTags();
  }

  /* ---------- Step 2 ---------- */
  function objectiveRow(o, k) {
    var persp = REF.OBJECTIVE_PERSPECTIVES.map(function (p) { return { value: p, label: p }; });
    return '<div class="obj-row">' +
      '<span class="obj-num num">' + (k + 1) + ')</span>' +
      '<div class="field grow"><label class="sr-only" for="o-' + o.id + '">Objective ' + (k + 1) + '</label><textarea class="textarea obj-input" rows="1" id="o-' + o.id + '" data-obj="' + o.id + '" data-field="text" data-assist="objective"' + (k === 0 ? ' data-required' : '') + ' placeholder="e.g. To dispense the right medication to the right patient each and every time.">' + esc(o.text) + '</textarea>' + (k === 0 ? '<span class="field-error">Add at least one objective.</span>' : '') + '</div>' +
      '<label class="sr-only" for="op-' + o.id + '">Perspective</label><select class="select obj-persp" id="op-' + o.id + '" data-obj="' + o.id + '" data-field="perspective">' + options(persp, o.perspective, 'Perspective') + '</select>' +
      '<button type="button" class="btn btn-ghost btn-icon btn-sm" data-remove-obj="' + o.id + '" aria-label="Remove objective ' + (k + 1) + '"' + (review.objectives.length === 1 ? ' disabled' : '') + '>' + icon('trash', 'icon-sm') + '</button></div>';
  }

  function riskCard2(r, k) {
    var R = Rating.forRisk(r);
    var domains = REF.DOMAINS.map(function (d) { return d.name; });
    var imps = REF.IMPACT.map(function (x) { return { value: x.name, label: x.level ? x.name + ' (' + x.level + ')' : x.name }; });
    var liks = REF.LIKELIHOOD.map(function (x) { return { value: x.name, label: x.level ? x.name + ' (' + x.level + ')' : x.name }; });
    return '<article class="risk-card" id="risk-' + r.id + '">' +
      '<header class="risk-card-head"><span class="risk-num">Risk ' + (k + 1) + '</span><span data-live="band:' + r.id + '">' + (R.band ? u.bandChip(R.band) : '') + '</span>' +
      '<span class="grow"></span><button type="button" class="btn btn-ghost btn-sm btn-danger" data-remove-risk="' + r.id + '">' + icon('trash', 'icon-sm') + 'Remove</button></header>' +
      '<div class="risk-card-body">' +
      '<div class="field">' + label(fid(r.id, 'statement'), 'Risk statement', true) +
      '<textarea class="textarea" rows="2" id="' + fid(r.id, 'statement') + '" data-risk="' + r.id + '" data-risk-id="' + r.id + '" data-field="statement" data-assist="riskStatement" data-required placeholder="[EVENT] due to [CAUSES] resulting in [CONSEQUENCES]">' + esc(r.statement) + '</textarea>' +
      '<span class="field-error">Describe the risk event and its causes.</span><span data-live="struct:' + r.id + '">' + structureChip(r.statement) + '</span></div>' +
      '<div class="field">' + label(fid(r.id, 'consequence'), 'Potential consequence(s) if risk occurs', true) +
      '<textarea class="textarea" rows="2" id="' + fid(r.id, 'consequence') + '" data-risk="' + r.id + '" data-risk-id="' + r.id + '" data-field="consequence" data-assist="consequence" data-required placeholder="Describe what would happen if the identified risk occurs">' + esc(r.consequence) + '</textarea><span class="field-error">Describe the potential consequences.</span></div>' +
      '<div class="form-grid cols-3">' +
      '<div class="field">' + label(fid(r.id, 'domain'), 'Risk domain', true, infoBtn('domains', r.id)) + '<select class="select" id="' + fid(r.id, 'domain') + '" data-risk="' + r.id + '" data-field="domain" data-required>' + options(domains, r.domain, 'Select domain') + '</select><span class="field-error">Select a domain.</span></div>' +
      '<div class="field">' + label(fid(r.id, 'impact'), 'Impact', true, infoBtn('impact', r.id)) + '<select class="select" id="' + fid(r.id, 'impact') + '" data-risk="' + r.id + '" data-field="impact" data-required>' + options(imps, r.impact, 'Select impact') + '</select><span class="field-error">Select the impact.</span></div>' +
      '<div class="field">' + label(fid(r.id, 'likelihood'), 'Likelihood', true, infoBtn('likelihood', r.id)) + '<select class="select" id="' + fid(r.id, 'likelihood') + '" data-risk="' + r.id + '" data-field="likelihood" data-required>' + options(liks, r.likelihood, 'Select likelihood') + '</select><span class="field-error">Select the likelihood.</span></div>' +
      '</div>' +
      '<div class="field">' + label(fid(r.id, 'owner'), 'Risk owner(s)', true) + '<input class="input" id="' + fid(r.id, 'owner') + '" data-risk="' + r.id + '" data-field="owner" data-required value="' + esc(r.owner) + '" placeholder="Name and designation of the person responsible for managing this risk"><span class="field-error">Identify who is responsible for managing this risk.</span></div>' +
      '</div></article>';
  }

  function renderStep2() {
    return stepHead(2) +
      '<section class="card form-card"><div class="section-head"><div><h3>Objectives</h3><p>What this project, area or programme must achieve. Remember S.M.A.R.T.: specific, measurable, attainable, relevant and timely.</p></div><span class="muted num">' + review.objectives.length + ' of 10</span></div>' +
      '<div class="obj-list">' + review.objectives.map(objectiveRow).join('') + '</div>' +
      (review.objectives.length < 10 ? '<button type="button" class="btn btn-sm add-btn" id="add-obj">' + icon('plus', 'icon-sm') + 'Add objective</button>' : '') + '</section>' +
      '<div class="section-head section-head-out"><div><h3>Identified risks</h3><p>Rate impact and likelihood without considering any controls. Risks you add here flow automatically into every later step.</p></div><span class="muted num">' + u.plural(review.risks.length, 'risk') + '</span></div>' +
      '<div class="risk-list-edit">' + review.risks.map(riskCard2).join('') + '</div>' +
      (review.risks.length < 100 ? '<button type="button" class="btn add-risk" id="add-risk">' + icon('plus') + 'Add risk</button>' : '');
  }

  /* ---------- Step 3 ---------- */
  function renderStep3() {
    var effs = REF.EFFECTIVENESS.map(function (e) { return { value: e.name, label: e.name + ' (' + e.desc.toLowerCase() + ')' }; });
    return stepHead(3) + (review.risks.length ? '<div class="callout callout-info compact">' + icon('info', 'icon-sm') + '<span>Risks identified in Step 2 appear here automatically. If you add, remove or edit a risk in Step 2, this step updates with it.</span></div>' : '') +
      review.risks.map(function (r) {
        return '<article class="risk-card" id="risk-' + r.id + '">' + riskContext(r, { details: true }) + '<div class="risk-card-body">' +
          '<div class="form-grid cols-split">' +
          '<div class="field">' + label(fid(r.id, 'currentControls'), 'Current controls', true) +
          '<textarea class="textarea" rows="4" id="' + fid(r.id, 'currentControls') + '" data-risk="' + r.id + '" data-risk-id="' + r.id + '" data-field="currentControls" data-assist="currentControls" data-required placeholder="Controls already in place, one per line">' + esc(r.currentControls) + '</textarea>' +
          '<span class="field-hint">List each control on its own line.</span><span class="field-error">Describe the current controls.</span></div>' +
          '<div class="stack gap-12"><div class="field">' + label(fid(r.id, 'currentEff'), 'Current controls effectiveness', true, infoBtn('effectiveness', r.id)) +
          '<select class="select" id="' + fid(r.id, 'currentEff') + '" data-risk="' + r.id + '" data-field="currentEff" data-required>' + options(effs, r.currentEff, 'Select effectiveness') + '</select><span class="field-error">Rate the effectiveness of current controls.</span></div>' +
          '<div data-live="cur:' + r.id + '">' + currentPanel(r) + '</div></div>' +
          '</div></div></article>';
      }).join('') + emptyRisks();
  }

  /* ---------- Step 4 ---------- */
  function renderStep4() {
    var improve = REF.CONTROL_CHANGE.filter(function (c) { return c.value >= 0; }).map(function (c) { return { value: c.name, label: c.name }; });
    var decrease = REF.CONTROL_CHANGE.filter(function (c) { return c.value < 0; }).map(function (c) { return { value: c.name, label: c.name }; });
    return stepHead(4) +
      (review.risks.length ? '<div class="callout compact">' + icon('info', 'icon-sm') + '<span>Additional controls should be considered where current controls cannot adequately control the risk, or where new measures can be added. They can also be opportunities to improve productivity, operational efficiency and quality.</span></div>' : '') +
      review.risks.map(function (r) {
        var cur = Rating.current(r.impact, r.likelihood, r.currentEff);
        var flag = cur && Rating.needsAdditionalControls(cur.label) ?
          '<div class="flag flag-' + Rating.adequacyKey(cur.label) + '">' + icon('flag', 'icon-sm') + '<span>' + esc(cur.label) + ': additional controls recommended</span></div>' : '';
        return '<article class="risk-card" id="risk-' + r.id + '">' + riskContext(r, { current: true }) + '<div class="risk-card-body">' + flag +
          '<div class="form-grid cols-split">' +
          '<div class="stack gap-12"><div class="field">' + label(fid(r.id, 'addControls'), 'Additional controls') +
          '<textarea class="textarea" rows="4" id="' + fid(r.id, 'addControls') + '" data-risk="' + r.id + '" data-risk-id="' + r.id + '" data-field="addControls" data-assist="additionalControls" placeholder="New or improved controls, one per line. Leave blank if none.">' + esc(r.addControls) + '</textarea>' +
          '<span class="field-hint">Optional. List each control on its own line.</span></div>' +
          '<div class="form-grid">' +
          '<div class="field">' + label(fid(r.id, 'targetDate'), 'Target completion date', !!r.addControls.trim()) + '<input class="input" type="date" id="' + fid(r.id, 'targetDate') + '" data-risk="' + r.id + '" data-field="targetDate"' + (r.addControls.trim() ? ' data-required' : '') + ' value="' + esc(r.targetDate) + '"><span class="field-error">Enter the target date.</span></div>' +
          '<div class="field">' + label(fid(r.id, 'actionBy'), 'Action by', !!r.addControls.trim()) + '<input class="input" id="' + fid(r.id, 'actionBy') + '" data-risk="' + r.id + '" data-field="actionBy"' + (r.addControls.trim() ? ' data-required' : '') + ' value="' + esc(r.actionBy) + '" placeholder="Person implementing the controls"><span class="field-error">Enter who will implement the controls.</span></div>' +
          '</div></div>' +
          '<div class="stack gap-12"><div class="field">' + label(fid(r.id, 'addChange'), 'Additional controls effectiveness', !!r.addControls.trim(), infoBtn('effectiveness', r.id)) +
          '<select class="select" id="' + fid(r.id, 'addChange') + '" data-risk="' + r.id + '" data-field="addChange"' + (r.addControls.trim() ? ' data-required' : '') + '><option value="">Select effect on controls</option>' +
          '<optgroup label="Improvement">' + options(improve, r.addChange) + '</optgroup><optgroup label="Decrease">' + options(decrease, r.addChange) + '</optgroup></select>' +
          '<span class="field-error">Rate the effect of the additional controls.</span></div>' +
          '<div class="rating-panel" data-live="after:' + r.id + '">' + afterPanel(r) + '</div></div>' +
          '</div></div></article>';
      }).join('') + emptyRisks();
  }

  /* ---------- Step 5 ---------- */
  function renderStep5() {
    return stepHead(5) +
      (review.risks.length ? '<div class="callout callout-info compact">' + icon('target', 'icon-sm') + '<span>Complete the KRM Plan even where there are no additional controls. Key indicators show how well each risk is managed and raise an early alert before it turns into a major risk event.</span></div>' : '') +
      review.risks.map(function (r) {
        var cc = u.lines(r.currentControls), ac = u.lines(r.addControls);
        return '<article class="risk-card" id="risk-' + r.id + '">' + riskContext(r) +
          '<div class="krm-context"><div><h4>Current controls</h4>' + (cc.length ? '<ul>' + cc.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '<p class="muted">None recorded</p>') + '</div>' +
          '<div><h4>Additional controls' + (r.targetDate && ac.length ? ' <span class="muted">by ' + u.fmtDate(r.targetDate) + '</span>' : '') + '</h4>' + (ac.length ? '<ul>' + ac.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '<p class="muted">None proposed</p>') + '</div></div>' +
          '<div class="risk-card-body"><div class="field">' + label(fid(r.id, 'kri'), 'Key risk indicators (threshold) / key outcome measures (target)', true) +
          '<textarea class="textarea" rows="3" id="' + fid(r.id, 'kri') + '" data-risk="' + r.id + '" data-risk-id="' + r.id + '" data-field="kri" data-assist="kri" data-required placeholder="e.g. Dispensing errors per 10,000 items (threshold: > 0.5)">' + esc(r.kri) + '</textarea>' +
          '<span class="field-hint">One indicator per line. State the threshold for a KRI or the target for an outcome measure.</span><span class="field-error">Add at least one indicator.</span></div>' +
          '<div class="form-grid">' +
          '<div class="field">' + label(fid(r.id, 'frequency'), 'Frequency of tracking', true) + '<select class="select" id="' + fid(r.id, 'frequency') + '" data-risk="' + r.id + '" data-field="frequency" data-required>' + options(REF.FREQUENCIES, r.frequency, 'Select frequency') + '</select><span class="field-error">Select how often it is tracked.</span></div>' +
          '<div class="field">' + label(fid(r.id, 'monitoredBy'), 'Monitored by', true) + '<input class="input" id="' + fid(r.id, 'monitoredBy') + '" data-risk="' + r.id + '" data-field="monitoredBy" data-required value="' + esc(r.monitoredBy) + '" placeholder="Person in charge of tracking"><span class="field-error">Enter who will monitor the indicators.</span></div>' +
          '</div><div data-live="mon:' + r.id + '">' + monitorWarning(r) + '</div></div></article>';
      }).join('') + emptyRisks();
  }

  function emptyRisks() {
    if (review.risks.length) return '';
    return '<div class="card"><div class="empty">' + icon('list-checks') + '<h3>No risks identified yet</h3><p>Identify risks in Step 2. They will appear here automatically.</p><p style="margin-top:14px"><button class="btn" data-goto="2">Go to Step 2</button></p></div></div>';
  }

  /* ---------- Step 6 ---------- */
  function fyShort(p) { return p ? p.replace(/^FY\d{2}(\d{2})Q(\d)$/, 'FY$1Q$2') : ''; }

  function prefillKrm() {
    var k = review.krm;
    if (k.prefilled) return;
    k.submitterName = k.submitterName || user.name;
    k.submitterDesignation = k.submitterDesignation || user.designation;
    k.contact = k.contact || user.phone + ' / ' + user.email;
    k.date = k.date || u.todayISO();
    k.period = k.period || fyShort(review.info.period);
    k.prefilled = true;
    touch();
  }

  function krmDoc() {
    var i = review.info, k = review.krm;
    var objs = review.objectives.filter(function (o) { return o.text.trim(); });
    var objCells = '';
    for (var n = 0; n < 10; n++) objCells += '<div class="kd-obj"><span class="num">' + (n + 1) + ')</span> ' + (objs[n] ? esc(objs[n].text) : '') + '</div>';
    function line(v) { return v ? esc(v) : '&nbsp;'; }
    return '<div class="krm-doc" id="krm-doc">' +
      '<div class="kd-class">Restricted, Sensitive (Normal)</div>' +
      '<div class="kd-top"><div class="kd-fields">' +
      '<div class="kd-field"><span class="kd-value">' + line((i.institution ? REF.institutionName(i.institution) : '') + (i.department ? ' / ' + i.department : '')) + '</span><span class="kd-label">Institution / Department</span></div>' +
      '<div class="kd-field"><span class="kd-value">' + line([k.endorserName, k.endorserDesignation].filter(Boolean).join(', ')) + '</span><span class="kd-label">Signature / Name / Designation</span></div>' +
      '<div class="kd-row"><div class="kd-field"><span class="kd-value">' + line(k.endorsementDate ? u.fmtDate(k.endorsementDate) : '') + '</span><span class="kd-label">Date of endorsement</span></div>' +
      '<div class="kd-field"><span class="kd-value">' + line(k.period) + '</span><span class="kd-label">Reporting period (in FYXXQX format)</span></div></div>' +
      '</div><h2 class="kd-title">Key Risk Mitigation (KRM) Plan</h2><div class="kd-fields">' +
      '<div class="kd-field"><span class="kd-value">' + line([k.submitterName, k.submitterDesignation].filter(Boolean).join(', ')) + '</span><span class="kd-label">Name and designation of staff submitting plan</span></div>' +
      '<div class="kd-field"><span class="kd-value">' + line(k.contact) + '</span><span class="kd-label">Contact / Phone / Email</span></div>' +
      '<div class="kd-field"><span class="kd-value">' + line(k.date ? u.fmtDate(k.date) : '') + '</span><span class="kd-label">Date</span></div>' +
      '</div></div>' +
      '<div class="kd-objectives"><div class="kd-objectives-label">Objectives</div><div class="kd-obj-grid">' + objCells + '</div></div>' +
      '<table class="kd-table"><thead><tr><th>Risks</th><th>Current controls</th><th>Additional controls (describe)</th><th>Target date of additional control completion</th><th>Key Risk Indicators (KRI) tracked (indicate threshold) / Key Outcome Measures tracked (indicate target)</th><th>Frequency of tracking</th><th>Monitored by</th><th>Remarks</th></tr></thead><tbody>' +
      (review.risks.length ? review.risks.map(function (r) {
        function ul(text) { var l = u.lines(text); return l.length > 1 ? '<ul>' + l.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : esc(l[0] || ''); }
        return '<tr><td>' + esc(r.statement) + '</td><td>' + ul(r.currentControls) + '</td><td>' + ul(r.addControls) + '</td><td>' + (r.addControls.trim() && r.targetDate ? u.fmtDate(r.targetDate) : '') + '</td>' +
          '<td>' + ul(r.kri) + '</td><td>' + esc(r.frequency) + '</td><td>' + esc(r.monitoredBy) + '</td>' +
          '<td>' + (readOnly ? esc(r.remarks || '') : '<textarea class="kd-remarks no-print-border" rows="2" data-risk="' + r.id + '" data-field="remarks" aria-label="Remarks for risk ' + riskIndex(r.id) + '">' + esc(r.remarks || '') + '</textarea><span class="print-only">' + esc(r.remarks || '') + '</span>') + '</td></tr>';
      }).join('') : '<tr><td colspan="8" class="muted">No risks identified.</td></tr>') +
      '</tbody></table></div>';
  }

  function outstandingList(p) {
    var groups = p.steps.slice(0, 6).map(function (s, idx) { return { n: idx + 1, s: s }; }).filter(function (g) { return g.s.issues.length; });
    if (!groups.length) return '';
    return '<div class="callout callout-warning outstanding">' + icon('alert') + '<div><strong>Complete these items before submitting</strong><ul>' +
      groups.map(function (g) {
        return g.s.issues.slice(0, 6).map(function (iss) {
          return '<li><button class="link-btn" data-goto="' + g.n + '"' + (iss.riskId ? ' data-risk-target="' + iss.riskId + '"' : '') + '>' + (g.n <= 5 ? 'Step ' + g.n : 'Plan details') + '</button><span>' + esc(iss.msg) + '</span></li>';
        }).join('') + (g.s.issues.length > 6 ? '<li><span class="muted">and ' + (g.s.issues.length - 6) + ' more in ' + (g.n <= 5 ? 'Step ' + g.n : 'plan details') + '</span></li>' : '');
      }).join('') + '</ul></div></div>';
  }

  function renderStep6() {
    if (!readOnly) prefillKrm();
    var k = review.krm, p = Store.progress(review);
    var submittedBanner = readOnly ? '<div class="submitted-banner">' + icon('check-circle', 'icon-lg') + '<div><strong>Submitted to the risk register</strong><span>' + u.plural(review.risks.length, 'risk') + (review.risks.length === 1 ? ' from this review was' : ' from this review were') + ' added to the ' + esc(review.info.department) + ' risk register on ' + esc(u.fmtDate(new Date(review.submittedAt))) + ' and now appear on the dashboard. This review is read only.</span></div>' +
      '<a class="btn" href="dashboard.html">View dashboard</a></div>' : '';
    var form = readOnly ? '' : '<section class="card form-card"><div class="section-head"><div><h3>Plan details</h3><p>These appear in the header of the printed KRM Plan.</p></div></div><div class="form-grid">' +
      '<div class="field">' + label('k-name', 'Name of staff submitting plan', true) + '<input class="input" id="k-name" data-bind="krm.submitterName" data-required value="' + esc(k.submitterName || '') + '"><span class="field-error">Enter your name.</span></div>' +
      '<div class="field">' + label('k-desig', 'Designation', true) + '<input class="input" id="k-desig" data-bind="krm.submitterDesignation" data-required value="' + esc(k.submitterDesignation || '') + '"><span class="field-error">Enter your designation.</span></div>' +
      '<div class="field">' + label('k-contact', 'Contact / phone / email', true) + '<input class="input" id="k-contact" data-bind="krm.contact" data-required value="' + esc(k.contact || '') + '"><span class="field-error">Enter your contact details.</span></div>' +
      '<div class="field-row"><div class="field">' + label('k-date', 'Date') + '<input class="input" type="date" id="k-date" data-bind="krm.date" value="' + esc(k.date || '') + '"></div>' +
      '<div class="field">' + label('k-period', 'Reporting period', true) + '<input class="input" id="k-period" data-bind="krm.period" data-required value="' + esc(k.period || '') + '" placeholder="FYXXQX, e.g. FY26Q3"><span class="field-error">Enter the reporting period.</span></div></div>' +
      '<div class="field">' + label('k-endorser', 'Endorsed by (Head of Department)') + '<input class="input" id="k-endorser" data-bind="krm.endorserName" value="' + esc(k.endorserName || '') + '" placeholder="Name of HOD"><span class="field-hint">Optional. Can also be completed by hand after printing.</span></div>' +
      '<div class="field-row"><div class="field">' + label('k-edesig', 'HOD designation') + '<input class="input" id="k-edesig" data-bind="krm.endorserDesignation" value="' + esc(k.endorserDesignation || '') + '"></div>' +
      '<div class="field">' + label('k-edate', 'Date of endorsement') + '<input class="input" type="date" id="k-edate" data-bind="krm.endorsementDate" value="' + esc(k.endorsementDate || '') + '"></div></div>' +
      '</div></section>';
    var actions = '<div class="krm-actions no-print"><div><h3>Generated KRM Plan</h3><p class="muted">Matches the SingHealth KRM Plan endorsement format.' + (readOnly ? '' : ' Add remarks directly in the plan.') + '</p></div><div class="row gap-8">' +
      '<button class="btn" id="btn-print">' + icon('printer') + 'Print KRM Plan</button>' +
      (readOnly ? '' : '<button class="btn btn-primary" id="btn-submit">' + icon('send') + 'Submit to risk register</button>') + '</div></div>';
    return '<div class="no-print">' + stepHead(6) + '</div>' + submittedBanner + (readOnly ? '' : '<div id="outstanding">' + outstandingList(p) + '</div>') + form +
      '<section class="card krm-card">' + actions + '<div class="krm-scroll">' + krmDoc() + '</div></section>';
  }

  /* ---------- Stepper & footer ---------- */
  function renderStepper() {
    var p = Store.progress(review);
    var nav = u.qs('#stepper');
    var html = '<ol>' + STEP_META.map(function (m, idx) {
      var n = idx + 1, s = p.steps[idx];
      var optional = n === 4 && !s.issues.length && !s.warnings.length && !review.risks.some(function (r) { return r.addControls.trim(); });
      var done = !s.issues.length && !optional;
      var cls = n === step ? ' is-current' : '';
      cls += done ? ' is-done' : '';
      var sub = readOnly ? 'Complete' : n === step ? (s.issues.length ? u.plural(s.issues.length, 'item') + ' to complete' : 'In progress') :
        s.issues.length ? u.plural(s.issues.length, 'item') + ' to complete' : s.warnings.length ? u.plural(s.warnings.length, 'suggestion') : optional ? 'Optional' : 'Complete';
      return '<li class="step' + cls + '"><button type="button" data-goto="' + n + '"' + (n === step ? ' aria-current="step"' : '') + '>' +
        '<span class="step-dot">' + (done && n !== step ? icon('check', 'icon-sm') : n) + '</span>' +
        '<span class="step-text"><span class="step-name">' + esc(m.short) + '</span><span class="step-sub">' + esc(sub) + '</span></span></button></li>';
    }).join('') + '</ol>';
    // Update existing items in place so a click in progress is never lost to a re-render.
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var oldItems = u.qsa('li.step', nav), newItems = u.qsa('li.step', tmp);
    if (oldItems.length !== newItems.length) { nav.innerHTML = html; return; }
    newItems.forEach(function (li, k) {
      var o = oldItems[k], ob = o.querySelector('button'), nb = li.querySelector('button');
      if (o.className !== li.className) o.className = li.className;
      if (ob.innerHTML !== nb.innerHTML) ob.innerHTML = nb.innerHTML;
      if (nb.hasAttribute('aria-current')) ob.setAttribute('aria-current', 'step'); else ob.removeAttribute('aria-current');
    });
  }

  function renderFooter() {
    var f = u.qs('#review-footer');
    if (readOnly) { f.innerHTML = ''; f.classList.add('hidden'); return; }
    var prev = step > 1 ? '<button class="btn" id="btn-prev">' + icon('arrow-left') + 'Back</button>' : '<span></span>';
    var next = step < 6 ? '<button class="btn btn-primary" id="btn-next">Next: ' + esc(STEP_META[step].short) + icon('arrow-right') + '</button>' : '<span></span>';
    f.innerHTML = prev + '<span class="footer-note" id="footer-note"></span>' + next;
    if (step > 1) u.qs('#btn-prev').addEventListener('click', function () { go(step - 1); });
    if (step < 6) u.qs('#btn-next').addEventListener('click', onNext);
  }

  function onNext() {
    var p = Store.progress(review);
    var issues = p.steps[step - 1].issues;
    if (issues.length && !nextArmed) {
      validated[step] = true;
      markErrors();
      nextArmed = true;
      var note = u.qs('#footer-note');
      note.innerHTML = icon('alert', 'icon-sm') + '<span>' + u.plural(issues.length, 'item') + ' still to complete. Select Next again to continue and come back later.</span>';
      note.classList.add('is-visible');
      var firstErr = u.qs('.field.has-error', stepEl);
      if (firstErr) { firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' }); var inp = u.qs('input, textarea, select', firstErr); if (inp) setTimeout(function () { inp.focus({ preventScroll: true }); }, 300); }
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    go(step + 1);
  }

  /* ---------- Validation display ---------- */
  function isEmpty(el) { return !String(el.value || '').trim(); }
  function markErrors() {
    if (readOnly) return;
    u.qsa('[data-required]', stepEl).forEach(function (el) {
      var field = el.closest('.field');
      if (!field) return;
      if (el.id === 'f-involved') return;
      field.classList.toggle('has-error', !!validated[step] && isEmpty(el));
    });
  }

  /* ---------- Rendering ---------- */
  function renderStep() {
    var html = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6][step - 1]();
    stepEl.innerHTML = html;
    u.qs('#review-layout').classList.toggle('is-wide', step === 6 || readOnly);
    if (readOnly) lockInputs();
    autosizeAll();
    markErrors();
    bindStepSpecific();
  }

  function lockInputs() {
    u.qsa('input, textarea, select', stepEl).forEach(function (el) { el.disabled = true; });
    u.qsa('[data-remove-risk], [data-remove-obj], #add-obj, #add-risk, .rc-edit, [data-untag]', stepEl).forEach(function (el) { el.remove(); });
    var ti = u.qs('#f-involved', stepEl);
    if (ti) ti.remove();
  }

  function render() {
    renderHeader();
    renderStepper();
    renderStep();
    renderFooter();
    ERMIS.Assist.reset();
  }

  function go(n, focusId, riskTarget) {
    flush();
    if (n < 1 || n > 6) return;
    if (readOnly && n !== step) {
      step = n;
      render();
      window.scrollTo({ top: 0 });
      return;
    }
    nextArmed = false;
    step = n;
    review.step = n;
    touch();
    history.replaceState(null, '', 'review.html?id=' + encodeURIComponent(review.id) + '&step=' + n);
    render();
    if (riskTarget) validated[n] = true, markErrors();
    var target = focusId ? u.qs('#' + focusId) : riskTarget ? u.qs('#risk-' + riskTarget) : null;
    if (target) {
      target.scrollIntoView({ block: 'center' });
      var inp = target.matches('input, textarea, select') ? target : u.qs('.has-error input, .has-error textarea, .has-error select', target);
      if (inp) inp.focus({ preventScroll: true });
    } else window.scrollTo({ top: 0 });
  }

  /* ---------- Live updates ---------- */
  function setLive(key, html) { var el = u.qs('[data-live="' + key + '"]', stepEl); if (el) el.innerHTML = html; }
  function updateLive(r) {
    var R = Rating.forRisk(r);
    setLive('band:' + r.id, R.band ? u.bandChip(R.band) : '');
    setLive('struct:' + r.id, structureChip(r.statement));
    setLive('cur:' + r.id, currentPanel(r));
    setLive('after:' + r.id, afterPanel(r));
    setLive('curchip:' + r.id, R.current ? u.adequacyChip(R.current.label, R.current.display) : '');
    setLive('mon:' + r.id, monitorWarning(r));
  }

  function autosize(el) {
    if (el.tagName !== 'TEXTAREA') return;
    el.style.height = 'auto';
    el.style.height = Math.max(el.scrollHeight + 2, el.classList.contains('obj-input') ? 38 : 0) + 'px';
  }
  function autosizeAll() { u.qsa('textarea', stepEl).forEach(autosize); }

  function onFieldInput(e) {
    var el = e.target;
    if (readOnly) return;
    var bind = el.getAttribute('data-bind');
    if (bind) {
      var parts = bind.split('.');
      review[parts[0]][parts[1]] = el.value;
      if (bind === 'info.title' || bind === 'info.institution' || bind === 'info.department') renderHeader();
    } else if (el.hasAttribute('data-risk')) {
      var r = getRisk(el.getAttribute('data-risk'));
      if (!r) return;
      var f = el.getAttribute('data-field');
      r[f] = el.value;
      updateLive(r);
      if (step === 4 && f === 'addControls') toggleStep4Required(r, el);
    } else if (el.hasAttribute('data-obj')) {
      var o = getObj(el.getAttribute('data-obj'));
      if (o) o[el.getAttribute('data-field')] = el.value;
    } else return;
    autosize(el);
    touch();
    nextArmed = false;
    var note = u.qs('#footer-note');
    if (note) note.classList.remove('is-visible');
    if (validated[step]) {
      var field = el.closest('.field');
      if (field && el.hasAttribute('data-required')) field.classList.toggle('has-error', isEmpty(el));
    }
    renderStepperDebounced();
    if (step === 6) renderPlanDebounced();
  }

  function toggleStep4Required(r, el) {
    var card = el.closest('.risk-card');
    var on = !!r.addControls.trim();
    ['targetDate', 'actionBy', 'addChange'].forEach(function (f) {
      var inp = u.qs('#' + fid(r.id, f), card);
      if (!inp) return;
      if (on) inp.setAttribute('data-required', ''); else { inp.removeAttribute('data-required'); inp.closest('.field').classList.remove('has-error'); }
      var lbl = u.qs('.field-label', inp.closest('.field'));
      var star = u.qs('.req', lbl);
      if (on && !star) u.qs('label', lbl).insertAdjacentHTML('afterend', '<span class="req" aria-hidden="true">*</span>');
      if (!on && star) star.remove();
    });
  }

  var renderStepperDebounced = u.debounce(renderStepper, 250);
  var renderPlanDebounced = u.debounce(function () {
    var doc = u.qs('#krm-doc');
    if (!doc) return;
    var active = document.activeElement;
    var activeRisk = active && active.classList.contains('kd-remarks') ? active.getAttribute('data-risk') : null;
    var pos = activeRisk ? active.selectionStart : 0;
    doc.outerHTML = krmDoc();
    u.qsa('.kd-remarks', stepEl).forEach(autosize);
    if (activeRisk) {
      var again = u.qs('.kd-remarks[data-risk="' + activeRisk + '"]');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    }
    var out = u.qs('#outstanding');
    if (out) out.innerHTML = outstandingList(Store.progress(review));
  }, 300);

  stepEl.addEventListener('input', onFieldInput);
  stepEl.addEventListener('change', function (e) { if (e.target.tagName === 'SELECT' || e.target.type === 'date') onFieldInput(e); });

  /* ---------- Clicks ---------- */
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-goto]');
    if (g && (stepEl.contains(g) || u.qs('#stepper').contains(g))) {
      e.preventDefault();
      go(+g.getAttribute('data-goto'), g.getAttribute('data-focus'), g.getAttribute('data-risk-target'));
      return;
    }
    var info = e.target.closest('.info-btn');
    if (info) {
      var risk = getRisk(info.getAttribute('data-risk-id'));
      ERMIS.Shell.openReference(info.getAttribute('data-ref'), { domain: risk ? risk.domain : '' });
      return;
    }
    if (readOnly) return;
    var rr = e.target.closest('[data-remove-risk]');
    if (rr) { removeRisk(rr.getAttribute('data-remove-risk')); return; }
    var ro = e.target.closest('[data-remove-obj]');
    if (ro) {
      review.objectives = review.objectives.filter(function (o) { return o.id !== ro.getAttribute('data-remove-obj'); });
      touch(); renderStep(); renderStepper();
      return;
    }
    if (e.target.closest('#add-obj')) {
      var o = { id: u.uid('obj'), text: '', perspective: '' };
      review.objectives.push(o);
      touch(); renderStep(); renderStepper();
      u.qs('#o-' + o.id).focus();
      return;
    }
    if (e.target.closest('#add-risk')) {
      var r = Store.blankRisk();
      review.risks.push(r);
      touch(); renderStep(); renderStepper();
      var t = u.qs('#' + fid(r.id, 'statement'));
      t.scrollIntoView({ behavior: 'smooth', block: 'center' });
      t.focus({ preventScroll: true });
      return;
    }
    var ut = e.target.closest('[data-untag]');
    if (ut) {
      review.info.involved.splice(+ut.getAttribute('data-untag'), 1);
      touch(); renderTags();
      u.qs('#f-involved').focus();
      return;
    }
    if (e.target.closest('#tag-input') && !e.target.closest('button')) { var ti = u.qs('#f-involved'); if (ti) ti.focus(); }
  });

  function riskHasLaterData(r) {
    return !!(r.currentControls.trim() || r.currentEff || r.addControls.trim() || r.kri.trim() || r.monitoredBy.trim());
  }

  function removeRisk(id) {
    var r = getRisk(id), idx = riskIndex(id);
    var doRemove = function () {
      review.risks = review.risks.filter(function (x) { return x.id !== id; });
      touch(); renderStep(); renderStepper();
      ERMIS.Shell.toast('Risk ' + idx + ' removed from all steps');
    };
    var hasContent = r.statement.trim() || r.consequence.trim() || riskHasLaterData(r);
    if (!hasContent) return doRemove();
    ERMIS.Shell.confirm({
      title: 'Remove Risk ' + idx + '?',
      message: riskHasLaterData(r) ? 'Its current controls, ratings and KRM Plan entries in later steps will also be removed. Remaining risks are renumbered automatically.' : 'This risk will be removed from the review. Remaining risks are renumbered automatically.',
      confirmLabel: 'Remove risk', danger: true
    }).then(function (ok) { if (ok) doRemove(); });
  }

  function bindStepSpecific() {
    var ti = u.qs('#f-involved');
    if (ti) {
      ti.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ',') && ti.value.trim()) {
          e.preventDefault();
          var v = ti.value;
          ti.value = '';
          addTag(v);
        } else if (e.key === 'Enter') {
          e.preventDefault();
        } else if (e.key === 'Backspace' && !ti.value && review.info.involved.length) {
          review.info.involved.pop();
          touch(); renderTags();
        }
      });
      ti.addEventListener('blur', function () {
        var v = ti.value;
        ti.value = '';
        addTag(v);
      });
    }
    var pr = u.qs('#btn-print');
    if (pr) pr.addEventListener('click', function () { flush(); window.print(); });
    var sb = u.qs('#btn-submit');
    if (sb) sb.addEventListener('click', submit);
  }

  function submit() {
    flush();
    var p = Store.progress(review);
    if (!p.complete) {
      validated[6] = true;
      markErrors();
      var out = u.qs('#outstanding');
      out.innerHTML = outstandingList(p);
      out.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var c = u.qs('.outstanding', out);
      if (c) { c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); }
      return;
    }
    ERMIS.Shell.confirm({
      title: 'Submit this review to the risk register?',
      html: '<p>' + u.plural(review.risks.length, 'risk') + ' will be added to the ' + esc(review.info.department) + ' risk register and included in the risk dashboard. The review becomes read only once submitted.</p>',
      confirmLabel: 'Submit review'
    }).then(function (ok) {
      if (!ok) return;
      Store.submitReview(review.id);
      location.href = 'dashboard.html?submitted=1';
    });
  }

  /* ---------- Find similar risks (semantic search in drawer) ---------- */
  function openSimilar(ctx, el) {
    var risk = getRisk(el.getAttribute('data-risk-id'));
    if (!risk) return;
    var idx = riskIndex(risk.id);
    var controlField = step === 4 ? 'addControls' : 'currentControls';
    var controlLabel = step === 4 ? 'Add to additional controls' : 'Add to current controls';
    var q = risk.statement.trim() || el.value.trim() || review.info.title;
    var d = ERMIS.Shell.drawer({ title: 'Similar risks in the register', subtitle: 'Comparable risks for Risk ' + idx + ', with the controls and indicators other teams use', wide: true });
    d.body.innerHTML = '<form class="similar-form" id="similar-form"><div class="input-group grow">' + icon('search') + '<input class="input" name="q" value="' + esc(q) + '" aria-label="Search query"></div>' +
      '<select class="select" name="domain" aria-label="Domain"><option value="">All domains</option>' + REF.DOMAINS.map(function (x) { return '<option' + (x.name === risk.domain ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('') + '</select>' +
      '<button class="btn btn-primary" type="submit">Search</button></form><div class="results" id="similar-results"></div>';
    var form = u.qs('#similar-form', d.body), out = u.qs('#similar-results', d.body);
    ERMIS.SearchUI.bind(out, function (kind, text) {
      var field = kind === 'kri' ? 'kri' : controlField;
      var exists = u.lines(risk[field]).some(function (l) { return l.toLowerCase() === text.trim().toLowerCase(); });
      if (exists) { ERMIS.Shell.toast('Already in Risk ' + idx + (field === 'kri' ? ' key indicators' : ' controls'), 'info'); return; }
      risk[field] = risk[field].trim() ? risk[field].replace(/\s+$/, '') + '\n' + text : text;
      touch();
      var input = u.qs('#' + fid(risk.id, field));
      if (input) { input.value = risk[field]; autosize(input); }
      updateLive(risk);
      renderStepperDebounced();
      ERMIS.Shell.toast('Added to Risk ' + idx + (field === 'kri' ? ' key indicators' : field === 'addControls' ? ' additional controls' : ' current controls'));
    });
    function run() {
      out.innerHTML = ERMIS.SearchUI.skeleton(3);
      setTimeout(function () {
        var res = ERMIS.Search.query(form.q.value, { domain: form.domain.value }, { limit: 8 });
        res = res.filter(function (x) { return x.rec.reviewId !== review.id; });
        out.innerHTML = res.length ? '<p class="muted similar-count">' + u.plural(res.length, 'comparable risk') + ' found, most similar first</p>' + res.map(function (x) {
          return ERMIS.SearchUI.renderResult(x, { use: { control: controlLabel, kri: 'Add to indicators' } });
        }).join('') : '<div class="empty">' + icon('search') + '<h3>No comparable risks found</h3><p>Try describing the risk event in different words, or search all domains.</p></div>';
        ERMIS.SearchUI.remember(out);
      }, 450);
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    form.domain.addEventListener('change', run);
    run();
  }

  /* ---------- Assist context ---------- */
  var IDLE = {
    1: '<div class="assist-idle"><h3>Getting started</h3><p>Capture what is being reviewed and why. A clear description and goal makes it easier to set objectives and identify risks in the next step.</p><ul><li>Select a description or goal field to see suggested wording.</li><li>Use References for the glossary and rating codes at any time.</li></ul></div>',
    2: '<div class="assist-idle"><h3>Writing risk statements</h3><p>Express each risk as:</p><p class="formula"><b>[EVENT]</b> due to <b>[CAUSES]</b> resulting in <b>[CONSEQUENCES]</b></p><ul><li>Consider causes from both internal and external perspectives.</li><li>Rate impact and likelihood without considering any controls.</li><li>Select a risk statement, consequence or objective field for suggestions.</li></ul></div>',
    3: '<div class="assist-idle"><h3>How the rating works</h3><p>The rating is calculated from impact, likelihood and the effectiveness of current controls:</p><p class="formula">(<b>Impact</b> + <b>Likelihood</b>) × (1 − <b>Effectiveness</b>)</p><ul><li>10 and above: under-controlled</li><li>5 to 9.9: potentially under-controlled</li><li>1.25 to 4.9: adequately controlled</li><li>Below 1.25: potentially over-controlled</li></ul></div>',
    4: '<div class="assist-idle"><h3>When to add controls</h3><ul><li>Current controls are not able to adequately control the risk.</li><li>There are new measures or controls to add on to current controls.</li><li>There are opportunities to improve productivity, operational efficiency or quality.</li></ul><p style="margin-top:8px">Select an additional controls field for suggestions based on comparable risks.</p></div>',
    5: '<div class="assist-idle"><h3>Good key indicators</h3><ul><li>Relevant to the specific risk or objective</li><li>Measurable using reliable data</li><li>Comparable over time</li><li>Timely, enabling early response</li><li>Actionable, so the risk owner knows what to do</li></ul><p style="margin-top:8px">Ideally, the person monitoring is different from the person implementing the controls.</p></div>',
    6: ''
  };

  ERMIS.Assist.init(u.qs('#assist-rail'), {
    idle: function () { return IDLE[step]; },
    context: function (el) {
      var field = el.getAttribute('data-assist');
      var risk = getRisk(el.getAttribute('data-risk-id'));
      var objText = review.objectives.map(function (o) { return o.text; }).join(' ');
      var ctx = { field: field, domain: risk ? risk.domain : '', label: risk ? 'Risk ' + riskIndex(risk.id) : '' };
      if (risk) {
        ctx.context = field === 'riskStatement' ? [risk.statement, risk.consequence, review.info.title, review.info.description].join(' ') :
          field === 'consequence' ? risk.statement + ' ' + risk.consequence :
            field === 'kri' ? [risk.statement, risk.currentControls, risk.addControls].join(' ') :
              [risk.statement, risk.consequence].join(' ');
      } else {
        ctx.context = [review.info.title, review.info.description, review.info.vision, objText, el.value].join(' ');
        if (field === 'objective') ctx.label = 'Objective ' + (review.objectives.findIndex(function (o) { return o.id === el.getAttribute('data-obj'); }) + 1);
      }
      return ctx;
    },
    onFindSimilar: openSimilar
  });

  render();
  if (readOnly) setSaveState();
})();
