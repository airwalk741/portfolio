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
  improvements: LocalizedText;
  links?: { demo?: string; repo?: string };
  /** Public path, e.g. `/projects/foo/thumb.png`. */
  thumbnail: string;
  images?: string[];
};

// NOTE(content): 원본 문서 간 기간·팀 규모가 엇갈리는 항목은 아래 기준으로 판단했습니다.
// 확인 후 교체 필요.
//
// ① plandy: docs/projects/projects.md 의 "CPS 기반 생산 현장 원격 모니터링 시스템"과
//    docs/projects/Plandy.md 는 기간(2021.11~2023.06)·기술·성과가 동일한 같은 프로젝트라
//    하나로 병합했습니다. 표기명은 "Plandy"로 통일.
// ② ipc-camera: projects.md 는 2024.02~2024.07(6개월), IPC.md 헤더는 2024.02~2024.05(4개월).
//    IPC.md 본문에 2024.06.04 / 2024.07.25 개발 로그가 남아 있어 2024.02~2024.07 을 채택.
// ③ trusafer: projects.md 는 2023.11.01 시작, TRUSafer 문서는 2023.12.27 시작.
//    "한 달의 시간만 주어졌다"는 서술과 일치하는 12월을 시작으로 잡고, 종료는 마지막
//    개발 로그(2024.06.21)를 반영해 2023.12~2024.06 으로 표기했습니다.
//    팀 규모도 헤더(FE 2 / BE 2)와 본문(FE 1 + BE 2)이 달라, 더 구체적인 본문 기준 3명.
// ④ survey: 초기 구축은 2023.01~2023.03 이지만 2024.04 재의뢰로 연도별 버전을 추가
//    개발(~2024.07.25)했기에 기간을 2023.01~2024.07 로 합쳤습니다.
// ⑤ m365works: 전용 상세 문서가 없어 projects.md 서술과 careers.ts highlights 를 근거로
//    작성했습니다. 기간(2025.09~2026.02)은 projects.md 표기 그대로이며, 팀 규모는 명시가
//    없어 "역할: 풀스택 개발" 서술에 따라 1인으로 두었습니다.
// ⑥ make-pro: 실제 저장소(C:\Users\airwa\OneDrive\Desktop\code\make_pro)의 git 로그를
//    확인해 2026.06.14 첫 커밋 ~ 2026.07.02 마지막 커밋(README 작성)으로 교체했습니다.
// ⑦ links: 공개 데모/저장소가 확인되는 프로젝트가 없어 전부 생략했습니다.
//    make-pro/tutoring-notice 는 실제 GitHub 저장소(비공개 추정)를 확인했지만, 공개
//    링크로 걸어도 되는지 확인 전이라 우선 생략.
// ⑧ tutoring-notice: 실제 저장소(...\code\poo-study-notes)의 git 로그·package.json·
//    docker-compose.yaml을 확인해 기간을 2023.11(첫 커밋) 시작으로, 스택을 실제 구성
//    (React+Recoil+TanStack Query 클라이언트, 초기 Express·Sequelize에서 NestJS·TypeORM
//    으로 재작성된 서버, MariaDB, Nginx)으로 교체했습니다.

/**
 * Company projects first (newest first), then personal projects (newest first).
 * The list is rendered in array order; there is no sort step downstream.
 */
