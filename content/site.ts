/**
 * Typed profile data — the single source of truth for everything that
 * isn't long-form MDX. Ported from the previous `src/data/portfolio.js`.
 *
 * Integrity rule (CLAUDE.md): every claim here must be verifiable.
 * Anything marked `verify: false` is carried over from the old site and
 * has not yet been sourced — it renders without emphasis until it is.
 */

export const site = {
  name: "Mohamed Mamoun",
  shortName: "MM",
  role: "Senior Mobile Engineer",
  discipline: "Flutter",
  /** The anchor line. Best sentence from the previous site — kept. */
  tagline: "I build mobile apps that feel inevitable.",
  positioning:
    "Senior mobile engineer. I architect Flutter products end to end — and write down how.",
  intro:
    "Four years turning ambiguous product requirements into shipped cross-platform apps. I care about the decisions behind the code: which state model actually fits, what breaks when the network doesn't, and why the boring option is usually right.",
  email: "mamoun5612@gmail.com",
  location: "Cairo, Egypt",
  timezone: "GMT+2",
  availability: "Available for work",
  url: "https://mohamedmamoun.dev",
  avatar: "/images/profile/avatar.webp",
  resume: "/mohamed-mamoun-resume.pdf",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Mohamed-Mamoun", handle: "@Mohamed-Mamoun" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-mamoun-5472b01aa",
    handle: "mohamed-mamoun",
  },
  { label: "Email", href: `mailto:${site.email}`, handle: site.email },
] as const;

/**
 * Proof bar. `href` promotes a claim from asserted to verifiable —
 * the audit's point about "one sourced number beats three round ones".
 */
export type Stat = {
  value: string;
  label: string;
  /** Present when the claim can be checked by clicking. */
  href?: string;
  verify: boolean;
};

