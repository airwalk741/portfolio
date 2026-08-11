"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const THEMES = ["light", "dark", "system"] as const;

type ThemeName = (typeof THEMES)[number];

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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Theme");
  const hydrated = useHydrated();

  const current = (theme ?? "system") as ThemeName;

  function cycle() {
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="text-caption text-muted-foreground hover:text-foreground rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary"
      aria-label="Toggle theme"
    >
      {/* Fixed min-width keeps the control from resizing once the resolved
          theme label appears after hydration (CLS). */}
      <span className="inline-block min-w-[3.5em] text-center">
        {hydrated ? t(current) : " "}
      </span>
    </button>
  );
}
