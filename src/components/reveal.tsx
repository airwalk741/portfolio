"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

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

/** Reduced-motion fallbacks: cross-fade only, no translation. */
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.2, delay },
  }),
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

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
  const shouldReduceMotion = useReducedMotion();
  // Runtime value stays the mapped tag; the cast only collapses the union of
  // motion component prop types (all of which accept the props used below).
  const Tag = TAGS[as] as typeof motion.div;

  const variants = shouldReduceMotion
    ? reducedVariants
    : stagger
      ? staggerVariants
      : revealVariants;

  return (
    <Tag
      className={className}
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
  const shouldReduceMotion = useReducedMotion();
  const Tag = TAGS[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={shouldReduceMotion ? reducedItemVariants : itemVariants}
    >
      {children}
    </Tag>
  );
}
