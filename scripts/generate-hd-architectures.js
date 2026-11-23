const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Brand icons as SVG paths / shapes
const GIT_ICON = `<svg viewBox="0 0 24 24" width="36" height="36"><path fill="#F05032" d="M2.6 10.6L10.6 2.6c.8-.8 2.1-.8 2.9 0l8 8c.8.8.8 2.1 0 2.9l-8 8c-.8.8-2.1.8-2.9 0l-8-8c-.8-.8-.8-2.1 0-2.9z"/><circle cx="12" cy="12" r="2.5" fill="#fff"/></svg>`;
const GITLAB_ICON = `<svg viewBox="0 0 24 24" width="40" height="40"><path fill="#E24329" d="M23.6 9.6l-2.4-7.4c-.2-.5-.8-.7-1.3-.4L12 7.7 4.1 1.8c-.5-.3-1.1-.1-1.3.4L.4 9.6c-.2.5 0 1.1.4 1.4l11.2 8.4 11.2-8.4c.4-.3.6-.9.4-1.4z"/><path fill="#FC6D26" d="M12 19.4L4.1 1.8c-.5-.3-1.1-.1-1.3.4L.4 9.6c-.2.5 0 1.1.4 1.4L12 19.4z"/><path fill="#FCA326" d="M12 19.4l4.1-12.8L12 7.7l-4.1-1.1 4.1 12.8z"/></svg>`;
const USER_ICON = `<svg viewBox="0 0 24 24" width="44" height="44" fill="#1e293b"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>`;

