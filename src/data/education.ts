import type { LocalizedText, Period } from "./types";

export type Education = {
  id: string;
  school: LocalizedText;
  major: LocalizedText;
  /** e.g. `{ ko: "학사", en: "B.S." }` — omit for non-degree programs. */
  degree?: LocalizedText;
  period: Period;
  note?: LocalizedText;
};

/** TODO(content): replace with the real education history. Newest first. */
export const educations: Education[] = [
  {
    id: "example-university",
    school: { ko: "예시대학교", en: "Example University" },
    major: { ko: "컴퓨터공학과", en: "Computer Science" },
    degree: { ko: "학사", en: "B.S." },
    period: { start: "2019-03", end: "2023-02" },
    note: {
      ko: "졸업 프로젝트로 실시간 협업 편집기를 구현했습니다.",
      en: "Built a real-time collaborative editor as a capstone project.",
    },
  },
];
