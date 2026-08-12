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

/** Newest first. */
export const careers: Career[] = [
  {
    id: "autosilicon",
    company: { ko: "(주)오토실리콘", en: "Autosilicon" },
    role: { ko: "풀스택 개발자", en: "Full-stack Developer" },
    period: { start: "2024-09" },
    highlights: {
      ko: [
        "Outlook 대용량 첨부·외부 공유 애드인(M365Works)을 Nuxt.js·Django 기반으로 풀스택 개발했습니다.",
        "PowerShell 일괄 처리(Batch)로 다중 파일 DRM 레이블 해제 시간을 4분에서 10초로 단축했습니다.",
        "Microsoft Graph API와 Teams Bot API를 연동해 PC 없이도 처리 가능한 모바일 결재 플로우를 추가 설계·구현했습니다.",
      ],
      en: [
        "Built M365Works, an Outlook add-in for large attachments and external sharing, end to end with Nuxt.js and Django.",
        "Cut DRM label removal for multi-file attachments from 4 minutes to 10 seconds by batching PowerShell calls.",
        "Designed and shipped a mobile approval flow on top of Microsoft Graph API and the Teams Bot API, removing the need for a PC.",
      ],
    },
    projectSlug: "m365works",
  },
  {
    id: "aijoon",
    company: { ko: "(주)아이준", en: "Aijoon" },
    role: { ko: "프론트엔드 개발자", en: "Frontend Developer" },
    period: { start: "2021-09", end: "2024-08" },
    highlights: {
      ko: [
        "CPS 관제 플랫폼 Plandy의 프론트엔드를 단독으로 맡아 Vue 3 → React 아키텍처 전환을 제안·주도했고, GS 인증 1등급 획득에 기여했습니다.",
        "IP 카메라 임베디드 웹(IPC)을 1인 풀스택으로 개발해 빌드 용량을 60MB에서 12MB로 줄이고 기기 탑재에 성공했습니다.",
        "화재 예측 관제 대시보드(TRUSafer)에서 Blob 메모리 누수를 해결해 24시간 상시 관제 환경의 안정성을 확보했습니다.",
      ],
      en: [
        "Owned the frontend of Plandy, a CPS monitoring platform, and drove its Vue 3 → React migration; the platform earned a GS Certification Grade 1.",
        "Built IPC, an embedded web UI shipped inside IP cameras, as a solo full-stack developer, shrinking the build from 60MB to 12MB so it fit on the device.",
        "Fixed a Blob memory leak in TRUSafer, a fire-prediction monitoring dashboard, making 24/7 operation stable.",
      ],
    },
    projectSlug: "plandy",
  },
];
