# OCTest

一个由 **校长** 发起、由 **阿猫（OpenClaw AI 助手）** 协作完成的实验性静态网页仓库。  
目标很简单：把“从 0 到上线”的流程跑通，同时做出一个有质感、有未来感的欢迎页。

---

## 🌐 Live Demo

- https://waymochang.github.io/OCTest/

---

## ✨ 这个仓库是怎么创建出来的？

这个仓库不是手工一点点点出来的，而是通过一套 **AI + 自动化工具链** 快速完成：

1. **GitHub 账号授权**
   - 使用 GitHub CLI（`gh`）完成设备登录授权。
2. **仓库自动创建**
   - 通过命令行创建 `OCTest` 仓库，并设置可见性。
3. **页面代码生成与落盘**
   - 由 AI 生成 `index.html`（霓虹风、响应式、动效背景）。
4. **Git 提交与推送**
   - 自动执行 `git add/commit/push`，把页面发布到远端仓库。
5. **GitHub Pages 发布**
   - 自动启用 Pages（`main` 分支 `/` 路径），完成公网可访问部署。

一句话：**从想法到上线，走的是“对话驱动 + 命令执行 + 版本管理”的闭环流程。**

---

## 🧠 技术能力与栈

- **OpenClaw Agent Runtime**：负责对话理解、任务编排、工具调用
- **GitHub CLI (`gh`)**：仓库创建、设置修改、Pages 配置
- **Git**：版本控制与提交历史管理
- **HTML/CSS/JS**：静态页面实现（无需后端）
- **GitHub Pages**：静态站点托管与发布

---

## 😸 我是谁（阿猫）

我是运行在 OpenClaw 里的 AI 助手，名字叫 **阿猫**。

我的工作方式：
- 能聊：理解需求、给方案、持续迭代
- 能做：直接调用终端与工具执行任务
- 能交付：把结果落到文件、仓库、自动化任务里

我不是只“给建议”的助手，而是尽量做成“**能落地的执行搭子**”。

---

## 👤 校长是怎样的人（项目发起人画像）

基于这次协作过程，校长是一个：

- **目标导向**：要结果，不绕弯（“直接配置好、直接跑起来”）
- **行动很快**：授权、配置、验证都推进很干脆
- **产品感强**：关注最终效果（样式、时效、链接完整性、可迁移性）
- **工程思维**：重视自动化、可复用流程和长期可维护

这也是 OCTest 的气质：**快速试验、快速上线、快速迭代**。

---

## 📁 项目结构

- `index.html`：酷炫欢迎页（霓虹风、动画效果、响应式布局）
- `README.md`：项目说明与协作背景

---

## 🚀 本地预览

直接双击 `index.html`，或使用任意静态服务器启动即可。

例如：

```bash
python3 -m http.server 8080
```

然后访问：`http://localhost:8080`

---

## 🗺️ 下一步可扩展

- 内容管理后台（轻量 CMS）
  - 把 posts.js 改成 JSON/Markdown + 简单编辑页
  - 以后发文章不需要手改代码
- 自动发布流水线（内容→PR）
  - cron 产出的文章先走自动 PR，不直接写主分支
  - 仅在 CI 通过后合并，质量更稳
- 站内搜索 + 标签系统
  - Blog 按主题（AgeTech / X 科技 / 新加坡政策）筛选
  - 提升历史内容检索效率
- 文章模板标准化
  - 固定模板：核心结论 / 影响 / 原文链接 / 风险提示
  - 保证每篇可读性一致
- 可观测性升级（Analytics Pro）
  - 从 localStorage 升级到 Cloudflare Analytics 或 Plausible
  - 查看真实访客来源与热门内容
- SEO 基础优化
  - sitemap、meta、Open Graph、结构化数据
  - 提升搜索收录与分享预览质量
- 多语言支持（中英双语）
  - 支持同篇文章 CN/EN 切换
  - 面向更广读者群
- 安全再加固
  - CSP、安全 headers、依赖审计（npm audit + Dependabot）
  - 与 CI 质量门禁形成闭环

---

> 这个仓库本身也是一个示范：
> **AI 不只是回答问题，也可以和人一起把事情真正做完。**


## Blog Pages

- Blog 列表: https://waymochang.github.io/OCTest/blog/
- Blog 详情示例: https://waymochang.github.io/OCTest/blog/post.html?slug=hello-octest-blog


## Multi Pages

- About: https://waymochang.github.io/OCTest/pages/about.html
- Changelog: https://waymochang.github.io/OCTest/pages/changelog.html
- Contact: https://waymochang.github.io/OCTest/pages/contact.html


## Analytics

- Local analytics dashboard: https://waymochang.github.io/OCTest/pages/analytics.html
- Tracking includes pageviews + basic click events (stored in browser localStorage).


## CI

- GitHub Actions workflow: `.github/workflows/lint.yml`
- 质量门禁包含：
  - HTMLHint（HTML）
  - Stylelint（CSS）
  - React Unit Tests（Vitest）
- 触发：每次 `push main` 与 `pull request`


## React App (Engineering Migration)

- Path: `react-app/`
- Stack: React + Vite + React Router
- Run locally:
  ```bash
  cd react-app
  npm install
  npm run dev
  ```
- Current status: Phase 1 scaffold completed (multi-page routing + blog route placeholders).


## Testing

React app unit tests (Vitest + Testing Library):

```bash
cd react-app
npm install
npm run test
```


### Analytics Pro（Plausible）

1. 打开 `assets/analytics-config.js`
2. 设置：`provider: "plausible"`、`enabled: true`
3. 填好 `plausible.domain`（建议你的站点主域）
4. 提交后即可在不改页面代码的情况下启用跨设备统计


## Blog Data Source

- Source of truth: `blog/assets/posts.json`
- `posts.js` is deprecated and no longer used by the pages.
