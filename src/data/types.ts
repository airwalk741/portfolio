import type { Locale } from "@/i18n/routing";

/**
 * All user-facing copy in `/src/data` is authored in both locales.
 * Keep these structural types dumb & serializable so every data module can be
 * imported from Server Components and inlined at build time.
 */
export type Localized<T> = Record<Locale, T>;

/** A single localized string, e.g. `{ ko: "안녕", en: "Hi" }`. */
export type LocalizedText = Localized<string>;

/** A localized list of strings, e.g. bullet points. */
export type LocalizedList = Localized<string[]>;

/** `end` omitted means "in progress" / "present". */
export type Period = {
  /** ISO-ish `YYYY-MM` (or `YYYY-MM-DD`) string. */
  start: string;
  /** Omit for ongoing periods. */
  end?: string;
};

/** Resolves a localized value for the active locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/**
 * Formats a `Period` for display, e.g. `2023.03 – 2024.11` / `2023.03 – 현재`.
 * Pure & deterministic so it is safe to call during static rendering.
 */
export function formatPeriod(
  period: Period,
  locale: Locale,
  presentLabel?: string,
): string {
  const present = presentLabel ?? (locale === "ko" ? "현재" : "Present");
  const start = formatYearMonth(period.start);
  const end = period.end ? formatYearMonth(period.end) : present;
  return `${start} – ${end}`;
}

function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return month ? `${year}.${month}` : year;
}
