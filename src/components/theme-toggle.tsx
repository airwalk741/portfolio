"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { LuMoon, LuSun } from "react-icons/lu";

/** Never fires: the store value is constant per environment. */
const subscribe = () => () => {};

/**
 * `false` on the server, `true` after hydration — without calling setState in
 * an effect (which triggers a cascading render and is flagged by
 * `react-hooks/set-state-in-effect`).
 */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Light ↔ dark switch.
 *
 * The visual state (thumb position, which icon is lit) is driven entirely by
 * CSS through the `dark:` variant, i.e. by `<html data-theme>`, which
 * next-themes writes from a blocking script before first paint. So the markup
 * React renders is byte-identical on the server and on the first client render:
 * no hydration mismatch, no theme flash, and the switch is already in the right
 * position on the very first frame (a `transition` cannot animate an initial
 * computed value, so it does not slide into place on load either).
 *
 * Only the accessible name depends on the resolved theme, and that one is gated
 * behind `useHydrated()`.
 *
 * `theme-provider.tsx` keeps `defaultTheme="system"` / `enableSystem`, so a
 * first-time visitor still follows their OS preference; pressing this control
 * calls `setTheme("light" | "dark")`, which pins the choice from then on.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Theme");
  const hydrated = useHydrated();

  // `resolvedTheme` is `undefined` on the server and until next-themes has read
  // localStorage / `matchMedia`, so fall back to a neutral label rather than
  // announcing a state we do not know yet.
  const resolved =
    hydrated && (resolvedTheme === "light" || resolvedTheme === "dark")
      ? resolvedTheme
      : null;

  // Action-describing label ("switch to dark mode") instead of `aria-pressed`:
  // the control has no single on/off meaning, and the wording conveys both the
  // current state and what the press will do.
  const label =
    resolved === null
      ? t("toggle")
      : resolved === "dark"
        ? t("switchToLight")
        : t("switchToDark");

  function toggle() {
    // `data-theme` on <html> is exactly what the CSS below reacts to, so using
    // it as a fallback guarantees the press agrees with what the user sees.
    const isDark =
      (resolvedTheme ?? document.documentElement.dataset.theme) === "dark";
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      // 64×36 visual, extended to 64×44 by the transparent `::before` so the
      // touch target clears the 40px minimum without changing the layout of the
      // sidebar / mobile bar. Fixed size in both axes → no CLS on hydration.
      // `transition` (not `transition-colors`) so the press feedback on the
      // `scale` property is animated too — Tailwind v4 emits `scale:`, which
      // `transition-colors` would not cover.
      //
      // `border-strong`, not `border`: this is a real control boundary, not a
      // divider, so WCAG 1.4.11 wants 3:1 — #8f8aa3 on --surface is 3.08:1
      // (light) and #6a6285 is 3.15:1 (dark). `--border` would be ~1.2:1.
      className="group relative flex h-9 w-16 shrink-0 items-center rounded-full border border-border-strong bg-surface p-1 transition duration-(--duration-fast) ease-standard hover:border-primary hover:bg-surface-hover active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']"
    >
      {/* Sliding thumb. `w-[calc(50%-0.25rem)]` = half of the padding box minus
          the 4px padding = exactly one icon slot (27px), so `translate-x-full`
          lands it dead-center under the moon. 320ms on `--ease-soft`
          (cubic-bezier(.22,1,.36,1)) front-loads the travel and settles without
          overshooting the track, which `--ease-snap` would do.

          There is deliberately no `translate-x-0` for the light state: leaving
          `translate` at its initial `none` means only one declaration ever
          touches the property, so the slide cannot depend on how Tailwind
          happens to order a variant against its unvariated counterpart. */}
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-primary transition duration-(--duration-slow) ease-soft group-hover:shadow-primary-hover dark:translate-x-full"
      />

      {/* `relative` lifts the icons above the absolutely positioned thumb.
          Lit icon: --primary-foreground on --primary → 5.70:1 (light) /
          7.12:1 (dark). Dimmed icon: --muted-foreground on --surface →
          4.99:1 (light) / 6.56:1 (dark). Both AA for text, far past the 3:1
          non-text minimum. */}
      <span className="relative flex flex-1 items-center justify-center text-primary-foreground transition-colors duration-(--duration-base) ease-standard dark:text-muted-foreground">
        <LuSun aria-hidden className="size-4" />
      </span>
      <span className="relative flex flex-1 items-center justify-center text-muted-foreground transition-colors duration-(--duration-base) ease-standard dark:text-primary-foreground">
        <LuMoon aria-hidden className="size-4" />
      </span>
    </button>
  );
}
