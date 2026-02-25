"use client";

import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Sparks from "../components/Sparks";
import styles from "./home.module.css";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.grid}></div>
      <div className={styles.noise}></div>

      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={`${styles.glow} ${styles.g1}`}></div>
          <div className={`${styles.glow} ${styles.g2}`}></div>
          <span className={styles.badge}>🚀 New Repo Initialized</span>
          <h1 className={styles.title}>
            Welcome to <span className={styles.gradient}>OCTest</span>
          </h1>
          <p className={styles.lead}>
            This is your futuristic landing page — lightweight, responsive, and ready to evolve.
            Build fast, ship often, and make this space your playground.
          </p>
          <div className={styles.actions}>
            <ThemeToggle />
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/about">
              About
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/changelog">
              Changelog
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/contact">
              Contact
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/analytics">
              Analytics
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/blog">
              Open Blog
            </Link>
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href="https://github.com/WaymoChang/OCTest"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              type="button"
              onClick={() => alert("Let's build something awesome ✨")}
            >
              Start Building
            </button>
          </div>
          <div className={styles.footer}>Made with neon pixels and ambition.</div>
        </div>
      </div>

      <Sparks count={28} />
    </div>
  );
}