// 1. TODA HD ARCHITECTURE
const todaSvg = `
<svg width="2048" height="1100" viewBox="0 0 2048 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="1100" fill="#ffffff" />

  <!-- STYLES -->
  <style>
    .title { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 700; fill: #1e293b; font-size: 26px; }
    .label { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 600; fill: #334155; font-size: 19px; }
    .sub { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 15px; }
    .arrow-text { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 16px; }
    .box { fill: #ffffff; stroke: #475569; stroke-width: 2.5; rx: 4px; }
    .inner-box { fill: #f8fafc; stroke: #cbd5e1; stroke-width: 1.5; rx: 6px; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
    <marker id="arrow-both" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
  </defs>

  <!-- 1. LOCAL BOX (Top Left) -->
  <text x="70" y="80" class="title">Local</text>
  <rect x="70" y="95" width="410" height="210" class="box" />
  
  <!-- Git -->
  <g transform="translate(130, 145)">
    <rect width="60" height="60" rx="12" fill="#F05032" />
    <path d="M20 20 L40 40 M20 40 L40 20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="20" cy="20" r="4" fill="#fff"/><circle cx="40" cy="40" r="4" fill="#fff"/><circle cx="20" cy="40" r="4" fill="#fff"/>
    <text x="30" y="90" text-anchor="middle" class="sub">Git</text>
  </g>

  <!-- pnpm -->
  <g transform="translate(245, 145)">
    <rect x="0" y="0" width="16" height="16" fill="#F69220"/><rect x="20" y="0" width="16" height="16" fill="#F69220"/><rect x="40" y="0" width="16" height="16" fill="#F69220"/>
    <rect x="0" y="20" width="16" height="16" fill="#F69220"/><rect x="20" y="20" width="16" height="16" fill="#4E5D6C"/><rect x="40" y="20" width="16" height="16" fill="#F69220"/>
    <rect x="0" y="40" width="16" height="16" fill="#F69220"/><rect x="20" y="40" width="16" height="16" fill="#4E5D6C"/><rect x="40" y="40" width="16" height="16" fill="#4E5D6C"/>
    <text x="28" y="90" text-anchor="middle" class="sub">pnpm</text>
  </g>

  <!-- Vite -->
  <g transform="translate(365, 145)">
    <polygon points="10,0 55,10 32,60 10,0" fill="#41D1FF"/>
    <polygon points="25,5 50,12 32,55" fill="#BD34FE"/>
    <polygon points="28,20 38,20 25,48 40,32 30,32 35,20" fill="#FFD025"/>
    <text x="32" y="90" text-anchor="middle" class="sub">Vite</text>
  </g>

  <!-- Arrow: Local -> GitLab -->
  <line x1="480" y1="200" x2="770" y2="200" stroke="#475569" stroke-width="2" marker-end="url(#arrow)" />
  <text x="625" y="185" text-anchor="middle" class="arrow-text">Git Push</text>

  <!-- GITLAB (Center Top) -->
  <g transform="translate(790, 155)">
    <path fill="#E24329" d="M47.2 19.2l-4.8-14.8c-.4-1-1.6-1.4-2.6-.8L24 15.4 8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8l22.4 16.8 22.4-16.8c.8-.6 1.2-1.8.8-2.8z"/>
    <path fill="#FC6D26" d="M24 38.8L8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8L24 38.8z"/>
    <path fill="#FCA326" d="M24 38.8l8.2-25.6L24 15.4l-8.2-2.2 8.2 25.6z"/>
    <text x="75" y="32" font-family="-apple-system, sans-serif" font-weight="700" font-size="28" fill="#1e293b">GitLab</text>
  </g>

  <!-- Arrow: Local -> Windows Server (빌드 · 배포) -->
  <path d="M275 305 V690 H480" fill="none" stroke="#475569" stroke-width="2" marker-end="url(#arrow)" />
  <text x="320" y="510" class="arrow-text">빌드 · 배포</text>

  <!-- 2. WINDOWS SERVER (Center Bottom) -->
  <text x="500" y="510" class="title">Windows Server</text>
  <rect x="500" y="530" width="780" height="360" class="box" />

  <!-- Node.js -->
  <g transform="translate(560, 640)">
    <polygon points="30,0 60,18 60,52 30,70 0,52 0,18" fill="#5FA04E"/>
    <text x="30" y="42" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="22" fill="#fff">JS</text>
    <text x="30" y="100" text-anchor="middle" class="sub">Node.js</text>
  </g>

  <!-- NestJS -->
  <g transform="translate(685, 640)">
    <path d="M10,60 C0,35 15,10 40,5 C45,15 35,30 45,35 C55,40 55,20 65,30 C60,50 45,65 10,60 Z" fill="#E0234E"/>
    <text x="35" y="100" text-anchor="middle" class="sub">NestJS</text>
  </g>

  <!-- TypeScript -->
  <g transform="translate(810, 640)">
    <rect width="65" height="65" rx="8" fill="#3178C6" />
    <text x="32" y="46" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="30" fill="#fff">TS</text>
    <text x="32" y="100" text-anchor="middle" class="sub">TypeScript</text>
  </g>

  <!-- TypeORM Arrow -->
  <line x1="930" y1="675" x2="1080" y2="675" stroke="#475569" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
  <text x="1005" y="650" text-anchor="middle" class="arrow-text">TypeORM</text>

  <!-- MariaDB -->
  <g transform="translate(1120, 640)">
    <path d="M15,45 C25,20 50,15 75,30 C65,40 45,35 35,55 C20,60 10,55 15,45 Z" fill="#003545"/>
    <text x="45" y="100" text-anchor="middle" class="sub">MariaDB</text>
  </g>

  <!-- Arrow: Windows Server <-> GitLab (OAuth · REST API) -->
  <line x1="860" y1="530" x2="860" y2="230" stroke="#475569" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
  <text x="880" y="380" class="arrow-text">OAuth · REST API</text>

  <!-- 3. USER (Top Right) -->
  <g transform="translate(1600, 75)">
    <circle cx="35" cy="25" r="22" fill="#1e293b"/>
    <path d="M5,75 C5,52 20,45 35,45 C50,45 65,52 65,75 Z" fill="#1e293b"/>
    <text x="35" y="110" text-anchor="middle" class="title">사용자</text>
  </g>

  <!-- Arrow: User -> Browser -->
  <line x1="1635" y1="195" x2="1635" y2="475" stroke="#475569" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Arrow: User -> Claude Code -->
  <path d="M1675 140 H1980 V840 H1950" fill="none" stroke="#475569" stroke-width="2" marker-end="url(#arrow)" />

  <!-- 4. BROWSER BOX (Right Middle) -->
  <text x="1490" y="450" class="title">Browser</text>
  <rect x="1490" y="475" width="455" height="195" class="box" />

  <!-- React -->
  <g transform="translate(1530, 520)">
    <ellipse cx="28" cy="28" rx="28" ry="11" fill="none" stroke="#00D8FF" stroke-width="3" transform="rotate(30 28 28)"/>
    <ellipse cx="28" cy="28" rx="28" ry="11" fill="none" stroke="#00D8FF" stroke-width="3" transform="rotate(90 28 28)"/>
    <ellipse cx="28" cy="28" rx="28" ry="11" fill="none" stroke="#00D8FF" stroke-width="3" transform="rotate(150 28 28)"/>
    <circle cx="28" cy="28" r="5" fill="#00D8FF"/>
    <text x="28" y="75" text-anchor="middle" class="sub">React</text>
  </g>

  <!-- Router -->
  <g transform="translate(1640, 525)">
    <circle cx="15" cy="25" r="7" fill="#CA4245"/><circle cx="45" cy="12" r="7" fill="#CA4245"/><circle cx="45" cy="38" r="7" fill="#CA4245"/>
    <line x1="15" y1="25" x2="45" y2="12" stroke="#CA4245" stroke-width="3"/><line x1="15" y1="25" x2="45" y2="38" stroke="#CA4245" stroke-width="3"/>
    <text x="30" y="70" text-anchor="middle" class="sub">Router</text>
  </g>

  <!-- Tailwind -->
  <g transform="translate(1745, 525)">
    <path d="M10,25 C15,10 25,10 30,18 C35,26 40,26 48,15 C43,30 33,30 28,22 C23,14 18,14 10,25 Z" fill="#38BDF8"/>
    <text x="30" y="70" text-anchor="middle" class="sub">Tailwind</text>
  </g>

  <!-- TS -->
  <g transform="translate(1850, 515)">
    <rect width="50" height="50" rx="6" fill="#3178C6" />
    <text x="25" y="36" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="24" fill="#fff">TS</text>
    <text x="25" y="80" text-anchor="middle" class="sub">TS</text>
  </g>

  <!-- Arrow: Browser <-> Windows Server (HTTP) -->
  <line x1="1490" y1="595" x2="1280" y2="595" stroke="#475569" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
  <text x="1385" y="580" text-anchor="middle" class="arrow-text">HTTP</text>

  <!-- 5. CLAUDE CODE BOX (Right Bottom) -->
  <text x="1490" y="735" class="title">Claude Code</text>
  <rect x="1490" y="750" width="455" height="175" class="box" />

  <!-- Claude -->
  <g transform="translate(1600, 785)">
    <circle cx="30" cy="30" r="28" fill="#D97706"/>
    <path d="M18,30 Q30,12 42,30 Q30,48 18,30 Z" fill="#fff"/>
    <text x="30" y="80" text-anchor="middle" class="sub">Claude</text>
  </g>

  <!-- MCP -->
  <g transform="translate(1760, 785)">
    <rect x="10" y="5" width="45" height="45" rx="10" fill="#1E293B"/>
    <path d="M20,35 L28,18 L36,35 L44,18" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="32" y="80" text-anchor="middle" class="sub">MCP</text>
  </g>

  <!-- Arrow: Claude Code <-> Windows Server (MCP) -->
  <line x1="1490" y1="835" x2="1280" y2="835" stroke="#475569" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
  <text x="1385" y="820" text-anchor="middle" class="arrow-text">MCP</text>
</svg>
`;

