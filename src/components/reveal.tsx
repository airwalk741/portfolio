"use client";

import { motion, type Variants } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

/**
 * Scroll reveal primitives.
 *
 * Performance notes:
 * - Only `opacity` and `transform` are animated (compositor friendly, so no
 *   layout thrashing while scrolling).
 * - `viewport.once` lets Framer Motion drop the IntersectionObserver after the
 *   first trigger, so a long page doesn't keep re-rendering revealed sections.
 * - Variants and the tag map are module-level constants, so nothing new is
 *   allocated per render and `motion` has no fresh objects to diff.
 * - `<RevealItem>` inherits its animation state from the parent's variant
 *   propagation: staggered lists need zero extra observers or state.
 *
 * Robustness notes:
 * - Every rendered element carries `reveal-fallback`; `globals.css` forces it
 *   back to `opacity: 1` under `@media (scripting: none)` so the page is still
 *   readable when JS never runs (author `!important` outranks inline styles).
 * - Reduced-motion variants keep the exact same animated properties as the
 *   default ones (`opacity` + `y`), so `transform` is always reset on the way
 *   to `visible`, no matter which variant object the element entered `hidden`
 *   with. Only the transition differs (`y` snaps instead of sliding).
 *
 * `RevealItem` is a separate named export rather than a `Reveal.Item` static
 * property: across the RSC boundary a client component is a reference proxy, so
 * properties hung off it do not survive and resolve to `undefined`.
 */

const DISTANCE = 16;
const EASE = [0.22, 1, 0.36, 1] as const;

/** `custom` carries the start delay in seconds. */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
};

const staggerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { delayChildren: delay, staggerChildren: 0.06 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Reduced-motion fallbacks: cross-fade only.
 *
 * `y` is declared here as well — with the same `hidden` value as the default
 * variants — so the rendered markup is identical for both preferences and the
 * translation is never left stranded on screen. `y: { duration: 0 }` makes the
 * offset snap away while the element is still fully transparent, so nothing
 * moves in front of the user.
 */
const reducedVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, delay, y: { duration: 0 } },
  }),
};

const reducedStaggerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { delayChildren: delay },
  }),
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, y: { duration: 0 } },
  },
};

const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

let reducedMotionQuery: MediaQueryList | null = null;

function getReducedMotionQuery() {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  reducedMotionQuery ??= window.matchMedia(REDUCED_MOTION_QUERY);
  return reducedMotionQuery;
}

function subscribeToReducedMotion(onStoreChange: () => void) {
  const query = getReducedMotionQuery();
  if (!query) return () => {};
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return getReducedMotionQuery()?.matches ?? false;
}

/** SSR snapshot: the server can't know the preference, so assume "no". */
function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Hydration-safe replacement for Framer Motion's `useReducedMotion`.
 *
 * `useReducedMotion` seeds `useState` from a module-level ref that is `null` on
 * the server but already resolved on the client, so the first client render of
 * a reduced-motion user disagrees with the server HTML and React logs a
 * hydration mismatch. `useSyncExternalStore` renders `getServerSnapshot()`
 * during hydration and re-checks the live value right afterwards, which keeps
 * the first paint identical to the SSR markup. As a bonus it stays subscribed,
 * so toggling the OS setting updates the UI without a reload.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/** Hook for the no-JS escape hatch, see `.reveal-fallback` in `globals.css`. */
const FALLBACK_CLASS = "reveal-fallback";

function withFallbackClass(className?: string) {
  return className ? `${className} ${FALLBACK_CLASS}` : FALLBACK_CLASS;
}

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
} as const;

type RevealTag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Stagger `<RevealItem>` descendants instead of animating as a single unit. */
  stagger?: boolean;
  /** Rendered element. Defaults to `div`. */
  as?: RevealTag;
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  // Runtime value stays the mapped tag; the cast only collapses the union of
  // motion component prop types (all of which accept the props used below).
  const Tag = TAGS[as] as typeof motion.div;

  const variants = stagger
    ? shouldReduceMotion
      ? reducedStaggerVariants
      : staggerVariants
    : shouldReduceMotion
      ? reducedVariants
      : revealVariants;

  return (
    <Tag
      className={withFallbackClass(className)}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
};

export function RevealItem({
  children,
  className,
  as = "div",
}: RevealItemProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const Tag = TAGS[as] as typeof motion.div;

  return (
    <Tag
      className={withFallbackClass(className)}
      variants={shouldReduceMotion ? reducedItemVariants : itemVariants}
    >
      {children}
    </Tag>
  );
}
