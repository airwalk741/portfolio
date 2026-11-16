import type { LocalizedText } from "./types";

export type Skill = {
  /** Display label. Also the default lookup key for the brand icon. */
  name: string;
  /**
   * Optional override key into the shared table in `@/lib/tech-icons`.
   * Only needed when the display label doesn't match the technology name.
   * Leave it out and the label itself is normalized and looked up.
   */
  icon?: string;
};

export type SkillCategory = {
  id: string;
  label: LocalizedText;
  /**
   * Proficiency levels are intentionally omitted (PRD 4.1 ②). We list what we
   * have actually used instead of a subjective score.
   */
  items: Skill[];
};

// NOTE(content): docs/projects/projects.md 의 "Tech Stacks" 4분류를 기준으로,
// 각 프로젝트 상세 문서에서 실제로 사용한 기술(Vite, Recoil, Chart.js, Sequelize,
// ffmpeg, Electron, Zustand 등)을 합쳐 5개 카테고리로 재정리했습니다.
// "Protocols & Integrations"는 프레임워크와 성격이 달라 별도 카테고리로 분리했습니다.
// 브랜드 아이콘이 없는 항목(Recoil, Zustand, Chart.js, Nuxt.js, Django, ffmpeg 등)은
// `@/lib/tech-icons` 의 기본 코드 글리프로 폴백됩니다.
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: { ko: "프론트엔드", en: "Frontend" },
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "Nuxt.js" },
      { name: "Redux" },
      { name: "Recoil" },
      { name: "Zustand" },
      { name: "TanStack Query" },
      { name: "Tailwind CSS" },
      { name: "Sass" },
      { name: "Chart.js" },
      { name: "Vite" },
      { name: "Electron" },
    ],
  },
  {
    id: "backend",
    label: { ko: "백엔드", en: "Backend" },
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Go" },
      { name: "Django" },
      { name: "Sequelize" },
      { name: "REST API" },
    ],
  },
  {
    id: "infra",
    label: { ko: "데이터 및 인프라", en: "Data & Infra" },
    items: [
      { name: "MySQL" },
      { name: "MariaDB" },
      { name: "Docker" },
      { name: "Nginx" },
      { name: "Apache" },
      { name: "Ubuntu" },
    ],
  },
  {
    id: "integration",
    label: { ko: "프로토콜 및 연동", en: "Protocols & Integrations" },
    items: [
      { name: "MQTT" },
      { name: "WebSocket" },
      { name: "RTSP" },
      { name: "Canvas API" },
      { name: "ffmpeg" },
      { name: "Microsoft Graph API" },
    ],
  },
  {
    id: "collaboration",
    label: { ko: "협업", en: "Collaboration" },
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Slack" },
      { name: "Notion" },
    ],
  },
];
