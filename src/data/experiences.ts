import type { LocalizedText, Period } from "./types";

export type ExperienceType =
  | "award"
  | "talk"
  | "opensource"
  | "community"
  | "etc";

export type Experience = {
  id: string;
  type: ExperienceType;
  title: LocalizedText;
  /** Host organization, conference name, repository, etc. */
  organization: LocalizedText;
  period: Period;
  description?: LocalizedText;
  link?: string;
};

/** TODO(content): replace with real awards / talks / OSS contributions. */
export const experiences: Experience[] = [
  {
    id: "frontend-conf-talk",
    type: "talk",
    title: {
      ko: "대규모 테이블 렌더링 최적화 사례 발표",
      en: "Talk: Optimizing Large Table Rendering",
    },
    organization: { ko: "사내 프론트엔드 세미나", en: "Internal FE Seminar" },
    period: { start: "2025-05" },
    description: {
      ko: "가상 스크롤 도입 전후의 프로파일링 결과를 공유하고, 팀 내 렌더링 최적화 체크리스트를 만들었습니다.",
      en: "Shared before/after profiling results of introducing virtualization and turned them into a team-wide rendering checklist.",
    },
  },
  {
    id: "oss-contribution",
    type: "opensource",
    title: {
      ko: "오픈소스 기여 — 타입 정의 및 문서 개선",
      en: "Open Source — type definitions & docs",
    },
    organization: { ko: "커뮤니티 라이브러리", en: "Community library" },
    period: { start: "2024-08" },
    description: {
      ko: "제네릭 추론이 깨지던 훅의 타입 시그니처를 수정하고 사용 예제를 문서에 추가했습니다.",
      en: "Fixed a hook signature that broke generic inference and added usage examples to the docs.",
    },
    link: "https://github.com/example/pull/1",
  },
];
