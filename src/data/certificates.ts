import type { LocalizedText } from "./types";

export type Certificate = {
  id: string;
  name: LocalizedText;
  issuer: LocalizedText;
  /** Acquisition date, `YYYY-MM` or `YYYY-MM-DD`. */
  issuedAt: string;
  credentialUrl?: string;
};

/** Newest first. */
export const certificates: Certificate[] = [
  {
    id: "engineer-information-communication",
    name: { ko: "정보통신기사", en: "Engineer Information Communication" },
    issuer: {
      ko: "한국방송통신전파진흥원",
      en: "Korea Communications Agency (KCA)",
    },
    issuedAt: "2021-05",
  },
  {
    id: "engineer-information-processing",
    name: { ko: "정보처리기사", en: "Engineer Information Processing" },
    issuer: { ko: "한국산업인력공단", en: "HRD Korea" },
    issuedAt: "2020-12",
  },
];
