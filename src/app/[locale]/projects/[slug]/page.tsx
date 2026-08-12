import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { TechBadge } from "@/components/tech-badge";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, projects } from "@/data/projects";
import { formatPeriod } from "@/data/types";

/**
 * Params for both dynamic segments are generated here (bottom-up), so every
 * locale × slug combination is prerendered at build time.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !hasLocale(routing.locales, locale)) {
    return {};
  }

  return {
    title: project.title[locale],
    description: project.summary[locale],
    openGraph: {
      title: project.title[locale],
      description: project.summary[locale],
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("Projects");

  const meta = [
    { label: t("detail.period"), value: formatPeriod(project.period, locale) },
    { label: t("detail.category"), value: t(`category.${project.category}`) },
    {
      label: t("detail.team"),
      value: t("detail.teamValue", { count: project.teamSize }),
    },
  ];

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <Link
          href="/projects"
          className="text-caption inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          {t("detail.back")}
        </Link>

        <h1 className="text-display mt-6 font-bold tracking-tight text-foreground">
          {project.title[locale]}
        </h1>

        <dl className="mt-8 grid grid-cols-1 gap-4 rounded-card bg-surface p-6 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-caption font-medium text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-body mt-1 font-semibold text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="relative mt-10 aspect-video overflow-hidden rounded-modal bg-primary-tint">
        <Image
          src={project.thumbnail}
          alt={project.title[locale]}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          priority
          className="object-cover"
        />
      </Reveal>

      {/* 2. Overview */}
      <DetailSection title={t("detail.overview")}>
        <p className="text-body text-muted-foreground">
          {project.summary[locale]}
        </p>
      </DetailSection>

      {/* 3. Tech stack */}
      <DetailSection title={t("detail.stack")}>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* 4. Key features & my role */}
      <DetailSection title={t("detail.features")}>
        <ul className="text-body flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          {project.features[locale].map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title={t("detail.myRole")}>
        <p className="text-body text-muted-foreground">
          {project.myRole[locale]}
        </p>
      </DetailSection>

      {/* 5. Challenges (optional — omitted when there isn't a meaningful one) */}
      {project.challenges ? (
        <DetailSection title={t("detail.challenges")}>
          <p className="text-body text-muted-foreground">
            {project.challenges[locale]}
          </p>
        </DetailSection>
      ) : null}

      {/* 6. Improvements & learnings */}
      <DetailSection title={t("detail.improvements")}>
        <p className="text-body text-muted-foreground">
          {project.improvements[locale]}
        </p>
      </DetailSection>

      {/* 7. Screenshots & links (optional) */}
      {project.images && project.images.length > 0 ? (
        <DetailSection title={t("title")}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.images.map((image) => (
              <li
                key={image}
                className="relative aspect-video overflow-hidden rounded-modal bg-primary-tint"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {project.links?.demo || project.links?.repo ? (
        <DetailSection title={t("detail.links")}>
          <ul className="flex flex-wrap gap-3">
            {project.links.demo ? (
              <li>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body inline-flex items-center rounded-button bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-primary transition-transform hover:scale-[1.02] motion-reduce:transform-none"
                >
                  {t("detail.demo")}
                </a>
              </li>
            ) : null}
            {project.links.repo ? (
              <li>
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body inline-flex items-center rounded-button border border-border px-5 py-2.5 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {t("detail.repo")}
                </a>
              </li>
            ) : null}
          </ul>
        </DetailSection>
      ) : null}
    </article>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="mt-12 border-t border-border pt-8">
      <h2 className="text-h2 font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}
