import Nav from "../../components/Nav";

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <>
      <Nav active="contact" />
      <main className="wrap">
        <section className="card">
          <span className="badge">Get in touch</span>
          <h1>Contact</h1>
          <p>你可以通过以下方式联系项目维护者：</p>
          <ul>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/WaymoChang"
                target="_blank"
                rel="noreferrer"
              >
                @WaymoChang
              </a>
            </li>
            <li>
              Repository Issues:{" "}
              <a
                href="https://github.com/WaymoChang/OCTest/issues"
                target="_blank"
                rel="noreferrer"
              >
                OCTest Issues
              </a>
            </li>
          </ul>
          <p className="small">
            建议：提交 Issue 时附上复现步骤和预期结果，方便快速处理。
          </p>
        </section>
      </main>
    </>
  );
}
