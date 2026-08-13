import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import "../globals.css";

// Pretendard Variable (v1.3.9) declares `font-weight: 45 920` in its own
// @font-face (dist/web/variable/pretendardvariable.css), so the wght axis
// range below matches the actual font file. `next/font/local` takes a
// variable font's axis range as a "min max" string.
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: true,
  // Reduce CLS while the 2MB variable font is downloading.
  adjustFontFallback: "Arial",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "sans-serif",
  ],
});

/**
 * Absolute base for OG/canonical URLs. Vercel exposes the deployment host via
 * `VERCEL_PROJECT_PRODUCTION_URL`; override locally with `NEXT_PUBLIC_SITE_URL`.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      locale,
      url: `/${locale}`,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    // `data-scroll-behavior="smooth"` opts back into the Next.js 15 behaviour of
    // temporarily forcing `scroll-behavior: auto` during route transitions, so
    // the global `scroll-behavior: smooth` (globals.css) only applies to in-page
    // anchors and navigations still jump instantly. Without it Next.js 16 warns
    // in the console and animates the scroll reset on every navigation.
    <html
      lang={locale}
      className={pretendard.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeProvider>
            <Sidebar />
            <main className="md:pl-56">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
