import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { TechBadge } from "@/components/tech-badge";
import { certificates } from "@/data/certificates";
import { careers } from "@/data/careers";
import { educations } from "@/data/education";
import { experiences, type ExperienceType } from "@/data/experiences";
import { profile } from "@/data/profile";
import { getProjectBySlug, type Project } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { formatPeriod } from "@/data/types";

/**
 * Curated, print-only résumé document — NOT a mirror of the live site.
 *
 * Built for uploading to job postings that require a file instead of a link.
 * Content, order and page breaks are chosen by hand (see the numbered
 * sections below) rather than reusing the scrolling homepage/project pages,
 * so navigation affordances (CTA buttons, back links, demo/repo buttons)
 * that make no sense on paper are simply never rendered here.
 *
 * Korean only — this document is for KR job applications, not a locale of
 * the main site, so `[locale]` is checked but not otherwise used.
 */
const EXPERIENCE_TYPE_LABEL: Record<ExperienceType, string> = {
  award: "수상",
  talk: "발표",
  opensource: "오픈소스",
  community: "커뮤니티",
  etc: "기타",
};

const CATEGORY_LABEL = {
  company: "회사 프로젝트",
  toy: "토이 프로젝트",
} as const;

/** Selected & ordered per user request — index 7–9. */
const PDF_PROJECT_SLUGS = ["m365works", "trusafer", "plandy"] as const;

/** Icon-style thumbnail (contain, capped size) vs. real screenshot (cover). */
const COMPACT_THUMBNAIL_SLUGS = new Set(["m365works"]);

export function generateStaticParams() {
  return [{ locale: "ko" }];
}

