import avatarImg from "../assets/avatar.png";
import ajeepLogo from "../assets/logo.png";
import zoonLogo from "../assets/8.jpeg";
import ffOnboarding from "../assets/5.jpeg";
import ffHome from "../assets/3.jpeg";
import ffToast from "../assets/4.jpeg";
import ffTimer from "../assets/2.jpeg";
import ffAnalytics from "../assets/1.jpeg";

export const DATA = {
  name: "Mohamed Mamoun",
  role: "Senior Flutter Developer",
  tagline: "I build mobile apps that feel inevitable — this page included.",
  bio: `I architect and build beautiful, high-performance Flutter applications that users love. With deep expertise in Dart, clean architecture, and pixel-perfect UI, I turn complex requirements into seamless mobile experiences reaching over 10,000 users.`,
  longBio: `I've shipped 20+ production apps across e-learning, health-tech, and e-commerce — working with startups and enterprises alike. I'm passionate about state management patterns, custom animations, and pushing Flutter to its limits. When I'm not coding, I contribute to the Flutter ecosystem and mentor junior developers.`,
  email: "mamoun5612@gmail.com",
  location: "Cairo, Egypt",
  avatar: avatarImg,
  stats: [
    { value: "4+", label: "years of Flutter, end to end" },
    { value: "20+", label: "apps shipped to production" },
    { value: "10k+", label: "users across platforms" },
  ],
  competencies: [
    {
      title: "Flutter Engineering",
      blurb:
        "Cross-platform apps for Android, iOS, and desktop from a single codebase — pixel-perfect UI, custom animations, Material Design 3.",
      tools: ["Flutter", "Dart", "Material Design 3", "Custom animations"],
      provenIn: ["Every project below"],
    },
    {
      title: "Architecture & State",
      blurb:
        "Clean architecture with the right state tool for the job — Bloc where testability matters, GetX for lean apps, offline-first storage where the network can't be trusted.",
      tools: ["Bloc / Cubit", "Riverpod", "GetX", "Offline-first"],
      provenIn: ["Ajeep", "Focus Flow", "Zoon"],
    },
    {
      title: "Backend & Integrations",
      blurb:
        "Wiring apps to the real world: auth, data sync, payments, and AI — chosen per project, not by habit.",
      tools: ["Firebase", "Supabase", "REST", "GraphQL", "Stripe", "Gemini AI"],
      provenIn: ["Ajeep", "Focus Flow", "Zoon", "FuelPay"],
    },
    {
      title: "Delivery & Tooling",
      blurb:
        "From Figma to a store listing: automated builds, releases, and the discipline that keeps 20+ apps maintainable.",
      tools: ["CI/CD", "Fastlane", "Docker", "Git", "Figma"],
      provenIn: ["Ajeep — live on Google Play"],
    },
  ],
  projects: [
    {
      id: "focusflow",
      title: "Focus Flow",
      subtitle: "AI Productivity Coach",
      flagship: true,
      desc: "An AI coach that makes big tasks feel doable by splitting them into 15-minute steps matched to your energy.",
      problem:
        "Big tasks stall people. To-do lists record the paralysis; they don't fix it. Focus Flow bets that any task feels doable once it's broken into 15-minute steps that match your current energy.",
      approach:
        "Gemini 2.5 Flash generates the step breakdown in real time. I made the store offline-first — tasks, streaks, and focus history live in a local database and never depend on a connection — because a productivity app that blanks without signal teaches you not to trust it. The UI is pure Material Design 3.",
      outcome:
        "A complete product built end-to-end solo: onboarding, AI task breakdown, energy-based scheduling, deep-work timer, and analytics.",
      color: "#7c6ff0",
      stack: ["Flutter", "Dart", "Gemini AI", "Firebase"],
      screens: [
        { img: ffOnboarding, alt: "Focus Flow onboarding screen" },
        { img: ffHome, alt: "Focus Flow home screen with energy level" },
        { img: ffToast, alt: "Focus Flow AI task breakdown confirmation" },
        { img: ffTimer, alt: "Focus Flow deep work timer" },
        { img: ffAnalytics, alt: "Focus Flow analytics screen" },
      ],
    },
    {
      id: "ajeep",
      title: "Ajeep Education",
      subtitle: "E-Learning Platform",
      desc: "Cross-platform e-learning for every school level: live video lessons, paid enrollment, and biometric sign-in.",
      problem:
        "Ajeep Education needed one product to deliver structured lessons to students at every school level — live classes, paid enrollment, secure access — on Android, iOS, and desktop.",
      approach:
        "A single Flutter codebase with Bloc for predictable, testable state across dozens of screens. Live video lessons, integrated payments, and biometric sign-in, backed by Firebase and a REST API.",
      outcome:
        "Live on Google Play as the company's flagship product, serving students across all school levels from one codebase.",
      color: "#6366f1",
      stack: ["Flutter", "Bloc", "Firebase", "REST API"],
      logo: ajeepLogo,
      demo: "https://play.google.com/store/apps/details?id=com.avocode.aajeeb&hl=en-US",
    },
    {
      id: "zoon",
      title: "Zoon",
      subtitle: "E-Commerce",
      desc: "A shopping app where browsing feels effortless and checkout takes one tap.",
      problem:
        "Zoon needed a storefront where browsing feels effortless and paying never becomes a form-filling chore.",
      approach:
        "Flutter with GetX for lightweight reactive state, a personalised product feed, Stripe-powered one-tap checkout, push notifications, and live order tracking.",
      outcome:
        "A complete e-commerce experience, from personalised feed to fulfilment tracking.",
      color: "#f59e0b",
      stack: ["Flutter", "GetX", "Stripe"],
      logo: zoonLogo,
    },
    {
      id: "fuelpay",
      title: "FuelPay",
      subtitle: "Fuel & Payments",
      desc: "One app connecting drivers and fuel stations — find fuel on a live map, pay by QR.",
      problem:
        "Drivers burn time finding stations and queuing to pay; stations run on paper. FuelPay puts both sides in one app.",
      approach:
        "A Flutter + Bloc client on a Node.js backend: live Mapbox station maps, QR-based payments, station management tools, and AI voice analysis.",
      outcome:
        "A two-sided product covering the full trip: locate fuel, pay by QR, and manage the station behind the counter.",
      color: "#06b6d4",
      stack: ["Flutter", "Bloc", "Mapbox", "Node.js"],
      monogram: "FP",
    },
  ],
  timeline: [
    {
      year: "2025 – 2026",
      role: "Senior Flutter Developer",
      company: "Ajeep Education",
      desc: "Built cross-platform e-learning applications for Android, iOS, and desktop",
    },
    {
      year: "2022 – 2025",
      role: "Software Developer",
      company: "The Future University",
      desc: "Built e-learning and management applications",
    },
    {
      year: "2022",
      role: "Flutter Developer Intern",
      company: "Code Sudan",
      desc: "Built a community healthcare application",
    },
    {
      year: "2022",
      role: "CS Graduate",
      company: "The Future University",
      desc: "B.S. Computer Science, focus on software engineering.",
    },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/Mohamed-Mamoun" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mohamed-mamoun-5472b01aa",
    },
  ],
};

export const SECTIONS = [
  { key: "hero", label: "Home" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
];
