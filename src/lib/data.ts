// ─── PERSONAL INFO ───────────────────────────────────────────────────────────
export const PERSON = {
  name:       "Joseph Abia",
  initials:   "JA",
  title:      "Network Architect & Engineer",
  tagline:    "I design resilient networks, build full-stack web applications, and secure digital infrastructure.",
  location:   "Nigeria",
  email:      "joeotuabia@gmail.com",      // ← update
  whatsapp:   "+2349169392591",            // ← update
  available:  true,
};

// ─── SOCIAL LINKS ────────────────────────────────────────────────────────────
export const SOCIALS = {
  linkedin:  "https://linkedin.com/in/abia-joseph",   // ← update
  github:    "https://github.com/joseph231",
  instagram: "https://instagram.com/josephabia",     // ← update
  whatsapp:  `https://wa.me/${PERSON.whatsapp.replace(/\D/g, "")}`,
};

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",     href: "/"        },
  { label: "About",    href: "/about"   },
  { label: "Projects", href: "/projects"},
  { label: "Skills",   href: "/skills"  },
  { label: "Resume",   href: "/resume"  },
  { label: "Contact",  href: "/contact" },
];

// ─── STATS (shown on hero) ───────────────────────────────────────────────────
export const STATS = [
  { value: "5+",  label: "Years Experience"    },
  { value: "4+", label: "Networks Designed"   },
  { value: "6+", label: "Projects Delivered"  },
  { value: "1",   label: "IBM Cert in Progress"},
];

// ─── ROLES (shown as pills on hero) ─────────────────────────────────────────
export const ROLES = [
  { label: "Network Architect",     highlight: true  },
  { label: "Network Engineer",      highlight: false },
  { label: "IT Support Specialist", highlight: false },
  { label: "Web Developer",         highlight: false },
  { label: "Cybersecurity (IBM)",   highlight: true  },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const SKILL_GROUPS = [
  {
    icon: "🌐",
    category: "Network Architecture",
    items: [
      "Cisco Routing & Switching",
      "Network Design & Implementation",
      "CCTV & IP Surveillance",
      "SD-WAN",
      "VLAN Design & Subnetting",
      "Firewall Configuration",
      "Network Documentation",
    ],
  },
  {
    icon: "🛠️",
    category: "IT Support & Infrastructure",
    items: [
      "Windows Server",
      "Active Directory",
      "DHCP / DNS",
      "Helpdesk & ITIL",
      "Hardware Troubleshooting",
      "Virtualization (VMware)",
    ],
  },
  {
    icon: "💻",
    category: "Web Development",
    items: [
      "Next.js / React",
      "Node.js",
      "TypeScript",
      "PostgreSQL / Supabase",
      "Tailwind CSS",
      "REST APIs",
      "Python",
    ],
  },
  {
    icon: "🔐",
    category: "Cybersecurity",
    items: [
      "Vulnerability Assessment",
      "SIEM (IBM QRadar)",
      "Network Security",
      "Nmap / Wireshark",
      "Security Auditing",
      "IBM Cybersecurity Analyst (in progress)",
    ],
  },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role:    "Network Architect & Engineer",
    org:     "Employed / Contract",
    period:  "2023 — Present",
    points: [
      "Designed and deployed multi-site enterprise networks using Cisco infrastructure and Various technologies for networking.",
      "Implemented VLAN segmentation, QoS policies, and firewall rules for client organizations.",
      "Produced full network topology documentation and handover packages for each project.",
    ],
  },
  {
    role:    "IT Support Specialist",
    org:     "Contract / Remote",
    period:  "2020 — Present",
    points: [
      "Provided Tier 1–2 helpdesk support, managing Active Directory users and Windows Server environments.",
      "Resolved hardware, software, and connectivity issues with a strong first-call resolution rate.",
      "Set up and maintained LAN infrastructure, printers, and endpoint security for SME clients.",
    ],
  },
  {
    role:    "Web Developer",
    org:     "Freelance",
    period:  "2020 — Present",
    points: [
      "Built full-stack web applications using Next.js, Supabase, and TypeScript.",
      "Delivered e-commerce platforms with payment integration, admin dashboards, and authentication.",
      "Collaborated with clients on UI/UX design, turning brand identities into polished digital products.",
    ],
  },
];

// ─── EDUCATION & CERTIFICATIONS ───────────────────────────────────────────────
// ─── OFFICIAL CERTIFICATIONS (2) ─────────────────────────────────────────────
export const CERTIFICATIONS = [
  {
    name:       "IBM Cybersecurity Analyst Professional Certificate",
    by:         "University of the People",
    status:     "in-progress" as const,
    year:       "2025",
    image_url:  null,           // ← upload cert image to Supabase, paste URL here
    verify_url: "PLACEHOLDER",  // ← paste your University of the People verification link
  },
  {
    name:       "Cisco CCNA — Networking Fundamentals",
    by:         "Udemy",
    status:     "completed" as const,
    year:       "2021",
    image_url:  null,           // ← upload cert image to Supabase, paste URL here
    verify_url: "PLACEHOLDER",  // ← paste your Udemy certificate link
  },
];

// ─── LEARNING & DEVELOPMENT (2) ───────────────────────────────────────────────
export const LEARNING = [
  {
    icon:        "📺",
    name:        "CompTIA Network+ — Self Study",
    description: "Deep-dived into networking concepts, subnetting, protocols and troubleshooting through structured YouTube learning and hands-on lab practice.",
    resource:    "YouTube",
    resource_url: "PLACEHOLDER", // ← paste the YouTube channel/playlist link
    tags:        ["TCP/IP", "Subnetting", "DNS", "DHCP", "Protocols"],
  },
  {
    icon:        "💻",
    name:        "Next.js & Full-Stack Web Development",
    description: "Mastered modern full-stack development through official documentation, hands-on projects, and building production applications from scratch.",
    resource:    "Vercel Docs + Practice",
    resource_url: "PLACEHOLDER", // ← paste e.g. https://nextjs.org/docs or a YouTube link
    tags:        ["Next.js", "React", "TypeScript", "Supabase", "Tailwind"],
  },
];