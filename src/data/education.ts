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

// NOTE(content): 원본(docs/projects/projects.md)에 학교명이 명시되어 있지 않아
// 전공/기간만 기재했습니다. 실제 학교명 확인 후 `school` 값을 교체해 주세요.
/** Newest first. */
export const educations: Education[] = [
  {
    id: "ssafy",
    school: {
      ko: "삼성청년소프트웨어아카데미(SSAFY)",
      en: "Samsung Software Academy for Youth (SSAFY)",
    },
    major: { ko: "소프트웨어 개발", en: "Software Development" },
    // 학위 과정이 아니므로 degree 생략
    period: { start: "2021-01", end: "2021-08" },
    note: {
      ko: "삼성 주관 소프트웨어 교육과정을 수료하고, 웹 개발 중심의 팀 프로젝트를 진행했습니다.",
      en: "Completed Samsung's software engineering program, working mainly on team-based web projects.",
    },
  },
  {
    id: "university",
    // TODO(content): 실제 학교명으로 교체
    school: { ko: "대학교", en: "University" },
    major: { ko: "정보통신공학과", en: "Information & Communication Engineering" },
    degree: { ko: "학사", en: "B.E." },
    period: { start: "2015-03", end: "2021-02" },
  },
];
