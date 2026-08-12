import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal, RevealItem } from "@/components/reveal";
import { TechBadge } from "@/components/tech-badge";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import {
  getProjectsByCategory,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
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

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Projects");
  const company = getProjectsByCategory("company");
  const toy = getProjectsByCategory("toy");

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

      <Chapter
        eyebrow={t("groups.company.eyebrow")}
        title={t("groups.company.title")}
        note={t("groups.company.note")}
        tone="company"
        projects={company}
        locale={locale}
      />

      <Chapter
        eyebrow={t("groups.toy.eyebrow")}
        title={t("groups.toy.title")}
        note={t("groups.toy.note")}
        tone="toy"
        projects={toy}
        locale={locale}
      />
    </div>
  );
}

function Chapter({
  eyebrow,
  title,
  note,
  tone,
  projects,
  locale,
}: {
  eyebrow: string;
  title: string;
  note: string;
  tone: ProjectCategory;
  projects: Project[];
  locale: Locale;
}) {
  const company = tone === "company";

  return (
    <section className="mt-16 md:mt-24">
      <Reveal
        className={[
          "flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-4",
          company
            ? "border-b-2 border-foreground"
            : "border-b border-dashed border-border-strong",
        ].join(" ")}
      >
        <div>
          <p className="text-label font-bold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2
            className={[
              "mt-2 font-bold tracking-tight text-foreground",
              company ? "text-h1" : "text-h2",
            ].join(" ")}
          >
            {title}
          </h2>
        </div>
        <p className="text-caption pb-1 text-muted-foreground">
          {note}
          <span className="mx-2 opacity-40" aria-hidden="true">
            /
          </span>
          <span className="font-semibold tabular-nums text-foreground">
            {String(projects.length).padStart(2, "0")}
          </span>
        </p>
      </Reveal>

      <Reveal stagger as="ul">
        {projects.map((project, index) => (
          <RevealItem key={project.slug} as="li" className="border-b border-border">
            <Row project={project} locale={locale} index={index + 1} tone={tone} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

function Row({
  project,
  locale,
  index,
  tone,
}: {
  project: Project;
  locale: Locale;
  index: number;
  tone: ProjectCategory;
}) {
  const company = tone === "company";
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
        <h3
          className={[
            "font-bold tracking-tight text-foreground hover:text-primary",
            company ? "text-h2" : "text-h3",
          ].join(" ")}
        >
          {project.title[locale]}
        </h3>

        <p className="text-body mt-2 line-clamp-2 max-w-xl text-muted-foreground">
          {project.summary[locale]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, company ? 5 : 4).map((tech) => (
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
