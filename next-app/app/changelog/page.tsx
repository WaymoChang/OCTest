import Header from "../../components/Header";

export const dynamic = "force-static";

export default function ChangelogPage() {
  return (
    <>
      <Header title="Changelog" backHref="/" backLabel="← OCTest" />
      <main className="wrap">
        <section className="card">
          <span className="badge">Project updates</span>
          <h1>Changelog</h1>
          <p className="small">该页面链接到仓库中的标准变更日志文件。</p>
          <a className="link-btn" href="/CHANGELOG.md">
            Open CHANGELOG.md
          </a>
        </section>

        <section className="card">
          <h2>Recent Milestones</h2>
          <ul>
            <li>Futuristic landing page上线</li>
            <li>Blog 列表/详情结构完成</li>
            <li>AgeTech 中文深度解读流程接入</li>
            <li>XSS 风险点修复（移除 innerHTML 渲染）</li>
          </ul>
        </section>
      </main>
    </>
  );
}
