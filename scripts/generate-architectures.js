const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Toda Architecture SVG
const todaArchSvg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="toda_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="box_header" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(99, 102, 241, 0.2)" />
      <stop offset="100%" stop-color="rgba(168, 85, 247, 0.2)" />
    </linearGradient>
    <filter id="card_shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.5" />
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#toda_bg)" />

  <!-- Grid decoration -->
  <path d="M0 150 H1600 M0 300 H1600 M0 450 H1600 M0 600 H1600 M0 750 H1600" stroke="rgba(255,255,255,0.02)" stroke-width="1" />
  <path d="M200 0 V900 M400 0 V900 M600 0 V900 M800 0 V900 M1000 0 V900 M1200 0 V900 M1400 0 V900" stroke="rgba(255,255,255,0.02)" stroke-width="1" />

  <!-- Main Title & Badge -->
  <rect x="80" y="40" width="80" height="26" rx="6" fill="#6366f1" />
  <text x="120" y="58" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#fff" letter-spacing="1">SYSTEM ARCHITECTURE</text>
  <text x="80" y="105" font-family="system-ui, sans-serif" font-weight="800" font-size="34" fill="#f9fafb" letter-spacing="-0.5">Toda · Dual Entry (Web &amp; MCP), Single Domain Service</text>
  <text x="80" y="135" font-family="system-ui, sans-serif" font-weight="500" font-size="15" fill="#9ca3af">Air-Gapped Corporate SW Project Management Platform with 28 Claude Code MCP Tools</text>

  <!-- COLUMN 1: Client Layer (Team PC) -->
  <g filter="url(#card_shadow)">
    <rect x="80" y="180" width="340" height="570" rx="14" fill="#1e293b" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
    <path d="M80 180 H420 V230 H80 Z" fill="url(#box_header)" />
    <text x="105" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#818cf8">CLIENT LAYER (TEAM PC)</text>

    <!-- Client Box 1: Browser -->
    <rect x="105" y="250" width="290" height="150" rx="10" fill="#0f172a" stroke="rgba(99,102,241,0.4)" stroke-width="1.5" />
    <circle cx="130" cy="275" r="5" fill="#38bdf8" />
    <text x="145" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">Web Browser</text>
    <text x="145" y="302" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">React 19 · Vite 8 · Tailwind CSS 4</text>
    <rect x="120" y="320" width="260" height="60" rx="6" fill="rgba(255,255,255,0.04)" />
    <text x="130" y="340" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• For you / Projects / Timeline / Team</text>
    <text x="130" y="362" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• REST APIs (/api/*) + Session Cookie</text>

    <!-- Client Box 2: Claude Code CLI -->
    <rect x="105" y="430" width="290" height="150" rx="10" fill="#0f172a" stroke="rgba(236,72,153,0.4)" stroke-width="1.5" />
    <circle cx="130" cy="455" r="5" fill="#ec4899" />
    <text x="145" y="460" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">Claude Code CLI</text>
    <text x="145" y="482" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">AI Terminal Coding Agent</text>
    <rect x="120" y="500" width="260" height="60" rx="6" fill="rgba(255,255,255,0.04)" />
    <text x="130" y="520" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Natural language task/bug creation</text>
    <text x="130" y="542" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• MCP (POST /api/mcp) + Personal Token</text>

    <!-- Client Security Note -->
    <rect x="105" y="610" width="290" height="115" rx="8" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.2)" />
    <text x="120" y="635" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#a5b4fc">SECURITY &amp; 망분리 원칙</text>
    <text x="120" y="660" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• 서버는 Claude를 직접 호출하지 않음</text>
    <text x="120" y="680" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• 서버 API Key 불필요 &amp; 추가 비용 0원</text>
    <text x="120" y="700" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• 인터넷 차단된 사내망에서도 완전 동작</text>
  </g>

  <!-- COLUMN 2: Air-Gapped Server Layer (Windows Server) -->
  <g filter="url(#card_shadow)">
    <rect x="470" y="180" width="670" height="570" rx="14" fill="#1e293b" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
    <path d="M470 180 H1140 V230 H470 Z" fill="url(#box_header)" />
    <text x="495" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#38bdf8">OPERATIONAL SERVER (WINDOWS / OFFLINE AIR-GAPPED)</text>

    <!-- Sub-container: NestJS Single Process -->
    <rect x="495" y="250" width="620" height="360" rx="12" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" />
    <text x="515" y="278" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#38bdf8">NestJS 11 Application Process (Single Port)</text>

    <!-- Two Entrances: Controllers & MCP Server -->
    <rect x="515" y="295" width="280" height="70" rx="8" fill="#1e293b" stroke="rgba(99,102,241,0.4)" />
    <text x="530" y="322" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#818cf8">REST API Controllers</text>
    <text x="530" y="342" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">77 Endpoints · Session &amp; CSRF</text>

    <rect x="815" y="295" width="280" height="70" rx="8" fill="#1e293b" stroke="rgba(236,72,153,0.4)" />
    <text x="830" y="322" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#f472b6">Stateless MCP Server</text>
    <text x="830" y="342" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">28 AI Tools · Personal Token</text>

    <!-- Arrows down to Domain Service -->
    <path d="M655 365 V395" stroke="#818cf8" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M955 365 V395" stroke="#f472b6" stroke-width="2" marker-end="url(#arrow)" />

    <!-- Core: Unified Domain Service Layer -->
    <rect x="515" y="395" width="580" height="110" rx="10" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="2" />
    <text x="805" y="423" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="15" fill="#fff" letter-spacing="1">⭐️ UNIFIED DOMAIN SERVICE LAYER (23 Services)</text>
    
    <rect x="530" y="435" width="265" height="55" rx="6" fill="#0f172a" />
    <text x="540" y="455" font-family="system-ui, sans-serif" font-weight="700" font-size="11.5" fill="#38bdf8">Atomic State Transitions</text>
    <text x="540" y="475" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Row Lock &amp; Directory Lock Order</text>

    <rect x="815" y="435" width="265" height="55" rx="6" fill="#0f172a" />
    <text x="825" y="455" font-family="system-ui, sans-serif" font-weight="700" font-size="11.5" fill="#34d399">Human / AI Isolation Guard</text>
    <text x="825" y="475" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">Dedicated AI Slot &amp; Edit Protection</text>

    <!-- TypeORM Repositories -->
    <rect x="515" y="525" width="580" height="65" rx="8" fill="#1e293b" stroke="rgba(255,255,255,0.1)" />
    <text x="805" y="552" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">TypeORM Repositories (22 Entities · 13 Migrations)</text>
    <text x="805" y="572" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">Zero-downtime Global Sequence Migration (T-103) with Verified Rollback</text>

    <!-- MariaDB Database -->
    <rect x="495" y="630" width="620" height="95" rx="10" fill="#0f172a" stroke="rgba(16,185,129,0.4)" stroke-width="1.5" />
    <text x="515" y="660" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#34d399">MariaDB 11 Database</text>
    <text x="515" y="682" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Pessimistic Row Locking for concurrent Inter-Project Requests</text>
    <text x="515" y="702" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Immutable Weekly Snapshots (DB Trigger + SHA-256 Checksum + Standalone HTML Export)</text>
  </g>

  <!-- COLUMN 3: External & Operations -->
  <g filter="url(#card_shadow)">
    <rect x="1190" y="180" width="330" height="570" rx="14" fill="#1e293b" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
    <path d="M1190 180 H1520 V230 H1190 Z" fill="url(#box_header)" />
    <text x="1215" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#f59e0b">EXTERNAL &amp; DEPLOYMENT</text>

    <!-- On-premise GitLab -->
    <rect x="1215" y="250" width="280" height="150" rx="10" fill="#0f172a" stroke="rgba(245,158,11,0.4)" stroke-width="1.5" />
    <circle cx="1240" cy="275" r="5" fill="#f59e0b" />
    <text x="1255" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">Corporate GitLab</text>
    <text x="1255" y="302" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">Sole Outbound Integration</text>
    <rect x="1230" y="320" width="250" height="60" rx="6" fill="rgba(255,255,255,0.04)" />
    <text x="1240" y="340" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• OAuth Login &amp; User Discovery</text>
    <text x="1240" y="362" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Group/Repo Sync (Solution/Project)</text>

    <!-- Offline Deployment Pipeline -->
    <rect x="1215" y="430" width="280" height="295" rx="10" fill="#0f172a" stroke="rgba(56,189,248,0.4)" stroke-width="1.5" />
    <circle cx="1240" cy="455" r="5" fill="#38bdf8" />
    <text x="1255" y="460" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">Offline Deployment</text>
    <text x="1255" y="482" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">PowerShell Automation Suite</text>

    <rect x="1230" y="500" width="250" height="205" rx="6" fill="rgba(255,255,255,0.04)" />
    <text x="1242" y="525" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#38bdf8">12 Operational Releases</text>
    <text x="1242" y="550" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• SHA-256 package hash check</text>
    <text x="1242" y="575" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Auto DB dump prior to updates</text>
    <text x="1242" y="600" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Staged rollback on failure</text>
    <text x="1242" y="625" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• 4,781 Unit &amp; Integration Tests</text>
    <text x="1242" y="650" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Service Coverage 99.9%</text>
    <text x="1242" y="680" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#34d399">✓ 4-Week Solo Delivery</text>
  </g>

  <!-- Connectors -->
  <!-- Browser to Server -->
  <path d="M395 325 H495" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
  <text x="445" y="315" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" fill="#38bdf8">REST</text>

  <!-- Claude Code to MCP -->
  <path d="M395 505 C435 505 450 330 515 330" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="4 4" />
  <text x="445" y="440" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" fill="#ec4899">MCP</text>

  <!-- Server to GitLab -->
  <path d="M1115 325 H1215" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />
  <text x="1165" y="315" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" fill="#f59e0b">OAuth</text>

  <!-- Bottom Metric Bar -->
  <rect x="80" y="780" width="1440" height="75" rx="10" fill="#111827" stroke="rgba(255,255,255,0.08)" />
  <text x="150" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#6366f1">4 Weeks</text>
  <text x="260" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Conception to Live Air-Gapped Operation</text>

  <text x="570" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#38bdf8">4,781</text>
  <text x="650" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Automated Unit &amp; Integration Tests</text>

  <text x="960" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#34d399">99.9%</text>
  <text x="1045" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Backend Service Layer Coverage</text>

  <text x="1310" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#ec4899">28 Tools</text>
  <text x="1415" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">MCP Server Tools</text>
</svg>
`;

// 2. M365Works Architecture SVG
const m365ArchSvg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="m365_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f" />
      <stop offset="50%" stop-color="#0e2439" />
      <stop offset="100%" stop-color="#06121e" />
    </linearGradient>
    <linearGradient id="m365_header" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(14, 165, 233, 0.2)" />
      <stop offset="100%" stop-color="rgba(20, 184, 166, 0.2)" />
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#m365_bg)" />

  <text x="80" y="60" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#0ea5e9" letter-spacing="1">SYSTEM ARCHITECTURE</text>
  <text x="80" y="105" font-family="system-ui, sans-serif" font-weight="800" font-size="34" fill="#f9fafb" letter-spacing="-0.5">M365Works · Outlook Add-in Mail Interception &amp; Staged Dispatch</text>
  <text x="80" y="135" font-family="system-ui, sans-serif" font-weight="500" font-size="15" fill="#9ca3af">End-to-End Outbound Approval System: OnMessageSend Interception, DRM Decryption &amp; Synology NAS Linking</text>

  <!-- COLUMN 1: Outlook Add-in Runtime (Isolated Memory Runtimes) -->
  <rect x="80" y="180" width="440" height="570" rx="14" fill="#132337" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M80 180 H520 V230 H80 Z" fill="url(#m365_header)" />
  <text x="105" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#38bdf8">OUTLOOK ADD-IN (CLASSIC WINDOWS WEBVIEW2)</text>

  <!-- Component A: Send Event Handler -->
  <rect x="105" y="250" width="390" height="150" rx="10" fill="#0a192f" stroke="rgba(244,63,94,0.4)" stroke-width="1.5" />
  <circle cx="130" cy="275" r="5" fill="#f43f5e" />
  <text x="145" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">[A] OnMessageSend Event Handler</text>
  <text x="145" y="302" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">Pure Vanilla JavaScript · Zero Bundler</text>
  <rect x="120" y="320" width="360" height="60" rx="6" fill="rgba(255,255,255,0.04)" />
  <text x="130" y="340" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Intercepts "Send" click; blocks immediate dispatch</text>
  <text x="130" y="362" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Strict response deadline; synchronous XMLHttpRequest</text>

  <!-- Communication Bridge: Custom Properties -->
  <rect x="105" y="420" width="390" height="85" rx="8" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4 4" />
  <text x="300" y="445" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#38bdf8">SHARED CUSTOM PROPERTIES BRIDGE</text>
  <text x="300" y="468" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">Office SSO Token · Group ID · Request Done Flag · User Email</text>
  <text x="300" y="488" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Solves memory isolation between Taskpane and Send Handler</text>

  <!-- Component B: Taskpane App -->
  <rect x="105" y="525" width="390" height="205" rx="10" fill="#0a192f" stroke="rgba(56,189,248,0.4)" stroke-width="1.5" />
  <circle cx="130" cy="550" r="5" fill="#38bdf8" />
  <text x="145" y="555" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">[B] Taskpane Web Application</text>
  <text x="145" y="577" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">Nuxt 4 + Vue 3 · Tailwind CSS</text>
  <rect x="120" y="595" width="360" height="115" rx="6" fill="rgba(255,255,255,0.04)" />
  <text x="130" y="620" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Compose Mode: Multi-file Upload (up to 50 files / 1GB)</text>
  <text x="130" y="642" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Approval Route Selection &amp; Body Temp Link Injection</text>
  <text x="130" y="664" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Read Mode: Pending Approval List, Approve / Reject</text>
  <text x="130" y="686" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#38bdf8">⚡ Build Optimization: SSR disabled (5 min → 31s)</text>

  <!-- COLUMN 2: Django Backend & Asynchronous Engine -->
  <rect x="560" y="180" width="480" height="570" rx="14" fill="#132337" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M560 180 H1040 V230 H560 Z" fill="url(#m365_header)" />
  <text x="585" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#2dd4bf">BACKEND ORCHESTRATION (DJANGO / WAITRESS)</text>

  <!-- Backend Core Box -->
  <rect x="585" y="250" width="430" height="480" rx="10" fill="#0a192f" stroke="rgba(45,212,191,0.3)" stroke-width="1.5" />
  <text x="610" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#2dd4bf">Django REST Framework Service</text>

  <rect x="610" y="305" width="380" height="80" rx="8" fill="#132337" />
  <text x="625" y="332" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#f8fafc">16-Worker Thread Pool</text>
  <text x="625" y="352" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Asynchronous execution: Body fetch, DRM strip, NAS upload</text>
  <text x="625" y="370" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Immediate HTTP 200 response to prevent Send Handler timeout</text>

  <rect x="610" y="405" width="380" height="80" rx="8" fill="#132337" />
  <text x="625" y="432" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#38bdf8">Link Token Synchronization Guard</text>
  <text x="625" y="452" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Injects unique tokens into links; polls Graph API</text>
  <text x="625" y="470" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Prevents sending stale draft before Exchange replicates body</text>

  <rect x="610" y="505" width="380" height="80" rx="8" fill="#132337" />
  <text x="625" y="532" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#f59e0b">Duplicate Request &amp; Concurrency Guard</text>
  <text x="625" y="552" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">SHA-256 Checksum upload integrity verification</text>
  <text x="625" y="570" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Process-level Cache Lock + DB step status checks</text>

  <rect x="610" y="605" width="380" height="105" rx="8" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.3)" />
  <text x="625" y="632" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#2dd4bf">Management Console &amp; APIs</text>
  <text x="625" y="655" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Outbound History &amp; Request Tracking</text>
  <text x="625" y="675" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Synology NAS Storage Capacity &amp; Shared Link Expiry</text>
  <text x="625" y="695" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Department Hierarchy, Positions &amp; Access Controls</text>

  <!-- COLUMN 3: External Infrastructure -->
  <rect x="1080" y="180" width="440" height="570" rx="14" fill="#132337" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M1080 180 H1520 V230 H1080 Z" fill="url(#m365_header)" />
  <text x="1105" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#f59e0b">EXTERNAL SERVICES &amp; APIS</text>

  <!-- Graph API -->
  <rect x="1105" y="250" width="390" height="100" rx="8" fill="#0a192f" stroke="rgba(56,189,248,0.3)" />
  <text x="1125" y="278" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#38bdf8">Microsoft Graph API</text>
  <text x="1125" y="300" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Mail item ID translation &amp; body synchronization</text>
  <text x="1125" y="320" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Sender impersonation to dispatch mail after approval</text>

  <!-- Purview DRM PowerShell -->
  <rect x="1105" y="365" width="390" height="110" rx="8" fill="#0a192f" stroke="rgba(244,63,94,0.3)" />
  <text x="1125" y="393" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#f43f5e">PowerShell DRM Batch Processing</text>
  <text x="1125" y="415" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Purview Sensitivity Label Removal</text>
  <text x="1125" y="435" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Array batching: 50 files processed in exactly 2 runs</text>
  <text x="1125" y="455" font-family="system-ui, sans-serif" font-weight="700" font-size="11.5" fill="#34d399">⚡ Performance: 4~5 min → 10s (96% reduction)</text>

  <!-- Synology NAS -->
  <rect x="1105" y="490" width="390" height="100" rx="8" fill="#0a192f" stroke="rgba(16,185,129,0.3)" />
  <text x="1125" y="518" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#34d399">Synology NAS (File Station API)</text>
  <text x="1125" y="540" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Large file upload (up to 1GB total)</text>
  <text x="1125" y="560" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Secure, expiring external download link generation</text>

  <!-- Teams Bot API -->
  <rect x="1105" y="605" width="390" height="125" rx="8" fill="#0a192f" stroke="rgba(168,85,247,0.3)" />
  <text x="1125" y="633" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#c084fc">Corporate Teams Bot API</text>
  <text x="1125" y="655" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Mobile remote approval request, approve, and reject</text>
  <text x="1125" y="675" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Fault detection &amp; admin notification on bot failure</text>
  <text x="1125" y="695" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">• Manual resend workflow from tracking dashboard</text>

  <!-- Connectors -->
  <path d="M495 620 H585" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1015 345 H1105" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1015 420 H1105" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1015 540 H1105" stroke="#34d399" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1015 660 H1105" stroke="#c084fc" stroke-width="2" stroke-dasharray="4 4" />

  <!-- Bottom Bar -->
  <rect x="80" y="780" width="1440" height="75" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.08)" />
  <text x="140" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#38bdf8">4min → 10s</text>
  <text x="280" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">DRM Removal Duration (50 files)</text>

  <text x="590" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#2dd4bf">5min → 31s</text>
  <text x="730" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Frontend Build Time Optimization</text>

  <text x="1060" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#c084fc">Teams Bot</text>
  <text x="1185" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Mobile Remote Approval Flow</text>
</svg>
`;

// 3. RMS Architecture SVG
const rmsArchSvg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rms_arch_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#021324" />
      <stop offset="50%" stop-color="#081e35" />
      <stop offset="100%" stop-color="#010a12" />
    </linearGradient>
    <linearGradient id="rms_arch_header" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(14, 165, 233, 0.25)" />
      <stop offset="100%" stop-color="rgba(56, 189, 248, 0.1)" />
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#rms_arch_bg)" />

  <text x="80" y="60" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#38bdf8" letter-spacing="1">SYSTEM ARCHITECTURE</text>
  <text x="80" y="105" font-family="system-ui, sans-serif" font-weight="800" font-size="34" fill="#f9fafb" letter-spacing="-0.5">neo_rms · Enterprise Resource Management Platform</text>
  <text x="80" y="135" font-family="system-ui, sans-serif" font-weight="500" font-size="15" fill="#9ca3af">Monolithic Architecture with Vue Component Pattern, Serialized Queue &amp; Multi-Infrastructure Orchestration</text>

  <!-- COLUMN 1: Client Layer -->
  <rect x="80" y="180" width="360" height="570" rx="14" fill="#0c233c" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M80 180 H440 V230 H80 Z" fill="url(#rms_arch_header)" />
  <text x="105" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#38bdf8">CLIENT LAYER (BROWSER)</text>

  <rect x="105" y="250" width="310" height="230" rx="10" fill="#041424" stroke="rgba(56,189,248,0.4)" stroke-width="1.5" />
  <circle cx="130" cy="275" r="5" fill="#38bdf8" />
  <text x="145" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">Django SSR + Vue 2.7</text>
  <text x="145" y="302" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">Zero-Bundler Component Architecture</text>
  <rect x="120" y="320" width="280" height="145" rx="6" fill="rgba(255,255,255,0.04)" />
  <text x="130" y="342" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• &lt;script type="text/x-template"&gt; + {% include %}</text>
  <text x="130" y="364" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Delimiter [[ ]] to avoid Django conflict</text>
  <text x="130" y="386" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Shared Modal, Pagination, Loading (100%)</text>
  <text x="130" y="408" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• ApexCharts &amp; Chart.js 3.1 Dashboards</text>
  <text x="130" y="430" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Global loading spinner interceptor</text>
  <text x="130" y="450" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• 9 major management views authored</text>

  <rect x="105" y="500" width="310" height="225" rx="10" fill="#041424" stroke="rgba(255,255,255,0.1)" />
  <text x="125" y="530" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#38bdf8">Enterprise Security &amp; Auth</text>
  <text x="125" y="555" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• MS Entra ID SSO (MSAL authorization)</text>
  <text x="125" y="580" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Session RBAC: Leader vs Member roles</text>
  <text x="125" y="605" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• 4-stage tenure: Active/Leave/Retired/Final</text>
  <text x="125" y="630" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• CSRF cookie &amp; custom header binding</text>
  <text x="125" y="655" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Environment isolation: Hostname based</text>
  <text x="125" y="680" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#f59e0b">✓ Safe dry-run guarding live accounts</text>

  <!-- COLUMN 2: RMS Core Backend -->
  <rect x="480" y="180" width="600" height="570" rx="14" fill="#0c233c" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M480 180 H1080 V230 H480 Z" fill="url(#rms_arch_header)" />
  <text x="505" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#2dd4bf">RMS CORE BACKEND (DJANGO 4.2 / WINDOWS SERVER)</text>

  <rect x="505" y="250" width="550" height="475" rx="10" fill="#041424" stroke="rgba(45,212,191,0.3)" stroke-width="1.5" />
  <text x="525" y="280" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#2dd4bf">Nginx Reverse Proxy &amp; ~28 Django Apps</text>

  <!-- Core Component 1: Serialized Queue -->
  <rect x="525" y="305" width="510" height="95" rx="8" fill="#0c233c" stroke="#f59e0b" stroke-width="1.5" />
  <text x="545" y="332" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#f59e0b">⭐️ SERIALIZED EXECUTION QUEUE (SINGLE WORKER)</text>
  <text x="545" y="355" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Solves Lost Update race conditions during mass employee transfers</text>
  <text x="545" y="375" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Sequential execution of M365, AD, and Mail CC mutation tasks</text>
  <text x="545" y="392" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Verified with concurrent reproduction suites against external delays</text>

  <!-- Core Component 2: HR Lifecycle Orchestration -->
  <rect x="525" y="415" width="510" height="110" rx="8" fill="#0c233c" stroke="#38bdf8" />
  <text x="545" y="442" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#38bdf8">HR Event Lifecycle Orchestration Engine (99%)</text>
  <text x="545" y="465" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Onboarding: AD account, M365 photos/groups/MFA, CC rules, NAS share</text>
  <text x="545" y="485" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Department Transfer: Move OUs, shift SharePoint groups, adjust CC rules</text>
  <text x="545" y="505" font-family="system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Offboarding &amp; Retirement: Revoke sessions, strip groups, remove ETX</text>

  <!-- Core Component 3: Data Layer & APScheduler -->
  <rect x="525" y="540" width="245" height="85" rx="8" fill="#0c233c" />
  <text x="540" y="565" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">MariaDB / Raw SQL</text>
  <text x="540" y="585" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">Connection pool query optimization</text>
  <text x="540" y="605" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">Parameterized query security</text>

  <rect x="790" y="540" width="245" height="85" rx="8" fill="#0c233c" />
  <text x="805" y="565" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">APScheduler 3.11</text>
  <text x="805" y="585" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">DB-driven schedule definitions</text>
  <text x="805" y="605" font-family="system-ui, sans-serif" font-size="11.5" fill="#94a3b8">Periodic sync, backup, cleanup</text>

  <!-- Core Component 4: JWT Service -->
  <rect x="525" y="640" width="510" height="70" rx="8" fill="rgba(168,85,247,0.1)" stroke="#a855f7" />
  <text x="545" y="665" font-family="system-ui, sans-serif" font-weight="700" font-size="13.5" fill="#c084fc">Asymmetric JWT Issuance Service (RSA 2048 / 100%)</text>
  <text x="545" y="688" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Mutual auth for internal agent APIs (DHCP / PC Power) + Monthly scheduled key rotation</text>

  <!-- COLUMN 3: Infrastructure Integration -->
  <rect x="1120" y="180" width="400" height="570" rx="14" fill="#0c233c" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  <path d="M1120 180 H1520 V230 H1120 Z" fill="url(#rms_arch_header)" />
  <text x="1145" y="212" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#f59e0b">INTEGRATED INFRASTRUCTURE</text>

  <!-- AD -->
  <rect x="1145" y="250" width="350" height="85" rx="8" fill="#041424" stroke="rgba(56,189,248,0.3)" />
  <text x="1165" y="278" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#38bdf8">Active Directory</text>
  <text x="1165" y="300" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">PowerShell RSAT account, OU &amp; security group sync</text>
  <text x="1165" y="318" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">57% contributed</text>

  <!-- M365 -->
  <rect x="1145" y="345" width="350" height="85" rx="8" fill="#041424" stroke="rgba(45,212,191,0.3)" />
  <text x="1165" y="373" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#2dd4bf">Microsoft 365 Relay API</text>
  <text x="1165" y="395" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Entra ID, Exchange, SharePoint sites &amp; M365 Groups</text>
  <text x="1165" y="413" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Client 87% / Orchestration 99%</text>

  <!-- Synology NAS -->
  <rect x="1145" y="440" width="350" height="85" rx="8" fill="#041424" stroke="rgba(16,185,129,0.3)" />
  <text x="1165" y="468" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#34d399">Synology NAS (File Station API)</text>
  <text x="1165" y="490" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Department shared folders (98%) &amp; external filelinks (39%)</text>
  <text x="1165" y="508" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Granular staged error recovery pipeline</text>

  <!-- Prometheus -->
  <rect x="1145" y="535" width="350" height="95" rx="8" fill="#041424" stroke="rgba(245,158,11,0.3)" />
  <text x="1165" y="563" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#f59e0b">Prometheus &amp; Storage APIs</text>
  <text x="1165" y="585" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Dual Prometheus (PromQL) server monitoring</text>
  <text x="1165" y="605" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">Real-time NAS volume space monitoring (100% solo)</text>

  <!-- ETX Groupware -->
  <rect x="1145" y="640" width="350" height="85" rx="8" fill="#041424" stroke="rgba(168,85,247,0.3)" />
  <text x="1165" y="668" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#c084fc">ETX Groupware API</text>
  <text x="1165" y="690" font-family="system-ui, sans-serif" font-size="11.5" fill="#cbd5e1">User management views (100%) &amp; lifecycle sync</text>

  <!-- Connectors -->
  <path d="M415 365 H505" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1055 345 H1145" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1055 450 H1145" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M1055 580 H1145" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />

  <!-- Bottom Stats Bar -->
  <rect x="80" y="780" width="1440" height="75" rx="10" fill="#041424" stroke="rgba(255,255,255,0.08)" />
  <text x="140" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#38bdf8">271 Commits</text>
  <text x="290" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">3rd Largest Contributor in Repository</text>

  <text x="630" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#2dd4bf">+43,900 Lines</text>
  <text x="790" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">Core Modules Owned &amp; Authored</text>

  <text x="1100" y="825" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#f59e0b">98% ~ 100%</text>
  <text x="1235" y="823" font-family="system-ui, sans-serif" font-size="13" fill="#9ca3af">NAS &amp; SharePoint Permission Systems</text>
</svg>
`;

async function main() {
  const todaPath = path.join(__dirname, '../public/projects/toda/architecture.png');
  const m365Path = path.join(__dirname, '../public/projects/m365works/architecture.png');
  const rmsPath = path.join(__dirname, '../public/projects/rms/architecture.png');

  await sharp(Buffer.from(todaArchSvg)).png().toFile(todaPath);
  console.log('Generated toda architecture diagram at', todaPath);

  await sharp(Buffer.from(m365ArchSvg)).png().toFile(m365Path);
  console.log('Generated m365works architecture diagram at', m365Path);

  await sharp(Buffer.from(rmsArchSvg)).png().toFile(rmsPath);
  console.log('Generated rms architecture diagram at', rmsPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
