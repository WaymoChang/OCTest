"use client";

import { useEffect, useMemo, useState } from "react";
import Nav from "../../components/Nav";

type Row = [string, number];

type Stats = {
  total: number;
  updatedAt: string;
  rows: Row[];
};

const KEY = "octest.analytics.v1";

function readStats(): Stats {
  let data: any = {};
  try {
    data = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    data = {};
  }
  const pvs = data.pageviews || {};
  const rows = Object.entries(pvs).sort((a, b) => (b[1] as number) - (a[1] as number)) as Row[];
  const total = rows.reduce((n, [, v]) => n + v, 0);
  return { total, updatedAt: data.updatedAt || "-", rows };
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, updatedAt: "-", rows: [] });
  const [proStatus, setProStatus] = useState<string>("-");

  useEffect(() => {
    setStats(readStats());

    const cfg: any = (window as any).OCTEST_ANALYTICS_CONFIG || {};
    const mode =
      cfg.enabled && cfg.provider === "plausible"
        ? `Plausible 已启用（domain: ${(cfg.plausible || {}).domain || "-"}）`
        : "Plausible 未启用（当前 local-only）";
    setProStatus(`Analytics Pro 状态：${mode}`);
  }, []);

  const rows = useMemo(() => stats.rows, [stats.rows]);

  return (
    <>
      <Nav active="analytics" />
      <main className="wrap">
        <section className="card">
          <span className="badge">Local analytics</span>
          <h1>访问统计（本地）</h1>
          <p className="small">
            说明：默认是浏览器本地埋点（localStorage）。你也可以在 assets/analytics-config.js 开启 Plausible，实现跨设备统计（Analytics Pro）。
          </p>

          <div id="stats">
            <p>
              <strong>Total pageviews:</strong> {stats.total}
            </p>
            <p>
              <strong>Last updated:</strong> {stats.updatedAt}
            </p>
            <h3>By path</h3>
            <ul>
              {rows.length ? (
                rows.map(([k, v]) => (
                  <li key={k}>
                    <code>{k}</code> — {v}
                  </li>
                ))
              ) : (
                <li>暂无数据</li>
              )}
            </ul>
          </div>

          <div id="pro-status" className="small">
            {proStatus}
          </div>

          <button
            id="clear"
            className="link-btn"
            type="button"
            onClick={() => {
              localStorage.removeItem(KEY);
              setStats(readStats());
            }}
          >
            清空本地统计
          </button>
        </section>
      </main>
    </>
  );
}
