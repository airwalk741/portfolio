import type { IconType } from "react-icons";
import { FaAws, FaMicrosoft, FaSlack } from "react-icons/fa6";
import { LuBell, LuCode, LuDatabase, LuNetwork, LuPenTool, LuPlug } from "react-icons/lu";
import {
  SiAntdesign,
  SiApache,
  SiApachekafka,
  SiArduino,
  SiAxios,
  SiBitbucket,
  SiBootstrap,
  SiC,
  SiChartdotjs,
  SiConfluence,
  SiCplusplus,
  SiCss,
  SiCypress,
  SiDart,
  SiDiscord,
  SiDjango,
  SiDocker,
  SiElasticsearch,
  SiElectron,
  SiEsbuild,
  SiEslint,
  SiExpress,
  SiFfmpeg,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGo,
  SiGooglegemini,
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
  SiMariadb,
  SiMockserviceworker,
  SiMongodb,
  SiMqtt,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNotion,
  SiNuxt,
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
  SiRecoil,
  SiRedis,
  SiRedux,
  SiRollupdotjs,
  SiSass,
  SiSentry,
  SiSequelize,
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
  nuxtjs: SiNuxt,
  nuxt: SiNuxt,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  antdesign: SiAntdesign,
  framermotion: SiFramer,
  framer: SiFramer,
  redux: SiRedux,
  recoil: SiRecoil,
  reactquery: SiReactquery,
  tanstackquery: SiReactquery,
  threejs: SiThreedotjs,
  electron: SiElectron,
  flutter: SiFlutter,
  storybook: SiStorybook,
  pwa: SiPwa,
  chartjs: SiChartdotjs,

  // ── Backend / data ───────────────────────────────────────
  nodejs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  spring: SiSpring,
  springboot: SiSpringboot,
  django: SiDjango,
  graphql: SiGraphql,
  prisma: SiPrisma,
  sequelize: SiSequelize,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mariadb: SiMariadb,
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
  geminiapi: SiGooglegemini,

  // ── Infra / tooling ──────────────────────────────────────
  vercel: SiVercel,
  aws: FaAws,
  amazonwebservices: FaAws,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  nginx: SiNginx,
  apache: SiApache,
  ffmpeg: SiFfmpeg,
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

  // ── Microsoft 365 ecosystem (no dedicated brand mark per product) ─
  microsoftgraphapi: FaMicrosoft,
  teamsbotapi: FaMicrosoft,
  msteams: FaMicrosoft,
  officejs: FaMicrosoft,

  // ── Generic fallbacks for things with no brand mark ───────
  restapi: SiSwagger,
  rest: SiSwagger,
  websocket: LuNetwork,
  rtsp: LuNetwork,
  indexeddb: LuDatabase,
  localstorage: LuDatabase,
  serviceworker: LuPlug,
  webworker: LuPlug,
  canvasapi: LuPenTool,
  notificationapi: LuBell,
};

/** Rendered when a technology has no entry in `TECH_ICONS`. */
export const FallbackTechIcon: IconType = LuCode;

/**
 * Near-white ink for brand marks whose official color is black / near-black
 * (GitHub, Vercel, Next.js…). Matches `--foreground` in the dark theme, so those
 * icons read as "monochrome mark on dark background" — which is what the brand
 * guidelines of every one of them prescribes — instead of vanishing into
 * `--background` (#0f0b1a, contrast 1.08:1).
 */
const DARK_INK = "#f4f2f9";

/**
 * "tech name → official brand hex", keyed exactly like `TECH_ICONS`.
 *
 * Values are copied from the `simple-icons` dataset (v16.28.0) — the same source
 * react-icons generates its `Si*` glyphs from — so an icon and its color always
 * come from the same brand asset. Entries whose glyph has no brand behind it
 * (`LuNetwork`, `LuDatabase`, `LuPlug`, `FallbackTechIcon`) are deliberately
 * absent: `TechBadge` falls back to `text-muted-foreground` for those rather
 * than inventing a color.
 *
 * Two exceptions where simple-icons no longer ships the brand (trademark
 * takedowns) and the last published hex is used instead:
 *   - `aws` → #232F3E (Amazon AWS "squid ink", simple-icons ≤ v13)
 *   - `slack` → #4A154B (Slack aubergine, simple-icons ≤ v14)
 *   - `c#` → #512BD4 (shared with .NET, which is still in the dataset)
 */
