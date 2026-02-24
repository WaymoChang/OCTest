(function () {
  const baseUrl = 'https://waymochang.github.io/OCTest';
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const defaults = {
    siteName: 'OCTest',
    description: '一个实验性静态站点，用来验证从想法到上线的闭环，并展示博客、分析页与版本记录。',
    defaultTitle: 'OCTest · 想法到上线的实验站',
    defaultImage: `${normalizedBase}/assets/og-image.png`,
    locale: 'zh-CN',
    twitterHandle: '@WaymoChang',
    buildYear: new Date().getFullYear(),
  };

  const ensureMeta = (selector, key, value) => {
    if (!value) return null;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const attr = selector.includes('[property=') ? 'property' : 'name';
      const attrValue = selector.match(/\[(?:name|property)=\\\"([^\\\"]+)\\\"]/)?.[1];
      if (attr && attrValue) {
        el.setAttribute(attr, attrValue);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
    return el;
  };

  const setMeta = (name, value, attr = 'name') => {
    if (!value) return;
    const selector = `${attr === 'property' ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]'}`;
    ensureMeta(selector, name, value);
  };

  const upsertLink = (rel, href) => {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  const resolveUrl = (value) => {
    if (!value) return `${normalizedBase}/`;
    try {
      return new URL(value, `${normalizedBase}/`).toString();
    } catch {
      return `${normalizedBase}/`;
    }
  };

  const applySeoMetadata = (overrides = {}) => {
    const title = overrides.title || defaults.defaultTitle;
    const description = overrides.description || defaults.description;
    const url = resolveUrl(overrides.url || overrides.canonical || '');
    const image = resolveUrl(overrides.image || defaults.defaultImage);
    const ogType = overrides.ogType || 'website';
    document.title = title;
    upsertLink('canonical', overrides.canonical || url);
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:site_name', defaults.siteName, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:locale', defaults.locale, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:site', defaults.twitterHandle);
    setMeta('keywords', overrides.keywords || 'OCTest, Blog, AI, AgeTech, Tech Analysis');
  };

  const injectStructuredData = (payload) => {
    if (!payload) return;
    let existing = document.head.querySelector('script[data-seo-jsonld="true"]');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(payload, null, 2);
    document.head.appendChild(script);
  };

  window.applySeoMetadata = applySeoMetadata;
  window.injectStructuredData = injectStructuredData;
  window.OCTestSeo = { defaults, apply: applySeoMetadata, injectStructuredData };
})();
