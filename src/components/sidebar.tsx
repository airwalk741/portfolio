import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";

export function Sidebar() {
  const t = useTranslations("Nav");

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/projects" as const, label: t("projects") },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-56 md:flex-col md:justify-between md:border-r md:border-border md:px-6 md:py-8 print:hidden">
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden items-center justify-between border-b border-border px-4 py-3 print:hidden">
        <nav className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
