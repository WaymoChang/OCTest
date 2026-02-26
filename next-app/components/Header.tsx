import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header({
  title,
  backHref = "/",
  backLabel = "← OCTest",
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="topbar">
      <Link className="brand" href={backHref}>
        {backLabel}
      </Link>
      <h1>{title}</h1>
      <ThemeToggle className="theme-toggle" />
    </header>
  );
}
