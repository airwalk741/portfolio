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
  /** Omit when a specific acquisition date isn't meaningful to show. */
  period?: Period;
  description?: LocalizedText;
  link?: string;
};

// NOTE(content): docs/ 원본에는 수상/발표/오픈소스 이력이 명시되어 있지 않아,
// 문서로 확인 가능한 교육 수료·인증·시험 통과 실적만 담았습니다.
// 실제 수상·컨퍼런스 발표·오픈소스 기여 이력이 있다면 확인 후 추가해 주세요.
// GS/KTR 두 항목은 취득 시점이 원본에 없어 기간 표기를 생략했습니다.
export const experiences: Experience[] = [
  {
    id: "ssafy",
    type: "etc",
    title: {
      ko: "삼성 청년 SW 아카데미(SSAFY) 수료",
      en: "Completed Samsung Software Academy for Youth (SSAFY)",
    },
    organization: { ko: "삼성전자", en: "Samsung Electronics" },
    period: { start: "2021-01", end: "2021-08" },
    description: {
      ko: "삼성 주관 소프트웨어 교육과정 수료 및 웹 개발 중심 팀 프로젝트 진행.",
      en: "Completed Samsung's software engineering program, working mainly on team-based web projects.",
    },
  },
  {
    id: "gs-certification-plandy",
    type: "etc",
    title: {
      ko: "GS 인증 1등급 획득 (보급형 CPS 플랫폼 Plandy)",
      en: "GS Certification Grade 1 (Plandy CPS Platform)",
    },
    organization: {
      ko: "한국정보통신기술협회(TTA)",
      en: "Telecommunications Technology Association (TTA)",
    },
    description: {
      ko: "프론트엔드 단독 담당자로 인증 프로세스 참여. 인증 요구사항에 맞춘 인증 및 권한 처리 재설계와 보안 취약점 사전 점검으로 GS 인증 1등급 획득.",
      en: "Took part in the certification process as the sole frontend owner, reworking the authentication and permission flow to meet the requirements and auditing security issues up front. The platform passed with Grade 1, Korea's software quality certification.",
    },
  },
  {
    id: "ktr-software-test-plandy",
    type: "etc",
    title: {
      ko: "KTR 소프트웨어 시험 통과 (공정 조건 최적화 알고리즘)",
      en: "KTR Software Test Passed (Process Optimization Algorithm)",
    },
    organization: { ko: "한국화학융합시험연구원(KTR)", en: "KTR" },
    description: {
      ko: "DFS 기반 공정 조건 최적화 알고리즘 직접 설계 및 구현으로 공인 시험기관 소프트웨어 시험 통과.",
      en: "Designed and implemented a DFS-based process optimization algorithm that passed an accredited software test.",
    },
  },
];
