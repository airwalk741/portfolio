import type { LocalizedText } from "./types";

export type SocialLink = {
  /** Stable key used for icon lookup / React keys. */
  id: string;
  label: string;
  href: string;
};

export type Profile = {
  name: LocalizedText;
  /** One-line role title shown under the name. */
  headline: LocalizedText;
  /** 3–5 sentence intro paragraph rendered in the Home intro section. */
  bio: LocalizedText;
  /**
   * Public path to the profile photo shown next to the name in the intro
   * section. Currently a placeholder graphic; swap the file at this path
   * (keep the same filename, or update this field) once a real photo is
   * ready.
   */
  avatar: string;
  email: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: {
    ko: "박상현",
    en: "Park Sang-Hyun",
  },
  headline: {
    ko: "만든 서비스를 끝까지 운영해 보는 프론트엔드 개발자",
    en: "Frontend developer who builds products and keeps them running",
  },
  bio: {
    ko: "2021년부터 프론트엔드 개발자로 일하며 아이준에서 3년간 관제·대시보드 웹을 맡았고, 지금은 오토실리콘에서 사내 업무용 서비스를 풀스택으로 개발하고 있습니다. 주로 React와 TypeScript로 화면을 만들며, 필요하면 Node.js·Go·Django로 서버와 배포까지 맡습니다. 새로운 기술을 먼저 찾기보다 일이 어디에서 막히는지 확인하고 하나씩 풀어가는 방식으로 일합니다. Vue 3 생태계 때문에 일정이 밀리던 프로젝트에서는 React 전환을 제안해 직접 옮겼고, 그 결과물로 GS 인증 1등급을 받았습니다. 개인 프로젝트도 만들고 끝내기보다 실사용자를 두고 계속 고쳐 나가는 편이라, 2024년에 만든 과외 알림장을 지금도 직접 운영하고 있습니다.",
    en: "I've been a frontend developer since 2021: three years at Aijoon building monitoring and dashboard web clients, and now at Autosilicon developing internal business tools across the stack. Most of my work is React and TypeScript, and I take on the server and deployment side with Node.js, Go or Django when a project needs it. Rather than reaching for new tools first, I try to find where the work actually stalls and fix it one step at a time: when the Vue 3 ecosystem kept slowing a project down, I proposed moving to React and carried out the migration, and the result went on to earn a GS Certification Grade 1. I also keep my side projects running instead of shipping and walking away, so the tutoring notes service I built in 2024 is still one I operate myself.",
  },
  avatar: "/profile/avatar.svg",
  // Email is intentionally not published; GitHub is the only public contact.
  email: "",
  socials: [
    // TODO(content): 실제 GitHub URL로 교체
    { id: "github", label: "GitHub", href: "https://github.com/TODO" },
  ],
};
