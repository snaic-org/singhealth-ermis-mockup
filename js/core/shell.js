/* App shell: sidebar, topbar, toasts, modal, drawer, tooltip, reference library */
window.ERMIS = window.ERMIS || {};

ERMIS.Shell = (function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon;

  var BRAND_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6 4.6 5.4v6.1c0 4.9 3.2 8.4 7.4 9.9 4.2-1.5 7.4-5 7.4-9.9V5.4z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/><path d="M7.6 12.4h2.1l1.5-3.1 2 6 1.4-2.9h1.9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function brandHTML() {
    return '<a class="brand" href="dashboard.html"><span class="brand-mark">' + BRAND_SVG + '</span>' +
      '<span class="brand-text"><span class="brand-name">ERMIS</span><span class="brand-org">SingHealth Office of Risk Services</span></span></a>';
  }

  function sidebarHTML(active, user) {
    var drafts = ERMIS.Store.getReviews().filter(function (r) { return r.status === 'draft'; });
    var draftItems = drafts.slice(0, 4).map(function (r) {
      var p = ERMIS.Store.progress(r);
      var title = r.info.title || 'Untitled review';
      return '<a class="nav-draft" href="review.html?id=' + encodeURIComponent(r.id) + '">' +
        '<span class="nav-draft-title">' + esc(title) + '</span>' +
        '<span class="nav-draft-meta"><span class="mini-progress"><span style="width:' + Math.max(p.pct, 4) + '%"></span></span>' + p.pct + '%</span></a>';
    }).join('');

    function link(key, href, ic, label, extra) {
      return '<a class="nav-link' + (active === key ? ' is-active' : '') + '" href="' + href + '"' + (active === key ? ' aria-current="page"' : '') + '>' + icon(ic) + '<span>' + label + '</span>' + (extra || '') + '</a>';
    }

    return brandHTML() +
      '<nav class="nav" aria-label="Main">' +
      link('dashboard', 'dashboard.html', 'grid', 'Dashboard') +
      link('review', 'review.html?new=1', 'plus', 'New ERM review') +
      link('search', 'search.html', 'search', 'Risk search') +
      '</nav>' +
      (drafts.length ? '<div class="nav-section"><div class="nav-heading">Reviews in progress</div>' + draftItems + '</div>' : '') +
      '<div class="sidebar-foot">' +
      '<span class="classification">' + icon('lock', 'icon-sm') + 'Restricted, Sensitive (Normal)</span>' +
      '<button class="user-card" id="user-card" aria-haspopup="menu" aria-expanded="false">' +
      '<span class="avatar">' + esc(u.initials(user.name)) + '</span>' +
      '<span class="user-meta"><span class="user-name">' + esc(user.name) + '</span><span class="user-role">' + esc(user.role) + '</span></span>' +
      icon('chevron-up', 'icon-sm muted') + '</button></div>';
  }

  function topbarHTML(crumbs) {
    var c = (crumbs || []).map(function (cr, i, arr) {
      if (i === arr.length - 1) return '<span class="current">' + esc(cr.label) + '</span>';
      return '<a href="' + cr.href + '">' + esc(cr.label) + '</a>' + icon('chevron-right', 'icon-sm');
    }).join('');
    return '<button class="btn btn-ghost btn-icon topbar-menu" id="nav-toggle" aria-label="Open navigation">' + icon('menu') + '</button>' +
      '<div class="crumbs">' + c + '</div>' +
      '<form class="topbar-search input-group" id="global-search" role="search" action="search.html">' + icon('search') +
      '<input class="input" name="q" type="search" placeholder="Search risks by meaning, e.g. staff burnout in ICU" aria-label="Search risks" autocomplete="off"><kbd>/</kbd></form>';
  }

  var lastSidebarHTML = '';

  function mount(opts) {
    if (!ERMIS.Auth.guard()) return null;
    var user = ERMIS.Auth.user();
    var sidebar = u.qs('#sidebar'), topbar = u.qs('#topbar'), app = u.qs('#app');
    sidebar.innerHTML = lastSidebarHTML = sidebarHTML(opts.active, user);
    topbar.innerHTML = topbarHTML(opts.crumbs);
    if (!u.qs('.sidebar-scrim')) {
      var scrim = document.createElement('div');
      scrim.className = 'sidebar-scrim';
      app.appendChild(scrim);
      scrim.addEventListener('click', function () { app.classList.remove('nav-open'); });
    }
    u.qs('#nav-toggle').addEventListener('click', function () { app.classList.toggle('nav-open'); });

    var form = u.qs('#global-search');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = form.q.value.trim();
      location.href = 'search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && tag !== 'select' && !e.target.isContentEditable) {
        e.preventDefault();
        form.q.focus();
      }
    });

    bindUserMenu(sidebar, user);
    return user;
  }

  function bindUserMenu(sidebar, user) {
    var card = u.qs('#user-card', sidebar);
    function closeMenu() {
      var m = u.qs('#user-menu');
      if (m) m.remove();
      card.setAttribute('aria-expanded', 'false');
    }
    card.addEventListener('click', function (e) {
      e.stopPropagation();
      if (u.qs('#user-menu')) return closeMenu();
      var menu = document.createElement('div');
      menu.className = 'menu';
      menu.id = 'user-menu';
      menu.setAttribute('role', 'menu');
      menu.style.left = '12px';
      menu.style.right = '12px';
      menu.style.bottom = '64px';
      menu.innerHTML = '<div class="menu-head"><strong>' + esc(user.name) + '</strong><span>' + esc(user.email) + '</span></div>' +
        '<div class="menu-sep"></div>' +
        '<div class="menu-head"><span>' + esc(user.designation) + '<br>' + esc(ERMIS.REF.institutionName(user.institution)) + ', ' + esc(user.department) + '</span></div>' +
        '<div class="menu-sep"></div>' +
        '<button class="menu-item" role="menuitem" id="menu-logout">' + icon('logout') + 'Sign out</button>';
      sidebar.appendChild(menu);
      card.setAttribute('aria-expanded', 'true');
      u.qs('#menu-logout').addEventListener('click', ERMIS.Auth.logout);
    });
    document.addEventListener('click', function (e) {
      var m = u.qs('#user-menu');
      if (m && !m.contains(e.target) && !card.contains(e.target)) closeMenu();
    });
  }

  function refreshSidebar(active) {
    var user = ERMIS.Auth.user();
    if (!user) return;
    var sidebar = u.qs('#sidebar');
    var html = sidebarHTML(active, user);
    if (html === lastSidebarHTML) return;
    lastSidebarHTML = html;
    sidebar.innerHTML = html;
    bindUserMenu(sidebar, user);
  }

  /* ---------- Toast ---------- */
  function toast(message, ic) {
    var stack = u.qs('.toast-stack');
    if (!stack) { stack = document.createElement('div'); stack.className = 'toast-stack'; stack.setAttribute('aria-live', 'polite'); document.body.appendChild(stack); }
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = icon(ic || 'check-circle') + '<span>' + esc(message) + '</span>';
    stack.appendChild(t);
    setTimeout(function () { t.classList.add('is-leaving'); setTimeout(function () { t.remove(); }, 200); }, 3200);
  }

  /* ---------- Modal ---------- */
  function confirm(opts) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.className = 'overlay';
      ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-body"><h2 id="modal-title">' + esc(opts.title) + '</h2>' +
        (opts.html || '<p>' + esc(opts.message || '') + '</p>') + '</div><div class="modal-actions">' +
        '<button class="btn" data-act="cancel">' + esc(opts.cancelLabel || 'Cancel') + '</button>' +
        '<button class="btn ' + (opts.danger ? 'btn-danger-solid' : 'btn-primary') + '" data-act="ok">' + esc(opts.confirmLabel || 'Confirm') + '</button></div></div>';
      document.body.appendChild(ov);
      var prev = document.activeElement;
      u.qs('[data-act="ok"]', ov).focus();
      function close(v) { ov.remove(); document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); resolve(v); }
      function onKey(e) { if (e.key === 'Escape') close(false); }
      document.addEventListener('keydown', onKey);
      ov.addEventListener('click', function (e) {
        if (e.target === ov) return close(false);
        var act = e.target.closest('[data-act]');
        if (act) close(act.getAttribute('data-act') === 'ok');
      });
    });
  }

  /* ---------- Drawer ---------- */
  var openDrawerRef = null;
  function drawer(opts) {
    if (openDrawerRef) openDrawerRef.close();
    var ov = document.createElement('div');
    ov.className = 'drawer-overlay';
    var d = document.createElement('aside');
    d.className = 'drawer' + (opts.wide ? ' drawer-wide' : '');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', opts.title);
    d.innerHTML = '<div class="drawer-header"><div><h2>' + esc(opts.title) + '</h2>' + (opts.subtitle ? '<div class="drawer-sub">' + opts.subtitle + '</div>' : '') + '</div>' +
      '<button class="btn btn-ghost btn-icon btn-sm" data-close aria-label="Close">' + icon('x') + '</button></div>' +
      (opts.tabs || '') + '<div class="drawer-body"></div>';
    document.body.appendChild(ov);
    document.body.appendChild(d);
    var prev = document.activeElement;
    var ref = {
      el: d, body: u.qs('.drawer-body', d),
      close: function () {
        d.remove(); ov.remove(); document.removeEventListener('keydown', onKey);
        openDrawerRef = null;
        if (opts.onClose) opts.onClose();
        if (prev && prev.focus && document.contains(prev)) prev.focus({ preventScroll: true });
      }
    };
    function onKey(e) { if (e.key === 'Escape') ref.close(); }
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', ref.close);
    u.qs('[data-close]', d).addEventListener('click', ref.close);
    u.qs('[data-close]', d).focus();
    openDrawerRef = ref;
    return ref;
  }

  /* ---------- Tooltip ---------- */
  var tipEl = null;
  function tipShow(html, x, y) {
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tooltip'; tipEl.setAttribute('role', 'tooltip'); document.body.appendChild(tipEl); }
    tipEl.innerHTML = html;
    tipEl.classList.add('is-visible');
    var r = tipEl.getBoundingClientRect();
    var left = x + 14, top = y + 14;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top + r.height > window.innerHeight - 8) top = y - r.height - 14;
    tipEl.style.left = Math.max(8, left) + 'px';
    tipEl.style.top = Math.max(8, top) + 'px';
  }
  function tipHide() { if (tipEl) tipEl.classList.remove('is-visible'); }

  /* ---------- Reference library drawer ---------- */
  var LEVEL_KEYS = { 5: 'vh', 4: 'h', 3: 'm', 2: 'l', 1: 'neutral' };
  function levelChip(name, level) {
    return '<span class="chip chip-' + LEVEL_KEYS[level] + '">' + esc(name) + ' (' + level + ')</span>';
  }

  function refGlossary() {
    return ERMIS.REF.GLOSSARY.map(function (g) {
      return '<div class="ref-item"><h3>' + esc(g.term) + '</h3>' + g.def.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        (g.examples ? '<ul>' + g.examples.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    }).join('');
  }

  function refImpact(domain, catKey) {
    var cats = ERMIS.REF.IMPACT_CATEGORIES;
    var relevant = domain ? (ERMIS.REF.DOMAIN_IMPACT[domain] || []) : [];
    var current = catKey || relevant[0] || cats[0].key;
    var cat = cats.filter(function (c) { return c.key === current; })[0];
    var opts = cats.map(function (c) {
      return '<option value="' + c.key + '"' + (c.key === current ? ' selected' : '') + '>' + esc(c.name) + (relevant.indexOf(c.key) > -1 ? ' (suggested for ' + esc(domain) + ')' : '') + '</option>';
    }).join('');
    var rows = ERMIS.REF.IMPACT.slice(0, 5).map(function (lv, i) {
      return '<div class="ref-level">' + levelChip(lv.name, lv.level) + '<p>' + esc(cat.levels[i]) + '</p></div>';
    }).join('');
    return '<p class="ref-lead">Impact is a measure of severity. Rate it without considering any controls.</p>' +
      '<label class="field"><span class="field-label">Severity in terms of</span><select class="select" id="ref-impact-cat">' + opts + '</select></label>' +
      '<div class="ref-levels">' + rows + '</div>';
  }

  function refLikelihood() {
    return '<p class="ref-lead">Likelihood is a measure of probability, assessed over a 3-year horizon. Rate it without considering any controls.</p><div class="ref-levels">' +
      ERMIS.REF.LIKELIHOOD.slice(0, 5).map(function (lv) {
        return '<div class="ref-level">' + levelChip(lv.name, lv.level) + '<ul>' + lv.desc.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>';
  }

  function refEffectiveness() {
    return '<p class="ref-lead">Measures the effectiveness of current controls in reducing the risk.</p>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>Scale</th><th>Description</th><th>Definition</th></tr></thead><tbody>' +
      ERMIS.REF.EFFECTIVENESS.map(function (e) {
        return '<tr><td><strong>' + esc(e.name) + '</strong> <span class="muted">(' + e.scale + ')</span></td><td class="num">' + esc(e.desc) + '</td><td>' + esc(e.def) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<h3 class="ref-subhead">Additional controls</h3><p class="ref-lead">In Step 4, rate how the additional controls change overall control effectiveness, from "Maximum effectiveness" to "Control removed". Improvements close part of the remaining gap; decreases reduce current effectiveness proportionally.</p>';
  }

  function refDomains(domain) {
    return ERMIS.REF.DOMAINS.map(function (d, i) {
      return '<div class="ref-item' + (d.name === domain ? ' is-highlight' : '') + '"><h3><span class="muted num">' + (i + 1) + '.</span> ' + esc(d.name) + '</h3><p>' + esc(d.desc) + '</p></div>';
    }).join('');
  }

  function refRating() {
    var R = ERMIS.Rating, REF = ERMIS.REF;
    var cols = REF.LIKELIHOOD.slice(0, 5).slice().reverse();
    var grid = '<div class="ref-matrix" role="table" aria-label="Risk rating matrix"><div class="ref-matrix-y">Impact</div><div class="ref-matrix-grid">';
    REF.IMPACT.slice(0, 5).forEach(function (im) {
      grid += '<div class="ref-matrix-rowlabel">' + esc(im.name) + '</div>';
      cols.forEach(function (lk) {
        var b = R.bandFor(im.level, lk.level);
        grid += '<div class="ref-matrix-cell band-' + R.bandKey(b) + '" title="' + esc(im.name + ' × ' + lk.name + ': ' + b) + '">' + esc(b) + '</div>';
      });
    });
    grid += '<div></div>' + cols.map(function (lk) { return '<div class="ref-matrix-collabel">' + esc(lk.name) + '</div>'; }).join('') + '</div><div class="ref-matrix-x">Likelihood</div></div>';

    var actions = REF.RECOMMENDED_ACTION.map(function (a) {
      return '<div class="ref-item"><h3>' + a.bands.map(function (b) { return u.bandChip(b); }).join(' ') + '</h3><ul>' +
        a.response.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><p class="muted">Recommended timeline for review: ' + esc(a.timeline) + '</p></div>';
    }).join('');

    var adequacy = '<div class="ref-adequacy">' +
      '<div><span class="chip chip-under">Under-controlled</span><span class="num">10 and above</span></div>' +
      '<div><span class="chip chip-pot-under">Potentially under-controlled</span><span class="num">5 to 9.9</span></div>' +
      '<div><span class="chip chip-adequate">Adequately controlled</span><span class="num">1.25 to 4.9</span></div>' +
      '<div><span class="chip chip-pot-over">Potentially over-controlled</span><span class="num">Below 1.25</span></div></div>';

    return '<h3 class="ref-subhead">Risk heat map</h3><p class="ref-lead">Inherent risk level from impact and likelihood, before controls.</p>' + grid +
      '<h3 class="ref-subhead">Control adequacy rating</h3><p class="ref-lead">The risk rating in Steps 3 and 4 is calculated from impact, likelihood and control effectiveness: <strong>(Impact score + Likelihood score) × (1 − Control effectiveness)</strong>. Impact scores 3 to 15, likelihood scores 2 to 10.</p>' + adequacy +
      '<p class="ref-lead">For under-controlled or potentially under-controlled risks, the team should work on implementing additional controls to further mitigate the risk.</p>' +
      '<h3 class="ref-subhead">Recommended response and action</h3>' + actions;
  }

  var REF_TABS = [
    { key: 'glossary', label: 'Glossary' },
    { key: 'impact', label: 'Impact' },
    { key: 'likelihood', label: 'Likelihood' },
    { key: 'effectiveness', label: 'Effectiveness' },
    { key: 'domains', label: 'Risk domains' },
    { key: 'rating', label: 'Rating & action' }
  ];

  function openReference(tab, ctx) {
    ctx = ctx || {};
    var active = tab || 'glossary';
    var tabs = '<div class="tabs" role="tablist">' + REF_TABS.map(function (t) {
      return '<button class="tab' + (t.key === active ? ' is-active' : '') + '" role="tab" data-tab="' + t.key + '">' + t.label + '</button>';
    }).join('') + '</div>';
    var d = drawer({ title: 'Instructions & references', subtitle: 'SingHealth ERM Tool reference sets', tabs: tabs, wide: true });
    function render(key) {
      active = key;
      u.qsa('.tab', d.el).forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-tab') === key); });
      var html = key === 'glossary' ? refGlossary() : key === 'impact' ? refImpact(ctx.domain) : key === 'likelihood' ? refLikelihood() :
        key === 'effectiveness' ? refEffectiveness() : key === 'domains' ? refDomains(ctx.domain) : refRating();
      d.body.innerHTML = '<div class="ref">' + html + '</div>';
      d.body.scrollTop = 0;
      bindImpactCategory();
      var hl = u.qs('.is-highlight', d.body);
      if (hl) hl.scrollIntoView({ block: 'center' });
    }
    function bindImpactCategory() {
      var sel = u.qs('#ref-impact-cat', d.body);
      if (!sel) return;
      sel.addEventListener('change', function () {
        d.body.innerHTML = '<div class="ref">' + refImpact(ctx.domain, sel.value) + '</div>';
        bindImpactCategory();
        u.qs('#ref-impact-cat', d.body).focus();
      });
    }
    u.qsa('.tab', d.el).forEach(function (b) { b.addEventListener('click', function () { render(b.getAttribute('data-tab')); }); });
    render(active);
    return d;
  }

  return {
    mount: mount, refreshSidebar: refreshSidebar, toast: toast, confirm: confirm, drawer: drawer,
    tooltip: { show: tipShow, hide: tipHide }, openReference: openReference, BRAND_SVG: BRAND_SVG
  };
})();
