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
        "사내 SW 프로젝트 관리 플랫폼(Toda)의 기획부터 웹 화면, 백엔드 API, MCP 서버 개발 및 사내망 배포까지 전체 기능 1인 개발.",
        "Outlook 메일 첨부 반출 결재 애드인(M365Works)의 프론트엔드 주 담당 및 백엔드 공동 개발, PowerShell DRM 일괄 처리(4분→10초) 및 Teams 봇 모바일 결재 구현.",
        "사내 자원관리시스템(RMS)의 인프라 권한 관리(NAS, SharePoint) 및 인사 계정 자동화 오케스트레이션 개발, 동시성 갱신 충돌을 방지하는 순차 실행 큐 도입.",
      ],
      en: [
        "Led solo full-stack delivery of Toda, an internal project management platform, from planning to web UI, backend APIs, Claude Code MCP server, and air-gapped deployment.",
        "Led frontend engineering and co-developed backend workflows for M365Works, an Outlook add-in for external sharing, cutting DRM removal from 4 minutes to 10 seconds via batched PowerShell and shipping Teams mobile approvals.",
        "Engineered NAS/SharePoint permissions and HR account lifecycle orchestration in the enterprise RMS (Django/Vue 2), introducing a serialized queue to prevent concurrent update anomalies.",
      ],
    },
    projectSlug: "toda",
  },
  {
    id: "aijoon",
    company: { ko: "(주)아이준", en: "Aijoon" },
    role: { ko: "프론트엔드 개발자", en: "Frontend Developer" },
    period: { start: "2021-09", end: "2024-08" },
    highlights: {
      ko: [
        "CPS 관제 플랫폼 Plandy의 프론트엔드를 단독으로 맡아 Vue 3 → React 아키텍처 전환 진행 및 GS 인증 1등급 획득에 기여.",
        "IP 카메라 임베디드 웹(IPC) 1인 풀스택 개발 및 빌드 용량 최적화(60MB → 12MB)로 기기 탑재 성공.",
        "화재 예측 관제 대시보드(TRUSafer)의 Blob 메모리 누수 해결로 24시간 상시 관제 환경 안정성 확보.",
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
