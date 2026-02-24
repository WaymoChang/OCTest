import fs from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = resolve(__dirname, '../blog/assets/posts.json');
const sitemapPath = resolve(__dirname, '../sitemap.xml');
const raw = await fs.promises.readFile(postsPath, 'utf-8');
const posts = JSON.parse(raw);

const baseUrl = (process.env.SITE_URL || 'https://waymochang.github.io/OCTest').replace(/\/+$/,'');
const today = new Date().toISOString();

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/index.html', priority: '1.0', changefreq: 'daily' },
  { path: '/pages/about.html', priority: '0.6', changefreq: 'monthly' },
  { path: '/pages/changelog.html', priority: '0.5', changefreq: 'monthly' },
  { path: '/pages/contact.html', priority: '0.5', changefreq: 'monthly' },
  { path: '/pages/analytics.html', priority: '0.3', changefreq: 'monthly' },
  { path: '/blog/index.html', priority: '0.8', changefreq: 'weekly' },
];

const uniq = new Set();
const entries = [];

const makeUrl = (path) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
};

staticPages.forEach((page) => {
  const url = makeUrl(page.path);
  if (uniq.has(url)) return;
  uniq.add(url);
  entries.push({ url, changefreq: page.changefreq, priority: page.priority, lastmod: today });
});

posts.forEach((post) => {
  if (!post.slug) return;
  const slugUrl = `${baseUrl}/blog/post.html?slug=${encodeURIComponent(post.slug)}`;
  if (uniq.has(slugUrl)) return;
  uniq.add(slugUrl);
  const lastmod = post.sourceDate || post.date || today;
  entries.push({ url: slugUrl, changefreq: 'monthly', priority: '0.5', lastmod: new Date(lastmod).toISOString().slice(0, 10) });
});

const urlset = entries
  .map((entry) => `  <url>\n    <loc>${entry.url}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`)
  .join('\n');

const content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
await fs.promises.writeFile(sitemapPath, content, 'utf-8');
console.log(`Generated sitemap with ${entries.length} entries at ${sitemapPath}`);