// 2. M365WORKS HD ARCHITECTURE
const m365Svg = `
<svg width="2048" height="1350" viewBox="0 0 2048 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="1350" fill="#ffffff" />

  <style>
    .title { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 700; fill: #1e293b; font-size: 26px; }
    .label { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 600; fill: #334155; font-size: 19px; }
    .sub { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 15px; }
    .arrow-text { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 16px; }
    .pill { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 600; fill: #334155; font-size: 15px; }
    .box { fill: #ffffff; stroke: #475569; stroke-width: 2.5; rx: 12px; }
    .inner-box { fill: #ffffff; stroke: #94a3b8; stroke-width: 1.5; rx: 8px; }
  </style>

  <defs>
    <marker id="m-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
  </defs>

  <!-- Local (Top Left) -->
  <g transform="translate(160, 110)">
    <rect width="60" height="60" rx="12" fill="#F05032" />
    <path d="M20 20 L40 40 M20 40 L40 20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="20" cy="20" r="4" fill="#fff"/><circle cx="40" cy="40" r="4" fill="#fff"/><circle cx="20" cy="40" r="4" fill="#fff"/>
    <text x="30" y="85" text-anchor="middle" class="sub">Local</text>
  </g>

  <!-- Arrow: Local -> GitLab -->
  <line x1="240" y1="140" x2="520" y2="140" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <text x="380" y="125" text-anchor="middle" class="arrow-text">Git Push</text>

  <!-- GitLab (Top) -->
  <g transform="translate(540, 100)">
    <path fill="#E24329" d="M47.2 19.2l-4.8-14.8c-.4-1-1.6-1.4-2.6-.8L24 15.4 8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8l22.4 16.8 22.4-16.8c.8-.6 1.2-1.8.8-2.8z"/>
    <path fill="#FC6D26" d="M24 38.8L8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8L24 38.8z"/>
    <path fill="#FCA326" d="M24 38.8l8.2-25.6L24 15.4l-8.2-2.2 8.2 25.6z"/>
    <text x="75" y="32" font-family="-apple-system, sans-serif" font-weight="700" font-size="28" fill="#1e293b">GitLab</text>
  </g>

  <!-- Arrow: GitLab -> Windows Server (빌드 · 배포) -->
  <line x1="590" y1="185" x2="590" y2="440" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <text x="650" y="330" text-anchor="middle" class="arrow-text">빌드 · 배포</text>

  <!-- USER (Top Right) -->
  <g transform="translate(1800, 100)">
    <circle cx="35" cy="25" r="22" fill="#1e293b"/>
    <path d="M5,75 C5,52 20,45 35,45 C50,45 65,52 65,75 Z" fill="#1e293b"/>
    <text x="35" y="110" text-anchor="middle" class="title">사용자</text>
  </g>

  <!-- Arrow: User -> Windows Server (관리 콘솔 · HTTPS) -->
  <path d="M1800 135 H1160 V440" fill="none" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <text x="1450" y="120" text-anchor="middle" class="arrow-text">관리 콘솔 · HTTPS</text>

  <!-- Arrow: User -> Classic Outlook (보내기) -->
  <line x1="1835" y1="230" x2="1835" y2="440" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <text x="1790" y="340" text-anchor="middle" class="arrow-text">보내기</text>

  <!-- WINDOWS SERVER (Center) -->
  <text x="640" y="420" class="title">Windows Server</text>
  <rect x="535" y="445" width="765" height="500" class="box" />

  <!-- Django Backend Box (Inside Windows Server) -->
  <rect x="570" y="480" width="320" height="430" class="inner-box" />
  
  <g transform="translate(630, 520)">
    <rect width="65" height="65" rx="10" fill="#092E20"/>
    <text x="32" y="46" text-anchor="middle" font-family="serif" font-weight="900" font-size="34" fill="#fff">dj</text>
    <text x="32" y="90" text-anchor="middle" class="sub">Django</text>
  </g>
  <g transform="translate(770, 520)">
    <rect width="65" height="65" rx="10" fill="#3776AB"/>
    <text x="32" y="46" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="30" fill="#FFD43B">Py</text>
    <text x="32" y="90" text-anchor="middle" class="sub">Python</text>
  </g>

  <!-- Pills -->
  <g transform="translate(620, 650)">
    <rect width="220" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="110" y="24" text-anchor="middle" class="pill">DRF · Waitress</text>
  </g>
  <g transform="translate(610, 710)">
    <rect width="240" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="120" y="24" text-anchor="middle" class="pill">SimpleJWT · msal</text>
  </g>
  <g transform="translate(650, 770)">
    <rect width="160" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="80" y="24" text-anchor="middle" class="pill">PowerShell</text>
  </g>

  <!-- Node.js & Nuxt Inside Windows Server -->
  <g transform="translate(1130, 520)">
    <polygon points="30,0 60,18 60,52 30,70 0,52 0,18" fill="#5FA04E"/>
    <text x="30" y="42" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="22" fill="#fff">JS</text>
    <text x="30" y="95" text-anchor="middle" class="sub">Node.js</text>
  </g>

  <g transform="translate(1080, 700)">
    <polygon points="10,40 30,5 50,40" fill="#00DC82"/>
    <polygon points="30,40 45,15 60,40" fill="#002E3B"/>
    <text x="35" y="60" text-anchor="middle" class="sub">Nuxt 4</text>
  </g>
  <g transform="translate(1190, 700)">
    <polygon points="0,5 30,55 60,5" fill="#42B883"/>
    <polygon points="12,5 30,35 48,5" fill="#35495E"/>
    <text x="30" y="60" text-anchor="middle" class="sub">Vue 3</text>
  </g>

  <!-- Arrow: Nuxt -> Django (8400 port) -->
  <line x1="1060" y1="720" x2="890" y2="720" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <text x="975" y="700" text-anchor="middle" class="arrow-text">8400 port</text>

  <!-- MySQL (Left of Windows Server) -->
  <g transform="translate(200, 640)">
    <text x="60" y="40" font-family="sans-serif" font-weight="800" font-size="28" fill="#00618A">MySQL</text>
    <text x="60" y="70" class="sub">MySQL</text>
  </g>
  <line x1="330" y1="670" x2="535" y2="670" stroke="#475569" stroke-width="2" marker-start="url(#m-arrow)" marker-end="url(#m-arrow)" />
  <text x="430" y="650" text-anchor="middle" class="arrow-text">Django ORM</text>

  <!-- CLASSIC OUTLOOK (Right Box) -->
  <text x="1520" y="420" class="title">Classic Outlook</text>
  <rect x="1520" y="445" width="410" height="490" class="box" />

  <!-- Taskpane Box -->
  <text x="1550" y="485" class="label">Taskpane</text>
  <g transform="translate(1580, 515)">
    <polygon points="10,40 30,5 50,40" fill="#00DC82"/>
    <text x="30" y="65" text-anchor="middle" class="sub">Nuxt 4</text>
  </g>
  <g transform="translate(1690, 515)">
    <polygon points="0,5 30,55 60,5" fill="#42B883"/>
    <text x="30" y="65" text-anchor="middle" class="sub">Vue 3</text>
  </g>
  <g transform="translate(1800, 515)">
    <rect width="55" height="55" rx="8" fill="#3178C6"/>
    <text x="27" y="38" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="24" fill="#fff">TS</text>
    <text x="27" y="75" text-anchor="middle" class="sub">TypeScript</text>
  </g>

  <!-- LaunchEvent Box -->
  <text x="1550" y="680" class="label">LaunchEvent</text>
  <g transform="translate(1590, 715)">
    <rect width="55" height="55" rx="8" fill="#F7DF1E"/>
    <text x="27" y="40" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="28" fill="#000">JS</text>
    <text x="27" y="75" text-anchor="middle" class="sub">Vanilla JS</text>
  </g>

  <g transform="translate(1680, 725)">
    <rect width="190" height="40" rx="20" fill="#E0F2FE" />
    <text x="95" y="26" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="16" fill="#0369A1">OnMessageSend</text>
  </g>

  <!-- Arrows between Server & Outlook -->
  <line x1="1300" y1="550" x2="1520" y2="550" stroke="#475569" stroke-width="2" marker-start="url(#m-arrow)" marker-end="url(#m-arrow)" />
  <text x="1410" y="580" text-anchor="middle" class="arrow-text">axios</text>

  <line x1="1300" y1="780" x2="1520" y2="780" stroke="#475569" stroke-width="2" marker-start="url(#m-arrow)" marker-end="url(#m-arrow)" />
  <text x="1410" y="765" text-anchor="middle" class="arrow-text">XHR</text>

  <!-- BOTTOM BOXES -->
  <!-- Microsoft 365 -->
  <text x="450" y="1030" class="sub">Microsoft 365</text>
  <rect x="445" y="1045" width="440" height="150" class="box" />
  <line x1="665" y1="945" x2="665" y2="1045" stroke="#475569" stroke-width="2" marker-start="url(#m-arrow)" marker-end="url(#m-arrow)" />
  
  <g transform="translate(480, 1080)">
    <circle cx="30" cy="30" r="15" fill="none" stroke="#0078D4" stroke-width="3"/><circle cx="15" cy="45" r="8" fill="#0078D4"/><circle cx="45" cy="45" r="8" fill="#0078D4"/>
    <text x="30" y="85" text-anchor="middle" class="sub">Graph API</text>
  </g>
  <g transform="translate(630, 1080)">
    <circle cx="20" cy="25" r="10" fill="none" stroke="#0078D4" stroke-width="3"/><line x1="30" y1="25" x2="50" y2="25" stroke="#0078D4" stroke-width="3"/><line x1="45" y1="25" x2="45" y2="35" stroke="#0078D4" stroke-width="3"/>
    <text x="35" y="85" text-anchor="middle" class="sub">Entra ID</text>
  </g>
  <g transform="translate(760, 1080)">
    <polygon points="15,10 40,10 55,30 30,50 15,30" fill="none" stroke="#0078D4" stroke-width="3"/><circle cx="25" cy="20" r="3" fill="#0078D4"/>
    <text x="35" y="85" text-anchor="middle" class="sub">Purview</text>
  </g>

  <!-- Synology NAS -->
  <line x1="1000" y1="945" x2="1000" y2="1080" stroke="#475569" stroke-width="2" marker-end="url(#m-arrow)" />
  <g transform="translate(945, 1090)">
    <text x="55" y="25" font-family="sans-serif" font-weight="700" font-size="22" fill="#64748b">Synology</text>
    <text x="55" y="55" class="sub">Synology NAS</text>
  </g>

  <!-- Notifications (Teams, SMTP) -->
  <text x="1120" y="1030" class="sub">알림</text>
  <rect x="1120" y="1045" width="310" height="150" class="box" />
  <line x1="1275" y1="945" x2="1275" y2="1045" stroke="#475569" stroke-width="2" marker-start="url(#m-arrow)" marker-end="url(#m-arrow)" />

  <g transform="translate(1160, 1080)">
    <rect width="45" height="40" rx="6" fill="none" stroke="#5B5FC7" stroke-width="3"/><line x1="10" y1="15" x2="35" y2="15" stroke="#5B5FC7" stroke-width="3"/><line x1="10" y1="25" x2="25" y2="25" stroke="#5B5FC7" stroke-width="3"/>
    <text x="22" y="70" text-anchor="middle" class="sub">Teams 봇</text>
  </g>
  <g transform="translate(1310, 1080)">
    <rect width="50" height="35" rx="4" fill="none" stroke="#475569" stroke-width="3"/><polyline points="0,0 25,20 50,0" fill="none" stroke="#475569" stroke-width="3"/>
    <text x="25" y="70" text-anchor="middle" class="sub">SMTP</text>
  </g>
</svg>
`;

