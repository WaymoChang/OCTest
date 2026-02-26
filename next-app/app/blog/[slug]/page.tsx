import Link from "next/link";
import Header from "../../../components/Header";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

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

function extractSummary(post: any, lines: string[]) {
  const ex = (post.excerpt || "").trim();
  if (ex) return ex;

  const candidates = lines
    .map((x) => (x || "").trim())
    .filter(Boolean)
    .filter((t) => !/^[一二三四五六七八九十]+、/.test(t))
    .filter((t) => !/^【.*】/.test(t))
    .filter((t) => !/^原文链接[:：]/.test(t))
    .filter((t) => !/^版权说明[:：]/.test(t))
    .filter((t) => !/^结语/.test(t))
    .filter((t) => !/^[-•]\s+/.test(t))
    .filter((t) => t.length >= 24);

  return candidates[0] || "";
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const lines = (post.content || []) as string[];
  const summaryText = extractSummary(post, lines);

  return (
    <>
      <Header title="Blog 详情" backHref="/blog" backLabel="← 返回列表" />

      <main className="container">
        <article className="post">
          <h2>{post.title || ""}</h2>
          <p className="meta">
            {fmtDate(post.date)} · {post.author || ""}
          </p>

          <div className="content">
            {summaryText ? (
              <div className="summary-box">
                <div className="summary-title">核心摘要</div>
                <p>{summaryText}</p>
              </div>
            ) : null}

            {lines.map((line, i) => {
              const text = (line || "").trim();

              if (!text) {
                return <div key={i} className="line-gap" />;
              }

              if (/^[一二三四五六七八九十]+、/.test(text)) {
                return (
                  <h3 key={i} className="section-title">
                    {text}
                  </h3>
                );
              }

              if (/^[-•]\s+/.test(text)) {
                return (
                  <p key={i} className="bullet-line">
                    {text.replace(/^[-•]\s+/, "")}
                  </p>
                );
              }

              if (
                /^【.*】/.test(text) ||
                /^原文链接[:：]/.test(text) ||
                /^版权说明[:：]/.test(text) ||
                /^结语/.test(text)
              ) {
                if (/^原文链接[:：]/.test(text)) {
                  const m = text.match(/^原文链接[:：]\s*(https?:\/\/\S+)\s*$/i);
                  if (m) {
                    return (
                      <p key={i} className="callout-line">
                        <span>原文链接：</span>
                        <a
                          href={m[1]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link"
                        >
                          {m[1]}
                        </a>
                      </p>
                    );
                  }
                }

                return (
                  <p key={i} className="callout-line">
                    {text}
                  </p>
                );
              }

              return (
                <p key={i} className="body-line">
                  {text}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    </>
  );
}
