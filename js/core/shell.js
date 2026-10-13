/* Wireframe shell: concept notice, sidebar, top bar, toast, modal, drawer */
window.ERMIS = window.ERMIS || {};

ERMIS.Shell = (function () {
  var u = ERMIS.u, esc = u.esc, icon = u.icon;
  var NOTICE = 'Concept wireframe for discussion only. All content is placeholder and does not represent real data or the final design.';

  function banner() {
    if (u.qs('.concept-banner')) return;
    var b = document.createElement('div');
    b.className = 'concept-banner';
    b.setAttribute('role', 'note');
    b.innerHTML = icon('info', 'icon-sm') + '<span>' + NOTICE + '</span>';
    document.body.insertBefore(b, document.body.firstChild);
  }

  function sidebarHTML(active) {
    function link(key, href, label) {
      return '<a class="nav-link' + (active === key ? ' is-active' : '') + '" href="' + href + '"' + (active === key ? ' aria-current="page"' : '') + '><span class="ph-sq"></span>' + label + '</a>';
    }
    return '<a class="brand" href="dashboard.html"><span class="ph-sq ph-sq-lg"></span><span><span class="brand-name">ERMIS</span><span class="brand-org">Office of Risk Services</span></span></a>' +
      '<nav class="nav" aria-label="Main">' +
      link('dashboard', 'dashboard.html', 'Dashboard') +
      link('review', 'review.html?new=1', 'New ERM review') +
      link('search', 'search.html', 'Risk search') +
      '</nav><div class="nav-divider"></div>' +
      '<div class="nav-heading">Reviews in progress</div>' +
      '<div class="nav-ph"><span class="ph-sq"></span><span class="ph ph-w80"></span></div>' +
      '<div class="nav-ph"><span class="ph-sq"></span><span class="ph ph-w60"></span></div>';
  }

  function topbarHTML(crumbs) {
    var c = (crumbs || []).map(function (cr, i, arr) {
      if (i === arr.length - 1) return '<span class="current">' + esc(cr.label) + '</span>';
      return '<a href="' + cr.href + '">' + esc(cr.label) + '</a>' + icon('chevron-right', 'icon-sm');
    }).join('');
    return '<button class="btn btn-ghost btn-icon topbar-menu" id="nav-toggle" aria-label="Open navigation">' + icon('menu') + '</button>' +
      '<div class="crumbs">' + c + '</div>' +
      '<form class="topbar-search input-group" id="global-search" role="search">' + icon('search') +
      '<input class="input" name="q" type="search" placeholder="Search..." aria-label="Search risks" autocomplete="off"></form>' +
      '<button class="avatar-btn" id="avatar" aria-haspopup="menu" aria-expanded="false" aria-label="Account"><span class="ph-circle"></span></button>';
  }

  function mount(opts) {
    if (!ERMIS.Auth.guard()) return null;
    banner();
    var app = u.qs('#app');
    u.qs('#sidebar').innerHTML = sidebarHTML(opts.active);
    u.qs('#topbar').innerHTML = topbarHTML(opts.crumbs);

    var scrim = document.createElement('div');
    scrim.className = 'sidebar-scrim';
    app.appendChild(scrim);
    scrim.addEventListener('click', function () { app.classList.remove('nav-open'); });
    u.qs('#nav-toggle').addEventListener('click', function () { app.classList.toggle('nav-open'); });

    var form = u.qs('#global-search');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = form.q.value.trim();
      location.href = 'search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });

    var av = u.qs('#avatar');
    function closeMenu() { var m = u.qs('#user-menu'); if (m) m.remove(); av.setAttribute('aria-expanded', 'false'); }
    av.addEventListener('click', function (e) {
      e.stopPropagation();
      if (u.qs('#user-menu')) return closeMenu();
      var menu = document.createElement('div');
      menu.className = 'menu';
      menu.id = 'user-menu';
      menu.setAttribute('role', 'menu');
      menu.innerHTML = '<div class="menu-head">Signed in</div><div class="menu-sep"></div>' +
        '<button class="menu-item" role="menuitem" id="menu-logout">' + icon('logout') + 'Sign out</button>';
      av.appendChild(menu);
      av.setAttribute('aria-expanded', 'true');
      u.qs('#menu-logout').addEventListener('click', function (ev) { ev.stopPropagation(); ERMIS.Auth.logout(); });
    });
    document.addEventListener('click', function (e) { if (!av.contains(e.target)) closeMenu(); });
    return ERMIS.Auth.user();
  }

  function toast(message) {
    var stack = u.qs('.toast-stack');
    if (!stack) { stack = document.createElement('div'); stack.className = 'toast-stack'; stack.setAttribute('aria-live', 'polite'); document.body.appendChild(stack); }
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = icon('check-circle') + '<span>' + esc(message) + '</span>';
    stack.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  function confirm(opts) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.className = 'overlay';
      ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-body"><h2 id="modal-title">' + esc(opts.title) + '</h2><p>' + esc(opts.message || '') + '</p></div>' +
        '<div class="modal-actions"><button class="btn" data-act="cancel">Cancel</button><button class="btn btn-primary" data-act="ok">' + esc(opts.confirmLabel || 'Confirm') + '</button></div></div>';
      document.body.appendChild(ov);
      u.qs('[data-act="ok"]', ov).focus();
      function close(v) { ov.remove(); document.removeEventListener('keydown', onKey); resolve(v); }
      function onKey(e) { if (e.key === 'Escape') close(false); }
      document.addEventListener('keydown', onKey);
      ov.addEventListener('click', function (e) {
        if (e.target === ov) return close(false);
        var a = e.target.closest('[data-act]');
        if (a) close(a.getAttribute('data-act') === 'ok');
      });
    });
  }

  var openRef = null;
  function drawer(opts) {
    if (openRef) openRef.close();
    var ov = document.createElement('div');
    ov.className = 'drawer-overlay';
    var d = document.createElement('aside');
    d.className = 'drawer';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', opts.title);
    d.innerHTML = '<div class="drawer-header"><div><h2>' + esc(opts.title) + '</h2>' + (opts.subtitle ? '<div class="drawer-sub">' + esc(opts.subtitle) + '</div>' : '') + '</div>' +
      '<button class="btn btn-ghost btn-icon btn-sm" data-close aria-label="Close">' + icon('x') + '</button></div>' + (opts.tabs || '') + '<div class="drawer-body"></div>';
    document.body.appendChild(ov);
    document.body.appendChild(d);
    var ref = {
      el: d, body: u.qs('.drawer-body', d),
      close: function () { d.remove(); ov.remove(); document.removeEventListener('keydown', onKey); openRef = null; }
    };
    function onKey(e) { if (e.key === 'Escape') ref.close(); }
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', ref.close);
    u.qs('[data-close]', d).addEventListener('click', ref.close);
    u.qs('[data-close]', d).focus();
    openRef = ref;
    return ref;
  }

  // Placeholder blocks used across pages.
  function phLines(widths) {
    return '<div class="ph-stack">' + widths.map(function (w) { return '<span class="ph ph-w' + w + '"></span>'; }).join('') + '</div>';
  }

  var REF_TABS = ['Glossary', 'Impact', 'Likelihood', 'Effectiveness', 'Risk domains', 'Rating & action'];
  function openReference() {
    var tabs = '<div class="tabs" role="tablist">' + REF_TABS.map(function (t, i) {
      return '<button class="tab' + (i === 0 ? ' is-active' : '') + '" role="tab" data-tab="' + i + '">' + t + '</button>';
    }).join('') + '</div>';
    var d = drawer({ title: 'Instructions & references', subtitle: 'Reference sets from the SingHealth ERM Tool', tabs: tabs });
    function render(i) {
      u.qsa('.tab', d.el).forEach(function (b) { b.classList.toggle('is-active', +b.getAttribute('data-tab') === i); });
      var blocks = '';
      for (var k = 0; k < 4; k++) blocks += '<div class="ref-ph"><span class="ph ph-lg ph-w40"></span>' + phLines([100, 90, 70]) + '</div>';
      d.body.innerHTML = '<p class="secondary" style="margin-bottom:14px">' + esc(REF_TABS[i]) + ' content from the ERM Tool will appear here.</p>' + blocks;
    }
    u.qsa('.tab', d.el).forEach(function (b) { b.addEventListener('click', function () { render(+b.getAttribute('data-tab')); }); });
    render(0);
  }

  return { mount: mount, banner: banner, toast: toast, confirm: confirm, drawer: drawer, phLines: phLines, openReference: openReference };
})();
