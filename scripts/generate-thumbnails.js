const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

fs.mkdirSync(path.join(__dirname, '../public/projects/toda'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '../public/projects/rms'), { recursive: true });

const todaSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#31104b" />
    </linearGradient>
    <linearGradient id="card1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.03)" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)" />

  <circle cx="300" cy="200" r="220" fill="#6366f1" opacity="0.25" filter="url(#glow)" />
  <circle cx="900" cy="450" r="240" fill="#ec4899" opacity="0.2" filter="url(#glow)" />

  <path d="M0 135 H1200 M0 270 H1200 M0 405 H1200 M0 540 H1200" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
  <path d="M240 0 V675 M480 0 V675 M720 0 V675 M960 0 V675" stroke="rgba(255,255,255,0.04)" stroke-width="1" />

  <rect x="200" y="110" width="800" height="455" rx="16" fill="url(#card1)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
  
  <rect x="200" y="110" width="800" height="48" rx="16" fill="rgba(15,23,42,0.6)" />
  <circle cx="230" cy="134" r="6" fill="#ef4444" />
  <circle cx="250" cy="134" r="6" fill="#f59e0b" />
  <circle cx="270" cy="134" r="6" fill="#10b981" />

  <text x="600" y="140" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="rgba(255,255,255,0.7)" letter-spacing="2">TODA · CLAUDE CODE &amp; PROJECT HUB</text>

  <rect x="220" y="180" width="180" height="360" rx="10" fill="rgba(0,0,0,0.25)" />
  <rect x="240" y="205" width="140" height="24" rx="6" fill="url(#accent)" opacity="0.8" />
  <text x="252" y="221" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#fff">For you</text>
  <rect x="240" y="245" width="140" height="20" rx="4" fill="rgba(255,255,255,0.06)" />
  <rect x="240" y="275" width="140" height="20" rx="4" fill="rgba(255,255,255,0.06)" />
  <rect x="240" y="305" width="140" height="20" rx="4" fill="rgba(255,255,255,0.06)" />
  <rect x="240" y="345" width="100" height="14" rx="3" fill="rgba(255,255,255,0.15)" />
  <rect x="240" y="375" width="140" height="20" rx="4" fill="rgba(255,255,255,0.06)" />
  <rect x="240" y="405" width="140" height="20" rx="4" fill="rgba(255,255,255,0.06)" />

  <rect x="420" y="180" width="560" height="70" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
  <rect x="440" y="198" width="60" height="20" rx="4" fill="#6366f1" />
  <text x="470" y="212" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="11" fill="#fff">T-103</text>
  <text x="515" y="213" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#f1f5f9">Inter-Project Request State Machine</text>
  <rect x="440" y="226" width="120" height="10" rx="3" fill="rgba(255,255,255,0.15)" />
  <rect x="570" y="226" width="80" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
  <rect x="900" y="200" width="65" height="22" rx="11" fill="#10b981" opacity="0.25" />
  <text x="932" y="215" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="10" fill="#34d399">DONE</text>

  <rect x="420" y="265" width="560" height="70" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(236,72,153,0.3)" stroke-width="1" />
  <rect x="440" y="283" width="60" height="20" rx="4" fill="#ec4899" />
  <text x="470" y="297" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="11" fill="#fff">MCP-28</text>
  <text x="515" y="298" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#f1f5f9">Model Context Protocol Tools for Claude Code</text>
  <rect x="440" y="311" width="160" height="10" rx="3" fill="rgba(255,255,255,0.15)" />
  <rect x="890" y="285" width="75" height="22" rx="11" fill="#818cf8" opacity="0.25" />
  <text x="927" y="300" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="10" fill="#a5b4fc">IN PROGRESS</text>

  <rect x="420" y="350" width="560" height="70" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(56,189,248,0.3)" stroke-width="1" />
  <rect x="440" y="368" width="60" height="20" rx="4" fill="#38bdf8" />
  <text x="470" y="382" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="11" fill="#0f172a">E-130</text>
  <text x="515" y="383" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#f1f5f9">Immutable Weekly Team Snapshots (SHA-256)</text>
  <rect x="440" y="396" width="140" height="10" rx="3" fill="rgba(255,255,255,0.15)" />
  <rect x="900" y="370" width="65" height="22" rx="11" fill="#f59e0b" opacity="0.25" />
  <text x="932" y="385" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="10" fill="#fbbf24">TO DO</text>

  <rect x="420" y="435" width="560" height="90" rx="10" fill="rgba(0,0,0,0.3)" />
  <text x="460" y="465" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#38bdf8">4,781</text>
  <text x="460" y="485" font-family="system-ui, sans-serif" font-weight="500" font-size="11" fill="rgba(255,255,255,0.6)">Automated Tests</text>

  <text x="620" y="465" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#34d399">99.9%</text>
  <text x="620" y="485" font-family="system-ui, sans-serif" font-weight="500" font-size="11" fill="rgba(255,255,255,0.6)">Service Coverage</text>

  <text x="780" y="465" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#ec4899">28 Tools</text>
  <text x="780" y="485" font-family="system-ui, sans-serif" font-weight="500" font-size="11" fill="rgba(255,255,255,0.6)">MCP AI Server</text>
