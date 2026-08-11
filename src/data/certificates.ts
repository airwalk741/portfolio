import type { LocalizedText } from "./types";

export type Certificate = {
  id: string;
  name: LocalizedText;
  issuer: LocalizedText;
  /** Acquisition date, `YYYY-MM` or `YYYY-MM-DD`. */
  issuedAt: string;
  credentialUrl?: string;
};

/** TODO(content): replace with the real certificate list. Newest first. */
export const certificates: Certificate[] = [
  {
    id: "info-processing-engineer",
    name: { ko: "정보처리기사", en: "Engineer Information Processing" },
    issuer: { ko: "한국산업인력공단", en: "HRD Korea" },
    issuedAt: "2023-06",
  },
  {
    id: "sqld",
    name: { ko: "SQL 개발자 (SQLD)", en: "SQL Developer (SQLD)" },
    issuer: { ko: "한국데이터산업진흥원", en: "K-DATA" },
    issuedAt: "2022-12",
  },
];
