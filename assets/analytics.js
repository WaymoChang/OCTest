(function () {
  const KEY = 'octest.analytics.v1';
  const MAX_EVENTS = 200;

  const nowIso = () => new Date().toISOString();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }

  function bump(obj, key) {
    obj[key] = (obj[key] || 0) + 1;
  }

  function track(type, data) {
    const state = load();
    state.updatedAt = nowIso();
    state.pageviews = state.pageviews || {};
    state.events = state.events || [];

    if (type === 'pageview') {
      bump(state.pageviews, data.path);
    }

    state.events.push({ type, ts: Date.now(), ...data });
    if (state.events.length > MAX_EVENTS) {
      state.events = state.events.slice(state.events.length - MAX_EVENTS);
    }

    save(state);

    if (window.OCTEST_ANALYTICS_ENDPOINT && navigator.sendBeacon) {
      try {
        const payload = JSON.stringify({ type, at: nowIso(), ...data });
        navigator.sendBeacon(window.OCTEST_ANALYTICS_ENDPOINT, new Blob([payload], { type: 'application/json' }));
      } catch {}
    }
  }

  function setupClickTracking() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a,button');
      if (!a) return;
      const label = a.getAttribute('data-track') || a.textContent?.trim()?.slice(0, 80) || 'unknown';
      track('click', {
        path: location.pathname,
        label,
        target: a.tagName.toLowerCase(),
        href: a.getAttribute('href') || null,
      });
    }, { passive: true });
  }

  function init() {
    track('pageview', {
      path: location.pathname,
      referrer: document.referrer || null,
      title: document.title,
    });
    setupClickTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