export const projects: Project[] = [
  {
    slug: "m365works",
    title: {
      ko: "M365Works",
      en: "M365Works",
    },
    category: "company",
    period: { start: "2025-09", end: "2026-02" },
    teamSize: 3,
    stack: [
      "Nuxt.js",
      "Vue.js",
      "Django",
      "Office.js",
      "Microsoft Graph API",
      "Teams Bot API",
      "PowerShell",
    ],
    summary: {
      ko: "대용량 첨부와 외부 공유를 Outlook 안에서 결재를 거쳐 끝낼 수 있게 만든 사내 애드인입니다. 메일 첨부 용량 제한(20MB)과 민감도 레이블(DRM) 때문에 직원들이 거쳐야 했던 별도 웹 서비스를 대체했고, 도입 이후 기존 레거시 웹 서비스 사용률이 10% 수준으로 떨어졌습니다.",
      en: "An in-house Outlook add-in that routes large attachments and external sharing through an approval step, without leaving the mail client. It replaces the separate web tool employees had to use because of the 20MB attachment cap and DRM sensitivity labels, and after rollout usage of that legacy service dropped to about 10%.",
    },
    myRole: {
      ko: "프론트엔드(Nuxt.js), 백엔드(Django), 배포까지 풀스택으로 담당했습니다. 기획 단계에서 놓친 결재 엣지 케이스를 발견해 모바일 결재 플로우를 직접 제안·구현했습니다.",
      en: "Owned the whole stack, from the Nuxt.js frontend to the Django backend and deployment. I also spotted an approval edge case the spec had missed and proposed and shipped a mobile approval flow for it.",
    },
    features: {
      ko: [
        "Outlook taskpane에서 20MB 초과 첨부 파일을 업로드하면 자동으로 링크로 변환",
        "결재가 승인되면 민감도 레이블(DRM)을 자동 해제하고 Graph API로 메일 발송",
        "PowerShell 일괄 처리 기반 다중 파일 레이블 해제",
        "Microsoft Graph API 연동 사내 계정·메일 처리",
        "Teams Bot API 기반 모바일 결재 플로우",
      ],
      en: [
        "Uploading an attachment over 20MB in the Outlook taskpane converts it into a link automatically",
        "On approval, the sensitivity label (DRM) is removed automatically and the mail is sent via Graph API",
        "Batched PowerShell processing for multi-file label removal",
        "Account and mail handling via Microsoft Graph API",
        "Mobile approval flow built on the Teams Bot API",
      ],
    },
    challenges: {
      ko: "결재가 승인되면 백엔드가 첨부 파일마다 PowerShell을 호출해 DRM 레이블을 해제한 뒤 Graph API로 메일을 보내는데, 파일 50개 기준 이 과정이 4~5분 걸려 승인 후에도 한참 메일이 발송되지 않았습니다. 프로세스 호출 오버헤드가 병목이라고 판단해, 레이블이 적용된 파일만 먼저 걸러낸 뒤 대상 경로를 배열로 묶어 단 1회의 PowerShell 명령으로 일괄 처리하도록 로직을 재설계했습니다. 그 결과 50개 파일 기준 처리 시간이 10초대로 줄어, 승인 직후 바로 메일이 발송되도록 만들었습니다.",
      en: "Once an approval was granted, the backend called PowerShell once per attached file to strip its DRM label before sending through Graph API, and with 50 files that took four to five minutes, so the mail sat unsent long after approval. Identifying process-spawn overhead as the bottleneck, I filtered down to files that actually carried a label and passed their paths as one array to a single batched PowerShell command. Processing 50 files now takes about ten seconds, so the mail goes out right after approval.",
    },
    improvements: {
      ko: "상급자가 외근·출장 중이면 PC Outlook에 접근할 수 없어 결재가 멈추고 메일 발송까지 막히는 엣지 케이스를 발견했습니다. 기획에 없던 요구였지만 모바일에서 바로 확인 가능한 Teams Bot API 기반 원격 결재 플로우를 제안하고 추가 개발해, 장소와 기기에 상관없이 승인이 처리되도록 만들었습니다. 화면을 그리기 전에 '이 기능이 실제 업무 흐름의 어디에서 멈추는가'를 먼저 확인하는 습관이 생겼습니다.",
      en: "I found an edge case where an approver away from their desk could not reach Outlook on a PC, blocking both the approval and the mail itself. It wasn't in the spec, but I proposed and built a remote approval flow on the Teams Bot API so approvals can be handled from a phone. The lesson stuck: before designing screens, find where the feature actually stalls in the real workflow.",
    },
    // Internal company project, so there is no public demo or repository.
    thumbnail: "/projects/m365works/thumbnail.png",
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
      ko: "IP 카메라 하드웨어 안에 웹 서버를 임베딩해, HDMI·마우스 연결 없이 브라우저만으로 카메라를 설정하고 실시간·녹화 영상을 볼 수 있게 만든 임베디드 관제 웹입니다. 오래된 설정 페이지 UI를 다시 설계했고, 런칭 이후 같은 고객사의 후속 프로젝트로 이어졌습니다.",
      en: "An embedded web UI that ships inside IP camera hardware, so the device can be configured and monitored from a browser with no HDMI or mouse attached. I redesigned the dated configuration UI, and the launch led to a follow-up project with the same client.",
    },
    myRole: {
      ko: "UI 설계부터 Go 웹서버, React 프론트엔드, 기기 탑재까지 1인 풀스택으로 진행했습니다.",
      en: "Solo full-stack: UI design, the Go web server, the React frontend and getting it all onto the device.",
    },
    features: {
      ko: [
        "H.265 / H.264 / MJPEG 실시간 스트리밍",
        "타임라인 바로 구간을 옮겨가는 녹화 영상 재생(Playback)",
        "Canvas API로 구현한 OSD 다각형 영역 편집",
        "카메라 내부에서 구동되는 Go 웹서버 기반 영상 중계",
        "네트워크·영상·이벤트 등 카메라 설정 관리 화면",
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
      ko: "초기 Node.js(Express) 백엔드를 pkg로 크로스 컴파일하고 CRA 프론트엔드 번들(21MB)을 합치니 총 용량이 약 60MB가 되어, 기기 스토리지 제약 때문에 '탑재 불가'라는 피드백을 받았습니다. 단일 바이너리를 가볍게 뽑을 수 있는 Go로 백엔드를 전면 재작성하고, 프론트엔드는 CRA에서 Vite로 빌드 환경을 옮겨 UI 라이브러리까지 트리셰이킹되도록 조정했습니다. 최종 용량을 12MB(React 7MB + Go 5MB)로 80% 줄여 기기 탑재에 성공했습니다.",
      en: "Cross-compiling the initial Node.js/Express backend with pkg and bundling the 21MB CRA frontend produced a ~60MB payload, too large for the device storage, and the client rejected it. I rewrote the backend in Go for a compact single binary and migrated the frontend build from CRA to Vite so even the UI library was tree-shaken. The final payload came in at 12MB (7MB React + 5MB Go), an 80% reduction, and shipped on device.",
    },
    improvements: {
      ko: "녹화 영상을 드래그해 원하는 구간으로 바로 이동하는 재생 바를 만들어야 했는데, 마땅한 캔버스 컴포넌트가 없어 처음부터 직접 구현해야 했습니다. 마우스 위치를 시간 값으로 환산하고, 드래그 중에는 전체 프레임을 다시 그리지 않고 스크럽 위치만 갱신하도록 렌더링을 분리하느라 생각보다 시간이 오래 걸렸습니다. 이 과정에서 픽셀 좌표와 시간 값을 오가는 변환 로직을 별도 함수로 분리해두면, 나중에 확대·축소나 마커 추가 같은 기능을 붙이기 훨씬 쉬워진다는 걸 배웠습니다.",
      en: "I had to build a scrubbable playback bar for recorded footage that jumps to any point on drag, and with no ready-made canvas component for it, I ended up writing it from scratch. Converting pointer position into a timestamp, and separating the scrub-position redraw from full frame redraws during dragging, took longer than I expected. What stuck with me: keeping the pixel-to-time conversion in its own function made it much easier to add zoom or markers later, instead of tangling that math into the render loop.",
    },
    thumbnail: "/projects/ipc-camera/thumbnail.png",
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
      ko: "열영상 센서가 측정한 구역별 온도를 실시간으로 모아 화재 징후를 미리 알리는 24시간 관제 대시보드입니다. 현장당 최대 200여 개 센서를 다루며, 사용자가 3×3 구역별로 정한 주의·위험 임계값을 넘으면 즉시 알림을 띄웁니다.",
      en: "A 24/7 monitoring dashboard that aggregates zone-level temperatures from thermal sensors to flag fire risk before it becomes fire. It handles up to ~200 sensors per site and alerts the moment a 3×3 zone crosses the caution or danger threshold the operator configured.",
    },
    myRole: {
      ko: "프론트엔드 웹을 단독으로 담당해 반응형 대시보드 설계·구현, MQTT 센서 통신, 온도 데이터 시각화를 맡았고, 셋탑박스 펌웨어 배포용 파일 업로드 서버(Node.js·Express)도 함께 구현했습니다.",
      en: "Sole frontend engineer on the web client, covering responsive dashboard design and build, MQTT sensor communication and temperature visualization. I also built the Node.js/Express upload server used to distribute set-top box firmware.",
    },
    features: {
      ko: [
        "MQTT 기반 센서 상태·열영상 실시간 수신 (정상/주의/위험/점검)",
        "Chart.js 온도 추이 시각화와 상태 기반 우선순위 정렬",
        "Notification API를 이용한 임계값 초과 실시간 알림",
        "QR·바코드 스캔으로 센서 및 셋탑박스 등록",
        "그룹·권한에 따른 기능 및 화면 노출 제어",
        "셋탑박스 펌웨어 버전 확인·다운로드 REST API",
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
      ko: "24시간 띄워두는 관제실 환경에서, 실시간 열영상 프레임을 createObjectURL로 디코딩해 렌더링하다 보니 브라우저 메모리가 계속 올라가 결국 화면이 멈추는 크리티컬 이슈가 있었습니다. chrome://blob-internals/ 로 확인한 결과 프레임마다 생성된 Blob이 GC에 수거되지 않고 누적되고 있었고, 이전 프레임 렌더링 직후 URL.revokeObjectURL()로 명시적으로 해제하도록 렌더링 로직을 수정했습니다. 이후 장시간 스트리밍에서도 메모리 점유율이 일정하게 유지되는 것을 검증해, 상시 관제 환경의 안정성을 확보했습니다.",
      en: "In a control room the dashboard stays open around the clock, and decoding live thermal frames through createObjectURL made browser memory climb until the page froze, a critical failure. chrome://blob-internals/ showed the per-frame Blobs were never being collected, so I revised the render loop to call URL.revokeObjectURL() immediately after each frame was painted. Memory then held flat across long streaming sessions, making continuous monitoring dependable.",
    },
    improvements: {
      ko: "한 달이라는 시간만 주어졌을 때는 회의보다 구현부터 서두르는 게 맞지 않을까 하는 생각이 들었습니다. 그런데 막상 짧게라도 방향을 맞추는 회의를 거치고 나니, 화면을 만들었다가 다시 갈아엎는 시행착오가 크게 줄었고 결과적으로 납기일도 맞출 수 있었습니다. 돌이켜보면 시간이 없을수록 오히려 방향을 먼저 확인하는 쪽이 더 빠른 길이었습니다.",
      en: "With only a month to work with, my first instinct was that jumping straight into implementation would be faster than sitting in meetings. But even a short round of meetings to align on direction cut down a lot of rework from screens I would've had to redo, and it's what let us hit the deadline. Looking back, the less time you have, the more it pays to lock down direction first.",
    },
    thumbnail: "/projects/trusafer/thumbnail.png",
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
      ko: "중소기업 스마트 팩토리를 위한 보급형 CPS(사이버물리시스템) 기반 생산 현장 원격 모니터링 플랫폼입니다. IP 카메라로 설비 계측기의 디지털·아날로그 수치를 비접촉 인식하고, 설비 상태와 현장 영상을 한 화면에서 관제하며 생산 병목과 생산량을 분석합니다. 소프트웨어 품질 인증인 GS 인증 1등급을 획득했습니다.",
      en: "An affordable CPS (cyber-physical system) platform for remote monitoring of production floors at small and mid-sized smart factories. IP cameras read digital and analog gauges without contact, and a single console combines equipment status with live floor video to analyze bottlenecks and forecast output. The platform earned a GS Certification Grade 1 for software quality.",
    },
    myRole: {
      ko: "프론트엔드 단독 담당자로 아키텍처 설계부터 대시보드 구현, 인증 서버 연동, Docker 기반 배포까지 맡았습니다. DFS 기반 공정 조건 최적화 알고리즘도 직접 설계·구현해 KTR 소프트웨어 시험을 통과했습니다.",
      en: "Sole frontend owner, covering architecture, dashboard implementation, auth server integration and Docker-based deployment. I also designed and implemented the DFS-based process optimization algorithm, which passed an accredited KTR software test.",
    },
    features: {
      ko: [
        "설비 상태와 생산 현황을 통합한 원격 관제 대시보드",
        "MQTT 기반 대규모 시계열 데이터 실시간 처리",
        "ffmpeg·RTSP 중계를 통한 현장 영상 스트리밍",
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
      ko: "프로젝트는 Vue 3로 시작했지만, 당시 Composition API 생태계가 불안정하고 복잡한 관제 UI에 참고할 레퍼런스가 부족해 기능 하나를 붙일 때마다 일정이 밀렸습니다. 지연의 원인이 개인 역량이 아니라 스택 선택에 있다고 판단해 React + TypeScript 아키텍처로의 전환을 팀에 제안하고 주도했고, 기존 Vue 코드를 React Custom Hook으로 추상화해 비즈니스 로직과 UI 컴포넌트를 분리하며 단계적으로 옮겼습니다. 전환 이후 개발 속도가 올라가고 트러블슈팅 시간이 크게 줄어 기한 내 납품했으며, GS 인증 1등급을 받을 수준의 안정성을 확보했습니다.",
      en: "The project started on Vue 3, but the Composition API ecosystem was still unsettled and there were few references for complex monitoring UIs, so every feature slipped the schedule. Concluding the delay came from the stack rather than the team, I proposed and led a migration to React + TypeScript, porting incrementally by abstracting the existing Vue code into React custom hooks that separated business logic from UI components. Delivery speed recovered, troubleshooting time dropped sharply, and we shipped on schedule at a quality level that passed GS Certification Grade 1.",
    },
    improvements: {
      ko: "Chart.js로 실시간 데이터를 그리면서, '얼마나 자주, 얼마나 많이 보여줄 것인가'가 프론트엔드만의 문제가 아니라는 걸 알게 됐습니다. 백엔드 팀원과 DB에 어느 범위까지 보관하고 어떤 단위로 집계해 내려줄지 먼저 합의한 뒤 화면을 만들면서, 불필요한 데이터 왕복과 재작업이 눈에 띄게 줄었습니다. 영상 처리에서도 rtsp-relay 같은 기성 라이브러리보다 ffmpeg를 직접 다루는 편이 요구사항 변경에 훨씬 유연했습니다. 한편 디자이너 없이 19개월간 UI를 끌고 가며 공통 컴포넌트와 디자인 기준을 먼저 세워야 한다는 것도 체감했습니다.",
      en: "Rendering live data with Chart.js made it clear that 'how often and how much to show' is not a frontend-only decision. Agreeing with the backend team on retention windows and aggregation granularity before building the screens cut out a lot of redundant round trips and rework. For video, working directly with ffmpeg proved far more adaptable to changing requirements than an off-the-shelf wrapper like rtsp-relay. Carrying the UI for 19 months without a designer also taught me to establish shared components and design rules early.",
    },
    thumbnail: "/projects/plandy/thumbnail.png",
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
      ko: "수학 문제집 사진에서 텍스트와 수식(LaTeX)을 AI로 추출해 편집하고, A4 2단 시험지 PDF와 편집 가능한 한글(.hwpx) 문서로 내보내는 Windows 데스크톱 앱입니다. Python·Node.js 설치 없이 더블클릭만으로 실행되는 단일 실행 파일로 배포하며, 학원 강사인 여자친구가 실제 수업 자료 제작에 쓰고 있습니다.",
      en: "A Windows desktop app that extracts text and LaTeX formulas from photos of math workbooks, lets you edit them, and exports either a two-column A4 PDF or an editable HWPX (Korean word processor) document. It ships as a single double-click executable with no Python or Node.js required, and my girlfriend, who works as an academy instructor, uses it to build real lesson materials.",
    },
    myRole: {
      ko: "기획·개발·패키징·배포를 1인으로 진행하고 있으며, 실사용자 피드백을 받아 편집기 UX를 반복 개선하고 있습니다.",
      en: "Solo project covering planning, development, packaging and distribution, with the editor UX iterated on real user feedback.",
    },
    features: {
      ko: [
        "사진 한 장에서 여러 문제와 수식·보기·그림 자리를 구조화해 추출하는 Gemini API 기반 OCR",
        "MathLive 시각 편집기와 한국 교육과정 수식 팔레트 (LaTeX 몰라도 입력 가능)",
        "블록 드래그 재정렬 기반 문제 편집기와 수동 크롭",
        "가상 A4 뷰어로 미리 보고 그대로 출력하는 2단 PDF 내보내기",
        "한글에서 바로 수정 가능한 .hwpx 내보내기 (네이티브 수식 변환)",
        "자동 저장·복구",
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
    challenges: {
      ko: "@media print로 곧장 출력하면 문제가 단이나 페이지 경계에서 잘렸고, 사용자는 인쇄 버튼을 누르기 전까지 결과를 알 수 없었습니다. 화면에 실제 A4 크기의 가상 뷰어를 렌더링해 배치를 미리 확인하게 하고, 동일한 구조를 그대로 printToPDF로 출력하도록 파이프라인을 하나로 통일했습니다. 문제 단위 높이를 계산해 경계에서 자동으로 다음 단·페이지로 넘기도록 만들어, 미리보기와 출력물이 어긋나는 일을 없앴습니다.",
      en: "Printing straight through @media print sliced problems in half at column and page boundaries, and users only found out after hitting print. I rendered a virtual A4 viewer on screen so the layout is visible beforehand, then unified the pipeline so printToPDF outputs that exact structure. Measuring each problem's height and pushing it to the next column or page when it doesn't fit removed the gap between preview and output entirely.",
    },
    improvements: {
      ko: "수식을 이미지로 붙이면 한글에서 고칠 수 없어 사용자가 결국 다시 타이핑해야 했습니다. LaTeX를 한글 수식 편집기 스크립트로 변환해 HWPX(OWPML) 문서를 직접 생성하도록 만들어, 문서를 열고 더블클릭하면 바로 편집되는 네이티브 수식으로 넣었습니다. 무료 API 한도에 걸려 작업이 끊기던 문제도 키를 여러 개 등록해 자동 전환하도록 해결했습니다. 실사용자가 바로 옆에 있으니 '되는 기능'과 '쓸 만한 기능'의 차이를 매번 확인하며 만들 수 있었습니다.",
      en: "Formulas pasted as images can't be fixed inside the word processor, so users ended up retyping them. I converted LaTeX into the processor's own equation script and generated the HWPX (OWPML) file directly, so a double-click opens a native, editable formula. Hitting the free API quota mid-session was solved by registering multiple keys and rotating automatically. Having a real user beside me kept the difference between 'it works' and 'it's usable' impossible to ignore.",
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
      ko: "선생님이 작성한 월별 학습 리포트를 학부모가 확인하는 학원용 알림장 서비스입니다. 수업 내용을 카카오톡으로 주고받다 보니 개인 대화에 묻혀 다시 찾아보기 어렵던 문제에서 출발했고, 선생님은 학생별·월별 알림장을 관리하고 학부모는 전달받은 계정으로 로그인해 자녀의 학습 리포트를 확인합니다. 오라클 클라우드와 가비아 도메인으로 직접 배포해 2024년부터 지금까지 약 20명의 실사용자가 쓰고 있습니다.",
      en: "An academy notes service where parents read a monthly learning report written by the instructor. Lesson notes used to be sent over KakaoTalk, where they got buried in personal chat and became impossible to look back on; now the instructor manages notes per student and per month, and parents log in with an issued account to read their child's report. Deployed on Oracle Cloud with a Gabia domain, it has been running since 2024 with about 20 active users.",
    },
    myRole: {
      ko: "기획, 프론트엔드, 백엔드, 배포·운영까지 1인으로 담당하고 있으며, 실사용자 요청을 받아 지금도 유지보수하고 있습니다.",
      en: "Solo across planning, frontend, backend, deployment and operations, and still maintained today from real user requests.",
    },
    features: {
      ko: [
        "학생 등록과 월별 알림장 작성을 처리하는 관리자 페이지",
        "회원가입 없이 관리자가 계정을 생성·배포하는 로그인 구조",
        "월 단위로 정리된 학부모용 알림장 열람 화면 (반응형)",
        "로그인 시도 제한, JWT 토큰 로테이션, XSS 새니타이징을 적용한 인증 보안",
        "주 1회 DB 자동 백업과 백업 파일 이메일 발송",
        "휴면 계정·계정 삭제 등 운영용 기능",
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
      ko: "학부모 중에는 회원가입 절차 자체를 부담스러워하는 분이 많아, 일반적인 가입 플로우를 그대로 두면 서비스가 아예 쓰이지 않을 위험이 있었습니다. 가입 단계를 없애고 관리자가 계정을 만들어 전달하는 구조로 바꾼 뒤, 접속 주소도 학부모가 알아보기 쉽도록 한글 URL로 정리했습니다. 그 결과 별도 사용법 안내 없이도 로그인 단계에서 이탈하는 사례가 사라졌고, 2024년 초 오픈 이후 약 20명의 사용자가 이탈 없이 계속 사용하고 있습니다.",
      en: "Many parents find sign-up forms intimidating, and a conventional registration flow risked the service simply going unused. I removed registration entirely, so the instructor creates accounts and hands them over, and switched the address to a Korean-language URL that parents could read at a glance. Drop-off at the login step disappeared without any usage guide, and the roughly 20 users onboarded since early 2024 are still active.",
    },
    improvements: {
      ko: "무료 등급 오라클 클라우드에서 운영하다 보니 인스턴스 장애가 곧 데이터 유실로 이어질 수 있다는 점이 가장 큰 리스크였습니다. 주 1회 SQL 백업 파일을 생성해 개인 이메일로 자동 발송하도록 만들어, 서버가 사라져도 복구 가능한 상태를 유지하고 있습니다. 2년 넘게 운영하면서 보안 요구도 계속 늘어나, 초기 Express·Sequelize 서버를 NestJS·TypeORM 기반으로 다시 짜고 로그인 시도 제한, JWT 토큰 로테이션, XSS 새니타이징, 구조화된 로그(Winston)를 차례로 추가했습니다. 만들고 끝나는 프로젝트와 달리 계속 운영하다 보니, 화면에 드러나지 않는 보안·로깅 같은 기능이 왜 먼저 필요한지 체감했습니다.",
      en: "Running on Oracle Cloud's free tier, the biggest risk was that losing the instance would mean losing the data. A weekly SQL dump is generated and emailed to me automatically, so the service stays recoverable even if the server disappears. Over more than two years of running it, security requirements kept growing, so I rewrote the original Express/Sequelize backend on NestJS and TypeORM and added login rate limiting, JWT token rotation, XSS sanitization, and structured logging with Winston along the way. Operating it continuously, rather than shipping and walking away, showed me why invisible work like security and logging has to come early.",
    },
    thumbnail: "/projects/tutoring-notice/thumbnail.png",
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
      ko: "충남대학교 산학협력단이 정보통신응용기술개발지원사업 참여 기업 300여 곳을 대상으로 진행하던 설문을 온라인화한 산학협력 과제용 설문 시스템입니다. 구글 설문으로는 불가능했던 기업별 접근 제어와 통계 추출 요구를 충족하도록 직접 구축했고, 2024년에 같은 의뢰자에게 재의뢰를 받아 연도별 버전으로 확장했습니다.",
      en: "An online replacement for a paper survey run across ~300 companies in a national ICT R&D support program, commissioned by the Chungnam National University industry-academic cooperation foundation. Google Forms couldn't provide the per-company access control or the statistics they needed, so I built it from scratch, and the same client came back in 2024 to extend it into per-year editions.",
    },
    myRole: {
      ko: "풀스택 개발과 배포를 담당했고, 기획·테스트를 맡은 팀원 1명과 함께 진행했습니다.",
      en: "Full-stack development and deployment, working alongside one teammate who handled planning and testing.",
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
    challenges: {
      ko: "300여 개 기업이 각자의 응답만 볼 수 있어야 했지만, 기업마다 계정을 발급하면 참여 부담이 커져 응답률이 떨어질 수 있었습니다. 기업별로 암호화한 고유 URL을 발급하고 비밀번호를 덧붙이는 방식으로 접근을 제어해, 링크 하나로 바로 참여하면서도 다른 기업의 응답은 열람할 수 없게 만들었습니다. 문항마다 값의 형태(문자/숫자)가 뒤섞이는 문제도 TypeScript로 응답 스키마를 타입으로 고정해 집계 단계의 실수를 미리 차단했습니다.",
      en: "Each of ~300 companies had to see only its own answers, but issuing individual accounts would have added friction and hurt the response rate. I generated an encrypted per-company URL and paired it with a password, so a single link gets a respondent straight in while keeping other companies' answers out of reach. Mixed value types across questions (text vs. number) were pinned down by typing the response schema in TypeScript, catching aggregation mistakes before they shipped.",
    },
    improvements: {
      ko: "처음 맡은 외주 성격의 프로젝트라 신경 써서 구현했다고 생각했지만, 테스트 단계에서 예상보다 많은 버그가 나왔습니다. 이후로는 기능을 만들면서 엣지 케이스 목록을 먼저 정리하고 하나씩 검증하는 습관을 들였습니다. 제가 자리를 비운 동안 팀원이 의뢰자와 소통해 '구현할 것과 하지 않을 것'을 정리해 준 덕분에 범위가 흔들리지 않았던 점도 컸고, 요구사항을 문서로 고정해 두는 일의 가치를 배웠습니다. 2024년에는 같은 의뢰자에게 재의뢰를 받아 연도별 필수 문항 로직을 추가하며 서비스를 확장했습니다.",
      en: "It was my first client-style project and I thought I'd been careful, but testing surfaced more bugs than expected. Since then I list edge cases alongside the feature itself and verify them one by one. Scope also held steady because my teammate kept talking to the client while I was away, keeping a clear record of what was in and out. That is where I learned the value of writing requirements down. In 2024 the same client came back, and I extended the service with per-year required-question logic.",
    },
    thumbnail: "/projects/survey/thumbnail.png",
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
      ko: "사내에서 쓰던 근태 서비스가 유료로 전환되면서, 엑셀 관리로 되돌아가는 대신 직접 만든 무료 휴가 관리 시스템입니다. 입사일 기준 연차 개수 자동 산정부터 팀 전체 휴가 캘린더, Slack 알림까지 팀이 실제로 쓰던 기능만 담았습니다.",
      en: "An in-house time-off system I built as a free replacement when the tool we had been using moved to a paid tier, so the team would not fall back to spreadsheets. It covers exactly what the team actually used: leave entitlement computed from the hire date, a shared calendar, and Slack notifications.",
    },
    myRole: {
      ko: "DB 설계부터 백엔드 API, 프론트엔드, 사내망 배포까지 1인으로 진행했습니다.",
      en: "Solo across schema design, backend APIs, frontend and deployment on the internal network.",
    },
    features: {
      ko: [
        "근로기준법 기준 근속 기간별 연차 개수 자동 산정 API",
        "FullCalendar 기반 팀 전체 휴가 현황 캘린더",
        "연차 사용 시 Slack 채널 자동 알림",
        "연차 외 경조사·예비군·여름휴가까지 유형별 관리",
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
      ko: "프론트와 백엔드를 혼자 맡아 보니 설계에는 시간이 오래 걸렸지만, 구현 도중 '이 데이터는 이렇게 내려주는 게 낫겠다' 싶을 때 곧바로 API를 고칠 수 있어 전체 작업 시간은 오히려 짧았습니다. 설계와 구현을 혼자 오가며 빠르게 검증할 수 있다는 걸 이때 체감했습니다.",
      en: "Owning both sides made design take longer, but the build itself went faster: whenever I thought 'the API should just return it this way', I could change it immediately instead of filing a request and waiting. Going back and forth between design and implementation on my own is where I really felt how fast that loop can be.",
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
      ko: "YOLO 학습 데이터셋을 만들 때 필요한 바운딩 박스 좌표를, 설치 없이 브라우저에서 바로 얻을 수 있게 만든 사내 라벨링 툴입니다. 로컬 이미지를 올리고 박스를 그리면 좌표를 그대로 복사해 쓸 수 있습니다.",
      en: "An in-house labeling tool that produces the bounding-box coordinates a YOLO training set needs, straight in the browser with nothing to install. Drop in a local image, draw the boxes, copy the coordinates out.",
    },
    myRole: {
      ko: "프론트엔드 1인 개발로 Canvas 렌더링과 단축키 인터랙션을 직접 설계·구현했습니다.",
      en: "Solo frontend build, covering Canvas rendering and the keyboard-driven interaction model.",
    },
    features: {
      ko: [
        "Canvas 기반 바운딩 박스 그리기·이동·크기 조절·삭제",
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
      ko: "Canvas에는 도형 히트 테스트나 리사이즈 핸들 같은 편집 기능이 전혀 없어, 박스를 클릭하고 옮기고 크기를 바꾸는 동작을 좌표 계산부터 직접 구현해야 했습니다. 종이에 박스와 핸들의 좌표 관계를 그려가며 마우스 위치가 어느 영역에 속하는지 판정하는 로직을 정리했고, 그리기 모드와 이동 모드를 단축키로 분리해 조작이 서로 충돌하지 않게 했습니다. 결과적으로 마우스와 키보드만으로 라벨링을 끝낼 수 있는 흐름을 만들었습니다.",
      en: "Canvas gives you no hit testing and no resize handles, so clicking, dragging and resizing a box all had to be written from the coordinate math up. I worked the box-and-handle geometry out on paper to decide which region a pointer belongs to, and split drawing and moving into separate keyboard-triggered modes so the two never fight each other. The result is a labeling loop that never leaves the mouse and keyboard.",
    },
    improvements: {
      ko: "다 만들고 나서야 이미 성숙한 오픈소스 라벨링 툴이 있다는 걸 알았습니다. 이후로는 구현 전에 기존 솔루션부터 조사하게 됐지만, 이 프로젝트에서 익힌 Canvas 좌표계와 이벤트 처리는 그대로 남아 IPC의 OSD 다각형 편집과 TRUSafer의 열영상 렌더링을 구현할 때 바로 쓸 수 있었습니다.",
      en: "I only discovered the mature open-source labeling tools after finishing this one, which is why I now survey existing solutions before building. The Canvas coordinate math and event handling stuck around, though: both went straight into the OSD polygon editor in IPC and the thermal-frame rendering in TRUSafer.",
    },
    thumbnail: "/projects/label-img/thumbnail.png",
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
