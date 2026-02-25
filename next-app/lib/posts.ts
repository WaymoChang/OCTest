import fs from "node:fs";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  sourceDate?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  [key: string]: any;
};

const postsPath = path.join(
  process.cwd(),
  "..",
  "blog",
  "assets",
  "posts.json"
);

export function getAllPosts(): Post[] {
  const raw = fs.readFileSync(postsPath, "utf-8");
  const data = JSON.parse(raw) as Post[];
  return data;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
