import type { LocalizedList, LocalizedText, Period } from "./types";

export type Career = {
  id: string;
  company: LocalizedText;
  /** Job title / position held at the company. */
  role: LocalizedText;
  period: Period;
  /** 1–3 short lines describing the features I owned (PRD 4.1 ③). */
  highlights: LocalizedList;
  /** Links this career entry to `/projects/[slug]`. */
  projectSlug?: string;
};

/** TODO(content): replace with the real career history. Newest first. */
export const careers: Career[] = [
  {
    id: "acme-corp",
    company: { ko: "ACME 커머스", en: "ACME Commerce" },
    role: { ko: "프론트엔드 개발자", en: "Frontend Developer" },
    period: { start: "2024-01" },
    highlights: {
      ko: [
        "레거시 어드민의 Next.js 전환을 주도하고 공통 컴포넌트 라이브러리를 구축했습니다.",
        "10만 행 규모 상품 테이블의 인터랙션 지연을 3초에서 200ms로 개선했습니다.",
      ],
      en: [
        "Led the migration of the legacy admin to Next.js and built the shared component library.",
        "Cut interaction latency on a 100k-row product table from 3s to 200ms.",
      ],
    },
    projectSlug: "commerce-admin",
  },
  {
    id: "beta-studio",
    company: { ko: "베타 스튜디오", en: "Beta Studio" },
    role: { ko: "웹 개발자 (인턴)", en: "Web Developer (Intern)" },
    period: { start: "2023-06", end: "2023-12" },
    highlights: {
      ko: [
        "마케팅 랜딩 페이지 템플릿을 제작하고 A/B 테스트 인프라를 연동했습니다.",
        "이미지 최적화와 스크립트 지연 로딩으로 Lighthouse 성능 점수를 62점에서 94점으로 올렸습니다.",
      ],
      en: [
        "Built marketing landing page templates and wired them into the A/B testing setup.",
        "Raised the Lighthouse performance score from 62 to 94 via image optimization and deferred scripts.",
      ],
    },
  },
];
