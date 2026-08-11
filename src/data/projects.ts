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
  challenges: LocalizedText;
  improvements: LocalizedText;
  links?: { demo?: string; repo?: string };
  /** Public path, e.g. `/projects/foo/thumb.png`. */
  thumbnail: string;
  images?: string[];
};

/** TODO(content): replace with the real projects from docs/projects/*.md. */
export const projects: Project[] = [
  {
    slug: "commerce-admin",
    title: {
      ko: "커머스 어드민 리뉴얼",
      en: "Commerce Admin Renewal",
    },
    category: "company",
    period: { start: "2024-03", end: "2025-02" },
    teamSize: 6,
    stack: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS", "MSW"],
    summary: {
      ko: "레거시 jQuery 기반 어드민을 Next.js로 전면 재구축한 프로젝트입니다. 상품·주문·정산 3개 도메인을 하나의 디자인 시스템 위에 통합해 운영자의 반복 업무 시간을 크게 줄였습니다.",
      en: "A full rewrite of a legacy jQuery admin into Next.js. Three domains — catalog, orders and settlements — were unified on top of a single design system, cutting down repetitive operator work.",
    },
    myRole: {
      ko: "프론트엔드 3인 중 1인으로 참여해 공통 컴포넌트 라이브러리와 테이블/필터 인프라를 설계했고, 상품 도메인 화면 전체를 구현했습니다.",
      en: "One of three frontend engineers. I designed the shared component library and the table/filter infrastructure, and implemented the entire catalog domain.",
    },
    features: {
      ko: [
        "가상 스크롤 기반 대용량 상품 테이블 (10만 행)",
        "URL 쿼리와 동기화되는 필터/정렬 상태 관리",
        "권한별 메뉴 및 액션 노출 제어",
        "엑셀 업로드/다운로드 일괄 편집 플로우",
      ],
      en: [
        "Virtualized product table handling 100k rows",
        "Filter/sort state synchronized with URL query params",
        "Role-based menu and action visibility",
        "Bulk edit flow via Excel upload/download",
      ],
    },
    challenges: {
      ko: "상품 목록에 10만 건 이상이 렌더링되면서 필터 변경 시마다 3초 이상 멈추는 문제가 있었습니다. 프로파일링으로 원인이 전체 리렌더와 동기 필터링임을 확인하고, 가상 스크롤 도입과 필터 연산의 Web Worker 이전, 셀 컴포넌트 메모이제이션으로 인터랙션 지연을 3초에서 200ms 수준으로 줄였습니다.",
      en: "Rendering 100k+ rows froze the UI for over three seconds on every filter change. Profiling showed full re-renders plus synchronous filtering were to blame. Introducing virtualization, moving filtering into a Web Worker and memoizing cell components brought interaction latency from ~3s down to ~200ms.",
    },
    improvements: {
      ko: "공통 테이블을 헤드리스 훅으로 분리해 다른 두 도메인 팀이 그대로 재사용할 수 있게 만들었습니다. 이 과정에서 '추상화는 세 번째 사용처가 생겼을 때'라는 기준이 실제로 유효하다는 걸 배웠습니다.",
      en: "I extracted the shared table into a headless hook so the other two domain teams could reuse it as-is. It confirmed for me that the 'abstract on the third use case' rule really does hold up in practice.",
    },
    // Internal company project — no public demo or repository.
    thumbnail: "/projects/commerce-admin/thumbnail.png",
    images: [],
  },
  {
    slug: "habit-tracker",
    title: {
      ko: "해빗 트래커",
      en: "Habit Tracker",
    },
    category: "toy",
    period: { start: "2025-04", end: "2025-07" },
    teamSize: 1,
    stack: ["React", "TypeScript", "IndexedDB", "PWA", "Vite"],
    summary: {
      ko: "서버 없이 동작하는 오프라인 우선 습관 관리 PWA입니다. 모든 기록은 IndexedDB에 저장되고, 설치형 앱처럼 홈 화면에서 바로 실행할 수 있습니다.",
      en: "An offline-first habit tracking PWA that runs without a server. Every record lives in IndexedDB and the app installs to the home screen like a native one.",
    },
    myRole: {
      ko: "기획, 디자인, 개발, 배포까지 1인으로 진행했습니다.",
      en: "Solo project — planning, design, development and deployment.",
    },
    features: {
      ko: [
        "오프라인 완전 동작 (Service Worker + IndexedDB)",
        "잔디 형태의 연간 히트맵 시각화",
        "JSON 내보내기/가져오기 백업",
        "다크 모드 및 시스템 테마 연동",
      ],
      en: [
        "Fully offline capable (Service Worker + IndexedDB)",
        "Yearly heatmap visualization",
        "JSON export/import backup",
        "Dark mode synced with the system theme",
      ],
    },
    challenges: {
      ko: "여러 탭을 동시에 열었을 때 IndexedDB 쓰기가 충돌해 기록이 유실되는 문제가 있었습니다. BroadcastChannel로 탭 간 변경 사항을 전파하고, 마지막 쓰기 시각을 비교하는 방식으로 충돌을 해소했습니다.",
      en: "Concurrent IndexedDB writes across multiple tabs were silently dropping records. I propagated mutations between tabs with BroadcastChannel and resolved conflicts by comparing last-write timestamps.",
    },
    improvements: {
      ko: "서버가 없다는 제약 덕분에 오히려 브라우저 저장소와 Service Worker 생명주기를 깊이 이해하게 됐습니다. 이후 회사 프로젝트에서도 낙관적 업데이트를 설계할 때 이 경험을 활용했습니다.",
      en: "Working without a server pushed me to really understand browser storage and the Service Worker lifecycle — knowledge I later reused when designing optimistic updates at work.",
    },
    links: {
      demo: "https://example.com/habit-tracker",
      repo: "https://github.com/example/habit-tracker",
    },
    thumbnail: "/projects/habit-tracker/thumbnail.png",
    images: [],
  },
  {
    slug: "design-token-cli",
    title: {
      ko: "디자인 토큰 CLI",
      en: "Design Token CLI",
    },
    category: "toy",
    period: { start: "2025-09" },
    teamSize: 2,
    stack: ["Node.js", "TypeScript", "Figma API", "Vitest"],
    summary: {
      ko: "Figma Variables를 읽어 CSS 커스텀 프로퍼티와 TypeScript 타입을 생성하는 CLI입니다. 디자이너의 토큰 변경이 코드에 반영되기까지 걸리던 수동 작업을 없앴습니다.",
      en: "A CLI that reads Figma Variables and generates CSS custom properties plus TypeScript types, removing the manual step between a designer's token change and the codebase.",
    },
    myRole: {
      ko: "Figma API 파싱과 코드 생성 파이프라인을 담당했습니다.",
      en: "Owned the Figma API parsing and the code generation pipeline.",
    },
    features: {
      ko: [
        "Figma Variables → CSS 변수 자동 생성",
        "라이트/다크 모드 토큰 쌍 매핑",
        "생성된 토큰의 TypeScript 타입 선언 출력",
        "GitHub Actions 연동으로 토큰 변경 시 자동 PR 생성",
      ],
      en: [
        "Automatic CSS variable generation from Figma Variables",
        "Light/dark token pair mapping",
        "TypeScript declarations for generated tokens",
        "Auto PR creation on token changes via GitHub Actions",
      ],
    },
    challenges: {
      ko: "Figma의 별칭(alias) 변수는 다른 변수를 참조하기 때문에 순환 참조가 발생할 수 있었습니다. 위상 정렬로 의존 순서를 계산하고, 순환이 감지되면 어떤 토큰들이 얽혀 있는지 알려주는 에러 메시지를 제공하도록 했습니다.",
      en: "Figma alias variables reference other variables, which allows cycles. I computed resolution order with a topological sort and surfaced an error that names exactly which tokens form the cycle.",
    },
    improvements: {
      ko: "CLI를 만들면서 '에러 메시지도 UI'라는 걸 실감했습니다. 실패했을 때 다음 행동을 알려주는 메시지를 쓰는 데 개발 시간의 상당 부분을 투자하게 됐습니다.",
      en: "Building a CLI made it obvious that error messages are UI too. I ended up spending a real share of dev time on messages that tell you what to do next.",
    },
    links: {
      repo: "https://github.com/example/design-token-cli",
    },
    thumbnail: "/projects/design-token-cli/thumbnail.png",
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
