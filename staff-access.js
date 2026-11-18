/* Static browser-only demo access. Not authentication or security. */
(function () {
  'use strict';
  const KEY = 'oaklands_staff_demo_session';
  const loginPage = /(?:^|\/)staff-login\.html$/i.test(location.pathname);
  const editorPage = /(?:^|\/)staff-demo\.html$/i.test(location.pathname);
  function signedIn() { try { return sessionStorage.getItem(KEY) === 'yes'; } catch { return false; } }
  if (editorPage && !signedIn()) {
    // A visual demonstration of access flow only; client-side redirects are not access controls.
    location.replace('staff-login.html');
    return;
  }
  if (loginPage) {
    const form = document.getElementById('demo-login-form');
    form?.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const code = document.getElementById('login-code').value.trim();
      const feedback = document.getElementById('login-feedback');
      if (email !== 'demo@oaklands-preview.local' || code !== 'DEMO2026') {
        feedback.textContent = 'Use the demonstration details displayed in the form.';
        return;
      }
      try { sessionStorage.setItem(KEY, 'yes'); }
      catch { feedback.textContent = 'Browser session storage is disabled; enable it to use this demo.'; return; }
      location.href = 'staff-demo.html';
    });
  }
  if (editorPage) {
    document.getElementById('demo-sign-out')?.addEventListener('click', function () {
      try { sessionStorage.removeItem(KEY); } catch {}
      location.href = 'staff-login.html';
    });
  }
})();
