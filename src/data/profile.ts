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
    ko: "만든 서비스를 끝까지 운영해 보는 프론트엔드 개발자",
    en: "Frontend developer who builds products and keeps them running",
  },
  bio: {
    ko: [
      "안녕하세요. React와 TypeScript로 서비스를 만들고, 실제 사용자가 있는 서비스를 운영까지 해온 프론트엔드 개발자 박상현입니다.",
      "새로운 기술을 먼저 찾기보다 지금 문제가 어디에 있는지부터 봅니다. 코드인지, 구조인지, 기술 선택인지 하나씩 확인하면서 필요한 방법을 찾아갑니다. 필요할 땐 서버와 배포까지 직접 다루면서 서비스 전체 흐름을 챙기려고 합니다.",
      "만들고 끝내기보다 계속 운영하고 고쳐나가는 걸 좋아합니다. 기능을 배포한 뒤에도 불편한 점을 찾아 개선하는 것까지가 개발이라고 생각합니다.",
      "화려한 기술보다 지금 필요한 기술로 문제를 풀고, 사용자에게 더 나은 경험을 만드는 데 관심이 많습니다.",
    ],
    en: [
      "Hi, I'm Park Sang-Hyun, a frontend developer who builds with React and TypeScript and sticks around to operate real services for real users.",
      "I look at where the problem actually is before reaching for new tools, whether it's the code, the structure, or a tooling choice. When it helps, I'll dig into the server and deployment side too, so I can see the whole picture.",
      "I'd rather keep operating and improving something than ship it and walk away. Finding what's still awkward after launch and fixing it is part of the job to me.",
      "I care more about picking the right tool for the problem than chasing the newest one, if it makes things better for the people using it.",
    ],
  },
  avatar: "/profile/me.jpg",
  // Email is intentionally not published; GitHub is the only public contact.
  email: "",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/airwalk741" },
  ],
};
