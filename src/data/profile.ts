import type { LocalizedList, LocalizedText } from "./types";

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
  /** Intro paragraphs rendered in the Home intro section, one `<p>` per entry. */
  bio: LocalizedList;
  /** Public path to the profile photo shown next to the name in the intro section. */
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
    ko: "화면부터 배포까지 다루는 프론트엔드 개발자",
    en: "Frontend developer building from user interfaces to cloud deployment",
  },
  bio: {
    ko: [
      "React와 TypeScript를 중심으로 웹 서비스를 개발하고 있습니다.",
      "프론트엔드 화면 구현뿐만 아니라 필요할 때는 백엔드 API를 만들고 클라우드 배포까지 직접 진행합니다.",
      "서비스를 직접 배포하고 운영하며, 프론트엔드 개발 시에도 서버와의 데이터 흐름과 배포 환경까지 함께 고려합니다.",
    ],
    en: [
      "I build web services primarily using React and TypeScript.",
      "Beyond implementing frontend interfaces, I build backend APIs and handle cloud deployments directly whenever needed.",
      "Deploying and operating services firsthand, I develop frontend applications with server-side data flow and deployment environments in mind.",
    ],
  },
  avatar: "/profile/me.jpg",
  // Email is intentionally not published; GitHub is the only public contact.
  email: "",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/airwalk741" },
  ],
};
