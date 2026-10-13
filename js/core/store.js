/* Local store for wireframe reviews (localStorage) */
window.ERMIS = window.ERMIS || {};

ERMIS.Store = (function () {
  var u = ERMIS.u;
  var KEY = 'ermis.reviews';
  var KEY_SEED = 'ermis.seed';
  var SEED_VERSION = 'wire-1';

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
      kri: '', frequency: '', monitoredBy: ''
    };
  }

  function blankReview(id) {
    return {
      id: id, status: 'draft', step: 1, updatedAt: Date.now(),
      info: { description: '', location: '', vision: '', institution: '', department: '', completedBy: '', involved: [], period: '', dateCompleted: '' },
      objectives: [{ id: u.uid('obj'), text: '' }],
      risks: [blankRisk()],
      krm: {}
    };
  }

  function init() {
    if (u.param('reset') === '1') {
      try { localStorage.removeItem(KEY); localStorage.removeItem(KEY_SEED); } catch (e) { /* ignore */ }
      history.replaceState(null, '', location.pathname);
    }
    if (read(KEY_SEED, null) !== SEED_VERSION) {
      write(KEY, [blankReview('ERM-2026-0138')]);
      write(KEY_SEED, SEED_VERSION);
    }
  }

  function getReviews() { return read(KEY, []); }
  function getReview(id) { return getReviews().filter(function (r) { return r.id === id; })[0] || null; }
  function latestDraft() {
    return getReviews().filter(function (r) { return r.status === 'draft'; }).sort(function (a, b) { return b.updatedAt - a.updatedAt; })[0] || null;
  }
  function saveReview(review) {
    var list = getReviews(), found = false;
    review.updatedAt = Date.now();
    list = list.map(function (r) { if (r.id === review.id) { found = true; return review; } return r; });
    if (!found) list.unshift(review);
    write(KEY, list);
  }
  function createReview() {
    var list = getReviews(), max = 140;
    list.forEach(function (r) { var n = parseInt(String(r.id).split('-').pop(), 10); if (n > max) max = n; });
    var review = blankReview('ERM-2026-' + String(max + 1).padStart(4, '0'));
    list.unshift(review);
    write(KEY, list);
    return review;
  }

  init();

  return { getReviews: getReviews, getReview: getReview, latestDraft: latestDraft, saveReview: saveReview, createReview: createReview, blankRisk: blankRisk };
})();
