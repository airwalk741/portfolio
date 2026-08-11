import type { IconType } from "react-icons";
import { FaAws, FaSlack } from "react-icons/fa6";
import { LuCode, LuDatabase, LuNetwork, LuPlug } from "react-icons/lu";
import {
  SiApachekafka,
  SiArduino,
  SiAxios,
  SiBitbucket,
  SiC,
  SiConfluence,
  SiCplusplus,
  SiCss,
  SiCypress,
  SiDart,
  SiDiscord,
  SiDocker,
  SiElasticsearch,
  SiElectron,
  SiEsbuild,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGo,
  SiGrafana,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJira,
  SiJsonwebtokens,
  SiKotlin,
  SiKubernetes,
  SiLinux,
  SiMockserviceworker,
  SiMongodb,
  SiMqtt,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNotion,
  SiOpenjdk,
  SiPnpm,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiPrometheus,
  SiPwa,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiRollupdotjs,
  SiSass,
  SiSentry,
  SiSharp,
  SiSocketdotio,
  SiSpring,
  SiSpringboot,
  SiStorybook,
  SiSupabase,
  SiSwagger,
  SiSwift,
  SiTailwindcss,
  SiTerraform,
  SiThreedotjs,
  SiTurborepo,
  SiTypescript,
  SiUbuntu,
  SiVercel,
  SiVite,
  SiVitest,
  SiVuedotjs,
  SiWebpack,
  SiZod,
} from "react-icons/si";

/**
 * Single source of truth for "tech name → brand icon".
 *
 * Shared by `/src/data/skills.ts` (Home skills section) and the `stack` field
 * of `/src/data/projects.ts` (project cards + detail page), so a technology
 * only ever needs to be mapped once.
 *
 * Bundle note: every icon is a named import from `react-icons/si|fa6|lu`, which
 * tree-shakes down to just the glyphs actually referenced from this table.
 * Keep the table lean-ish and drop entries that stop being used.
 *
 * Keys are normalized with `normalizeTechKey` (lowercase, punctuation and
 * whitespace stripped), so `"Next.js"`, `"next js"` and `"NextJS"` all match.
 */
const TECH_ICONS: Record<string, IconType> = {
  // ── Languages ────────────────────────────────────────────
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  sass: SiSass,
  scss: SiSass,
  python: SiPython,
  go: SiGo,
  golang: SiGo,
  java: SiOpenjdk,
  kotlin: SiKotlin,
  swift: SiSwift,
  dart: SiDart,
  c: SiC,
  "c++": SiCplusplus,
  "c#": SiSharp,

  // ── Frontend ─────────────────────────────────────────────
  react: SiReact,
  reactnative: SiReact,
  nextjs: SiNextdotjs,
  vuejs: SiVuedotjs,
  vue: SiVuedotjs,
  tailwindcss: SiTailwindcss,
  framermotion: SiFramer,
  framer: SiFramer,
  redux: SiRedux,
  reactquery: SiReactquery,
  tanstackquery: SiReactquery,
  threejs: SiThreedotjs,
  electron: SiElectron,
  flutter: SiFlutter,
  storybook: SiStorybook,
  pwa: SiPwa,

  // ── Backend / data ───────────────────────────────────────
  nodejs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  spring: SiSpring,
  springboot: SiSpringboot,
  graphql: SiGraphql,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  redis: SiRedis,
  elasticsearch: SiElasticsearch,
  kafka: SiApachekafka,
  apachekafka: SiApachekafka,
  socketio: SiSocketdotio,
  axios: SiAxios,
  jwt: SiJsonwebtokens,
  swagger: SiSwagger,
  firebase: SiFirebase,
  supabase: SiSupabase,
  mqtt: SiMqtt,

  // ── Infra / tooling ──────────────────────────────────────
  vercel: SiVercel,
  aws: FaAws,
  amazonwebservices: FaAws,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  nginx: SiNginx,
  terraform: SiTerraform,
  linux: SiLinux,
  ubuntu: SiUbuntu,
  raspberrypi: SiRaspberrypi,
  arduino: SiArduino,
  grafana: SiGrafana,
  prometheus: SiPrometheus,
  sentry: SiSentry,
  githubactions: SiGithubactions,
  vite: SiVite,
  webpack: SiWebpack,
  esbuild: SiEsbuild,
  rollup: SiRollupdotjs,
  turborepo: SiTurborepo,
  pnpm: SiPnpm,
  eslint: SiEslint,
  prettier: SiPrettier,
  zod: SiZod,

  // ── Testing ──────────────────────────────────────────────
  jest: SiJest,
  vitest: SiVitest,
  cypress: SiCypress,
  msw: SiMockserviceworker,
  mockserviceworker: SiMockserviceworker,

  // ── Collaboration ────────────────────────────────────────
  git: SiGit,
  github: SiGithub,
  gitlab: SiGitlab,
  bitbucket: SiBitbucket,
  jira: SiJira,
  confluence: SiConfluence,
  notion: SiNotion,
  figma: SiFigma,
  figmaapi: SiFigma,
  slack: FaSlack,
  discord: SiDiscord,

  // ── Generic fallbacks for things with no brand mark ───────
  restapi: SiSwagger,
  rest: SiSwagger,
  websocket: LuNetwork,
  rtsp: LuNetwork,
  indexeddb: LuDatabase,
  localstorage: LuDatabase,
  serviceworker: LuPlug,
  webworker: LuPlug,
};

/** Rendered when a technology has no entry in `TECH_ICONS`. */
export const FallbackTechIcon: IconType = LuCode;

/**
 * `"Next.js"` → `"nextjs"`, `"Tailwind CSS"` → `"tailwindcss"`.
 * `+` and `#` survive so `C++` / `C#` stay distinguishable.
 */
export function normalizeTechKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9+#]/g, "");
}

/** Returns `undefined` when the technology has no mapped brand icon. */
export function getTechIcon(name: string): IconType | undefined {
  return TECH_ICONS[normalizeTechKey(name)];
}

/** Every technology name that resolves to an icon (useful for auditing). */
export function hasTechIcon(name: string): boolean {
  return getTechIcon(name) !== undefined;
}
