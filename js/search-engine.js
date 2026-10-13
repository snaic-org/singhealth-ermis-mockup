/* Semantic retrieval over the risk register.
   Concept-expanded, field-weighted TF-IDF with cosine similarity. Exposes a single
   query() entry point so an embedding / vector index can be swapped in behind it. */
window.ERMIS = window.ERMIS || {};

ERMIS.Search = (function () {
  var STOP = ('a an the and or of to in on for with without by at from as is are was were be been being this that these those it its ' +
    'into over under than then there their which who whom whose what when where why how all any each few more most other some such ' +
    'no nor not only own same so too very can will just should could would may might must do does did done having have has ' +
    'due result resulting risk risks potential leading lead leads caused causes cause our we us e g eg i ie per within across').split(' ');
  var STOPSET = {};
  STOP.forEach(function (w) { STOPSET[w] = true; });

  function stem(w) {
    if (w.length <= 3) return w;
    var rules = [['ational', 'ate'], ['isation', 'ise'], ['ization', 'ise'], ['ations', 'ate'], ['ation', 'ate'], ['iveness', 'ive'], ['fulness', 'ful'],
      ['ousness', 'ous'], ['ments', ''], ['ment', ''], ['ings', ''], ['ing', ''], ['ies', 'y'], ['ied', 'y'], ['ness', ''], ['ities', 'ity'],
      ['ed', ''], ['es', ''], ['ly', ''], ['s', '']];
    for (var i = 0; i < rules.length; i++) {
      var suf = rules[i][0];
      if (w.length - suf.length >= 3 && w.slice(-suf.length) === suf) {
        var out = w.slice(0, -suf.length) + rules[i][1];
        if (suf === 's' && /(ss|us|is)$/.test(w)) return w;
        return out.replace(/(.)\1$/, '$1');
      }
    }
    return w;
  }

  function tokens(text) {
    return String(text || '').toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9&]+/).filter(function (w) {
      return w && w.length > 1 && !STOPSET[w] && !/^\d+$/.test(w);
    }).map(stem);
  }

  // Concept groups: terms that share meaning in the SingHealth risk vocabulary.
  var SURFACE = {};
  var CONCEPTS = [
    'burnout fatigue exhaustion workload overtime stress wellbeing wellness morale tired overwork shift roster',
    'attrition turnover resignation retention resign quit departure vacancy vacancies shortage manpower staffing understaffed recruitment headcount',
    'medication drug drugs medicine dispensing dispense prescription prescribing pharmacy pharmacist dose dosage administration lasa look-alike sound-alike high-alert insulin chemotherapy anticoagulant',
    'error errors mistake wrong mix-up mixup incorrect mismatch misidentification near-miss lapse',
    'cyber ransomware malware phishing hacking hacker attack breach intrusion virus cybersecurity',
    'data record records emr information confidential confidentiality privacy pdpa leakage disclosure personal unauthorised',
    'downtime outage failure disruption unavailable unavailability breakdown interruption crash',
    'supplier supply vendor procurement consumables stock inventory shortage delivery logistics sourcing single-source',
    'fall falls slip trip fracture mobility',
    'infection hai mrsa clabsi sepsis hygiene contamination sterilisation sterile outbreak isolation antimicrobial',
    'icu intensive critical hdu ventilator',
    'emergency ed a&e triage ambulance',
    'surgery surgical operating theatre ot procedure wrong-site anaesthesia retained implant',
    'fire flood flooding haze power electrical chiller disaster evacuation continuity blackout',
    'pandemic outbreak surge dorscon covid influenza epidemic infectious',
    'compliance regulatory licence licensing hcsa moh audit accreditation jci inspection regulation legal law statutory',
    'reputation media social publicity complaint complaints viral public image press feedback',
    'budget cost overrun revenue funding financial claims billing medisave medishield fraud reimbursement',
    'research trial trials study consent protocol irb ethics grant integrity investigator',
    'training education trainee trainees resident residents student students supervision competency curriculum onboarding',
    'equipment device devices machine mri ct scanner pump infusion biomedical maintenance obsolete obsolescence',
    'waiting wait queue delay delayed access backlog capacity bed crunch congestion',
    'violence aggression abuse assault harassment security abusive',
    'deterioration deteriorating escalation early warning rapid response unrecognised',
    'transfusion blood haemolytic',
    'telemedicine teleconsultation virtual digital app ai artificial algorithm automation robot robotic',
    'strategy strategic partnership transformation healthier population commissioning campus expansion',
    'nurse nurses nursing clinician doctor doctors physician staff workforce',
    'patient patients inpatient ward wards bed',
    'child children paediatric neonatal infant baby maternal obstetric pregnancy',
    'cancer oncology chemotherapy radiotherapy tumour',
    'heart cardiac cardiology cath stent',
    'stroke neuroscience neurology thrombolysis',
    'eye ophthalmology retina intravitreal cataract',
    'dental dentist oral',
    'diagnosis diagnostic missed result results follow-up test',
    'handover communication handoff discharge transfer'
  ].map(function (g) {
    return g.split(' ').map(function (w) {
      var t = tokens(w)[0];
      if (t && !SURFACE[t]) SURFACE[t] = w;
      return t;
    }).filter(Boolean);
  });

  var CONCEPT_INDEX = {};
  CONCEPTS.forEach(function (group, gi) {
    group.forEach(function (t) { (CONCEPT_INDEX[t] = CONCEPT_INDEX[t] || []).push(gi); });
  });

  var FIELDS = [
    ['statement', 3], ['consequence', 1.5], ['currentControls', 1], ['addControls', 0.8], ['kris', 1], ['domain', 1.2], ['department', 0.6]
  ];

  function fieldText(rec, f) {
    var v = rec[f];
    if (Array.isArray(v)) return v.map(function (x) { return typeof x === 'string' ? x : x.text; }).join(' ');
    return v || '';
  }

  var cache = { key: null, docs: null, idf: null };

  function build(records) {
    var key = records.length + ':' + (records[0] ? records[0].id : '');
    if (cache.key === key) return cache;
    var df = {};
    var docs = records.map(function (rec) {
      var tf = {};
      FIELDS.forEach(function (f) {
        tokens(fieldText(rec, f[0])).forEach(function (t) { tf[t] = (tf[t] || 0) + f[1]; });
      });
      Object.keys(tf).forEach(function (t) { df[t] = (df[t] || 0) + 1; });
      return { rec: rec, tf: tf };
    });
    var N = docs.length, idf = {};
    Object.keys(df).forEach(function (t) { idf[t] = Math.log(1 + N / df[t]); });
    docs.forEach(function (d) {
      var norm = 0, vec = {};
      Object.keys(d.tf).forEach(function (t) { var w = (1 + Math.log(d.tf[t])) * idf[t]; vec[t] = w; norm += w * w; });
      d.vec = vec;
      d.norm = Math.sqrt(norm) || 1;
    });
    cache = { key: key, docs: docs, idf: idf };
    return cache;
  }

  function expand(q) {
    var base = tokens(q), weights = {}, expanded = {};
    base.forEach(function (t) { weights[t] = 1; });
    base.forEach(function (t) {
      (CONCEPT_INDEX[t] || []).forEach(function (gi) {
        CONCEPTS[gi].forEach(function (s) {
          if (!weights[s]) { weights[s] = 0.42; expanded[s] = true; }
        });
      });
    });
    return { base: base, weights: weights, expanded: expanded };
  }

  var PERIOD_ORDER = {};
  ERMIS.REF.PERIODS.forEach(function (p, i) { PERIOD_ORDER[p] = i; });

  function passes(rec, f) {
    if (!f) return true;
    if (f.domain && rec.domain !== f.domain) return false;
    if (f.institution && rec.institution !== f.institution) return false;
    if (f.band && ERMIS.Rating.inherentBand(rec.impact, rec.likelihood) !== f.band) return false;
    if (f.adequacy) {
      var r = ERMIS.Rating.forRisk(rec);
      if (!r.current || r.current.label !== f.adequacy) return false;
    }
    if (f.period) {
      if (f.period.indexOf('FY') === 0 && f.period.length === 6) { if (rec.period.indexOf(f.period) !== 0) return false; }
      else if (f.period === 'last4') { if (PERIOD_ORDER[rec.period] < PERIOD_ORDER[ERMIS.REF.CURRENT_PERIOD] - 4) return false; }
    }
    return true;
  }

  function query(q, filters, opts) {
    opts = opts || {};
    var records = (opts.records || ERMIS.Store.register()).filter(function (r) { return passes(r, filters); });
    if (!String(q || '').trim()) return [];
    var idx = build(opts.records || ERMIS.Store.register());
    var ex = expand(q);
    var qvec = {}, qnorm = 0;
    Object.keys(ex.weights).forEach(function (t) {
      var w = ex.weights[t] * (idx.idf[t] || 0);
      if (w) { qvec[t] = w; qnorm += w * w; }
    });
    qnorm = Math.sqrt(qnorm) || 1;
    var allowed = {};
    records.forEach(function (r) { allowed[r.id] = true; });

    var scored = [];
    idx.docs.forEach(function (d) {
      if (!allowed[d.rec.id]) return;
      var dot = 0, matched = [];
      Object.keys(qvec).forEach(function (t) {
        if (d.vec[t]) { dot += qvec[t] * d.vec[t]; matched.push(t); }
      });
      if (!dot) return;
      scored.push({ rec: d.rec, sim: dot / (qnorm * d.norm), matched: matched });
    });
    if (!scored.length) return [];
    scored.sort(function (a, b) { return b.sim - a.sim; });
    var max = scored[0].sim;
    var top = 0.74 + Math.min(0.2, max * 0.55);
    return scored.filter(function (s) { return s.sim >= max * 0.16; }).slice(0, opts.limit || 40).map(function (s) {
      var related = s.matched.filter(function (t) { return ex.expanded[t]; }).map(function (t) { return SURFACE[t] || t; });
      return {
        rec: s.rec,
        score: Math.max(0.5, Math.round(top * Math.pow(s.sim / max, 0.42) * 100) / 100),
        matched: s.matched,
        related: related
      };
    });
  }

  // Wrap words in text whose stem was matched.
  function highlight(text, stems) {
    var set = {};
    (stems || []).forEach(function (s) { set[s] = true; });
    return String(text || '').split(/(\s+)/).map(function (part) {
      var core = part.toLowerCase().replace(/[^a-z0-9&\-]/g, '');
      var esc = ERMIS.u.esc(part);
      if (!core || STOPSET[core]) return esc;
      var st = tokens(core);
      var hit = st.length && st.every(function (t) { return set[t]; });
      return hit ? '<mark>' + esc + '</mark>' : esc;
    }).join('');
  }

  return { query: query, highlight: highlight, tokens: tokens, passes: passes };
})();
