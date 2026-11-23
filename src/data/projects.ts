import type { LocalizedList, LocalizedText, Period } from "./types";

export type ProjectCategory = "company" | "toy";

/** Mirrors the `Project` schema in docs/PRD.md §7. */
export type Project = {
  slug: string;
  title: LocalizedText;
  category: ProjectCategory;
  period: Period;
  /** Number of people on the team, including me. */
  teamSize: number;
  stack: string[];
  summary: LocalizedText;
  myRole: LocalizedText;
  features: LocalizedList;
  /** Omit when there isn't a meaningful challenge to highlight for this project. */
  challenges?: LocalizedText;
  improvements?: LocalizedText;
  links?: { demo?: string; repo?: string };
  /** Public path, e.g. `/projects/foo/thumb.png`. */
  thumbnail: string;
  /** Architecture diagram image public path, e.g. `/projects/foo/architecture.png`. */
  architectureImage?: string;
  images?: string[];
};

// NOTE(content): 원본 문서 간 기간·팀 규모가 엇갈리는 항목은 아래 기준으로 판단했습니다.
// 확인 후 교체 필요.
//
// ① toda: docs/projects/Toda.md 기준 기획 시작 2026-10-20, 첫 커밋 10-21, 마지막 커밋 11-16 (약 4주).
//    사내 SW 팀 TL로서 기획·설계·구현·테스트·배포까지 1인 개발.
// ② m365works: docs/projects/m365works.md 기준 본인 참여 2025-10~2026-09 (11개월), 3인 팀
//    (프론트엔드 주 담당, 백엔드 공동 개발, 2026-02 이후 단독 유지보수).
// ③ rms: docs/projects/rms.md 기준 2024-09-27~2026-10-07 (약 2년), IT팀 기여자 3위 (커밋 271건).
// ④ plandy: docs/projects/projects.md 의 "CPS 기반 생산 현장 원격 모니터링 시스템"과
//    docs/projects/Plandy.md 는 기간(2021.11~2023.06)·기술·성과가 동일한 같은 프로젝트라
//    하나로 병합했습니다. 표기명은 "Plandy"로 통일.
// ⑤ ipc-camera: projects.md 는 2024.02~2024.07(6개월), IPC.md 헤더는 2024.02~2024.05(4개월).
//    IPC.md 본문에 2024.06.04 / 2024.07.25 개발 로그가 남아 있어 2024.02~2024.07 을 채택.
// ⑥ trusafer: projects.md 는 2023.11.01 시작, TRUSafer 문서는 2023.12.27 시작.
//    "한 달의 시간만 주어졌다"는 서술과 일치하는 12월을 시작으로 잡고, 종료는 마지막
//    개발 로그(2024.06.21)를 반영해 2023.12~2024.06 으로 표기했습니다.
// ⑦ survey: 초기 구축은 2023.01~2023.03 이지만 2024.04 재의뢰로 연도별 버전을 추가
//    개발(~2024.07.25)했기에 기간을 2023.01~2024.07 로 합쳤습니다.
// ⑧ make-pro: 실제 저장소(C:\Users\airwa\OneDrive\Desktop\code\make_pro)의 git 로그를
//    확인해 2026.06.14 첫 커밋 ~ 2026.07.02 마지막 커밋(README 작성)으로 교체했습니다.
// ⑨ tutoring-notice: 실제 저장소(...\code\poo-study-notes)의 git 로그·package.json·
//    docker-compose.yaml을 확인해 기간을 2023.11(첫 커밋) 시작으로, 스택을 실제 구성
//    (React+Recoil+TanStack Query 클라이언트, 초기 Express·Sequelize에서 NestJS·TypeORM
//    으로 재작성된 서버, MariaDB, Nginx)으로 교체했습니다.

/**
 * Company projects first (newest first), then personal projects (newest first).
 * The list is rendered in array order; there is no sort step downstream.
 */
