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
   * Proficiency levels are intentionally omitted (PRD 4.1 ②) — we list what we
   * have actually used instead of a subjective score.
   */
  items: Skill[];
};

/** TODO(content): replace with the real skill inventory. */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: { ko: "프론트엔드", en: "Frontend" },
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "TanStack Query" },
      // No brand mark in Simple Icons — falls back to the generic code glyph.
      { name: "Zustand" },
    ],
  },
  {
    id: "backend",
    label: { ko: "백엔드", en: "Backend" },
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "NestJS" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "REST API" },
    ],
  },
  {
    id: "infra",
    label: { ko: "인프라 · 툴", en: "Infra & Tools" },
    items: [
      { name: "Vercel" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "GitHub Actions" },
    ],
  },
  {
    id: "collaboration",
    label: { ko: "협업", en: "Collaboration" },
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Jira" },
      { name: "Figma" },
      { name: "Slack" },
      { name: "Notion" },
    ],
  },
];