// 3. RMS HD ARCHITECTURE
const rmsSvg = `
<svg width="2048" height="1350" viewBox="0 0 2048 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="1350" fill="#ffffff" />

  <style>
    .title { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 700; fill: #1e293b; font-size: 26px; }
    .label { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 600; fill: #334155; font-size: 19px; }
    .sub { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 15px; }
    .arrow-text { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: #64748b; font-size: 16px; }
    .pill { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; font-weight: 600; fill: #334155; font-size: 15px; }
    .box { fill: #ffffff; stroke: #475569; stroke-width: 2.5; rx: 12px; }
    .inner-box { fill: #ffffff; stroke: #94a3b8; stroke-width: 1.5; rx: 8px; }
  </style>

  <defs>
    <marker id="rms-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
  </defs>

  <!-- Local (Top Left) -->
  <g transform="translate(150, 110)">
    <rect width="60" height="60" rx="12" fill="#F05032" />
    <path d="M20 20 L40 40 M20 40 L40 20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="20" cy="20" r="4" fill="#fff"/><circle cx="40" cy="40" r="4" fill="#fff"/><circle cx="20" cy="40" r="4" fill="#fff"/>
    <text x="30" y="85" text-anchor="middle" class="sub">Local</text>
  </g>

  <!-- Arrow: Local -> GitLab -->
  <line x1="230" y1="140" x2="530" y2="140" stroke="#475569" stroke-width="2" marker-end="url(#rms-arrow)" />
  <text x="380" y="125" text-anchor="middle" class="arrow-text">Git Push</text>

  <!-- GitLab (Top) -->
  <g transform="translate(550, 100)">
    <path fill="#E24329" d="M47.2 19.2l-4.8-14.8c-.4-1-1.6-1.4-2.6-.8L24 15.4 8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8l22.4 16.8 22.4-16.8c.8-.6 1.2-1.8.8-2.8z"/>
    <path fill="#FC6D26" d="M24 38.8L8.2 3.6c-1-.6-2.2-.2-2.6.8L.8 19.2c-.4 1 0 2.2.8 2.8L24 38.8z"/>
    <path fill="#FCA326" d="M24 38.8l8.2-25.6L24 15.4l-8.2-2.2 8.2 25.6z"/>
    <text x="75" y="32" font-family="-apple-system, sans-serif" font-weight="700" font-size="28" fill="#1e293b">GitLab</text>
  </g>

  <!-- Arrow: GitLab -> Windows Server (배포) -->
  <line x1="600" y1="185" x2="600" y2="440" stroke="#475569" stroke-width="2" marker-end="url(#rms-arrow)" />
  <text x="640" y="320" text-anchor="middle" class="arrow-text">배포</text>

  <!-- USER (Top Right) -->
  <g transform="translate(1740, 75)">
    <circle cx="35" cy="25" r="22" fill="#1e293b"/>
    <path d="M5,75 C5,52 20,45 35,45 C50,45 65,52 65,75 Z" fill="#1e293b"/>
    <text x="35" y="110" text-anchor="middle" class="title">사용자</text>
  </g>

  <!-- Arrow: User -> Web Browser (HTTP) -->
  <line x1="1775" y1="210" x2="1775" y2="440" stroke="#475569" stroke-width="2" marker-end="url(#rms-arrow)" />
  <text x="1730" y="330" text-anchor="middle" class="arrow-text">HTTP</text>

  <!-- WINDOWS SERVER (Center) -->
  <text x="650" y="420" class="title">Windows Server</text>
  <rect x="450" y="445" width="980" height="490" class="box" />

  <!-- Django Backend Box (Inside Server) -->
  <rect x="500" y="480" width="480" height="420" class="inner-box" />

  <g transform="translate(620, 520)">
    <rect width="65" height="65" rx="10" fill="#092E20"/>
    <text x="32" y="46" text-anchor="middle" font-family="serif" font-weight="900" font-size="34" fill="#fff">dj</text>
    <text x="32" y="90" text-anchor="middle" class="sub">Django</text>
  </g>
  <g transform="translate(780, 520)">
    <rect width="65" height="65" rx="10" fill="#3776AB"/>
    <text x="32" y="46" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="30" fill="#FFD43B">Py</text>
    <text x="32" y="90" text-anchor="middle" class="sub">Python</text>
  </g>

  <!-- Pills -->
  <g transform="translate(640, 650)">
    <rect width="180" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="90" y="24" text-anchor="middle" class="pill">APScheduler</text>
  </g>
  <g transform="translate(630, 710)">
    <rect width="200" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="100" y="24" text-anchor="middle" class="pill">MSAL · PyJWT</text>
  </g>
  <g transform="translate(650, 770)">
    <rect width="160" height="36" rx="18" fill="#F1F5F9" stroke="#E2E8F0" />
    <text x="80" y="24" text-anchor="middle" class="pill">PowerShell</text>
  </g>

  <!-- NGINX (Inside Server) -->
  <g transform="translate(1220, 600)">
    <rect width="70" height="70" rx="12" fill="#009639"/>
    <text x="35" y="48" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="36" fill="#fff">N</text>
    <text x="35" y="100" text-anchor="middle" class="sub">nginx</text>
  </g>

  <!-- Arrow: Django <-> Nginx (8087 port) -->
  <line x1="980" y1="650" x2="1200" y2="650" stroke="#475569" stroke-width="2" marker-start="url(#rms-arrow)" marker-end="url(#rms-arrow)" />
  <text x="1090" y="630" text-anchor="middle" class="arrow-text">8087 port</text>

  <!-- MariaDB (Left of Server) -->
  <g transform="translate(160, 640)">
    <path d="M15,45 C25,20 50,15 75,30 C65,40 45,35 35,55 C20,60 10,55 15,45 Z" fill="#003545"/>
    <text x="45" y="90" text-anchor="middle" class="title">MariaDB</text>
  </g>
  <line x1="290" y1="670" x2="450" y2="670" stroke="#475569" stroke-width="2" marker-start="url(#rms-arrow)" marker-end="url(#rms-arrow)" />
  <text x="370" y="650" text-anchor="middle" class="arrow-text">ORM · SQL</text>

  <!-- WEB BROWSER (Right Box) -->
  <text x="1560" y="420" class="title">웹 브라우저</text>
  <rect x="1560" y="445" width="340" height="490" class="box" />

  <!-- Bootstrap -->
  <g transform="translate(1620, 520)">
    <rect width="60" height="60" rx="14" fill="#7952B3"/>
    <text x="30" y="44" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="32" fill="#fff">B</text>
    <text x="30" y="85" text-anchor="middle" class="sub">Bootstrap</text>
  </g>

  <!-- jQuery -->
  <g transform="translate(1760, 520)">
    <circle cx="30" cy="30" r="28" fill="#0769AD"/>
    <text x="30" y="40" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="20" fill="#fff">jQ</text>
    <text x="30" y="85" text-anchor="middle" class="sub">jQuery</text>
  </g>

  <!-- Vue -->
  <g transform="translate(1620, 690)">
    <polygon points="0,5 30,55 60,5" fill="#42B883"/>
    <polygon points="12,5 30,35 48,5" fill="#35495E"/>
    <text x="30" y="75" text-anchor="middle" class="sub">Vue</text>
  </g>

  <!-- axios -->
  <g transform="translate(1760, 690)">
    <rect width="60" height="45" rx="8" fill="#5A29E4"/>
    <text x="30" y="32" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#fff">axios</text>
    <text x="30" y="75" text-anchor="middle" class="sub">axios</text>
  </g>

  <!-- Arrow: Nginx <-> Web Browser (80 port) -->
  <line x1="1430" y1="650" x2="1560" y2="650" stroke="#475569" stroke-width="2" marker-start="url(#rms-arrow)" marker-end="url(#rms-arrow)" />
  <text x="1495" y="630" text-anchor="middle" class="arrow-text">80 port</text>

  <!-- BOTTOM INFRASTRUCTURE BOXES -->
  <!-- Microsoft -->
  <text x="50" y="1030" class="sub">Microsoft</text>
  <rect x="45" y="1045" width="700" height="180" class="box" />
  <line x1="550" y1="935" x2="550" y2="1045" stroke="#475569" stroke-width="2" marker-start="url(#rms-arrow)" marker-end="url(#rms-arrow)" />

  <g transform="translate(100, 1090)">
    <circle cx="20" cy="25" r="10" fill="none" stroke="#0078D4" stroke-width="3"/><line x1="30" y1="25" x2="50" y2="25" stroke="#0078D4" stroke-width="3"/><line x1="45" y1="25" x2="45" y2="35" stroke="#0078D4" stroke-width="3"/>
    <text x="35" y="80" text-anchor="middle" class="sub">Entra ID</text>
  </g>
  <g transform="translate(270, 1090)">
    <circle cx="30" cy="30" r="15" fill="none" stroke="#0078D4" stroke-width="3"/><circle cx="15" cy="45" r="8" fill="#0078D4"/><circle cx="45" cy="45" r="8" fill="#0078D4"/>
    <text x="30" y="80" text-anchor="middle" class="sub">Graph API</text>
  </g>
  <g transform="translate(450, 1090)">
    <rect width="45" height="45" rx="8" fill="none" stroke="#0078D4" stroke-width="3"/><circle cx="22" cy="22" r="8" fill="#0078D4"/>
    <text x="22" y="80" text-anchor="middle" class="sub">Key Vault</text>
  </g>
  <g transform="translate(600, 1090)">
    <rect width="45" height="35" rx="4" fill="none" stroke="#0078D4" stroke-width="3"/><line x1="22" y1="35" x2="22" y2="50" stroke="#0078D4" stroke-width="3"/><line x1="10" y1="50" x2="35" y2="50" stroke="#0078D4" stroke-width="3"/>
    <text x="22" y="80" text-anchor="middle" class="sub">Active Directory</text>
  </g>

  <!-- 인프라 (Cisco, Synology, Aqara) -->
  <text x="790" y="1030" class="sub">인프라</text>
  <rect x="785" y="1045" width="400" height="180" class="box" />
  <line x1="985" y1="935" x2="985" y2="1045" stroke="#475569" stroke-width="2" marker-start="url(#rms-arrow)" marker-end="url(#rms-arrow)" />

  <g transform="translate(840, 1100)">
    <text x="25" y="20" font-family="sans-serif" font-weight="800" font-size="18" fill="#049FD9">Cisco</text>
    <text x="25" y="60" text-anchor="middle" class="sub">Cisco</text>
  </g>
  <g transform="translate(960, 1100)">
    <text x="35" y="20" font-family="sans-serif" font-weight="700" font-size="18" fill="#64748b">Synology</text>
    <text x="35" y="60" text-anchor="middle" class="sub">Synology</text>
  </g>
  <g transform="translate(1110, 1090)">
    <rect width="25" height="35" rx="6" fill="none" stroke="#00A0E9" stroke-width="3"/><circle cx="12" cy="18" r="4" fill="#00A0E9"/>
    <text x="12" y="70" text-anchor="middle" class="sub">Aqara</text>
  </g>

  <!-- 알림 (메일, SMS) -->
  <text x="1230" y="1030" class="sub">알림</text>
  <rect x="1225" y="1045" width="260" height="180" class="box" />
  <line x1="1355" y1="935" x2="1355" y2="1045" stroke="#475569" stroke-width="2" marker-end="url(#rms-arrow)" />

  <g transform="translate(1270, 1100)">
    <rect width="45" height="32" rx="4" fill="none" stroke="#475569" stroke-width="3"/><polyline points="0,0 22,18 45,0" fill="none" stroke="#475569" stroke-width="3"/>
    <text x="22" y="60" text-anchor="middle" class="sub">메일</text>
  </g>
  <g transform="translate(1390, 1100)">
    <rect width="45" height="35" rx="6" fill="none" stroke="#475569" stroke-width="3"/><line x1="10" y1="12" x2="35" y2="12" stroke="#475569" stroke-width="3"/><line x1="10" y1="22" x2="25" y2="22" stroke="#475569" stroke-width="3"/>
    <text x="22" y="60" text-anchor="middle" class="sub">SMS</text>
  </g>

  <!-- ETX 그룹웨어 (Far Right Bottom) -->
  <g transform="translate(1660, 1100)">
    <circle cx="20" cy="18" r="10" fill="#1e293b"/><circle cx="45" cy="18" r="10" fill="#1e293b"/>
    <path d="M5,45 C5,32 15,28 25,28 C35,28 45,32 45,45 Z" fill="#1e293b"/>
    <path d="M35,45 C35,32 45,28 55,28 C65,28 75,32 75,45 Z" fill="#1e293b"/>
    <text x="40" y="70" text-anchor="middle" class="sub">ETX 그룹웨어</text>
  </g>
  <path d="M1410 935 V1000 H1700 V1090" fill="none" stroke="#475569" stroke-width="2" marker-end="url(#rms-arrow)" />
</svg>
`;

async function main() {
  const todaPath = path.join(__dirname, '../public/projects/toda/architecture.png');
  const m365Path = path.join(__dirname, '../public/projects/m365works/architecture.png');
  const rmsPath = path.join(__dirname, '../public/projects/rms/architecture.png');

  await sharp(Buffer.from(todaSvg)).png({ quality: 100, compressionLevel: 9 }).toFile(todaPath);
  console.log('Successfully generated Ultra HD Toda Architecture at', todaPath);

  await sharp(Buffer.from(m365Svg)).png({ quality: 100, compressionLevel: 9 }).toFile(m365Path);
  console.log('Successfully generated Ultra HD M365Works Architecture at', m365Path);

  await sharp(Buffer.from(rmsSvg)).png({ quality: 100, compressionLevel: 9 }).toFile(rmsPath);
  console.log('Successfully generated Ultra HD RMS Architecture at', rmsPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