export default async function PdfResumePage({
  params,
}: PageProps<"/[locale]/pdf">) {
  const { locale } = await params;

  if (locale !== "ko") {
    notFound();
  }

  setRequestLocale(locale);

  const pdfProjects = PDF_PROJECT_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (project): project is Project => Boolean(project),
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-16 md:px-10">
      {/* 1. 박상현 소개 */}
      <section className="break-inside-avoid-page flex flex-col items-start gap-5 pb-4 sm:flex-row sm:items-center">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={profile.avatar}
            alt={profile.name.ko}
            fill
            sizes="96px"
            priority
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-caption font-medium text-primary">
            Frontend Developer
          </p>
          <h1 className="text-h1 mt-1 font-bold tracking-tight text-foreground">
            {profile.name.ko}
          </h1>
          <p className="text-h2 mt-2 font-semibold text-muted-foreground">
            {profile.headline.ko}
          </p>
        </div>
      </section>
      <section className="mt-8 flex flex-col gap-4 pb-12 text-body text-muted-foreground">
        {profile.bio.ko.map((paragraph) => (
          <p key={paragraph} className="break-inside-avoid-page">
            {paragraph}
          </p>
        ))}
      </section>

      {/* 2. 스킬 */}
      <PdfSection title="스킬">
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="break-inside-avoid-page rounded-card bg-surface p-6"
            >
              <h3 className="text-h3 font-semibold text-foreground">
                {category.label.ko}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <TechBadge name={item.name} icon={item.icon} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PdfSection>

      {/* 3. 커리어 */}
      <PdfSection title="커리어">
        <ol className="flex flex-col gap-8">
          {careers.map((career) => (
            <li
              key={career.id}
              className="break-inside-avoid-page border-l-2 border-border pl-6"
            >
              <p className="text-caption font-medium text-muted-foreground">
                {formatPeriod(career.period, "ko")}
              </p>
              <h3 className="text-h2 mt-1 font-semibold text-foreground">
                {career.company.ko}
              </h3>
              <p className="text-body mt-1 font-medium text-primary">
                {career.role.ko}
              </p>
              <ul className="text-body mt-4 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                {career.highlights.ko.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </PdfSection>

      {/* 4. 학력 — 자격증·경험과 함께 한 페이지에 들어가도록 새 페이지에서 시작하고 여백을 좁게 잡음 */}
      <PdfSection title="학력" compact breakBefore>
        <ul className="flex flex-col gap-3">
          {educations.map((education) => (
            <li
              key={education.id}
              className="break-inside-avoid-page rounded-card bg-surface px-4 py-3"
            >
              <p className="text-caption font-medium text-muted-foreground">
                {formatPeriod(education.period, "ko")}
              </p>
              <h3 className="text-body font-semibold text-foreground">
                {education.school.ko}
              </h3>
              <p className="text-caption mt-0.5 text-muted-foreground">
                {education.major.ko}
                {education.degree ? ` (${education.degree.ko})` : ""}
              </p>
              {education.note ? (
                <p className="text-caption mt-1 text-muted-foreground">
                  {education.note.ko}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </PdfSection>

      {/* 5. 자격증 */}
      <PdfSection title="자격증" compact>
        <ul className="flex flex-col gap-2">
          {certificates.map((certificate) => (
            <li
              key={certificate.id}
              className="break-inside-avoid-page flex flex-wrap items-baseline justify-between gap-2 rounded-card bg-surface px-4 py-3"
            >
              <div>
                <h3 className="text-body font-semibold text-foreground">
                  {certificate.name.ko}
                </h3>
                <p className="text-caption mt-0.5 text-muted-foreground">
                  {certificate.issuer.ko}
                </p>
              </div>
              <p className="text-caption font-medium text-muted-foreground">
                {certificate.issuedAt.replace("-", ".")}
              </p>
            </li>
          ))}
        </ul>
      </PdfSection>

      {/* 6. 경험 */}
      <PdfSection title="경험" compact>
        <ul className="flex flex-col gap-3">
          {experiences.map((experience) => (
            <li
              key={experience.id}
              className="break-inside-avoid-page rounded-card bg-surface px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-caption rounded-full bg-primary-tint px-2.5 py-0.5 font-medium text-primary">
                  {EXPERIENCE_TYPE_LABEL[experience.type]}
                </span>
                {experience.period ? (
                  <span className="text-caption font-medium text-muted-foreground">
                    {formatPeriod(experience.period, "ko")}
                  </span>
                ) : null}
              </div>
              <h3 className="text-body mt-1.5 font-semibold text-foreground">
                {experience.title.ko}
              </h3>
              <p className="text-caption mt-0.5 text-muted-foreground">
                {experience.organization.ko}
              </p>
              {experience.description ? (
                <p className="text-caption mt-1.5 text-muted-foreground">
                  {experience.description.ko}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </PdfSection>

      {/* 7–9. 프로젝트 */}
      {pdfProjects.map((project, index) => (
        <ProjectDetail
          key={project.slug}
          project={project}
          showGroupTitle={index === 0}
        />
      ))}
    </div>
  );
}

function PdfSection({
  title,
  children,
  compact = false,
  breakBefore = false,
}: {
  title: string;
  children: ReactNode;
  /** Tighter heading/spacing for sections meant to share a page (학력/자격증/경험). */
  compact?: boolean;
  /** Forces this section to start on a fresh page. */
  breakBefore?: boolean;
}) {
  const base = compact ? "border-t border-border py-6" : "border-t border-border py-12";
  return (
    <section className={breakBefore ? `break-before-page ${base}` : base}>
      <h2
        className={
          compact
            ? "text-h2 break-after-avoid-page font-bold tracking-tight text-foreground"
            : "text-h1 break-after-avoid-page font-bold tracking-tight text-foreground"
        }
      >
        {title}
      </h2>
      <div className={compact ? "mt-4" : "mt-8"}>{children}</div>
    </section>
  );
}

function ProjectDetail({
  project,
  showGroupTitle = false,
}: {
  project: Project;
  /** Renders the "프로젝트" umbrella heading above the title, first project only. */
  showGroupTitle?: boolean;
}) {
  const meta = [
    { label: "기간", value: formatPeriod(project.period, "ko") },
    { label: "구분", value: CATEGORY_LABEL[project.category] },
    { label: "참여 인원", value: `${project.teamSize}명` },
  ];

  return (
    <section className="break-before-page border-t border-border pt-12 pb-4">
      {showGroupTitle ? (
        <p className="text-caption font-semibold tracking-[0.14em] text-primary uppercase">
          프로젝트
        </p>
      ) : null}
      <h2
        className={`text-h1 break-after-avoid-page font-bold tracking-tight text-foreground ${
          showGroupTitle ? "mt-2" : ""
        }`}
      >
        {project.title.ko}
      </h2>

      <dl className="break-inside-avoid-page mt-6 grid grid-cols-1 gap-4 rounded-card bg-surface p-6 sm:grid-cols-3">
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

      <div className="break-inside-avoid-page relative mt-8 aspect-video overflow-hidden rounded-modal bg-primary-tint">
        {COMPACT_THUMBNAIL_SLUGS.has(project.slug) ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[200px] w-[200px]">
              <Image
                src={project.thumbnail}
                alt={project.title.ko}
                fill
                sizes="200px"
                quality={90}
                priority
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title.ko}
            fill
            sizes="768px"
            quality={85}
            priority
            className="object-cover"
          />
        )}
      </div>

      <DetailBlock title="프로젝트 개요">
        <p className="text-body text-muted-foreground">{project.summary.ko}</p>
      </DetailBlock>

      <DetailBlock title="기술 스택">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="핵심 기능">
        <ul className="text-body flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          {project.features.ko.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="나의 역할">
        <p className="text-body text-muted-foreground">{project.myRole.ko}</p>
      </DetailBlock>

      {project.challenges ? (
        <DetailBlock title="어려웠던 점">
          <p className="text-body text-muted-foreground">
            {project.challenges.ko}
          </p>
        </DetailBlock>
      ) : null}

      {project.improvements ? (
        <DetailBlock title="개선한 점 / 배운 점">
          <p className="text-body text-muted-foreground">
            {project.improvements.ko}
          </p>
        </DetailBlock>
      ) : null}
    </section>
  );
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="break-inside-avoid-page mt-10 border-t border-border pt-6">
      <h3 className="text-h2 break-after-avoid-page font-semibold text-foreground">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