export const stats: readonly Stat[] = [
  { value: "4+", label: "years shipping Flutter", verify: false },
  { value: "20+", label: "apps in production", verify: false },
  { value: "10k+", label: "users reached", verify: false },
  {
    value: "Live",
    label: "on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.avocode.aajeeb&hl=en-US",
    verify: true,
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  featured?: boolean;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: readonly string[];
  /** Hue only — lightness and chroma are derived so every accent lands
   *  at equal perceived weight and passes AA in both themes. */
  hue: number;
  screens?: readonly { src: string; alt: string }[];
  logo?: string;
  links?: readonly { label: string; href: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "ajeep-education",
    title: "Ajeep Education",
    category: "E-Learning Platform",
    year: "2025",
    featured: true,
    summary:
      "Cross-platform e-learning for every school level: live video lessons, paid enrollment, and biometric sign-in.",
    problem:
      "Ajeep Education needed one product to deliver structured lessons to students at every school level — live classes, paid enrollment, secure access — on Android, iOS, and desktop.",
    approach:
      "A single Flutter codebase with Bloc for predictable, testable state across dozens of screens. Live video lessons, integrated payments, and biometric sign-in, backed by Firebase and a REST API.",
    outcome:
      "Live on Google Play as the company's flagship product, serving students across all school levels from one codebase.",
    stack: ["Flutter", "Bloc", "Firebase", "REST API"],
    /* Teal, taken from the app's own brand mark. */
    hue: 174,
    logo: "/images/projects/ajeep-logo.png",
    /* Ordered as a product story: what it is → what you buy → the core
       value → how it's sold → the brand. screens[0] is what the
       homepage lead card shows, so it leads with the home screen
       rather than a splash. */
    screens: [
      {
        src: "/images/projects/ajeep-home.webp",
        alt: "Ajeep Education home screen: promotional banner carousel, search, and course sections for secondary and applied education",
      },
      {
        src: "/images/projects/ajeep-course.webp",
        alt: "Course detail screen for an electrical circuits course, showing a video preview, chapter count, effort, start date, level, and purchase state",
      },
      {
        src: "/images/projects/ajeep-lesson.webp",
        alt: "Video lesson player showing an annotated lecture slide, playback controls, view count, and tabs for notes, discussions, and multiple-choice questions",
      },
      {
        src: "/images/projects/ajeep-offers.webp",
        alt: "Special offers screen with referral coupons and discounted course bundles priced in Kuwaiti dinar",
      },
      {
        src: "/images/projects/ajeep-coupons.webp",
        alt: "Discount coupon screen showing a 50% promotional code with a copy-and-apply action, plus additional bundle offers",
      },
      {
        src: "/images/projects/ajeep-splash.webp",
        alt: "Ajeep Education splash screen with the app's logo",
      },
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.avocode.aajeeb&hl=en-US",
      },
    ],
  },
  {
    slug: "focus-flow",
    title: "Focus Flow",
    category: "AI Productivity Coach",
    year: "2026",
    featured: true,
    summary:
      "An AI coach that makes big tasks feel doable by splitting them into 15-minute steps matched to your energy.",
    problem:
      "Big tasks stall people. To-do lists record the paralysis; they don't fix it. Focus Flow bets that any task feels doable once it's broken into 15-minute steps that match your current energy.",
    approach:
      "Gemini 2.5 Flash generates the step breakdown in real time. I made the store offline-first — tasks, streaks, and focus history live in a local database and never depend on a connection — because a productivity app that blanks without signal teaches you not to trust it.",
    outcome:
      "A complete product built end to end, solo: onboarding, AI task breakdown, energy-based scheduling, deep-work timer, and analytics.",
    stack: ["Flutter", "Dart", "Gemini AI", "Firebase", "Material 3"],
    hue: 258,
    screens: [
      { src: "/images/projects/focusflow-5.webp", alt: "Focus Flow onboarding screen" },
      { src: "/images/projects/focusflow-3.webp", alt: "Focus Flow home screen with energy level" },
      { src: "/images/projects/focusflow-4.webp", alt: "Focus Flow AI task breakdown confirmation" },
      { src: "/images/projects/focusflow-2.webp", alt: "Focus Flow deep work timer" },
      { src: "/images/projects/focusflow-1.webp", alt: "Focus Flow analytics screen" },
    ],
  },
  {
    slug: "zoon",
    title: "Zoon",
    category: "E-Commerce",
    year: "2024",
    summary: "A shopping app where browsing feels effortless and checkout takes one tap.",
    problem:
      "Zoon needed a storefront where browsing feels effortless and paying never becomes a form-filling chore.",
    approach:
      "Flutter with GetX for lightweight reactive state, a personalised product feed, Stripe-powered one-tap checkout, push notifications, and live order tracking.",
    outcome: "A complete e-commerce experience, from personalised feed to fulfilment tracking.",
    stack: ["Flutter", "GetX", "Stripe"],
    hue: 38,
    logo: "/images/projects/zoon-logo.webp",
  },
  {
    slug: "fuelpay",
    title: "FuelPay",
    category: "Fuel & Payments",
    year: "2024",
    summary: "One app connecting drivers and fuel stations — find fuel on a live map, pay by QR.",
    problem:
      "Drivers burn time finding stations and queuing to pay; stations run on paper. FuelPay puts both sides in one app.",
    approach:
      "A Flutter + Bloc client on a Node.js backend: live Mapbox station maps, QR-based payments, station management tools, and AI voice analysis.",
    outcome:
      "A two-sided product covering the full trip: locate fuel, pay by QR, and manage the station behind the counter.",
    stack: ["Flutter", "Bloc", "Mapbox", "Node.js"],
    hue: 190,
  },
];

/**
 * Competencies. `provenIn` carries the previous site's best structural
 * idea — claims that cite the work proving them — upgraded from a
 * string to a project slug so it can render as a link.
 */
