(function () {
  var u = ERMIS.u;
  ERMIS.Shell.banner();

  var next = u.param('next');
  function destination() { return next && /^[a-z]+\.html(\?.*)?$/i.test(next) ? next : 'dashboard.html'; }
  if (ERMIS.Auth.user()) { location.replace(destination()); return; }

  var form = u.qs('#login-form'), err = u.qs('#login-error');
  ['email', 'password'].forEach(function (n) {
    form[n].addEventListener('input', function () { u.qs('#f-' + n).classList.remove('has-error'); err.classList.add('hidden'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.email.value.trim(), password = form.password.value;
    u.qs('#f-email').classList.toggle('has-error', !email);
    u.qs('#f-password').classList.toggle('has-error', !password);
    if (!email || !password) return;
    var btn = u.qs('#login-submit');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Signing in';
    setTimeout(function () {
      if (ERMIS.Auth.login(email, password, true)) { location.href = destination(); return; }
      btn.disabled = false;
      btn.textContent = 'Sign in';
      err.innerHTML = u.icon('alert') + '<span>The email address or password is incorrect.</span>';
      err.classList.remove('hidden');
    }, 400);
  });
})();
