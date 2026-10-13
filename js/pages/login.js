(function () {
  var u = ERMIS.u;

  var next = u.param('next');
  function destination() {
    return next && /^[a-z]+\.html(\?.*)?$/i.test(next) ? next : 'dashboard.html';
  }
  if (ERMIS.Auth.user()) { location.replace(destination()); return; }

  u.qs('#brand-mark').innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6 4.6 5.4v6.1c0 4.9 3.2 8.4 7.4 9.9 4.2-1.5 7.4-5 7.4-9.9V5.4z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/><path d="M7.6 12.4h2.1l1.5-3.1 2 6 1.4-2.9h1.9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  u.qsa('[data-icon]').forEach(function (el) { el.outerHTML = u.icon(el.getAttribute('data-icon')); });

  // Decorative risk matrix, drawn from the SingHealth rating matrix.
  var m = '';
  [5, 4, 3, 2, 1].forEach(function (i) {
    [1, 2, 3, 4, 5].forEach(function (l) {
      m += '<span class="lm-cell band-' + ERMIS.Rating.bandKey(ERMIS.Rating.bandFor(i, l)) + '" style="animation-delay:' + ((5 - i) * 60 + l * 60) + 'ms"></span>';
    });
  });
  u.qs('#login-matrix').innerHTML = m;

  var form = u.qs('#login-form');
  var pw = form.password;
  var toggle = u.qs('#pw-toggle');
  function setToggle() {
    var shown = pw.type === 'text';
    toggle.innerHTML = u.icon(shown ? 'eye-off' : 'eye');
    toggle.setAttribute('aria-label', shown ? 'Hide password' : 'Show password');
  }
  setToggle();
  toggle.addEventListener('click', function () { pw.type = pw.type === 'password' ? 'text' : 'password'; setToggle(); pw.focus(); });

  var err = u.qs('#login-error');
  ['email', 'password'].forEach(function (n) {
    form[n].addEventListener('input', function () { u.qs('#f-' + n).classList.remove('has-error'); err.classList.add('hidden'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.email.value.trim(), password = pw.value;
    u.qs('#f-email').classList.toggle('has-error', !email);
    u.qs('#f-password').classList.toggle('has-error', !password);
    if (!email || !password) { (email ? pw : form.email).focus(); return; }

    var btn = u.qs('#login-submit');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Signing in';
    setTimeout(function () {
      if (ERMIS.Auth.login(email, password, form.remember.checked)) {
        location.href = destination();
        return;
      }
      btn.disabled = false;
      btn.textContent = 'Sign in';
      err.innerHTML = u.icon('alert') + '<span>The email address or password is incorrect. Check your details and try again.</span>';
      err.classList.remove('hidden');
      pw.select();
    }, 650);
  });
})();