const TECH_COLORS: Record<string, string> = {
  // ── Languages ────────────────────────────────────────────
  typescript: "#3178c6",
  javascript: "#f7df1e",
  html: "#e34f26",
  html5: "#e34f26",
  css: "#663399",
  css3: "#663399",
  sass: "#cc6699",
  scss: "#cc6699",
  python: "#3776ab",
  go: "#00add8",
  golang: "#00add8",
  java: "#000000", // OpenJDK
  kotlin: "#7f52ff",
  swift: "#f05138",
  dart: "#0175c2",
  c: "#a8b9cc",
  "c++": "#00599c",
  "c#": "#512bd4",

  // ── Frontend ─────────────────────────────────────────────
  react: "#61dafb",
  reactnative: "#61dafb",
  nextjs: "#000000",
  vuejs: "#4fc08d",
  vue: "#4fc08d",
  nuxtjs: "#00dc82",
  nuxt: "#00dc82",
  tailwindcss: "#06b6d4",
  bootstrap: "#7952b3",
  antdesign: "#0170fe",
  framermotion: "#0055ff",
  framer: "#0055ff",
  redux: "#764abc",
  recoil: "#3578e5",
  reactquery: "#ff4154",
  tanstackquery: "#ff4154",
  threejs: "#000000",
  electron: "#47848f",
  flutter: "#02569b",
  storybook: "#ff4785",
  pwa: "#5a0fc8",
  chartjs: "#ff6384",

  // ── Backend / data ───────────────────────────────────────
  nodejs: "#5fa04e",
  express: "#0a0a0a",
  nestjs: "#e0234e",
  spring: "#6db33f",
  springboot: "#6db33f",
  django: "#092e20",
  graphql: "#e10098",
  prisma: "#2d3748",
  sequelize: "#52b0e7",
  postgresql: "#4169e1",
  postgres: "#4169e1",
  mysql: "#4479a1",
  mariadb: "#003545",
  mongodb: "#47a248",
  redis: "#ff4438",
  elasticsearch: "#005571",
  kafka: "#231f20",
  apachekafka: "#231f20",
  socketio: "#010101",
  axios: "#5a29e4",
  jwt: "#000000",
  swagger: "#85ea2d",
  firebase: "#dd2c00",
  supabase: "#3fcf8e",
  mqtt: "#660066",
  geminiapi: "#8e7cc3",

  // ── Infra / tooling ──────────────────────────────────────
  vercel: "#000000",
  aws: "#232f3e",
  amazonwebservices: "#232f3e",
  docker: "#2496ed",
  kubernetes: "#326ce5",
  nginx: "#009639",
  apache: "#d22128",
  ffmpeg: "#007808",
  terraform: "#844fba",
  linux: "#fcc624",
  ubuntu: "#e95420",
  raspberrypi: "#a22846",
  arduino: "#00878f",
  grafana: "#f46800",
  prometheus: "#e6522c",
  sentry: "#362d59",
  githubactions: "#2088ff",
  vite: "#9135ff",
  webpack: "#8dd6f9",
  esbuild: "#ffcf00",
  rollup: "#ec4a3f",
  turborepo: "#ff1e56",
  pnpm: "#f69220",
  eslint: "#4b32c3",
  prettier: "#f7b93e",
  zod: "#408aff",

  // ── Testing ──────────────────────────────────────────────
  jest: "#c21325",
  vitest: "#00ff74",
  cypress: "#69d3a7",
  msw: "#ff6a33",
  mockserviceworker: "#ff6a33",

  // ── Collaboration ────────────────────────────────────────
  git: "#f03c2e",
  github: "#181717",
  gitlab: "#fc6d26",
  bitbucket: "#0052cc",
  jira: "#0052cc",
  confluence: "#172b4d",
  notion: "#000000",
  figma: "#f24e1e",
  figmaapi: "#f24e1e",
  slack: "#4a154b",
  discord: "#5865f2",

  // `restapi` / `rest` render the Swagger mark, so they take the Swagger green.
  restapi: "#85ea2d",
  rest: "#85ea2d",
};

/**
 * Dark-theme overrides, only for brands that fall below ~2:1 contrast against
 * `--background` (#0f0b1a) and would otherwise be invisible. Everything else
 * (React cyan, TypeScript blue, Docker blue…) is legible as-is and is left
 * alone so the badges keep their real brand colors.
 *
 * Overrides are still official brand assets, never invented tints:
 *   - black/near-black marks → `DARK_INK` (the monochrome-on-dark treatment)
 *   - `aws` → AWS orange #ff9900 (the other half of the two-tone AWS logo)
 *   - `confluence` → Atlassian blue #2684ff
 *   - `sentry` → Sentry violet #6c5fc7
 */
const TECH_COLORS_DARK: Record<string, string> = {
  java: DARK_INK,
  nextjs: DARK_INK,
  threejs: DARK_INK,
  express: DARK_INK,
  prisma: DARK_INK,
  kafka: DARK_INK,
  apachekafka: DARK_INK,
  socketio: DARK_INK,
  jwt: DARK_INK,
  mqtt: DARK_INK,
  vercel: DARK_INK,
  github: DARK_INK,
  notion: DARK_INK,
  slack: DARK_INK,
  aws: "#ff9900",
  amazonwebservices: "#ff9900",
  confluence: "#2684ff",
  sentry: "#6c5fc7",
};

/** Light / dark brand hex pair for a technology. */
export type TechColor = {
  light: string;
  dark: string;
};

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

/**
 * Returns `undefined` for technologies with no brand color — either because the
 * name isn't mapped at all, or because its glyph is a generic Lucide fallback
 * (WebSocket, IndexedDB, Service Worker…). Callers should render those in a
 * neutral UI color.
 */
export function getTechColor(name: string): TechColor | undefined {
  const key = normalizeTechKey(name);
  const light = TECH_COLORS[key];
  if (light === undefined) return undefined;

  return { light, dark: TECH_COLORS_DARK[key] ?? light };
}
