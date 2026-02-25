import Nav from "../../components/Nav";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <>
      <Nav active="about" />
      <main className="wrap">
        <section className="card">
          <span className="badge">About this project</span>
          <h1>About OCTest</h1>
          <p>
            OCTest 是一个轻量但可持续演进的静态站点项目，目标是验证“想法 → 开发 → 发布”的快速交付闭环。
            当前包含欢迎页、博客模块、多页面信息架构，以及版本变更记录。
          </p>
          <p>这个仓库强调三件事：快速试验、可读结构、持续迭代。</p>
        </section>

        <section className="card">
          <h2>Tech Stack</h2>
          <ul>
            <li>Static HTML / CSS / JavaScript</li>
            <li>GitHub Repository + Git versioning</li>
            <li>GitHub Pages deployment</li>
          </ul>
          <a
            className="link-btn"
            href="https://github.com/WaymoChang/OCTest"
            target="_blank"
            rel="noreferrer"
          >
            View Repository
          </a>
        </section>
      </main>
    </>
  );
}
