"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Scroll position handoff key.
 *
 * `<html>` is rendered by `[locale]/layout.tsx`, so switching locales crosses a
 * root layout boundary. Next.js cannot reconcile that on the client and falls
 * back to a full document navigation in production builds (verified: the RSC
 * fetch for `/en` is followed by a plain document request), which throws the
 * reading position away no matter what `scroll` option the router got.
 *
 * `scroll: false` handles the soft-navigation case (dev, and any future setup
 * with a shared root layout); `sessionStorage` survives the hard reload. It is
 * read exactly once and removed immediately, so a manual refresh still starts
 * at the top of the page.
 */
const SCROLL_KEY = "locale-switch:scroll-y";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(SCROLL_KEY);
      sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      // Private mode / storage disabled: nothing to restore.
    }

    const target = Number(saved);
    if (!saved || !Number.isFinite(target) || target <= 0) return;

    // `behavior: "instant"` opts out of the global `scroll-behavior: smooth`,
    // so the restore is a jump instead of a visible animation.
    const restore = () => window.scrollTo({ top: target, behavior: "instant" });
    restore();

    // Images and the variable font can still be settling, which caps how far
    // the document can scroll. Retry once the load event lands — but only if
    // the user has not scrolled away in the meantime.
    if (document.readyState === "complete") return;
    const settled = Math.round(window.scrollY);
    const onLoad = () => {
      if (Math.round(window.scrollY) === settled) restore();
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  function switchTo(loc: Locale) {
    try {
      sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
    } catch {
      // Non-fatal: the switch just behaves like before and lands at the top.
    }
    router.replace(pathname, { locale: loc, scroll: false });
  }

  return (
    <div className="flex items-center gap-1 text-caption">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={
            loc === locale
              ? "text-primary font-medium px-1.5"
              : "text-muted-foreground hover:text-foreground px-1.5"
          }
          aria-current={loc === locale}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
