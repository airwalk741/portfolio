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

export const profile: Profile = {
  name: {
    ko: "박상현",
    en: "Park Sang-Hyun",
  },
  headline: {
    ko: "실시간 데이터를 다루는 프론트엔드 개발자",
    en: "Frontend Developer working with real-time data",
  },
  bio: {
    ko: "2021년부터 실시간 관제 웹을 만들어 온 프론트엔드 개발자입니다. 스마트 팩토리 대시보드, IP 카메라에 직접 탑재되는 임베디드 웹처럼 MQTT·WebSocket·RTSP로 들어오는 데이터를 Canvas와 차트로 렌더링하는 일을 주로 해왔습니다. 24시간 켜두는 관제 화면의 메모리 누수를 추적해 해결하고, 기기 스토리지 제약에 맞춰 빌드 용량을 60MB에서 12MB로 줄이는 등 제약 조건 안에서 답을 찾는 데 익숙합니다. 필요하면 프론트엔드 밖으로도 나갑니다 — Node.js와 Go로 서버를 직접 만들고, Docker로 배포한 서비스를 지금도 운영하고 있습니다. 구조가 병목이라고 판단되면 미루지 않습니다. Vue 3 생태계의 한계로 일정이 밀리던 프로젝트에서 React 전환을 제안하고 직접 주도했습니다.",
    en: "I've been building real-time monitoring interfaces since 2021 — smart factory dashboards, and embedded control pages that ship inside IP cameras. Most of my work is about pulling data in over MQTT, WebSocket and RTSP and rendering it with Canvas and charts, usually under hard constraints: tracking down a memory leak in a dashboard that has to stay open 24/7, or cutting a build from 60MB to 12MB so it fits on device storage. I also step outside the frontend when it helps — I write servers in Node.js and Go, and I still operate a service I deployed with Docker. And I don't sit on structural problems: when the Vue 3 ecosystem became the bottleneck on a project, I proposed the migration to React and led it myself.",
  },
  // Email is intentionally not published — GitHub is the only public contact.
  email: "",
  socials: [
    // TODO(content): 실제 GitHub URL로 교체
    { id: "github", label: "GitHub", href: "https://github.com/TODO" },
  ],
};
