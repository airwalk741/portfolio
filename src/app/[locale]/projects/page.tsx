import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal, RevealItem } from "@/components/reveal";
import { TechBadge } from "@/components/tech-badge";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { projects, type Project } from "@/data/projects";
import { formatPeriod } from "@/data/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

/**
 * Most recent first. Ongoing projects (no `end`) rank above finished ones,
 * since "still active" reads as more current than "wrapped up a while ago"
 * even if the wrap-up date is later on the calendar. Ties break on `start`.
 */
function byRecency(a: Project, b: Project) {
  const aEnd = a.period.end ?? "9999-99";
  const bEnd = b.period.end ?? "9999-99";
  if (aEnd !== bEnd) return aEnd < bEnd ? 1 : -1;
  return a.period.start < b.period.start ? 1 : -1;
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Projects");
  const ordered = [...projects].sort(byRecency);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <h1 className="text-display font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-body mt-4 max-w-2xl text-muted-foreground">
          {t("description")}
        </p>
      </Reveal>

      <Reveal stagger as="ul" className="mt-12 md:mt-16">
        {ordered.map((project, index) => (
          <RevealItem key={project.slug} as="li" className="border-b border-border">
            <Row
              project={project}
              locale={locale}
              index={index + 1}
              categoryLabel={t(`category.${project.category}`)}
            />
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

function Row({
  project,
  locale,
  index,
  categoryLabel,
}: {
  project: Project;
  locale: Locale;
  index: number;
  categoryLabel: string;
}) {
  const period = formatPeriod(project.period, locale);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="grid grid-cols-[2.25rem_1fr] items-start gap-x-4 py-6 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-10 md:py-8"
    >
      <span className="text-label pt-1.5 font-bold tabular-nums text-muted-foreground">
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <p className="text-caption font-semibold tracking-[0.14em] text-primary uppercase">
          {categoryLabel}
        </p>
        <h3 className="text-h2 mt-1 font-bold tracking-tight text-foreground hover:text-primary">
          {project.title[locale]}
        </h3>

        <p className="text-body mt-2 line-clamp-2 max-w-xl text-muted-foreground">
          {project.summary[locale]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>

        <p className="text-caption mt-3 tabular-nums text-muted-foreground md:hidden">
          {period}
        </p>
      </div>

      <p className="hidden self-center text-caption whitespace-nowrap tabular-nums text-muted-foreground md:block">
        {period}
      </p>
    </Link>
  );
}
