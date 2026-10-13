/* ERMIS Assist: drafting suggestions for the focused review field.
   Suggestions are retrieved from the drafting library and ranked against the
   context of the risk being written (domain, statement, controls). */
window.ERMIS = window.ERMIS || {};

ERMIS.Assist = (function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon;
  var PAGE = 3;

  var FIELD_LABELS = {
    riskStatement: 'risk statement', consequence: 'potential consequences', currentControls: 'current controls',
    additionalControls: 'additional controls', kri: 'key indicators', objective: 'objective',
    description: 'description', vision: 'vision, mission or goal'
  };
  var LIST_FIELDS = { currentControls: true, additionalControls: true, kri: true };
  var DOMAIN_FIELDS = { riskStatement: true, consequence: true, currentControls: true, additionalControls: true, kri: true };

  var rail, opts, active = null, pages = {}, timer = null, suppressNext = false;

  function library(field, domain) {
    var S = ERMIS.SUGGESTIONS || { general: {}, byDomain: {} };
    var list = [];
    if (DOMAIN_FIELDS[field] && domain && S.byDomain[domain]) list = list.concat((S.byDomain[domain][field] || []).map(function (s) { return { s: s, tailored: true }; }));
    list = list.concat((S.general[field] || []).map(function (s) { return { s: s, tailored: false }; }));
    var seen = {};
    return list.filter(function (x) { if (seen[x.s]) return false; seen[x.s] = true; return true; });
  }

  function rank(list, context) {
    var ctx = {};
    ERMIS.Search.tokens(context).forEach(function (t) { ctx[t] = true; });
    return list.map(function (x, i) {
      var hits = 0;
      ERMIS.Search.tokens(x.s).forEach(function (t) { if (ctx[t]) hits++; });
      // Domain-tailored suggestions lead; context overlap orders within each group.
      return { s: x.s, score: (x.tailored ? 1000 : 0) + hits * 10 - i * 0.01 };
    }).sort(function (a, b) { return b.score - a.score; }).map(function (x) { return x.s; });
  }

  function comparableCount(domain) {
    if (!domain) return ERMIS.Store.register().length;
    return ERMIS.Store.register().filter(function (r) { return r.domain === domain; }).length;
  }

  function contains(text, s) {
    return String(text || '').toLowerCase().indexOf(String(s).toLowerCase()) > -1;
  }

  function keyFor(el) { return el.getAttribute('data-assist') + ':' + (el.getAttribute('data-risk-id') || el.id || ''); }

  function header(ctx) {
    return '<div class="assist-head"><span class="assist-mark">' + icon('sparkles') + '</span>' +
      '<div class="assist-title"><strong>ERMIS Assist</strong><span>' + esc(ctx ? 'Suggestions for ' + (ctx.label ? ctx.label + ', ' : '') + FIELD_LABELS[ctx.field] : 'Drafting help for this step') + '</span></div>' +
      '<button class="btn btn-ghost btn-icon btn-sm assist-close" aria-label="Close suggestions">' + icon('x') + '</button></div>';
  }

  function renderIdle() {
    active = null;
    rail.classList.remove('is-active');
    rail.innerHTML = '<div class="assist">' + header(null) + '<div class="assist-body">' + (opts.idle ? opts.idle() : '') + '</div></div>';
    bindCommon();
  }

  function renderLoading(ctx) {
    rail.innerHTML = '<div class="assist">' + header(ctx) +
      '<div class="assist-body"><div class="assist-status"><span class="assist-pulse"></span>Drafting suggestions from comparable risks</div>' +
      [0, 1, 2].map(function () { return '<div class="suggestion suggestion-skel"><div class="skeleton" style="height:12px;width:94%"></div><div class="skeleton" style="height:12px;width:80%;margin-top:8px"></div><div class="skeleton" style="height:12px;width:55%;margin-top:8px"></div></div>'; }).join('') +
      '</div></div>';
    bindCommon();
  }

  function renderSuggestions(el, ctx) {
    var all = rank(library(ctx.field, ctx.domain), ctx.context || '');
    var k = keyFor(el);
    var page = pages[k] || 0;
    var totalPages = Math.max(1, Math.ceil(all.length / PAGE));
    if (page >= totalPages) page = pages[k] = 0;
    var items = all.slice(page * PAGE, page * PAGE + PAGE);
    var isList = LIST_FIELDS[ctx.field];
    var current = el.value;

    var hint = '';
    if (DOMAIN_FIELDS[ctx.field] && !ctx.domain) {
      hint = '<div class="assist-hint">' + icon('info', 'icon-sm') + '<span>Select a risk domain to get suggestions tailored to it.</span></div>';
    }
    var source = DOMAIN_FIELDS[ctx.field] ?
      'Grounded in ' + comparableCount(ctx.domain) + ' comparable ' + (ctx.domain ? esc(ctx.domain) + ' ' : '') + 'risks and SingHealth ERM guidance' :
      'Based on past ERM reviews and SingHealth ERM guidance';

    var cards = items.map(function (s) {
      var used = contains(current, s);
      var actions = used ? '<span class="suggestion-used">' + icon('check', 'icon-sm') + 'Added</span>' :
        isList ? '<button class="btn btn-sm" data-act="append" data-text="' + esc(s) + '">' + icon('plus', 'icon-sm') + 'Add</button>' :
          '<button class="btn btn-sm" data-act="replace" data-text="' + esc(s) + '">' + icon('insert', 'icon-sm') + 'Insert</button>' +
          (current.trim() ? '<button class="btn btn-ghost btn-sm" data-act="append" data-text="' + esc(s) + '">Append</button>' : '');
      return '<div class="suggestion' + (used ? ' is-used' : '') + '"><p>' + esc(s) + '</p><div class="suggestion-actions">' + actions + '</div></div>';
    }).join('');

    rail.innerHTML = '<div class="assist">' + header(ctx) + '<div class="assist-body">' + hint +
      '<p class="assist-source">' + icon('layers', 'icon-sm') + '<span>' + source + '</span></p>' + cards +
      '<div class="assist-more"><button class="btn btn-ghost btn-sm" data-act="more">' + icon('refresh', 'icon-sm') + 'More suggestions</button>' +
      '<span class="muted num">' + (page + 1) + ' of ' + totalPages + '</span></div>' +
      (opts.onFindSimilar && DOMAIN_FIELDS[ctx.field] ? '<button class="assist-similar" data-act="similar">' + icon('search', 'icon-sm') + '<span>Find similar risks in the register</span>' + icon('chevron-right', 'icon-sm') + '</button>' : '') +
      '</div><p class="assist-disclaimer">' + icon('shield', 'icon-sm') + 'Draft only. Review and edit every suggestion before use.</p></div>';
    bindCommon();

    u.qsa('[data-act]', rail).forEach(function (b) {
      b.addEventListener('mousedown', function (e) { e.preventDefault(); });
      b.addEventListener('click', function () {
        var act = b.getAttribute('data-act');
        if (act === 'more') {
          pages[k] = (pages[k] || 0) + 1;
          renderLoading(ctx);
          clearTimeout(timer);
          timer = setTimeout(function () { renderSuggestions(el, ctx); }, 420);
          return;
        }
        if (act === 'similar') { opts.onFindSimilar(ctx, el); return; }
        var text = b.getAttribute('data-text');
        if (act === 'replace') el.value = text;
        else el.value = el.value.trim() ? el.value.replace(/\s+$/, '') + (isList ? '\n' : ' ') + text : text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        suppressNext = true;
        el.focus();
        if (el.setSelectionRange) el.setSelectionRange(el.value.length, el.value.length);
        renderSuggestions(el, opts.context(el));
      });
    });
  }

  function bindCommon() {
    var c = u.qs('.assist-close', rail);
    if (c) c.addEventListener('click', function () { renderIdle(); });
  }

  function activate(el) {
    if (suppressNext && el === active) { suppressNext = false; return; }
    suppressNext = false;
    var first = active !== el;
    active = el;
    rail.classList.add('is-active');
    var ctx = opts.context(el);
    if (!first) { renderSuggestions(el, ctx); return; }
    renderLoading(ctx);
    clearTimeout(timer);
    timer = setTimeout(function () { if (active === el) renderSuggestions(el, opts.context(el)); }, 650);
  }

  function init(railEl, options) {
    rail = railEl;
    opts = options;
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest && e.target.closest('[data-assist]');
      if (el) activate(el);
    });
    renderIdle();
  }

  function refreshIdle() { if (!active) renderIdle(); }
  function reset() { pages = {}; renderIdle(); }

  return { init: init, refreshIdle: refreshIdle, reset: reset, FIELD_LABELS: FIELD_LABELS };
})();
