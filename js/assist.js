/* Side panel for the review: step guidance by default, ERMIS Assist placeholder suggestions
   when an AI-supported field has focus. Real suggestions will come from the RAG/LLM backend. */
window.ERMIS = window.ERMIS || {};

ERMIS.Assist = (function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon;

  var FIELDS = {
    description: { label: 'description', insert: '[AI-suggested description]' },
    vision: { label: 'goal', insert: '[AI-suggested goal]' },
    objective: { label: 'objective', insert: '[AI-suggested objective]' },
    riskStatement: { label: 'risk statement', insert: '[AI-suggested risk statement]' },
    consequence: { label: 'potential consequences', insert: '[AI-suggested consequences]' },
    currentControls: { label: 'current controls', insert: '[AI-suggested control]', list: true },
    additionalControls: { label: 'additional controls', insert: '[AI-suggested additional control]', list: true },
    kri: { label: 'key risk indicators', insert: '[AI-suggested indicator]', list: true }
  };

  var rail, opts, active = null;

  function card(title, sub, body, closable) {
    return '<div class="side-card"><div class="side-head"><h3>' + esc(title) + (sub ? '<span class="side-sub">' + esc(sub) + '</span>' : '') + '</h3>' +
      (closable ? '<button class="btn btn-ghost btn-icon btn-sm side-close" aria-label="Close">' + icon('x') + '</button>' : '') + '</div>' +
      '<div class="side-body">' + body + '</div></div>';
  }

  function renderGuidance() {
    active = null;
    rail.classList.remove('is-active');
    var g = opts.guidance();
    rail.innerHTML = g ? card(g.title, '', g.body, false) : '';
  }

  function renderAssist(el) {
    var key = el.getAttribute('data-assist'), f = FIELDS[key], ctx = opts.context(el);
    var used = el.value.indexOf(f.insert) > -1;
    var cards = '';
    for (var i = 0; i < 3; i++) {
      cards += '<div class="suggestion' + (used && i === 0 ? ' is-used' : '') + '">' + ERMIS.Shell.phLines([100, 90, 60]) +
        '<div>' + (used && i === 0 ? '<span class="suggestion-used">' + icon('check', 'icon-sm') + ' Added</span>' :
          '<button class="btn btn-sm" data-insert="' + i + '">' + icon(f.list ? 'plus' : 'insert', 'icon-sm') + (f.list ? 'Add' : 'Insert') + '</button>') + '</div></div>';
    }
    rail.classList.add('is-active');
    rail.innerHTML = card('ERMIS Assist', 'Suggestions for ' + (ctx.label ? ctx.label + ', ' : '') + f.label,
      '<p class="side-note">AI suggestions will be drafted here from past ERM reviews and SingHealth ERM guidance.</p>' + cards +
      (ctx.riskId ? '<button class="side-link" data-similar>' + icon('search', 'icon-sm') + '<span>Find similar risks in the register</span>' + icon('chevron-right', 'icon-sm') + '</button>' : '') +
      '<p class="side-note">' + icon('shield', 'icon-sm') + ' Draft only. Users review and edit every suggestion before use.</p>', true);

    u.qs('.side-close', rail).addEventListener('click', renderGuidance);
    u.qsa('[data-insert]', rail).forEach(function (b) {
      b.addEventListener('mousedown', function (e) { e.preventDefault(); });
      b.addEventListener('click', function () {
        if (f.list) el.value = el.value.trim() ? el.value.replace(/\s+$/, '') + '\n' + f.insert : f.insert;
        else el.value = f.insert;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        renderAssist(el);
      });
    });
    var sim = u.qs('[data-similar]', rail);
    if (sim) {
      sim.addEventListener('mousedown', function (e) { e.preventDefault(); });
      sim.addEventListener('click', function () { opts.onFindSimilar(ctx.riskId); });
    }
  }

  function init(railEl, options) {
    rail = railEl;
    opts = options;
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest && e.target.closest('[data-assist]');
      if (el && el !== active) { active = el; renderAssist(el); }
    });
  }

  return { init: init, reset: function () { if (rail) renderGuidance(); } };
})();
