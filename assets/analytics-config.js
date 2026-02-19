window.OCTEST_ANALYTICS_CONFIG = {
  // local-only | plausible
  provider: 'local-only',
  enabled: false,

  // Plausible settings (used when provider='plausible' and enabled=true)
  plausible: {
    domain: 'waymochang.github.io',
    scriptUrl: 'https://plausible.io/js/script.js',
    trackOutboundLinks: true,
    taggedEvents: true,
  },
};
