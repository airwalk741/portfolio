"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { ProjectCategory } from "@/data/projects";

/**
 * Locale-resolved, fully serializable card data. Localization happens on the
 * server so the client bundle never receives the ko + en copy of every field.
 */
export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  stack: string[];
  category: ProjectCategory;
  thumbnail: string;
};

type Filter = ProjectCategory | "all";

const FILTERS: Filter[] = ["all", "company", "toy"];

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function ProjectsBrowser({ projects }: { projects: ProjectCardData[] }) {
  const t = useTranslations("Projects");
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects],
  );

  return (
    <>
      <div
        role="group"
        aria-label={t("title")}
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((value) => {
          const active = value === filter;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={[
                "text-caption rounded-full border px-4 py-2 font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {t(`filters.${value}`)}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-body mt-10 text-muted-foreground">{t("empty")}</p>
      ) : (
        <motion.ul
          // Re-keying on the filter replays the stagger without Framer Motion
          // having to measure/animate layout positions.
          key={filter}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-6 sm:grid-cols-2"
        >
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              variants={shouldReduceMotion ? reducedCardVariants : cardVariants}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="relative aspect-video overflow-hidden bg-primary-tint">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    // Only the first row is above the fold.
                    priority={index < 2}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-caption font-medium text-muted-foreground">
                    {project.period}
                  </p>
                  <h2 className="text-h3 mt-1 font-semibold text-foreground group-hover:text-primary">
                    {project.title}
                  </h2>
                  <p className="text-body mt-2 line-clamp-3 flex-1 text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <li
                        key={tech}
                        className="text-caption rounded-full bg-primary-tint px-3 py-1 font-medium text-primary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
}
