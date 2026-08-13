import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Catch-all for unmatched pathnames inside a locale segment.
 *
 * Without it, a URL like `/ko/oops` never matches the `[locale]` route tree, so
 * Next.js falls back to its built-in 404 (English, no layout, no theme). By
 * matching here and calling `notFound()`, the request renders
 * `[locale]/not-found.tsx` inside `[locale]/layout.tsx` instead — sidebar,
 * theme and language switch included — and still responds with HTTP 404.
 */
export default async function CatchAllNotFound({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;

  // Keeps the not-found UI statically renderable when the locale is valid.
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }

  notFound();
}
