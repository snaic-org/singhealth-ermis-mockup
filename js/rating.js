/* Rating engine: replicates ERM Tool v3.1 rating logic. Deterministic, no AI. */
window.ERMIS = window.ERMIS || {};

ERMIS.Rating = (function () {
  var REF = ERMIS.REF;
  var EPS = 1e-9;

  function find(list, name) {
    if (!name) return null;
    var n = String(name).toLowerCase();
    for (var i = 0; i < list.length; i++) if (list[i].name.toLowerCase() === n) return list[i];
    return null;
  }

  // Heat-map matrix (training material). Rows: impact level 5..1; columns: likelihood level 1..5.
  var MATRIX = {
    5: ['Low', 'Medium', 'High', 'Very High', 'Very High'],
    4: ['Low', 'Medium', 'Medium', 'Very High', 'Very High'],
    3: ['Low', 'Low', 'Medium', 'Medium', 'High'],
    2: ['Low', 'Low', 'Low', 'Medium', 'Medium'],
    1: ['Low', 'Low', 'Low', 'Low', 'Low']
  };

  function bandFor(impactLevel, likelihoodLevel) {
    if (!impactLevel || !likelihoodLevel) return null;
    return MATRIX[impactLevel][likelihoodLevel - 1];
  }

  function inherentBand(impact, likelihood) {
    var i = find(REF.IMPACT, impact), l = find(REF.LIKELIHOOD, likelihood);
    if (!i || !l) return null;
    return bandFor(i.level, l.level);
  }

  function classify(score, overThreshold) {
    if (score >= 10 - EPS) return 'Under-controlled';
    if (score >= 5 - EPS) return 'Potentially under-controlled';
    if (score >= overThreshold - EPS) return 'Adequately controlled';
    return 'Potentially over-controlled';
  }

  function rawScore(impact, likelihood) {
    var i = find(REF.IMPACT, impact), l = find(REF.LIKELIHOOD, likelihood);
    if (!i || !l) return null;
    return i.score + l.score;
  }

  // Rating with current controls = (Impact + Likelihood) x (1 - Effectiveness)
  function current(impact, likelihood, effectiveness) {
    var raw = rawScore(impact, likelihood), e = find(REF.EFFECTIVENESS, effectiveness);
    if (raw === null || !e) return null;
    var score = raw * (1 - e.value);
    return { score: score, display: Math.round(score * 10) / 10, label: classify(score, 1.25), eff: e.value };
  }

  function combinedEffectiveness(orig, m) {
    if (m === 0) return orig;
    if (m < 0) return orig + orig * m;
    return orig + (1 - orig) * m;
  }

  // Rating after control changes = ROUND((Impact + Likelihood) x (1 - New Effectiveness), 1)
  function after(impact, likelihood, effectiveness, change) {
    var raw = rawScore(impact, likelihood), e = find(REF.EFFECTIVENESS, effectiveness), c = find(REF.CONTROL_CHANGE, change);
    if (raw === null || !e || !c) return null;
    var newEff = combinedEffectiveness(e.value, c.value);
    var score = Math.round(raw * (1 - newEff) * 10 + EPS) / 10;
    return { score: score, display: score, label: classify(score, 1.3), eff: newEff };
  }

  function forRisk(r) {
    var cur = current(r.impact, r.likelihood, r.currentEff);
    var aft = after(r.impact, r.likelihood, r.currentEff, r.addChange);
    return {
      band: inherentBand(r.impact, r.likelihood),
      raw: rawScore(r.impact, r.likelihood),
      current: cur,
      after: aft,
      residual: aft || cur
    };
  }

  var ADEQ_KEYS = { 'Under-controlled': 'under', 'Potentially under-controlled': 'pot-under', 'Adequately controlled': 'adequate', 'Potentially over-controlled': 'pot-over' };
  var BAND_KEYS = { 'Very High': 'vh', 'High': 'h', 'Medium': 'm', 'Low': 'l' };
  var BAND_ORDER = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };

  function recommendedAction(band) {
    for (var i = 0; i < REF.RECOMMENDED_ACTION.length; i++) {
      if (REF.RECOMMENDED_ACTION[i].bands.indexOf(band) > -1) return REF.RECOMMENDED_ACTION[i];
    }
    return null;
  }

  function needsAdditionalControls(label) {
    return label === 'Under-controlled' || label === 'Potentially under-controlled';
  }

  return {
    find: find, MATRIX: MATRIX, bandFor: bandFor, inherentBand: inherentBand, rawScore: rawScore,
    current: current, after: after, forRisk: forRisk, combinedEffectiveness: combinedEffectiveness,
    adequacyKey: function (l) { return ADEQ_KEYS[l] || ''; },
    bandKey: function (b) { return BAND_KEYS[b] || ''; },
    bandOrder: function (b) { return BAND_ORDER[b] || 0; },
    recommendedAction: recommendedAction, needsAdditionalControls: needsAdditionalControls
  };
})();