export const projects: Project[] = [
  {
    slug: "toda",
    title: {
      ko: "Toda",
      en: "Toda",
    },
    category: "company",
    period: { start: "2026-10", end: "2026-11" },
    teamSize: 1,
    stack: [
      "NestJS",
      "TypeScript",
      "TypeORM",
      "MariaDB",
      "React",
      "Vite",
      "Tailwind CSS",
      "Model Context Protocol",
      "Claude Code",
      "Jest",
      "Vitest",
    ],
    summary: {
      ko: "3개의 독립적인 사내 SW 프로젝트 간 협업 비효율과 버전 호환성 관리 문제를 해결하기 위해, 기획부터 오프라인 사내망 배포 및 운영까지 4주 만에 1인 개발한 사내 프로젝트 관리 플랫폼입니다. 팀원은 각자의 Claude Code에서 MCP(Model Context Protocol) 툴로 업무 항목과 프로젝트 간 요청(Request)을 자연어로 관리하고, 웹 대시보드로 실시간 진척도와 Timeline, Team 일정을 확인합니다.",
      en: "An internal project management platform designed, built, and deployed to an air-gapped corporate network in 4 weeks as a solo project lead, solving inter-project handoff friction and version compatibility tracking across three interdependent software initiatives. Engineers manage tasks and inter-project requests via 28 Model Context Protocol (MCP) tools inside Claude Code, while tracking timelines and team capacity through a web console.",
    },
    myRole: {
      ko: "기획부터 React 웹 화면, NestJS 백엔드 API, Claude Code 연동용 MCP 서버 개발과 사내망 배포까지 전체 기능을 혼자 구현했습니다.",
      en: "Sole developer responsible for the entire implementation, from planning and React web frontend to NestJS backend APIs, Claude Code MCP server, and internal network deployment.",
    },
    features: {
      ko: [
        "프로젝트 간 협업 요청(Request) 6단계 상태 머신 및 수락 시 하위 Task 생성 및 해결 원자적 트랜잭션",
        "웹 REST API와 동일한 도메인 서비스를 공유하는 28개 툴의 무상태 MCP 서버 (Claude Code 연동)",
        "사람이 작성한 본문과 AI가 작성한 본문(AI 칸)의 데이터 및 수정 권한 분리",
        "Timeline 간트 뷰, Team 주간 뷰, DB 트리거와 SHA-256 체크섬 기반 불변(Immutable) 주간 기록",
        "업무 번호 체계의 프로젝트별 순번 → 전역 번호 무중단 데이터베이스 마이그레이션",
        "단위 및 HTTP 통합 테스트 4,781개 구축 (NestJS 서비스 계층 커버리지 99.9%)",
        "인터넷 연결이 없는 사내 Windows 서버를 위한 해시 검증 및 자동 롤백 배포 파이프라인",
      ],
      en: [
        "Inter-project request workflow with a 6-state machine, atomically generating tasks upon acceptance",
        "Stateless MCP server providing 28 tools that share the business service layer with REST APIs",
        "Strict database and authorization separation between human and AI-authored fields",
        "Timeline Gantt charts, weekly team views, and tamper-evident weekly snapshots sealed with SHA-256 checksums",
        "Zero-downtime database migration transitioning issue keys from project-scoped to global sequences",
        "4,781 unit and HTTP integration tests maintaining 99.9% service branch coverage",
        "Automated deployment pipeline for air-gapped Windows servers with hash verification and rollback protection",
      ],
    },
    thumbnail: "/projects/toda/toda-architecture.png",
    architectureImage: "/projects/toda/toda-architecture.png",
    images: [],
  },
  {
    slug: "m365works",
    title: {
      ko: "M365Works",
      en: "M365Works",
    },
    category: "company",
    period: { start: "2025-10", end: "2026-09" },
    teamSize: 3,
    stack: [
      "Nuxt.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Django",
      "Office.js",
      "Microsoft Graph API",
      "Teams Bot API",
      "PowerShell",
      "Synology NAS",
    ],
    summary: {
      ko: "Outlook에서 첨부파일이 든 외부 메일 발송 시 OnMessageSend 이벤트로 가로채 다단계 결재를 거치게 하고, 최종 승인 시 서버가 Purview 민감도 레이블(DRM)을 해제하고 사내 NAS에 업로드한 뒤 본문 링크를 보안 공유 링크로 치환해 기안자 명의로 자동 발송하는 반출 결재 시스템입니다. 별도 포털에 접속해야 했던 기존의 번거로운 결재 절차를 Outlook 작업창 하나로 통합했습니다.",
      en: "An Outlook add-in outbound approval platform that intercepts outbound emails containing large attachments via the OnMessageSend event, enforces multi-tier sign-offs, automatically strips Purview DRM labels, stores files on Synology NAS, and swaps body links for secure time-limited links before dispatching via Microsoft Graph API on behalf of the sender.",
    },
    myRole: {
      ko: "3인 팀에서 프론트엔드 개발을 주로 맡아 Outlook 보내기 이벤트 핸들러(순수 Vanilla JS), 작업창(Nuxt 4 + Vue 3), 관리 콘솔 및 결재 추적 화면을 구축했으며, 백엔드에서는 결재 요청 처리 파이프라인, Teams 봇 연동, DRM 일괄 해제 최적화, 비동기 스레드 풀(16개) 처리를 공동 개발했습니다. 2026년 2월 이후에는 단독으로 운영 이슈 해결 및 기능 고도화를 진행했습니다.",
      en: "Primary frontend engineer in a 3-person team, implementing the pure Vanilla JS Outlook OnMessageSend event handler, the Nuxt 4 + Vue 3 Taskpane, and the web admin console. Co-engineered backend approval state workflows, Teams Bot API integration, batched DRM removal, and a 16-worker thread pool. Led solo maintenance and operational enhancements from February 2026 onward.",
    },
    features: {
      ko: [
        "Outlook OnMessageSend 이벤트로 외부 메일 발송을 가로채 다단계 반출 결재로 전환하는 순수 JS 핸들러",
        "작업창(Nuxt 4)과 이벤트 핸들러 간 메모리 격리를 극복하기 위한 사용자 지정 속성(Custom Property) 상태 연동",
        "최대 50개(1GB) 대용량 첨부파일 업로드 및 결재선 지정, 본문 임시 링크 자동 삽입",
        "PowerShell 일괄 처리 기반 다중 파일 Purview 민감도 레이블(DRM) 해제 최적화",
        "메일 저장소 간 본문 동기화 지연을 감지하는 링크별 고유 토큰 검증 시스템",
        "Microsoft Graph API 연동 사내 계정 및 기안자 대리 메일 발송",
        "Teams Bot API 기반 모바일 결재 요청, 승인, 반려 플로우 및 봇 장애 감지 알림 체계",
        "SSR 제거 및 클라이언트 렌더링 전환으로 프론트엔드 빌드 시간 최적화 (5분 → 31초)",
      ],
      en: [
        "Pure JavaScript OnMessageSend event handler intercepting outbound mail to enforce multi-tier approval workflows",
        "Custom Property state bridging across isolated taskpane and event handler runtimes",
        "Multi-file upload (up to 50 files / 1GB), routing chain configuration, and body link insertion in Nuxt 4",
        "Batched PowerShell processing reducing DRM sensitivity label stripping to 2 execution runs",
        "Per-link unique token validation guarding against premature dispatch caused by Graph mailbox sync delays",
        "Sender impersonation and mail dispatch through the Microsoft Graph API",
        "Teams Bot API integration for mobile approval notifications, action processing, and fault reporting",
        "Frontend build time reduction from ~5 minutes to ~31 seconds by disabling redundant SSR",
      ],
    },
    challenges: {
      ko: "결재 승인 시 파일마다 개별 PowerShell 프로세스를 띄워 DRM 레이블을 해제하던 구조에서는 파일 50개 기준 처리 시간이 4~5분까지 늘어나 발송이 지연되는 문제가 있었습니다. 프로세스 생성 오버헤드가 원인임을 확인하고, 실제 레이블이 걸린 파일만 선별한 뒤 경로 배열을 넘겨 단 2회의 PowerShell 호출로 일괄 처리(Batch Processing)하도록 개선하여 10초대로 단축했습니다. 또한 빠른 발송 시 Exchange 사서함 동기화 지연으로 링크가 빠진 이전 본문이 발송되는 문제를 링크별 고유 검증 토큰을 심어 백엔드가 Graph API로 동기화를 확인한 후 발송하도록 설계해 본문 무결성을 확보했습니다.",
      en: "Spawning individual PowerShell processes per file to strip Purview DRM labels took 4–5 minutes for 50 files due to process startup overhead. I resolved this by filtering for files genuinely bearing labels and passing them as an array, cutting executions to just 2 batched runs and shrinking processing time to ~10 seconds. In addition, rapid dispatch caused stale bodies without links to be mailed due to asynchronous Exchange synchronization delays; I resolved this by embedding unique verification tokens in each link and requiring backend Graph API polling to confirm token presence before authorizing final delivery.",
    },
    improvements: {
      ko: "외근이나 출장 중인 결재권자가 PC Outlook에 접속하지 못해 결재가 보류되고 메일 발송이 멈추는 병목 현상을 발견하고, 모바일 Teams 환경에서 바로 결재할 수 있도록 Teams Bot API 연동 원격 승인 플로우를 제안하여 구축했습니다. 아울러 봇 서버 장애를 유형별로 감지해 관리자에게 알리고 결재 요청을 재발송하는 복구 기능을 마련했으며, Nuxt 빌드 병목을 프로파일링하여 SSR을 제거하고 클라이언트 렌더링으로 전환함으로써 빌드 시간을 5분에서 31초로 90% 단축시켰습니다.",
      en: "Noticing that traveling approvers unable to open PC Outlook halted email delivery, I proposed and built a mobile approval workflow via the Teams Bot API. I also introduced automated bot fault detection with admin alerts and resend capabilities. Furthermore, by profiling Nuxt build bottlenecks and eliminating redundant SSR, I slashed production build time from ~5 minutes to ~31 seconds.",
    },
    thumbnail: "/projects/m365works/thumbnail.png",
    architectureImage: "/projects/m365works/m365works-architecture.png",
    images: [],
  },
  {
    slug: "rms",
    title: {
      ko: "RMS",
      en: "RMS",
    },
    category: "company",
    period: { start: "2024-09", end: "2026-10" },
    teamSize: 4,
    stack: [
      "Python",
      "Django",
      "Vue.js",
      "Bootstrap",
      "MariaDB",
      "MySQL",
      "APScheduler",
      "Active Directory",
      "Microsoft 365",
      "Prometheus",
      "Chart.js",
      "ApexCharts",
      "JWT",
    ],
    summary: {
      ko: "사내 임직원 전체가 사용하는 포털형 자원관리시스템(RMS)으로, 약 28개 Django 앱으로 구성된 모놀리식 환경에서 인프라 권한 신청 및 승인, 인사 계정 자동화, 실시간 모니터링 대시보드 등을 설계하고 개발했습니다. 입사, 부서이동, 퇴사 등 인사 이벤트에 따라 AD, M365, ETX, NAS 공유폴더를 순차 반영하는 오케스트레이션을 구축하고, 외부 시스템 동시 갱신 충돌을 막기 위한 순차 실행 큐를 도입했습니다.",
      en: "An enterprise Resource Management System (RMS) portal serving all company employees, built as a monolithic Django platform spanning ~28 apps. I led the end-to-end design and implementation of infrastructure permission workflows, HR-driven account lifecycle orchestration, and real-time infrastructure monitoring dashboards. I also designed a serialized execution queue to eliminate concurrent update anomalies across Active Directory, Microsoft 365, and NAS storage systems.",
    },
    myRole: {
      ko: "4인 팀의 풀스택 개발자로 참여해 사내 인프라 관리와 계정 자동화 시스템을 개발했습니다. 직원의 입사, 부서 이동, 퇴사에 맞춰 Active Directory와 M365(Microsoft 365) 계정 생성 및 권한을 자동으로 처리하는 시스템을 구축하고, NAS 공유폴더와 SharePoint 사이트 권한을 신청하고 승인하는 웹 서비스를 직접 설계하고 개발했습니다. 또한 Prometheus와 NAS API를 연동해 서버와 스토리지 상태를 실시간으로 확인하는 모니터링 대시보드 화면을 구축했습니다.",
      en: "Full-stack developer in a 4-person team, responsible for internal infrastructure workflows and account lifecycle automation. Built orchestration systems that automatically handle Active Directory and M365 (Microsoft 365) account provisioning and permission updates for employee onboarding, department transfers, and offboarding. Independently designed and developed web approval workflows for NAS shared folder and SharePoint site permissions, and created real-time server and storage monitoring dashboards by integrating Prometheus and NAS APIs.",
    },
    features: {
      ko: [
        "빌드 도구 없는 Django 템플릿 환경에서 Vue 2.7 컴포넌트화 아키텍처 수립 및 전역 로딩/에러 처리 일원화",
        "NAS 공유폴더 및 SharePoint 사이트 권한 신청 및 승인 워크플로와 Active Directory / M365 그룹 자동 연동",
        "입사, 부서이동, 퇴사 시 AD, M365, ETX, 공유폴더, 메일 참조 규칙을 순차 반영하는 계정 오케스트레이션",
        "동시 계정 갱신 시 발생하는 Lost Update를 방지하는 메모리 기반 순차 실행 큐(단일 워커 큐) 구현",
        "Prometheus(PromQL) 및 Synology NAS API 연동 서버와 스토리지 성능 및 용량 실시간 모니터링 대시보드",
        "사내 에이전트 간 비대칭키 상호 인증을 위한 RSA 2048 기반 자체 JWT 발급 및 키 교체 서비스",
        "외부 파일 공유(파일링크) 승인 워크플로 및 백그라운드 파이프라인 단계별 오류 복구 모델",
      ],
      en: [
        "Architected componentized Vue 2.7 patterns inside a bundler-free Django template system with unified loading and error handling",
        "NAS shared folder and SharePoint permissions approval workflows integrated with Active Directory and M365 groups",
        "Lifecycle orchestration updating AD, M365, ETX, shared folders, and email CC rules upon onboarding, transfer, or offboarding",
        "In-memory serialized execution queue (single-worker queue) preventing lost updates during concurrent account modifications",
        "Real-time server and storage performance dashboards pulling metrics from Prometheus (PromQL) and Synology NAS APIs",
        "Asymmetric JWT issuance and rotation service utilizing RSA-2048 keys for authenticating internal network agents",
        "Background file-sharing link approval pipeline with granular staged error recovery",
      ],
    },
    thumbnail: "/projects/rms/rms-architecture.png",
    architectureImage: "/projects/rms/rms-architecture.png",
    images: [],
  },
  {
    slug: "ipc-camera",
    title: {
      ko: "IPC",
      en: "IPC",
    },
    category: "company",
    period: { start: "2024-02", end: "2024-07" },
    teamSize: 1,
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Recoil",
      "Tailwind CSS",
      "Go",
      "WebSocket",
      "RTSP",
      "Canvas API",
    ],
    summary: {
      ko: "IP 카메라 하드웨어 내부에 웹 서버를 탑재하여, 별도 HDMI 모니터나 마우스 연결 없이 웹 브라우저만으로 기기 설정 및 실시간 및 녹화 영상을 관리할 수 있도록 구축한 임베디드 관제 웹 서비스입니다. 노후화된 UI를 재설계하고 제약된 하드웨어 리소스에 최적화하여 성공적으로 런칭했으며, 고객사의 신뢰를 얻어 후속 프로젝트 개발까지 이어졌습니다.",
      en: "An embedded web UI hosted directly inside IP camera hardware, enabling full device configuration, live streaming, and playback via web browser without external HDMI monitors or peripherals. I redesigned the legacy UI and optimized performance for constrained hardware resources, leading to follow-up project development with the same client.",
    },
    myRole: {
      ko: "UI 설계부터 Go 웹 서버 구축, React 프론트엔드 개발, 하드웨어 기기 탑재까지 1인 풀스택으로 진행했습니다.",
      en: "Owned solo full-stack delivery: UI/UX design, Go backend server, React frontend, and embedded on-device deployment.",
    },
    features: {
      ko: [
        "H.265 / H.264 / MJPEG 실시간 스트리밍",
        "타임라인 바로 구간을 옮겨가는 녹화 영상 재생(Playback)",
        "Canvas API로 구현한 OSD 다각형 영역 편집",
        "카메라 내부에서 구동되는 Go 웹서버 기반 영상 중계",
        "네트워크, 영상, 이벤트 등 카메라 설정 관리 화면",
      ],
      en: [
        "Live streaming for H.265, H.264 and MJPEG",
        "Recorded playback with a scrubbing timeline bar",
        "OSD polygon region editor built on the Canvas API",
        "A Go web server running on-device, relaying the video stream",
        "Configuration screens for network, video and event settings",
      ],
    },
    challenges: {
      ko: "초기 Node.js(Express) 백엔드를 pkg로 크로스 컴파일하고 CRA 기반 프론트엔드 번들(21MB)을 합쳤을 때 총 빌드 용량이 약 60MB에 달해, 카메라 하드웨어의 스토리지 용량 한계를 초과하여 탑재가 불가능한 문제가 발생했습니다. 단일 바이너리로 컴파일되어 런타임 오버헤드가 적은 Go 언어로 백엔드를 재설계하고, 프론트엔드는 CRA에서 Vite로 마이그레이션했습니다. 그 결과 전체 용량을 12MB(React 7MB + Go 5MB)로 80% 감축하여 기기에 탑재를 성공시켰습니다.",
      en: "Cross-compiling the initial Node.js/Express backend with pkg alongside a 21MB CRA frontend bundle produced a ~60MB payload, which exceeded the camera's strict flash storage limits and was rejected for deployment. To resolve this, I rewrote the backend in Go to compile into a lightweight single binary and migrated the frontend build from CRA to Vite to maximize tree-shaking on UI libraries. This reduced the total footprint to 12MB (7MB React + 5MB Go)—an 80% reduction—enabling smooth on-device installation.",
    },
    improvements: {
      ko: "복잡한 영상 좌표 계산과 상태 제어 로직을 순수 함수로 모듈화하고, 주요 인터페이스와 계산 알고리즘에 대한 인라인 문서를 체계적으로 정리했습니다. 1인 개발 프로젝트였음에도 추후 원활한 유지보수와 인수인계가 가능하도록 코드 가독성을 확보했으며, 개발 완료 후에도 다른 개발자가 쉽게 이해하고 확장할 수 있는 코드 구조를 고민하는 계기가 되었습니다.",
      en: "I decoupled repetitive coordinate math and state handling into pure utility functions and documented key algorithms and interfaces. Even as a solo project, this maintainability focus paid off significantly during later handover and feature updates, demonstrating the long-term value of self-documenting code and clean abstractions.",
    },
    thumbnail: "/projects/ipc-camera/thumbnail.webp",
    images: [],
  },
  {
    slug: "trusafer",
    title: {
      ko: "TRUSafer",
      en: "TRUSafer",
    },
    category: "company",
    period: { start: "2023-12", end: "2024-06" },
    teamSize: 3,
    stack: [
      "React",
      "Redux",
      "Ant Design",
      "Tailwind CSS",
      "Chart.js",
      "MQTT",
      "Node.js",
      "Express",
      "Notification API",
    ],
    summary: {
      ko: "열화상 센서로 수집된 온도를 실시간으로 모니터링하여 화재 징후를 감지하는 24시간 관제 대시보드입니다. 현장당 최대 200여 대의 센서 데이터를 처리하며, 구역별로 설정한 주의 및 위험 온도를 넘어가면 화면에 경고를 띄우고 브라우저 알림으로 바로 상황을 알립니다.",
      en: "A 24/7 industrial fire monitoring dashboard that tracks temperatures from thermal sensors in real time to detect fire risks early. It processes streams from up to ~200 sensors per site and displays on-screen warnings with browser notifications whenever a zone exceeds preset caution or danger thresholds.",
    },
    myRole: {
      ko: "웹 프론트엔드를 혼자 맡아 반응형 대시보드 설계와 MQTT 실시간 센서 연동, Chart.js를 활용한 온도 시각화까지 모두 개발했습니다. 또한 셋탑박스 펌웨어 배포에 필요한 Node.js와 Express 기반 파일 업로드 서버도 함께 구축했습니다.",
      en: "Sole frontend engineer responsible for responsive dashboard design, real-time sensor communication via MQTT, and temperature visualization using Chart.js. Also built the Node.js/Express file upload server for edge set-top box firmware distribution.",
    },
    features: {
      ko: [
        "MQTT 기반 센서 상태 및 열영상 실시간 수신 (정상, 주의, 위험, 점검)",
        "Chart.js 온도 추이 시각화와 상태 기반 우선순위 정렬",
        "Notification API를 이용한 임계값 초과 실시간 알림",
        "QR 및 바코드 스캔으로 센서와 셋탑박스 등록",
        "사용자 그룹과 권한에 따른 기능 및 화면 제어",
        "셋탑박스 펌웨어 버전 확인 및 다운로드 REST API",
      ],
      en: [
        "Real-time sensor status and thermal frames over MQTT (normal / caution / danger / check)",
        "Chart.js temperature trends with status-priority sorting",
        "Threshold alerts through the Notification API",
        "Sensor and set-top box registration via QR / barcode scan",
        "Group- and role-based feature and screen visibility",
        "REST API for firmware version checks and downloads",
      ],
    },
    challenges: {
      ko: "24시간 상시 가동되는 관제 환경에서 실시간 열영상 프레임을 createObjectURL로 디코딩해 렌더링하던 중, 브라우저 메모리가 지속적으로 누적되어 결국 화면이 멈추는 문제가 발생했습니다. chrome://blob-internals/를 통해 디버깅한 결과, 수신되는 프레임마다 생성된 Blob 객체가 가비지 컬렉터(GC)에 수거되지 못하고 메모리에 남아 있었습니다. 이를 해결하기 위해 이전 프레임 렌더링 직후 URL.revokeObjectURL()을 호출해 메모리를 바로 해제하도록 렌더 루프를 수정했습니다. 이후 며칠간 이어진 연속 스트리밍 테스트에서도 메모리 점유율이 일정하게 유지됨을 확인하여 관제 시스템의 연속 가동 안정성을 확보했습니다.",
      en: "In a continuous 24/7 control-room deployment, decoding live thermal frames via createObjectURL caused browser memory to steadily climb until the tab froze. Inspecting chrome://blob-internals/ revealed that per-frame Blob references were never being garbage-collected. I resolved this by revoking prior blobs with URL.revokeObjectURL() directly after rendering each frame. Long-term stress tests confirmed memory usage stayed flat, ensuring high reliability for non-stop monitoring.",
    },
    improvements: {
      ko: "한 달이라는 짧은 일정 때문에 구현부터 서두르기 쉬웠지만, 무작정 만들기보다 개발에 들어가기 전 회의를 거쳐 화면 흐름과 필요한 데이터 형태를 먼저 맞췄습니다. 요구사항과 화면 구성을 미리 맞춰둔 덕분에 중간에 화면을 다시 엎는 일 없이 정해진 일정 안에 프로젝트를 마칠 수 있었습니다.",
      en: "Facing an aggressive one-month deadline, it was tempting to jump straight into coding. Instead, we held short alignment meetings before starting development to agree on screen flows and data structures first. Locking down requirements beforehand prevented costly UI rewrites and allowed us to finish the project right on schedule.",
    },
    thumbnail: "/projects/trusafer/thumbnail.webp",
    images: [],
  },
  {
    slug: "plandy",
    title: {
      ko: "Plandy",
      en: "Plandy",
    },
    category: "company",
    period: { start: "2021-11", end: "2023-06" },
    teamSize: 3,
    stack: [
      "React",
      "TypeScript",
      "Sass",
      "Chart.js",
      "MQTT",
      "RTSP",
      "ffmpeg",
      "Node.js",
      "Docker",
      "Vue.js",
    ],
    summary: {
      ko: "중소기업 제조 현장을 위한 실시간 원격 모니터링 플랫폼입니다. IP 카메라로 설비 계측기의 수치를 자동 인식하고, 현장 영상과 설비 가동 상태를 한 화면에서 확인하며 생산 병목과 생산량을 분석합니다. 소프트웨어 품질 인증인 GS 인증 1등급을 획득했습니다.",
      en: "A real-time remote monitoring platform for smart factory floors in small and medium-sized manufacturing facilities. IP cameras automatically read machine gauges, while a single dashboard integrates live video feeds and operating statuses to analyze production bottlenecks and output. The platform achieved GS Certification Grade 1.",
    },
    myRole: {
      ko: "프론트엔드 개발을 혼자 맡아 대시보드 화면 설계부터 인증 서버 연동, Docker 배포까지 전체를 개발했습니다. 추가로 DFS 알고리즘을 활용한 공정 조건 최적화 로직도 직접 작성해 공인 소프트웨어 시험(KTR)을 통과했습니다.",
      en: "Sole frontend engineer on the project, handling everything from dashboard UI design to auth server integration and Docker deployment. Also wrote the DFS-based process parameter optimization logic and passed accredited KTR software testing.",
    },
    features: {
      ko: [
        "설비 상태와 생산 현황을 통합한 원격 관제 대시보드",
        "MQTT 기반 대규모 시계열 데이터 실시간 처리",
        "ffmpeg 및 RTSP 중계를 통한 현장 영상 스트리밍",
        "Chart.js 기반 생산 병목 분석 및 생산량 예측 시각화",
        "DFS 알고리즘을 이용한 공정 조건 최적화",
        "사용자 인증 서버 연동 및 Docker 기반 웹 배포",
      ],
      en: [
        "Unified remote console for equipment status and production metrics",
        "Real-time processing of high-volume time-series data over MQTT",
        "On-site video streaming relayed through ffmpeg and RTSP",
        "Bottleneck analysis and output forecasting charts with Chart.js",
        "Process condition optimization via a DFS algorithm",
        "Auth server integration and Docker-based web deployment",
      ],
    },
    challenges: {
      ko: "처음에는 Vue 3로 개발을 시작했으나, 당시에는 참고할 만한 자료나 관련 라이브러리가 부족해 복잡한 관제 화면을 만들 때마다 일정이 계속 지연되었습니다. 문제를 해결하려면 라이브러리 생태계가 넓고 타입 안정성이 높은 React와 TypeScript로 바꾸는 것이 낫다고 판단해 팀에 전환을 제안했습니다. 기존 화면을 점차 옮겨가면서 반복되는 데이터 처리 로직은 커스텀 훅으로 분리해 정리했습니다. 기술 스택을 바꾼 뒤 개발 속도와 버그 해결이 훨씬 빨라졌고, 정해진 기한 내에 안정적으로 납품하며 GS 인증 1등급까지 받을 수 있었습니다.",
      en: "We initially started development on Vue 3, but a lack of production-ready references and libraries at the time caused persistent delays whenever we added complex monitoring views. Realizing a mature ecosystem was needed, I proposed migrating to React and TypeScript. As we ported screens incrementally, I separated reusable data-handling logic into custom hooks. The migration significantly accelerated development and debugging, allowing us to deliver on schedule and secure GS Certification Grade 1.",
    },
    improvements: {
      ko: "대량의 실시간 데이터를 Chart.js로 그리다 보니 화면이 버벅거리는 문제가 있었습니다. 단순히 프론트엔드에서만 해결할 문제가 아니라고 판단해, 백엔드 팀원과 함께 DB 저장 단위와 데이터 전달 주기를 먼저 상의하고 맞추면서 불필요한 데이터 전송과 재작업을 크게 줄였습니다. 영상 스트리밍도 기존 라이브러리에 의존하기보다 ffmpeg로 직접 다루면서 현장 요구사항에 맞춰 훨씬 수월하게 대응할 수 있었습니다. 특히 디자이너 없이 19개월간 혼자 화면을 만들다 보니, 초기에 공통 컴포넌트와 화면 기준을 제대로 세워두는 것이 얼마나 중요한지 크게 느꼈습니다.",
      en: "Rendering high-frequency live data with Chart.js initially caused UI lag. Seeing this wasn't just a frontend issue, I worked with the backend team to align database storage intervals and data transmission frequencies beforehand, significantly cutting down unnecessary network traffic and rework. Handling video streaming directly with ffmpeg rather than pre-built wrappers also gave us the flexibility to adapt easily to changing on-site requirements. Building the UI alone for 19 months without a designer taught me firsthand how essential it is to establish shared components and design rules early on.",
    },
    thumbnail: "/projects/plandy/thumbnail.webp",
    images: [],
  },
  {
    slug: "make-pro",
    title: {
      ko: "Make Pro",
      en: "Make Pro",
    },
    category: "toy",
    period: { start: "2026-06", end: "2026-07" },
    teamSize: 1,
    stack: [
      "Electron",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "KaTeX",
      "Gemini API",
      "Playwright",
    ],
    summary: {
      ko: "수학 문제집 사진에서 문제 텍스트와 수식(LaTeX)을 AI로 추출해 편집하고, A4 2단 시험지 형태의 PDF 및 편집 가능한 한글(.hwpx) 문서로 내보내는 Windows 데스크톱 앱입니다. Python이나 Node.js 같은 별도 런타임 설치 없이 더블클릭만으로 동작하는 단일 실행 파일로 배포했으며, 학원 강사인 실사용자가 실제 수업용 시험지 제작에 매주 사용하고 있습니다.",
      en: "A Windows desktop application that extracts math problems and LaTeX equations from workbook photos via AI OCR, enables WYSIWYG editing, and exports clean two-column A4 test sheets as PDFs and fully editable Hangul (.hwpx) documents. Shipped as a standalone double-clickable binary with zero external dependencies, it is actively used by a math instructor to produce real classroom materials.",
    },
    myRole: {
      ko: "기획부터 프론트엔드 개발, AI API 연동, 데스크톱 앱 패키징 및 배포까지 1인으로 진행했으며, 실사용자의 작업 피드백을 바탕으로 편집기 UX를 지속적으로 개선하고 있습니다.",
      en: "Sole developer across product design, desktop frontend, Gemini API integration, and electron-builder packaging, iteratively improving editor ergonomics from live user feedback.",
    },
    features: {
      ko: [
        "사진 한 장에서 여러 문제와 수식, 보기, 그림 영역을 구조화해 추출하는 Gemini API 기반 OCR",
        "MathLive 시각 편집기와 한국 교육과정 수식 팔레트 (LaTeX 몰라도 입력 가능)",
        "블록 드래그 재정렬 기반 문제 편집기와 수동 크롭",
        "가상 A4 뷰어로 미리 보고 그대로 출력하는 2단 PDF 내보내기",
        "한글에서 바로 수정 가능한 .hwpx 내보내기 (네이티브 수식 변환)",
        "자동 저장 및 복구 기능",
      ],
      en: [
        "Gemini-powered OCR that splits one photo into multiple problems with formulas, choices and figure slots",
        "MathLive visual editor plus a symbol palette matched to the Korean curriculum, so no LaTeX is required",
        "Block-level drag reordering editor with manual cropping",
        "Two-column PDF export previewed in a virtual A4 viewer and printed as-is",
        "HWPX export that stays editable in the Korean word processor, with native formulas",
        "Autosave and crash recovery",
      ],
    },
    // Personal project, not published.
    thumbnail: "/projects/make-pro/thumbnail.png",
    images: [],
  },
  {
    slug: "tutoring-notice",
    title: {
      ko: "학원 알림장",
      en: "Academy Notes",
    },
    category: "toy",
    period: { start: "2023-11" },
    teamSize: 1,
    stack: [
      "React",
      "Recoil",
      "TanStack Query",
      "Tailwind CSS",
      "NestJS",
      "TypeORM",
      "MariaDB",
      "Docker",
      "Nginx",
      "Oracle Cloud",
    ],
    summary: {
      ko: "선생님이 작성한 월별 학습 리포트를 학부모가 확인할 수 있는 학원용 알림장 서비스입니다. 기존에는 수업 피드백을 카카오톡으로 전달하다 보니 개인 대화에 묻혀 지난 알림장을 다시 찾기 어려웠습니다. 이를 해결하기 위해 선생님은 학생별, 월별 알림장을 등록 및 관리하고, 학부모는 발급받은 계정으로 로그인해 자녀의 학습 리포트를 쉽게 열람할 수 있도록 웹 서비스를 구축했습니다. Oracle Cloud와 개인 도메인으로 배포해 2024년부터 현재까지 약 20명의 실제 사용자가 이용하고 있습니다.",
      en: "A dedicated academy notes web service where parents can access monthly student learning reports published by instructors. Previously, progress updates were shared via KakaoTalk chat, where they frequently got buried in personal messages and became difficult to reference. To solve this, I built a web app where instructors easily manage records per student and month, and parents securely log in to read reports. Hosted on Oracle Cloud with a custom domain, it has maintained ~20 active users since 2024.",
    },
    myRole: {
      ko: "기획부터 프론트엔드, 백엔드, 인프라 배포 및 실제 운영까지 1인으로 진행했으며, 실제 피드백을 반영하며 현재도 지속적으로 유지보수하고 있습니다.",
      en: "Sole engineer managing product requirements, frontend, backend API, infrastructure, and ongoing maintenance driven by user requests.",
    },
    features: {
      ko: [
        "학생 등록과 월별 알림장 작성을 처리하는 관리자 페이지",
        "회원가입 없이 관리자가 계정을 생성해 발급하는 로그인 구조",
        "월 단위로 정리된 학부모용 알림장 열람 화면 (반응형)",
        "로그인 시도 제한, JWT 토큰 로테이션, XSS 새니타이징을 적용한 인증 보안",
        "주 1회 DB 자동 백업과 백업 파일 이메일 발송",
        "휴면 계정과 계정 삭제 등 운영 기능",
      ],
      en: [
        "Admin pages for registering students and writing monthly notes",
        "No sign-up: the admin creates and hands out accounts",
        "Responsive parent-facing view organized by month",
        "Auth hardened with login rate limiting, JWT token rotation, and XSS sanitization",
        "Weekly automated DB backups emailed off-site",
        "Operational features such as dormant and deleted accounts",
      ],
    },
    challenges: {
      ko: "학부모 입장에서 회원가입 절차가 번거로우면 서비스를 시작조차 하지 않을 수 있었습니다. 이를 해결하기 위해 직접 가입하는 과정을 없애고, 선생님이 학생을 등록하면 계정을 발급해 전달하는 방식으로 설계했습니다. 접속 주소도 누구나 쉽게 기억하고 들어올 수 있도록 한글 도메인으로 맞췄습니다. 그 결과 별도로 사용법을 안내하지 않아도 학부모들이 어려움 없이 로그인할 수 있었고, 2024년 초 오픈 이후 지금까지 약 20명의 학부모가 매달 자녀의 알림장을 확인하고 있습니다.",
      en: "A standard sign-up form could have felt tedious or confusing for parents, preventing them from using the service altogether. To make access effortless, I removed self-registration entirely; instructors generate accounts and hand them over directly. I also set up a memorable Korean domain so parents could open the site without confusion. As a result, parents were able to log in without needing any user guide, and about 20 parents have been actively reading monthly reports since early 2024.",
    },
    improvements: {
      ko: "오라클 클라우드 프리티어 환경에서 발생할 수 있는 인스턴스 중단 및 데이터 유실 리스크에 대비해, 매주 DB 백업 파일을 생성해 개인 이메일로 자동 전송하는 백업 파이프라인을 구축했습니다. 2년 넘게 실서비스로 운영하면서 증가하는 보안 및 안정성 요구사항에 대응하기 위해, 초기 Express와 Sequelize 서버를 NestJS와 TypeORM 기반으로 리팩토링했습니다. 이 과정에서 로그인 무차별 대입 방지(Rate Limiting), JWT 토큰 로테이션, XSS 방지 새니타이징, Winston 기반 구조화 로깅을 단계적으로 도입하여 보이지 않는 백엔드 인프라의 견고함을 확보했습니다.",
      en: "Operating on Oracle Cloud's free tier posed a risk of data loss should an instance terminate unexpectedly. I mitigated this by building an automated weekly database dump emailed off-site. Over two years of live operations, evolving security requirements prompted a rewrite from Express/Sequelize to NestJS and TypeORM, incorporating rate limiting, JWT token rotation, XSS sanitization, and structured logging with Winston to bolster system reliability and defense-in-depth.",
    },
    thumbnail: "/projects/tutoring-notice/thumbnail.webp",
    images: [],
  },
  {
    slug: "survey",
    title: {
      ko: "설문조사",
      en: "Survey",
    },
    category: "toy",
    period: { start: "2023-01", end: "2024-07" },
    teamSize: 2,
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Sequelize",
      "MySQL",
      "Docker",
      "Apache",
    ],
    summary: {
      ko: "충남대학교 산학협력단이 지원사업 참여 기업 300여 곳을 대상으로 진행하던 대면 및 서면 설문을 온라인화한 시스템입니다. 구글 설문 폼으로는 불가능했던 기업별 개별 접근 제어와 결과 통계 엑셀 추출 요구를 충족하도록 자체 구축했으며, 초기 시스템을 성공적으로 납품한 뒤 2024년 동일 의뢰처로부터 연도별 확장 버전 개발을 다시 의뢰받아 진행했습니다.",
      en: "An online survey platform developed for the Chungnam National University Industry-Academic Cooperation Foundation, replacing manual paper surveys across ~300 ICT R&D beneficiary companies. Custom-built to provide enterprise-level access controls and custom statistical Excel exports not feasible with Google Forms, its success led to being re-commissioned in 2024 to support multi-year recurring editions.",
    },
    myRole: {
      ko: "기획부터 풀스택 웹 개발, 배포까지 직접 진행했으며, 테스트를 담당한 팀원 1명과 협업하여 프로젝트를 완성했습니다.",
      en: "Led planning, full-stack web development, and deployment, collaborating with one teammate who focused on testing.",
    },
    features: {
      ko: [
        "기업별 암호화 URL과 비밀번호를 결합한 설문 접근 제어",
        "페이지를 이동해도 유지되는 응답 임시 저장",
        "미작성 필수 문항 안내 및 해당 문항으로 바로 이동",
        "완료 시간순 정렬을 지원하는 응답 결과 Excel 다운로드",
        "데이터 손실 방지를 위한 정기 백업",
        "연도별(2023 / 2024) 서비스 도메인 분리 운영",
      ],
      en: [
        "Per-company access control via an encrypted URL plus a password",
        "Draft answers preserved across page navigation",
        "Unanswered required questions flagged with a jump link to the question",
        "Excel export of responses, sortable by completion time",
        "Scheduled backups to guard against data loss",
        "Separate domains per survey year (2023 / 2024)",
      ],
    },
    improvements: {
      ko: "주관식 텍스트와 숫자 등 문항마다 응답 형태가 달라 집계할 때 헷갈리기 쉬웠는데, TypeScript로 타입을 정의해 데이터 오류를 방지했습니다. 테스트 과정에서 마주한 예외 상황들을 꼼꼼히 검증하며 시스템을 다듬었고, 의뢰처와 구현 범위를 미리 조율하며 안정적으로 납품했습니다. 이러한 신뢰를 바탕으로 2024년에도 연도별 필수 문항 로직을 추가하는 후속 개발을 성공적으로 마쳤습니다.",
      en: "Because survey questions mixed text and numeric inputs, handling different data types could easily lead to confusion; defining types with TypeScript kept the response data reliable. Thoroughly addressing edge cases during testing and aligning on project scope with the client ensured on-time delivery. Building this trust led to successfully expanding the platform in 2024 with year-specific question logic.",
    },
    thumbnail: "/projects/survey/thumbnail.webp",
    images: [],
  },
  {
    slug: "annual-leave",
    title: {
      ko: "연차관리 서비스",
      en: "Annual Leave Manager",
    },
    category: "toy",
    period: { start: "2022-12", end: "2023-01" },
    teamSize: 1,
    stack: [
      "React",
      "TypeScript",
      "Bootstrap",
      "FullCalendar",
      "Node.js",
      "Express",
      "Sequelize",
      "MySQL",
      "Slack",
    ],
    summary: {
      ko: "사내 근태 관리 솔루션이 유료화되면서 다시 엑셀로 관리해야 하는 불편함을 줄이고자 만든 연차 관리 웹 서비스입니다. 입사일 기준 연차 자동 계산, 팀 공유 캘린더, Slack 연동 등 사내에서 바로 필요한 기능 위주로 구성했습니다.",
      en: "An internal time-off management web service built when our prior commercial solution turned paid, replacing manual spreadsheet tracking. It focuses on essential company needs: an API calculating leave by tenure based on labor law, a shared team calendar, and Slack notifications.",
    },
    myRole: {
      ko: "DB 설계부터 백엔드 API, 프론트엔드, 사내망 배포까지 혼자 진행했습니다.",
      en: "Solo development across schema design, backend APIs, frontend, and internal network deployment.",
    },
    features: {
      ko: [
        "근로기준법 기준 근속 기간별 연차 개수 자동 산정 API",
        "FullCalendar 기반 팀 전체 휴가 현황 캘린더",
        "연차 사용 시 Slack 채널 자동 알림",
        "연차 외 경조사, 예비군, 여름휴가 등 유형별 관리",
        "연차 히스토리 테이블 설계와 주 1회 자동 백업",
        "모바일까지 대응하는 반응형 UI",
      ],
      en: [
        "API that computes leave entitlement by tenure under Korean labor law",
        "Team-wide time-off calendar built on FullCalendar",
        "Automatic Slack notification when leave is booked",
        "Separate handling for family events, reserve duty and summer leave",
        "Leave history tables with weekly automated backups",
        "Responsive UI down to mobile",
      ],
    },
    improvements: {
      ko: "DB 설계부터 백엔드 API와 프론트엔드까지 혼자 개발하다 보니, 화면을 만들면서 필요한 데이터 형태가 있으면 대기 시간 없이 API를 바로 수정하며 속도를 낼 수 있었습니다. 프론트엔드가 화면을 그릴 때 어떤 데이터 구조를 받아야 다루기 편한지 직접 겪어봤기 때문에, 이후 백엔드 개발자와 협업할 때도 서로 다루기 편한 API 구조를 먼저 제안하고 조율하는 계기가 되었습니다.",
      en: "Handling both backend and frontend development allowed me to immediately adjust API response structures to fit UI requirements without waiting on external handoffs. Experiencing firsthand what data structures make frontend rendering simpler also helped me propose and coordinate clean, intuitive API contracts when collaborating with backend teams later.",
    },
    thumbnail: "/projects/annual-leave/thumbnail.png",
    images: [],
  },
  {
    slug: "label-img",
    title: {
      ko: "labelImg",
      en: "labelImg",
    },
    category: "toy",
    period: { start: "2022-07", end: "2022-09" },
    teamSize: 1,
    stack: ["Vue.js", "JavaScript", "Canvas API"],
    summary: {
      ko: "YOLO 객체 검출 모델 학습에 필요한 바운딩 박스 좌표 데이터를 별도 소프트웨어 설치 없이 브라우저에서 추출할 수 있는 사내용 웹 라벨링 툴입니다. 로컬 이미지를 불러와 마우스 드래그로 영역을 지정하면 정규화된 좌표 데이터를 복사해 학습 데이터셋으로 바로 활용할 수 있습니다.",
      en: "An internal web-based tool for labeling YOLO object detection datasets directly in the browser without installing software. Users load local images, draw bounding boxes, and copy normalized coordinates for immediate use in training datasets.",
    },
    myRole: {
      ko: "프론트엔드 1인 개발로 Canvas 렌더링과 단축키 조작 로직을 직접 구현했습니다.",
      en: "Solo frontend development covering Canvas rendering and keyboard shortcut interactions.",
    },
    features: {
      ko: [
        "Canvas 기반 바운딩 박스 생성, 이동, 크기 조절, 삭제",
        "W(그리기) / ESC(이동) 단축키로 모드 전환",
        "선택한 박스의 좌표를 클립보드로 복사",
        "박스별 색상 변경과 이미지 위 표시/숨김 토글",
      ],
      en: [
        "Draw, move, resize and delete bounding boxes on a Canvas",
        "Keyboard mode switching (W to draw, ESC to move)",
        "Copy the selected box's coordinates to the clipboard",
        "Per-box color changes and show/hide toggles over the image",
      ],
    },
    challenges: {
      ko: "HTML5 Canvas는 DOM 요소와 달리 개별 도형에 이벤트를 붙이거나 크기를 조절하는 기능이 없어, 마우스 좌표 판정과 영역 이동 및 리사이즈 로직을 직접 구현해야 했습니다. 모서리 핸들과 사각형 영역 안으로 마우스가 들어왔는지 계산하는 로직을 일일이 종이에 그려가며 작성했고, W(그리기)와 ESC(선택/이동) 단축키로 모드를 분리해 마우스 조작이 겹치지 않게 정리했습니다. 덕분에 버튼을 일일이 누르지 않고 키보드와 마우스만으로 빠르게 라벨링을 진행할 수 있었습니다.",
      en: "HTML5 Canvas does not provide native event listeners or resize handles for drawn shapes, requiring all hit-testing, dragging, and corner resizing to be calculated directly from coordinates. I worked through coordinate calculations for boundary and handle detection, and separated drawing and selection modes with W and ESC keys to prevent overlapping interactions. This allowed smooth, rapid labeling using just the keyboard and mouse.",
    },
    improvements: {
      ko: "개발을 마친 뒤 이미 완성도 높은 오픈소스 라벨링 도구들이 많다는 사실을 알게 되어, 기능을 만들기 전에 기존 솔루션이나 라이브러리를 먼저 충분히 찾아보는 계기가 되었습니다. 하지만 Canvas 2D에서 마우스 좌표 판정과 그래픽 변환을 바닥부터 직접 다뤄본 경험 덕분에, 이후 IPC 카메라의 OSD 다각형 편집기와 TRUSafer의 실시간 영상 렌더링 같은 캔버스 그래픽 기능들을 수월하게 구현할 수 있었습니다.",
      en: "After finishing development, I learned that mature open-source labeling tools were already available, which taught me the value of thoroughly researching existing solutions before building from scratch. However, building Canvas 2D mouse event handling and coordinate systems from the ground up served as a solid foundation when later developing the IPC polygon OSD editor and TRUSafer's real-time video rendering.",
    },
    thumbnail: "/projects/label-img/thumbnail.webp",
    images: [],
  },
];

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all",
): Project[] {
  return category === "all"
    ? projects
    : projects.filter((project) => project.category === category);
}
