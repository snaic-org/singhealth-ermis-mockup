/* Local data store: reviews, risk register, progress/validation */
window.ERMIS = window.ERMIS || {};

ERMIS.Store = (function () {
  var u = ERMIS.u;
  var KEY_REVIEWS = 'ermis.reviews';
  var KEY_SEED = 'ermis.seed';
  var SEED_VERSION = '4';

  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  function blankRisk() {
    return {
      id: u.uid('risk'), statement: '', consequence: '', domain: '', impact: '', likelihood: '', owner: '',
      currentControls: '', currentEff: '', addControls: '', addChange: '', targetDate: '', actionBy: '',
      kri: '', frequency: '', monitoredBy: '', remarks: ''
    };
  }

  function nextReviewId(reviews) {
    var max = 140;
    reviews.forEach(function (r) { var n = parseInt(String(r.id).split('-').pop(), 10); if (n > max) max = n; });
    return 'ERM-2026-' + String(max + 1).padStart(4, '0');
  }

  function seedReviews() {
    var now = Date.now();
    var draft = {
      id: 'ERM-2026-0138', status: 'draft', step: 3,
      createdAt: now - 6 * 86400000, updatedAt: now - 2 * 86400000,
      info: {
        title: 'Outpatient Pharmacy Automation (Phase 2)',
        description: 'Roll-out of a second robotic dispensing system and automated pick-up lockers at the SGH Outpatient Pharmacy, Block 3, to reduce patient waiting time and dispensing errors.',
        location: 'SGH Outpatient Pharmacy, Block 3, Level 1',
        vision: 'To assure medication safety through the prescription, dispensing and administration of the right drug in the right dosage to the right patient at the right time via the right route.',
        institution: 'SGH', department: 'Pharmacy',
        completedBy: 'Tan Wei Ling', involved: ['Dr Rachel Ong', 'Lim Jia Hui', 'Muhammad Faizal', 'Chua Mei Ling'],
        period: 'FY2026Q3', dateCompleted: u.todayISO()
      },
      objectives: [
        { id: u.uid('obj'), text: 'To dispense the right medication to the right patient each and every time.', perspective: 'Operational' },
        { id: u.uid('obj'), text: 'To reduce median outpatient prescription waiting time to under 20 minutes by March 2027.', perspective: 'Strategic' },
        { id: u.uid('obj'), text: 'To complete commissioning and validation of the second dispensing robot within 9 months.', perspective: 'Operational' }
      ],
      risks: [
        Object.assign(blankRisk(), {
          statement: 'Dispensing the wrong medication due to not verifying patient identity at the collection counter resulting in patient harm.',
          consequence: 'Patient receives and takes medication intended for another patient, leading to adverse drug reactions, possible hospital admission and a reportable incident.',
          domain: 'Clinical', impact: 'Major', likelihood: 'Possible', owner: 'Dr Rachel Ong, Head, Department of Pharmacy',
          currentControls: 'Two-identifier check (name and NRIC) at collection counter\nBarcode scan of prescription label against queue ticket',
          currentEff: 'Moderate'
        }),
        Object.assign(blankRisk(), {
          statement: 'Prolonged downtime of the robotic dispensing system due to software faults or delayed vendor support resulting in long patient waiting times.',
          consequence: 'Manual dispensing fallback triples waiting time at peak hours, leading to patient complaints, staff overtime and potential dispensing errors under pressure.',
          domain: 'Technology', impact: 'Moderate', likelihood: 'Likely', owner: 'Lim Jia Hui, Principal Pharmacist (Operations)',
          currentControls: 'Vendor maintenance contract with 4-hour response SLA',
          currentEff: ''
        })
      ],
      krm: {}
    };
    return [draft];
  }

  function init() {
    if (u.param('reset') === '1') {
      try {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf('ermis.') === 0 && k !== 'ermis.session') localStorage.removeItem(k); });
      } catch (e) { /* ignore */ }
      var url = location.pathname + location.hash;
      history.replaceState(null, '', url);
    }
    if (read(KEY_SEED, null) !== SEED_VERSION) {
      write(KEY_REVIEWS, seedReviews());
      write(KEY_SEED, SEED_VERSION);
    }
  }

  function getReviews() { return read(KEY_REVIEWS, []); }
  function getReview(id) {
    var list = getReviews();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function saveReview(review) {
    var list = getReviews(), found = false;
    review.updatedAt = Date.now();
    for (var i = 0; i < list.length; i++) if (list[i].id === review.id) { list[i] = review; found = true; }
    if (!found) list.unshift(review);
    write(KEY_REVIEWS, list);
    return review;
  }
  function deleteReview(id) {
    write(KEY_REVIEWS, getReviews().filter(function (r) { return r.id !== id; }));
  }
  function createReview(user) {
    var list = getReviews();
    var review = {
      id: nextReviewId(list), status: 'draft', step: 1, createdAt: Date.now(), updatedAt: Date.now(),
      info: {
        title: '', description: '', location: '', vision: '',
        institution: user ? user.institution : '', department: user ? user.department : '',
        completedBy: user ? user.name : '', involved: [], period: ERMIS.REF.CURRENT_PERIOD, dateCompleted: u.todayISO()
      },
      objectives: [{ id: u.uid('obj'), text: '', perspective: '' }],
      risks: [blankRisk()],
      krm: {}
    };
    list.unshift(review);
    write(KEY_REVIEWS, list);
    return review;
  }

  /* ---------- Progress & validation ---------- */
  var STEP_NAMES = ['Description and Goal', 'Objectives and Risk Identification', 'Evaluate Current Controls', 'Addition / Change to Controls', 'KRM Plan', 'Generate KRM Plan'];

  function riskLabel(review, risk) {
    var idx = review.risks.indexOf(risk) + 1;
    return 'Risk ' + idx;
  }

  function progress(review) {
    var steps = STEP_NAMES.map(function (name) { return { name: name, issues: [], warnings: [] }; });
    var info = review.info || {};
    var req1 = [['title', 'Review title'], ['description', 'Description'], ['location', 'Location'], ['vision', 'Vision / Mission / Strategic Priorities / Goal'], ['institution', 'Institution'], ['department', 'Division / Department / Unit'], ['completedBy', 'Person(s) completing this review'], ['period', 'Review period'], ['dateCompleted', 'Date completed']];
    req1.forEach(function (f) { if (!String(info[f[0]] || '').trim()) steps[0].issues.push({ field: f[0], msg: f[1] + ' is required' }); });

    var objs = (review.objectives || []).filter(function (o) { return o.text && o.text.trim(); });
    if (!objs.length) steps[1].issues.push({ field: 'objectives', msg: 'Add at least one objective' });
    if (!review.risks.length) steps[1].issues.push({ field: 'risks', msg: 'Identify at least one risk' });

    review.risks.forEach(function (r) {
      var lbl = riskLabel(review, r);
      var miss2 = [];
      if (!r.statement.trim()) miss2.push('risk statement');
      if (!r.consequence.trim()) miss2.push('potential consequences');
      if (!r.domain) miss2.push('domain');
      if (!r.impact) miss2.push('impact');
      if (!r.likelihood) miss2.push('likelihood');
      if (!r.owner.trim()) miss2.push('risk owner');
      if (miss2.length) steps[1].issues.push({ riskId: r.id, msg: lbl + ': add ' + miss2.join(', ') });

      var miss3 = [];
      if (!r.currentControls.trim()) miss3.push('current controls');
      if (!r.currentEff) miss3.push('effectiveness');
      if (miss3.length) steps[2].issues.push({ riskId: r.id, msg: lbl + ': add ' + miss3.join(' and ') });

      if (r.addControls.trim()) {
        var miss4 = [];
        if (!r.addChange) miss4.push('effectiveness rating');
        if (!r.targetDate) miss4.push('target date');
        if (!r.actionBy.trim()) miss4.push('action by');
        if (miss4.length) steps[3].issues.push({ riskId: r.id, msg: lbl + ': add ' + miss4.join(', ') });
      } else {
        var cur = ERMIS.Rating.current(r.impact, r.likelihood, r.currentEff);
        if (cur && ERMIS.Rating.needsAdditionalControls(cur.label)) steps[3].warnings.push({ riskId: r.id, msg: lbl + ' is ' + cur.label.toLowerCase() + '; consider additional controls' });
      }

      var miss5 = [];
      if (!r.kri.trim()) miss5.push('key indicator');
      if (!r.frequency) miss5.push('frequency');
      if (!r.monitoredBy.trim()) miss5.push('monitored by');
      if (miss5.length) steps[4].issues.push({ riskId: r.id, msg: lbl + ': add ' + miss5.join(', ') });
    });

    var k = review.krm || {};
    [['submitterName', 'Name of staff submitting plan'], ['submitterDesignation', 'Designation of staff submitting plan'], ['contact', 'Contact / phone / email'], ['period', 'Reporting period']].forEach(function (f) {
      if (!String(k[f[0]] || '').trim()) steps[5].issues.push({ field: f[0], msg: f[1] + ' is required' });
    });

    var completeSteps = steps.filter(function (s) { return !s.issues.length; }).length;
    return {
      steps: steps,
      pct: Math.round((completeSteps / steps.length) * 100),
      ready: steps.slice(0, 5).every(function (s) { return !s.issues.length; }),
      complete: completeSteps === steps.length
    };
  }

  /* ---------- Risk register (corpus + submitted reviews) ---------- */
  function reviewToRegister(review) {
    return review.risks.map(function (r, i) {
      return {
        id: review.id + '-' + String(i + 1).padStart(2, '0'),
        statement: r.statement, consequence: r.consequence, domain: r.domain, impact: r.impact, likelihood: r.likelihood,
        owner: r.owner, institution: review.info.institution, department: review.info.department, period: review.info.period,
        currentControls: u.lines(r.currentControls), currentEff: r.currentEff,
        addControls: u.lines(r.addControls), addChange: r.addControls.trim() ? r.addChange : '',
        targetDate: r.targetDate, actionBy: r.actionBy,
        kris: u.lines(r.kri).map(function (t) { return { text: t, freq: r.frequency }; }),
        monitoredBy: r.monitoredBy, reviewId: review.id, reviewTitle: review.info.title, isNew: true
      };
    });
  }

  function register() {
    var list = (ERMIS.CORPUS || []).slice();
    getReviews().forEach(function (rv) {
      if (rv.status === 'submitted') list = reviewToRegister(rv).concat(list);
    });
    return list;
  }

  function submitReview(id) {
    var review = getReview(id);
    if (!review) return null;
    review.status = 'submitted';
    review.submittedAt = Date.now();
    if (!review.info.dateCompleted) review.info.dateCompleted = u.todayISO();
    return saveReview(review);
  }

  init();

  return {
    getReviews: getReviews, getReview: getReview, saveReview: saveReview, deleteReview: deleteReview,
    createReview: createReview, blankRisk: blankRisk, progress: progress, register: register,
    submitReview: submitReview, STEP_NAMES: STEP_NAMES
  };
})();
