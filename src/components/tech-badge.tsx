import { createElement } from "react";
import { FallbackTechIcon, getTechIcon } from "@/lib/tech-icons";

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
const ICON_PROPS = {
  "aria-hidden": "true",
  focusable: "false",
  className: "size-3.5 shrink-0 text-primary",
} as const;

export function TechBadge({ name, icon, className }: TechBadgeProps) {
  // `createElement` rather than `<Icon />`: the icon is *looked up*, not
  // defined, during render — but rendering a capitalized local as JSX trips
  // `react-hooks/static-components`, which exists to catch genuinely
  // render-created components.
  const iconElement = createElement(
    getTechIcon(icon ?? name) ?? FallbackTechIcon,
    ICON_PROPS,
  );

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
