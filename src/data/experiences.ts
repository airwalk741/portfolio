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

// NOTE(content): docs/ 원본에는 수상/발표/오픈소스 이력이 명시되어 있지 않아,
// 문서로 확인 가능한 인증·시험 통과 실적(Plandy)만 담았습니다.
// 실제 수상·컨퍼런스 발표·오픈소스 기여 이력이 있다면 확인 후 추가해 주세요.
// 두 항목 모두 취득 시점이 원본에 없어 Plandy 프로젝트 종료 시점(2023.06)을
// 기준으로 추정했습니다 — 정확한 날짜 확인 후 교체 필요.
export const experiences: Experience[] = [
  {
    id: "gs-certification-plandy",
    type: "award",
    title: {
      ko: "GS 인증 1등급 획득 — 보급형 CPS 플랫폼 Plandy",
      en: "GS Certification Grade 1 — Plandy CPS Platform",
    },
    organization: {
      ko: "한국정보통신기술협회(TTA)",
      en: "Telecommunications Technology Association (TTA)",
    },
    period: { start: "2023-06" },
    description: {
      ko: "프론트엔드 단독 담당자로 인증 프로세스에 참여했습니다. 인증 요구사항에 맞춰 인증·권한 처리를 재설계하고 보안 취약점을 사전 점검해, 소프트웨어 품질 인증인 GS 1등급을 획득했습니다.",
      en: "Took part in the certification process as the sole frontend owner — reworking the authentication and permission flow to meet the requirements and auditing security issues up front. The platform passed with Grade 1, Korea's software quality certification.",
    },
  },
  {
    id: "ktr-software-test-plandy",
    type: "etc",
    title: {
      ko: "KTR 소프트웨어 시험 통과 — 공정 조건 최적화 알고리즘",
      en: "KTR Software Test Passed — Process Optimization Algorithm",
    },
    organization: { ko: "한국화학융합시험연구원(KTR)", en: "KTR" },
    period: { start: "2023-06" },
    description: {
      ko: "DFS 기반 공정 조건 최적화 알고리즘을 직접 설계·구현해 공인 시험기관의 소프트웨어 시험을 통과했습니다.",
      en: "Designed and implemented a DFS-based process optimization algorithm that passed an accredited software test.",
    },
  },
];