</svg>
`;

const rmsSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg_rms" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091e3a" />
      <stop offset="50%" stop-color="#0f2b48" />
      <stop offset="100%" stop-color="#021324" />
    </linearGradient>
    <linearGradient id="rms_card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)" />
    </linearGradient>
    <filter id="rms_glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="50" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bg_rms)" />

  <circle cx="250" cy="220" r="200" fill="#0ea5e9" opacity="0.25" filter="url(#rms_glow)" />
  <circle cx="950" cy="420" r="220" fill="#10b981" opacity="0.2" filter="url(#rms_glow)" />

  <path d="M0 135 H1200 M0 270 H1200 M0 405 H1200 M0 540 H1200" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
  <path d="M240 0 V675 M480 0 V675 M720 0 V675 M960 0 V675" stroke="rgba(255,255,255,0.03)" stroke-width="1" />

  <rect x="180" y="95" width="840" height="485" rx="16" fill="url(#rms_card)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />

  <rect x="180" y="95" width="840" height="52" rx="16" fill="rgba(2,19,36,0.8)" />
  <circle cx="215" cy="121" r="6" fill="#ef4444" />
  <circle cx="235" cy="121" r="6" fill="#f59e0b" />
  <circle cx="255" cy="121" r="6" fill="#10b981" />

  <text x="600" y="127" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="rgba(255,255,255,0.8)" letter-spacing="2">NEO_RMS · IT RESOURCE MANAGEMENT PLATFORM</text>

  <rect x="215" y="170" width="370" height="380" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" />
  <text x="240" y="202" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#38bdf8" letter-spacing="1">HR LIFECYCLE ORCHESTRATION</text>
  
  <rect x="240" y="225" width="320" height="44" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(14,165,233,0.3)" />
  <circle cx="260" cy="247" r="8" fill="#0ea5e9" />
  <text x="280" y="251" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#f1f5f9">Active Directory (PowerShell RSAT)</text>

  <line x1="400" y1="269" x2="400" y2="283" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="3 3" />

  <rect x="240" y="283" width="320" height="44" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(45,212,191,0.3)" />
  <circle cx="260" cy="305" r="8" fill="#2dd4bf" />
  <text x="280" y="309" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#f1f5f9">Microsoft 365 (Entra ID · SharePoint)</text>

  <line x1="400" y1="327" x2="400" y2="341" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="3 3" />

  <rect x="240" y="341" width="320" height="44" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(16,185,129,0.3)" />
  <circle cx="260" cy="363" r="8" fill="#10b981" />
  <text x="280" y="367" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#f1f5f9">Synology NAS (File Station API)</text>

  <line x1="400" y1="385" x2="400" y2="399" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3" />

  <rect x="240" y="399" width="320" height="44" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.3)" />
  <circle cx="260" cy="421" r="8" fill="#f59e0b" />
  <text x="280" y="425" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#f1f5f9">Serialized Worker Queue (Anti-LostUpdate)</text>

  <rect x="615" y="170" width="375" height="180" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" />
  <text x="635" y="202" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#2dd4bf" letter-spacing="1">SERVER &amp; NAS MONITORING (PROMETHEUS)</text>
  
  <path d="M635 300 Q680 260 720 280 T800 230 T880 250 T960 210" fill="none" stroke="#0ea5e9" stroke-width="3" />
  <path d="M635 320 Q680 290 720 310 T800 260 T880 290 T960 250" fill="none" stroke="#10b981" stroke-width="2" stroke-opacity="0.6" />
  <text x="635" y="240" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#38bdf8">99.98%</text>
  <text x="635" y="256" font-family="system-ui, sans-serif" font-weight="500" font-size="11" fill="rgba(255,255,255,0.5)">Infrastructure Uptime</text>

  <rect x="615" y="370" width="375" height="180" rx="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" />
  <text x="635" y="402" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#f59e0b" letter-spacing="1">CORE CONTRIBUTIONS</text>
  <text x="635" y="435" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#f1f5f9">• NAS &amp; SharePoint Permissions: 98% ~ 100%</text>
  <text x="635" y="465" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#f1f5f9">• HR Account Automation &amp; M365 Orchestration: 99%</text>
  <text x="635" y="495" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#f1f5f9">• Asymmetric JWT Service (RSA 2048): 100%</text>
  <text x="635" y="525" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#f1f5f9">• 271 Commits / +43,900 Lines Contributed</text>
</svg>
`;

async function main() {
  const todaPath = path.join(__dirname, '../public/projects/toda/thumbnail.png');
  const rmsPath = path.join(__dirname, '../public/projects/rms/thumbnail.png');

  await sharp(Buffer.from(todaSvg)).png().toFile(todaPath);
  console.log('Generated toda thumbnail at', todaPath);

  await sharp(Buffer.from(rmsSvg)).png().toFile(rmsPath);
  console.log('Generated rms thumbnail at', rmsPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