export const competencies = [
  {
    title: "Flutter Engineering",
    blurb:
      "Cross-platform apps for Android, iOS, and desktop from a single codebase — pixel-perfect UI, custom animations, Material Design 3.",
    tools: ["Flutter", "Dart", "Material 3", "Custom animations"],
    provenIn: ["focus-flow", "ajeep-education", "zoon", "fuelpay"],
  },
  {
    title: "Architecture & State",
    blurb:
      "Clean architecture with the right state tool for the job — Bloc where testability matters, GetX for lean apps, offline-first storage where the network can't be trusted.",
    tools: ["Bloc / Cubit", "Riverpod", "GetX", "Offline-first"],
    provenIn: ["ajeep-education", "focus-flow", "zoon"],
  },
  {
    title: "Backend & Integrations",
    blurb:
      "Wiring apps to the real world: auth, data sync, payments, and AI — chosen per project, not by habit.",
    tools: ["Firebase", "Supabase", "REST", "GraphQL", "Stripe", "Gemini AI"],
    provenIn: ["ajeep-education", "focus-flow", "zoon", "fuelpay"],
  },
  {
    title: "Delivery & Tooling",
    blurb:
      "From Figma to a store listing: automated builds, releases, and the discipline that keeps 20+ apps maintainable.",
    tools: ["CI/CD", "Fastlane", "Docker", "Git", "Figma"],
    provenIn: ["ajeep-education"],
  },
] as const;

export type Role = {
  period: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
};

export const experience: readonly Role[] = [
  {
    period: "2025 — Present",
    role: "Senior Flutter Developer",
    company: "Ajeep Education",
    description:
      "Cross-platform e-learning applications for Android, iOS, and desktop from a single Flutter codebase.",
    current: true,
  },
  {
    period: "2022 — 2025",
    role: "Software Developer",
    company: "The Future University",
    description: "E-learning and management applications.",
  },
  {
    period: "2022",
    role: "Flutter Developer Intern",
    company: "Code Sudan",
    description: "Community healthcare application.",
  },
  {
    period: "2022",
    role: "B.S. Computer Science",
    company: "The Future University",
    description: "Focus on software engineering.",
  },
];

/**
 * /now — inspired by Derek Sivers. Update the `updated` date whenever
 * you change this; a stale /now page is worse than none.
 *
 * Only `Building` and `Writing` are derived from real work below.
 * Add or remove rows freely — the page renders whatever is here.
 */
export const now = {
  updated: "2026-07-21",
  items: [
    { label: "Building", value: "Focus Flow — offline-first AI task coach" },
    { label: "Writing", value: "A series on Flutter state management, decided per project" },
  ],
} as const;

/**
 * /uses — hardware, software, setup.
 *
 * Software below is derived from the stack in `competencies`. HARDWARE
 * IS INTENTIONALLY EMPTY: I don't know what you actually use, and
 * inventing a desk setup would be a fabrication (CLAUDE.md § integrity).
 * Fill it in and the section appears; leave it and the page skips it.
 */
export type UsesGroup = {
  heading: string;
  items: readonly { name: string; note: string; href?: string }[];
};

export const uses: readonly UsesGroup[] = [
  {
    heading: "Hardware",
    items: [],
  },
  {
    heading: "Development",
    items: [
      { name: "Flutter & Dart", note: "Every mobile product on this site runs on it." },
      { name: "Android Studio", note: "Primary Flutter IDE — the tooling and profiler earn it." },
      { name: "VS Code", note: "Everything that isn't Flutter." },
      { name: "Git", note: "Small commits, meaningful messages, rebase before review." },
    ],
  },
  {
    heading: "Services & infrastructure",
    items: [
      { name: "Firebase", note: "Auth, Firestore, and messaging on most shipped apps." },
      { name: "Supabase", note: "When Postgres and row-level security fit better." },
      { name: "Docker", note: "Reproducible backends locally." },
      { name: "Fastlane", note: "Store releases that don't depend on remembering the steps." },
    ],
  },
  {
    heading: "Design",
    items: [
      { name: "Figma", note: "Handoff, and my own UI work before it becomes widgets." },
    ],
  },
];

/**
 * Testimonials render only when this array has real, attributable
 * entries. Never populate with plausible-sounding placeholders —
 * see CLAUDE.md § Content integrity.
 */
export const testimonials: readonly {
  quote: string;
  author: string;
  title: string;
  href?: string;
}[] = [];
