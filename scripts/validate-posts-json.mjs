import fs from 'node:fs';

const path = 'blog/assets/posts.json';
const raw = fs.readFileSync(path, 'utf8');
let posts;

try {
  posts = JSON.parse(raw);
} catch (e) {
  console.error(`❌ Invalid JSON: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(posts)) {
  console.error('❌ posts.json must be an array');
  process.exit(1);
}

const required = ['slug', 'title', 'date', 'author', 'excerpt', 'content'];
const slugSet = new Set();
let hasError = false;

for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const at = `post[${i}]`;

  if (!p || typeof p !== 'object' || Array.isArray(p)) {
    console.error(`❌ ${at} must be an object`);
    hasError = true;
    continue;
  }

  for (const key of required) {
    if (!(key in p)) {
      console.error(`❌ ${at} missing required field: ${key}`);
      hasError = true;
    }
  }

  if (typeof p.slug !== 'string' || !p.slug.trim()) {
    console.error(`❌ ${at}.slug must be a non-empty string`);
    hasError = true;
  } else if (slugSet.has(p.slug)) {
    console.error(`❌ Duplicate slug: ${p.slug}`);
    hasError = true;
  } else {
    slugSet.add(p.slug);
  }

  if (typeof p.title !== 'string' || !p.title.trim()) {
    console.error(`❌ ${at}.title must be a non-empty string`);
    hasError = true;
  }

  if (typeof p.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) {
    console.error(`❌ ${at}.date must match YYYY-MM-DD`);
    hasError = true;
  }


  if (p.sourceDate != null && (typeof p.sourceDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.sourceDate))) {
    console.error(`❌ ${at}.sourceDate must match YYYY-MM-DD when provided`);
    hasError = true;
  }

  if (typeof p.author !== 'string' || !p.author.trim()) {
    console.error(`❌ ${at}.author must be a non-empty string`);
    hasError = true;
  }

  if (typeof p.excerpt !== 'string' || !p.excerpt.trim()) {
    console.error(`❌ ${at}.excerpt must be a non-empty string`);
    hasError = true;
  }

  if (!Array.isArray(p.content) || p.content.some((x) => typeof x !== 'string')) {
    console.error(`❌ ${at}.content must be an array of strings`);
    hasError = true;
  }
}

if (hasError) process.exit(1);
console.log(`✅ posts.json valid (${posts.length} posts)`);
