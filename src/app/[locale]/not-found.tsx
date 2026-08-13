"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Locale-aware 404, rendered inside `[locale]/layout.tsx` so the sidebar,
 * theme and language switch stay available.
 *
 * Client component on purpose: `not-found.tsx` receives no `params`, so there
 * is no locale to hand to `setRequestLocale`/`getTranslations` during static
 * rendering. Reading the messages from the `NextIntlClientProvider` that the
 * layout already renders keeps this page statically prerenderable per locale.
 *
 * Entrance uses the CSS `animate-fade-up` token instead of Framer Motion: this
 * page must never depend on JS to become visible.
 */
export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center px-6 py-24 md:px-10 md:py-32 min-h-[70svh]">
      <p
        aria-hidden="true"
        className="text-display font-bold tracking-tight text-primary animate-fade-up motion-reduce:animate-none"
      >
        404
      </p>
      <h1 className="text-h1 mt-4 font-bold tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="text-body mt-4 max-w-xl text-muted-foreground">
        {t("description")}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="text-body inline-flex items-center rounded-button bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-primary transition-transform hover:scale-[1.02] motion-reduce:transform-none"
        >
          {t("home")}
        </Link>
        <Link
          href="/projects"
          className="text-body inline-flex items-center rounded-button border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {t("projects")}
        </Link>
      </div>
    </div>
  );
}
