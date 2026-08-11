import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal } from "@/components/reveal";
import {
  ProjectsBrowser,
  type ProjectCardData,
} from "@/components/projects-browser";
import { TechBadge } from "@/components/tech-badge";
import { routing } from "@/i18n/routing";
import { projects } from "@/data/projects";
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

  const cards: ProjectCardData[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title[locale],
    summary: project.summary[locale],
    period: formatPeriod(project.period, locale),
    // Rendered here (server) so the brand icon table stays out of the client
    // bundle — see the note on `ProjectCardData`.
    stack: project.stack.slice(0, 5).map((tech) => (
      <li key={tech}>
        <TechBadge name={tech} />
      </li>
    )),
    category: project.category,
    thumbnail: project.thumbnail,
  }));

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

      <div className="mt-10">
        <ProjectsBrowser projects={cards} />
      </div>
    </div>
  );
}
