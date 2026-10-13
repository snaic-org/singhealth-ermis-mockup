/* Sign-in for the pilot portal (single pilot account). */
window.ERMIS = window.ERMIS || {};

ERMIS.Auth = (function () {
  var KEY = 'ermis.session';
  var ACCOUNT = {
    email: 'risk.coordinator@singhealth.com.sg',
    password: 'Ermis@2026',
    profile: { email: 'risk.coordinator@singhealth.com.sg' }
  };

  function storageGet() {
    try { return localStorage.getItem(KEY) || sessionStorage.getItem(KEY); } catch (e) { return null; }
  }

  function login(email, password, remember) {
    if (String(email).trim().toLowerCase() !== ACCOUNT.email || password !== ACCOUNT.password) return false;
    var token = JSON.stringify({ email: ACCOUNT.email, at: Date.now() });
    try {
      (remember ? localStorage : sessionStorage).setItem(KEY, token);
    } catch (e) { /* storage unavailable */ }
    return true;
  }

  function logout() {
    try { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    location.href = 'index.html';
  }

  function user() { return storageGet() ? ACCOUNT.profile : null; }

  function guard() {
    if (!storageGet()) {
      var next = location.pathname.split('/').pop() + location.search;
      location.replace('index.html?next=' + encodeURIComponent(next));
      return false;
    }
    return true;
  }

  return { login: login, logout: logout, user: user, guard: guard };
})();
