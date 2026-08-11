import type { LocalizedText } from "./types";

export type SkillCategory = {
  id: string;
  label: LocalizedText;
  /**
   * Proficiency levels are intentionally omitted (PRD 4.1 ②) — we list what we
   * have actually used instead of a subjective score.
   */
  items: string[];
};

/** TODO(content): replace with the real skill inventory. */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: { ko: "프론트엔드", en: "Frontend" },
    items: [
      "TypeScript",
      "JavaScript (ES2022+)",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    id: "backend",
    label: { ko: "백엔드", en: "Backend" },
    items: ["Node.js", "Express", "NestJS", "PostgreSQL", "Prisma", "REST API"],
  },
  {
    id: "infra",
    label: { ko: "인프라 · 툴", en: "Infra & Tools" },
    items: ["Vercel", "AWS S3 / CloudFront", "Docker", "GitHub Actions"],
  },
  {
    id: "collaboration",
    label: { ko: "협업", en: "Collaboration" },
    items: ["Git", "GitHub", "Jira", "Figma", "Slack", "Notion"],
  },
];
