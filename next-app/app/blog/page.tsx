import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";
import { getAllPosts } from "../../lib/posts";

export const dynamic = "force-static";

function fmtDate(d?: string) {
  if (!d) return "";
  const t = new Date(`${d}T00:00:00`).getTime();
  if (!t) return "";
  return new Date(t).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const sortedPosts = [...posts].sort((a, b) => {
    const da = new Date((a.sourceDate || a.date || "") + "T00:00:00").getTime() || 0;
    const db = new Date((b.sourceDate || b.date || "") + "T00:00:00").getTime() || 0;
    return db - da;
  });

  return (
    <>
      <header className="topbar">
        <Link className="brand" href="/">
          ← OCTest
        </Link>
        <h1>Blog 列表</h1>
        <ThemeToggle />
      </header>

      <main className="container">
        <section className="intro">
          <p>这里是博客结构页（占位版）。你后续给我真实内容后，我会直接填进去。</p>
        </section>

        <section className="grid">
          {sortedPosts.map((p) => (
            <article key={p.slug} className="card">
              <h2>{p.title || ""}</h2>
              <p className="meta">
                {fmtDate(p.sourceDate || p.date)} · {p.author || ""}
              </p>
              <p className="excerpt">{p.excerpt || ""}</p>
              <Link className="btn" href={`/blog/${p.slug}`}>
                阅读详情
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
