import { createElement, type CSSProperties } from "react";
import { FallbackTechIcon, getTechColor, getTechIcon } from "@/lib/tech-icons";

type TechBadgeProps = {
  /** Display label, e.g. `"Next.js"`. Also used to look up the brand icon. */
  name: string;
  /**
   * Explicit key into the shared icon table, for cases where the display label
   * differs from the technology name (e.g. `name: "가상 스크롤"`, `icon: "react"`).
   */
  icon?: string;
  className?: string;
};

/**
 * Icon + label chip for a single technology.
 *
 * No `"use client"`: `react-icons` guards its `IconContext` creation
 * (`React.createContext && React.createContext(...)`), so under the
 * `react-server` condition it falls back to the default config and the icons
 * render as plain inline SVG inside Server Components — nothing ships to the
 * client bundle for the server-rendered usages.
 */
const ICON_BASE = "size-3.5 shrink-0";

/**
 * Brand hexes ride in as custom properties instead of a plain `style.color`
 * because the light and dark values differ per brand (see `TECH_COLORS_DARK`),
 * and an inline `color` can't be re-declared per theme. The `dark:` variant is
 * emitted after the base one in the stylesheet, so it wins on equal specificity.
 */
const ICON_BRAND_CLASS = `${ICON_BASE} [color:var(--tech-color)] dark:[color:var(--tech-color-dark)]`;

/** Generic (LuCode / LuNetwork / …) glyphs have no brand color to borrow. */
const ICON_NEUTRAL_CLASS = `${ICON_BASE} text-muted-foreground`;

export function TechBadge({ name, icon, className }: TechBadgeProps) {
  const key = icon ?? name;
  const color = getTechColor(key);

  // `createElement` rather than `<Icon />`: the icon is *looked up*, not
  // defined, during render — but rendering a capitalized local as JSX trips
  // `react-hooks/static-components`, which exists to catch genuinely
  // render-created components.
  const iconElement = createElement(getTechIcon(key) ?? FallbackTechIcon, {
    "aria-hidden": "true",
    focusable: "false",
    className: color ? ICON_BRAND_CLASS : ICON_NEUTRAL_CLASS,
    style: color
      ? ({
          "--tech-color": color.light,
          "--tech-color-dark": color.dark,
        } as CSSProperties)
      : undefined,
  });

  return (
    <span
      className={[
        "text-label inline-flex items-center gap-1.5 rounded-badge border border-border bg-background px-2.5 py-1 font-medium text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {iconElement}
      {name}
    </span>
  );
}
