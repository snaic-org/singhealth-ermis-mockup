// Rating engine checks against ERM Tool v3.1 logic. Run: node tests/rating.test.js
global.window = global;
require('../js/data/reference.js');
require('../js/rating.js');
var R = window.ERMIS.Rating, REF = window.ERMIS.REF, assert = require('assert');

// Worked example
var c = R.current('Major', 'Possible', 'Moderate');
assert.strictEqual(c.display, 7.2);
assert.strictEqual(c.label, 'Potentially under-controlled');
var a = R.after('Major', 'Possible', 'Moderate', 'Substantial improvement');
assert.strictEqual(a.score, 1.8);
assert.strictEqual(a.label, 'Adequately controlled');

// Current-control boundaries: >=10 under, >=5 pot-under, >=1.25 adequate
assert.strictEqual(R.current('Extreme', 'Frequent', 'Moderate').label, 'Under-controlled');               // 10
assert.strictEqual(R.current('Extreme', 'Frequent', 'Substantial').label, 'Potentially under-controlled'); // 6.25
assert.strictEqual(R.current('Minor', 'Unlikely', 'Moderate').label, 'Adequately controlled');             // 4.0
assert.strictEqual(R.current('Moderate', 'Rare', 'Moderate').label, 'Adequately controlled');               // 4.4
assert.strictEqual(R.current('Extreme', 'Frequent', 'Nearly complete').label, 'Adequately controlled');    // 1.25
assert.strictEqual(R.current('Major', 'Likely', 'Nearly complete').label, 'Potentially over-controlled');  // 1.0
assert.strictEqual(R.current('Moderate', 'Possible', 'Nearly complete').label, 'Potentially over-controlled'); // 0.75
assert.strictEqual(R.current('Insignificant', 'Unlikely', 'None').label, 'Potentially under-controlled');  // 7

// After-change boundaries: rounded to 1 dp, adequate from 1.3
assert.strictEqual(R.after('Moderate', 'Unlikely', 'Significant', 'No Change').label, 'Adequately controlled');   // 1.3
assert.strictEqual(R.after('Minor', 'Possible', 'Significant', 'No Change').label, 'Potentially over-controlled'); // 1.2
// Negative multipliers: eff * (1 + m)
var d = R.after('Major', 'Likely', 'Significant', 'Moderate decrease');      // 0.9 * 0.4 = 0.36 -> 20 * 0.64 = 12.8
assert.strictEqual(d.score, 12.8);
assert.strictEqual(d.label, 'Under-controlled');
assert.strictEqual(R.after('Major', 'Likely', 'Moderate', 'Control removed').score, 20);
assert.strictEqual(R.after('Major', 'Likely', 'Moderate', '') , null);

// Workbook lookup tables are exact-match lists; check every reachable combination is classified
// with the same thresholds as Lists!A53:B209 (current) and Lists!D53:E303 (after).
function wbCurrent(s) { s = +s.toFixed(10); return s >= 10 ? 'Under-controlled' : s >= 5 ? 'Potentially under-controlled' : s >= 1.25 ? 'Adequately controlled' : 'Potentially over-controlled'; }
function wbAfter(s) { return s >= 10 ? 'Under-controlled' : s >= 5 ? 'Potentially under-controlled' : s >= 1.3 ? 'Adequately controlled' : 'Potentially over-controlled'; }
var n = 0;
REF.IMPACT.forEach(function (i) { REF.LIKELIHOOD.forEach(function (l) { REF.EFFECTIVENESS.forEach(function (e) {
  var cur = R.current(i.name, l.name, e.name);
  assert.strictEqual(cur.label, wbCurrent((i.score + l.score) * (1 - e.value)), [i.name, l.name, e.name].join('/'));
  REF.CONTROL_CHANGE.forEach(function (m) {
    var ne = m.value === 0 ? e.value : m.value < 0 ? e.value + e.value * m.value : e.value + (1 - e.value) * m.value;
    var s = Math.round((i.score + l.score) * (1 - ne) * 10 + 1e-9) / 10;
    assert.strictEqual(R.after(i.name, l.name, e.name, m.name).label, wbAfter(s));
    n++;
  });
}); }); });

// Heat-map matrix (rows impact Extreme..Insignificant, cols Rare..Frequent)
var expected = {
  Extreme: ['Low', 'Medium', 'High', 'Very High', 'Very High'],
  Major: ['Low', 'Medium', 'Medium', 'Very High', 'Very High'],
  Moderate: ['Low', 'Low', 'Medium', 'Medium', 'High'],
  Minor: ['Low', 'Low', 'Low', 'Medium', 'Medium'],
  Insignificant: ['Low', 'Low', 'Low', 'Low', 'Low']
};
var cols = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Frequent'];
Object.keys(expected).forEach(function (imp) { cols.forEach(function (lk, j) {
  assert.strictEqual(R.inherentBand(imp, lk), expected[imp][j], imp + '/' + lk);
}); });
assert.strictEqual(R.inherentBand("Unsure/Don't Know", 'Likely'), null);

console.log('rating engine: all checks passed (' + n + ' after-change combinations, 25 heat-map cells)');
