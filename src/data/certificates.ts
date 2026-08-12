import type { LocalizedText } from "./types";

export type Certificate = {
  id: string;
  name: LocalizedText;
  issuer: LocalizedText;
  /** Acquisition date, `YYYY-MM` or `YYYY-MM-DD`. */
  issuedAt: string;
  credentialUrl?: string;
};

// NOTE(content): 정확한 취득일 미상 — 추정값.
// 원본(docs/projects/projects.md)에는 자격증명만 있고 취득일이 없습니다.
// 두 자격증 모두 취업(2021.09) 이전에 취득한 것으로 보고,
// - 정보처리기사: SSAFY 수료(2021.08) 시점 전후
// - 정보통신기사: 정보통신공학과 재학 말기(졸업 2021.02) 전후
// 로 각각 추정해 넣었습니다. 실제 취득일 확인 후 교체해 주세요.
/** Newest first. */
export const certificates: Certificate[] = [
  {
    id: "engineer-information-processing",
    name: { ko: "정보처리기사", en: "Engineer Information Processing" },
    issuer: { ko: "한국산업인력공단", en: "HRD Korea" },
    issuedAt: "2021-08",
  },
  {
    id: "engineer-information-communication",
    name: { ko: "정보통신기사", en: "Engineer Information Communication" },
    issuer: {
      ko: "한국방송통신전파진흥원",
      en: "Korea Communications Agency (KCA)",
    },
    issuedAt: "2020-11",
  },
];
