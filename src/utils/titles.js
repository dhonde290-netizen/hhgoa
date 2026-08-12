export const TITLE_CATEGORIES = {
  ALL: "All Titles",
  GOAN_VIBES: "Goa Culture",
  FRONTEND_UI: "Frontend & UI",
  AI_TECH: "AI & ML",
  SYSTEMS_CYBER: "Systems & Security"
};

export const CATEGORIZED_TITLES = {
  GOAN_VIBES: [
    "Feni Fueled Hacker",
    "Goa Sunset Coder",
    "Beachside Kernel Surfer",
    "Coconut Code Crafter",
    "Susegad System Architect",
    "Arabian Sea Voyager",
    "Shack Side Shipper",
    "Calangute Code Crusader"
  ],
  FRONTEND_UI: [
    "DOM Sculptor",
    "CSS Alchemist",
    "Vite Velocity God",
    "State Management Sensei",
    "Lighthouse 100 Champion",
    "Pixel Perfectionist",
    "Canvas Maestro",
    "Flexbox Ninja"
  ],
  AI_TECH: [
    "Prompt Architect",
    "GPU Overlord",
    "Neural Net Navigator",
    "Embedding Engineer",
    "Transformer Whisperer",
    "Token Optimizer",
    "Model Fine-Tuner"
  ],
  SYSTEMS_CYBER: [
    "Terminal Wizard",
    "Async Custodian",
    "Bug Exorcist",
    "Pipeline Whisperer",
    "Zero-Day Voyager",
    "Rust Mechanic",
    "Git Rebase Master",
    "Docker Wrangler"
  ]
};

export const ALL_BUILDER_TITLES = [
  ...CATEGORIZED_TITLES.GOAN_VIBES,
  ...CATEGORIZED_TITLES.FRONTEND_UI,
  ...CATEGORIZED_TITLES.AI_TECH,
  ...CATEGORIZED_TITLES.SYSTEMS_CYBER
];

export const ROLE_PRESETS = [
  "Full Stack Developer",
  "Frontend Engineer",
  "AI / ML Engineer",
  "Ethical Hacker",
  "Backend Architect",
  "UI/UX Designer"
];

export const CITY_PRESETS = [
  "PUNE",
  "BANGALORE",
  "MUMBAI",
  "DELHI",
  "HYDERABAD",
  "GOA",
  "SAN FRANCISCO",
  "LONDON"
];

export const SKILL_TAG_OPTIONS = [
  { id: "react", label: "React / Vite" },
  { id: "python", label: "Python / AI" },
  { id: "rust", label: "Rust" },
  { id: "typescript", label: "TypeScript" },
  { id: "security", label: "Ethical Hacking" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "backend", label: "Node / Go" },
  { id: "web3", label: "Solidity / Web3" },
  { id: "devops", label: "Docker / K8s" }
];

export const BADGE_STICKERS = [
  { id: "verified", label: "HH GOA VERIFIED", color: "bg-slate-900 text-white" },
  { id: "top_builder", label: "100x BUILDER", color: "bg-amber-600 text-white" },
  { id: "feni_fueled", label: "FENI POWERED", color: "bg-emerald-800 text-white" },
  { id: "paradise", label: "PARADISE SHIPPED", color: "bg-rose-700 text-white" },
  { id: "ship_fast", label: "SHIPS FAST", color: "bg-indigo-900 text-white" }
];

export const getRandomTitle = (category = "ALL") => {
  let list = ALL_BUILDER_TITLES;
  if (category && CATEGORIZED_TITLES[category]) {
    list = CATEGORIZED_TITLES[category];
  }
  return list[Math.floor(Math.random() * list.length)];
};

export const generateBuilderId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH-GOA-2026-${num}`;
};

export const generatePasscode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let res = "";
  for (let i = 0; i < 6; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
};
