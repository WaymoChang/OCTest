(function () {
  const KEY = 'octest.analytics.v1';
  const MAX_EVENTS = 300;
  const cfg = window.OCTEST_ANALYTICS_CONFIG || { provider: 'local-only', enabled: false };

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

  function appendEvent(type, data) {
    const state = load();
    state.updatedAt = nowIso();
    state.pageviews = state.pageviews || {};
    state.events = state.events || [];
    state.byReferrer = state.byReferrer || {};
    state.byUtmSource = state.byUtmSource || {};

    if (type === 'pageview') {
      bump(state.pageviews, data.path);
      if (data.refHost) bump(state.byReferrer, data.refHost);
      if (data.utmSource) bump(state.byUtmSource, data.utmSource);
    }

    state.events.push({ type, ts: Date.now(), ...data });
    if (state.events.length > MAX_EVENTS) {
      state.events = state.events.slice(state.events.length - MAX_EVENTS);
    }

    save(state);
  }

  function injectPlausible() {
    if (!cfg.enabled || cfg.provider !== 'plausible') return;
    if (window.__OCTEST_PLAUSIBLE_LOADED__) return;

    const p = cfg.plausible || {};
    if (!p.domain || !p.scriptUrl) return;

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = p.domain;
    script.src = p.scriptUrl;
    if (p.trackOutboundLinks) script.setAttribute('data-api', '');
    document.head.appendChild(script);
    window.__OCTEST_PLAUSIBLE_LOADED__ = true;
  }

  function sendRemote(type, data) {
    // Optional generic endpoint
    if (window.OCTEST_ANALYTICS_ENDPOINT && navigator.sendBeacon) {
      try {
        const payload = JSON.stringify({ type, at: nowIso(), ...data });
        navigator.sendBeacon(window.OCTEST_ANALYTICS_ENDPOINT, new Blob([payload], { type: 'application/json' }));
      } catch {}
    }

    // Plausible custom event
    if (cfg.enabled && cfg.provider === 'plausible' && typeof window.plausible === 'function') {
      try {
        const name = type === 'pageview' ? 'pageview_plus' : type;
        window.plausible(name, { props: data });
      } catch {}
    }
  }

  function track(type, data) {
    appendEvent(type, data);
    sendRemote(type, data);
  }

  function parseCampaign() {
    const qs = new URLSearchParams(location.search);
    return {
      utmSource: qs.get('utm_source') || null,
      utmMedium: qs.get('utm_medium') || null,
      utmCampaign: qs.get('utm_campaign') || null,
    };
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
    injectPlausible();

    const refHost = (() => {
      try { return document.referrer ? new URL(document.referrer).host : null; } catch { return null; }
    })();

    track('pageview', {
      path: location.pathname,
      referrer: document.referrer || null,
      refHost,
      title: document.title,
      ...parseCampaign(),
    });

    setupClickTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
