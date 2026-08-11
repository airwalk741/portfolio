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
  email: string;
  socials: SocialLink[];
};

/** TODO(content): replace with real profile copy from docs/. */
export const profile: Profile = {
  name: {
    ko: "홍길동",
    en: "Gildong Hong",
  },
  headline: {
    ko: "제품의 첫인상을 만드는 프론트엔드 개발자",
    en: "Frontend Developer crafting first impressions",
  },
  bio: {
    ko: "사용자가 화면을 마주하는 첫 순간을 가장 중요하게 생각하는 프론트엔드 개발자입니다. React와 TypeScript를 중심으로 웹 서비스를 만들며, 재사용 가능한 컴포넌트 설계와 렌더링 성능 최적화에 관심이 많습니다. 디자이너·백엔드 개발자와 적극적으로 소통하며 요구사항의 배경까지 이해한 뒤 구현하는 방식을 선호합니다. 앞으로는 접근성과 성능을 기본값으로 챙기는 제품을 만들고 싶습니다.",
    en: "I'm a frontend developer who cares most about the very first moment a user meets a screen. I build web services with React and TypeScript, with a focus on reusable component design and rendering performance. I like to understand the reasoning behind a requirement — talking it through with designers and backend engineers — before I start implementing. Going forward, I want to build products where accessibility and performance are the default, not an afterthought.",
  },
  email: "hello@example.com",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/example" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/example",
    },
    { id: "email", label: "Email", href: "mailto:hello@example.com" },
  ],
};
