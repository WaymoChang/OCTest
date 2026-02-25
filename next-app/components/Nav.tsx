import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav({ active }: { active: string }) {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link className={active === "about" ? "active" : ""} href="/about">
        About
      </Link>
      <Link className={active === "changelog" ? "active" : ""} href="/changelog">
        Changelog
      </Link>
      <Link className={active === "contact" ? "active" : ""} href="/contact">
        Contact
      </Link>
      <Link className={active === "analytics" ? "active" : ""} href="/analytics">
        Analytics
      </Link>
      <ThemeToggle />
    </nav>
  );
}
