import type { LocalizedText, Period } from "./types";

export type Education = {
  id: string;
  school: LocalizedText;
  major: LocalizedText;
  /** e.g. `{ ko: "학사", en: "B.S." }`. Omit for non-degree programs. */
  degree?: LocalizedText;
  period: Period;
  note?: LocalizedText;
};

// NOTE(content): 원본(docs/projects/projects.md)에 학교명이 명시되어 있지 않아
// 전공/기간만 기재했습니다. 실제 학교명 확인 후 `school` 값을 교체해 주세요.
// SSAFY 수료 이력은 학위 과정이 아니라 경험(Experience) 섹션으로 옮겼습니다.
/** Newest first. */
export const educations: Education[] = [
  {
    id: "university",
    // TODO(content): 실제 학교명으로 교체
    school: { ko: "대학교", en: "University" },
    major: { ko: "정보통신공학과", en: "Information & Communication Engineering" },
    degree: { ko: "학사", en: "B.E." },
    period: { start: "2015-03", end: "2021-02" },
  },
];
