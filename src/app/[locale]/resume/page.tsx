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
 * Curated, print-only résumé document for direct upload to job postings.
 *
 * Same shell as `/[locale]/pdf` (intro/skills/career/education/certs/
 * experience), but the project section is hand-narrowed to Plandy and
 * TRUSafer only, and rewritten into the 프로젝트 배경 / 주요 작업 내용 /
 * 결과 및 성과 structure instead of the site's 개요/핵심기능/역할/
 * 어려웠던점/배운점 breakdown. Korean only.
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

/** Reverse-chronological, per user request: TRUSafer, then Plandy. */
const RESUME_PROJECT_SLUGS = ["trusafer", "plandy"] as const;

const STAR_CONTENT: Record<
  (typeof RESUME_PROJECT_SLUGS)[number],
  { background: string[]; mainWork: string[]; results: string[] }
> = {
  trusafer: {
    background: [
      "열화상 센서로 구역별 온도를 실시간 모니터링하여 화재 징후를 조기에 감지하는 24시간 관제 대시보드 구축이 목표였으며, 현장당 최대 200여 대의 센서 데이터를 안정적으로 수집하고 표출해야 했습니다.",
      "개발 기간이 한 달로 매우 촉박하게 주어진 상황에서, 잦은 수정 없이 기한 내 출시하기 위한 사전 설계와 요구사항 정합성 확보가 핵심 과제였습니다.",
    ],
    mainWork: [
      "프론트엔드 웹을 단독으로 담당해 반응형 대시보드 설계 및 구현, MQTT 기반 센서 통신, Chart.js 온도 데이터 시각화를 진행했습니다.",
      "QR 및 바코드 스캔 등록, 사용자 그룹과 권한별 화면 제어, Notification API 기반 임계값 초과 알림 기능을 구현했습니다.",
      "셋탑박스 펌웨어 배포용 파일 업로드 서버(Node.js와 Express)를 함께 구축했습니다.",
      "24시간 상시 가동 중 브라우저 메모리가 누적되어 멈추는 문제를 chrome://blob-internals/로 분석해 미해제 Blob 누적을 원인으로 규명하고, 프레임 렌더링 직후 URL.revokeObjectURL()을 호출해 메모리를 바로 해제하도록 수정했습니다.",
    ],
    results: [
      "장시간 연속 스트리밍 환경에서도 메모리 점유율이 일정하게 유지되는 것을 검증해 24시간 관제 시스템의 안정성을 확보했습니다.",
      "개발에 들어가기 전 회의를 거쳐 화면 구성과 API 인터페이스를 미리 맞춰두어 재작업 없이 정해진 일정을 준수했습니다.",
    ],
  },
  plandy: {
    background: [
      "중소기업 제조 현장을 위한 보급형 CPS(사이버물리시스템) 기반 실시간 생산 원격 모니터링 플랫폼을 구축하는 프로젝트였습니다. IP 카메라로 설비 계측기 수치를 비접촉 인식하고, 설비 가동 상태와 실시간 현장 영상을 단일 대시보드에서 통합 관제해야 했습니다.",
      "프로젝트 초기 Vue 3로 개발을 시작했으나, 당시 Composition API 생태계 미성숙과 대규모 관제 UI 레퍼런스 부족으로 인해 기능 추가 시 잦은 개발 병목과 일정 지연이 발생했습니다.",
    ],
    mainWork: [
      "프론트엔드를 단독으로 맡아 아키텍처 설계부터 대시보드 구현, 인증 서버 연동, Docker 기반 배포 파이프라인 구축까지 모두 개발했습니다.",
      "개발 지연의 병목이 기술 스택 한계에 있다고 판단하여 React + TypeScript 아키텍처로의 전환을 팀에 제안하여 진행하며, 복잡한 데이터 처리 로직을 React Custom Hook으로 추상화해 UI와 비즈니스 로직을 분리하며 점진적으로 이관했습니다.",
      "MQTT 기반 대규모 시계열 데이터 실시간 처리, ffmpeg 및 RTSP 중계 영상 스트리밍, Chart.js 기반 생산 병목 분석과 생산량 예측 시각화를 구현했습니다.",
      "DFS 기반 공정 조건 최적화 알고리즘을 직접 설계하고 구현했습니다.",
    ],
    results: [
      "React 전환 이후 개발 속도와 트러블슈팅 효율이 크게 향상되어 기한 내 납품에 성공했습니다.",
      "소프트웨어 품질 인증 GS 1등급을 획득했고, DFS 알고리즘은 공인 시험기관(KTR)의 소프트웨어 시험을 통과했습니다.",
      "디자이너가 없는 환경에서 19개월간 프론트엔드 아키텍처와 공통 컴포넌트를 직접 설계하며 플랫폼을 완성했습니다.",
    ],
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }];
}

export default async function ResumePage({
  params,
}: PageProps<"/[locale]/resume">) {
  const { locale } = await params;

  if (locale !== "ko") {
    notFound();
  }

  setRequestLocale(locale);

  const resumeProjects = RESUME_PROJECT_SLUGS.map((slug) =>
    getProjectBySlug(slug),
  ).filter((project): project is Project => Boolean(project));

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

      {/* 7–8. 프로젝트 (TRUSafer, Plandy — 프로젝트 배경/주요 작업 내용/결과 및 성과) */}
      {resumeProjects.map((project, index) => (
        <StarProjectDetail
          key={project.slug}
          project={project}
          star={STAR_CONTENT[project.slug as keyof typeof STAR_CONTENT]}
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

function StarProjectDetail({
  project,
  star,
  showGroupTitle = false,
}: {
  project: Project;
  star: { background: string[]; mainWork: string[]; results: string[] };
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
        <Image
          src={project.thumbnail}
          alt={project.title.ko}
          fill
          sizes="768px"
          quality={85}
          priority
          className="object-cover"
        />
      </div>

      <DetailBlock title="기술 스택">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="프로젝트 배경">
        <ul className="text-body flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          {star.background.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="주요 작업 내용">
        <ul className="text-body flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          {star.mainWork.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="결과 및 성과">
        <ul className="text-body flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          {star.results.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </DetailBlock>
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
