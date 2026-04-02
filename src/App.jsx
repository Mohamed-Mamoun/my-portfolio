import { useState, useEffect, useRef, useCallback } from "react";
import ajeepImg from "./assets/logo.png";
import focusFlowImg from "./assets/1.jpeg";
import zoonImg from "./assets/8.jpeg";
// import zoonImg from "./assets/zoon.png";
// import wanderlustImg from "./assets/wanderlust.png";

// ─── DESIGN TOKENS ────────────────────────────────────────────
const T = {
  bg: "#050508",
  bgSurface: "#0c0c14",
  bgCard: "#111119",
  bgCardHover: "#18182a",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(232,197,71,0.25)",
  gold: "#e8c547",
  goldMuted: "rgba(232,197,71,0.15)",
  goldGlow: "rgba(232,197,71,0.08)",
  accent2: "#5eead4",
  accent3: "#f472b6",
  textPrimary: "#f0ece2",
  textSecondary: "#8892a0",
  textTertiary: "#4a5060",
  radius: "16px",
  radiusSm: "10px",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400&display=swap');`;

// ─── PORTFOLIO DATA ───────────────────────────────────────────
const DATA = {
  name: "Mohamed Mamoun",
  role: "Senior Flutter Developer",
  taglines: [
    "Crafting premium mobile experiences",
    "Pixel-perfect. Performance-first.",
    "4+ years of Flutter excellence",
  ],
  bio: `I architect and build beautiful, high-performance Flutter applications that users love. With deep expertise in Dart, clean architecture, and pixel-perfect UI, I turn complex requirements into seamless mobile experiences used by millions.`,
  longBio: `Previously, I've shipped 20+ production apps across e-learning, health-tech, and e-commerce — working with startups and enterprises alike. I'm passionate about state management patterns, custom animations, and pushing Flutter to its limits. When I'm not coding, I contribute to the Flutter ecosystem and mentor junior developers.`,
  email: "mamoun5612@gmail.com",
  location: "Cairo, egypt",
  avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFUrggwOrVBYA/profile-displayphoto-scale_400_400/B4DZtrhkGZI8Ag-/0/1767035522771?e=1776902400&v=beta&t=Ecf5tjzhj1gSJWXLkK1MqmD9R5lE8sd2OmMfauLoJoM",
  stats: [
    { value: "20+", label: "Apps Shipped" },
    { value: "4+", label: "Years Exp." },
    { value: "20+", label: "Happy Clients" },
    { value: "10k+", label: "Users Reached" },
  ],
  skills: [
    { name: "Flutter & Dart", pct: 96, color: "#02569B" },
    { name: "UI/UX Design", pct: 90, color: "#f472b6" },
    { name: "Firebase & Supabase", pct: 88, color: "#FFCA28" },
    { name: "State Management", pct: 94, color: "#e8c547" },
    { name: "REST & GraphQL", pct: 87, color: "#5eead4" },
    { name: "CI/CD & DevOps", pct: 82, color: "#a78bfa" },
  ],
  techStack: [
    "Dart", "Flutter", "Bloc/Cubit", "Riverpod", "GetX", "Firebase",
    "Supabase", "GraphQL", "REST APIs", "Figma", "Git", "Docker",
    "Fastlane",
  ],
  projects: [
    {
      id: "finflow",
      title: "Ajeep education",
      subtitle: "e-learning interactive-app",
      desc: "Ajeeb educational application is an integrated educational application for all levels and business Our team consists of the most talented professors and expertsAjeeb application provides distinct and meaningful educational content",
      img: ajeepImg,
      stack: ["Flutter", "Bloc", "Firebase", "Restful API"],
      color: "#6366f1",
      features: ["Live videos", "AI inegrated", "Payment Integration", "Biometric auth"],
      demo: "https://play.google.com/store/apps/details?id=com.avocode.aajeeb&hl=en-US",
      github: "https://github.com/yourusername/ajeep-education",
    },
    {
      id: "mediwell",
      title: "Focus Flow",
      subtitle: "Life Style",
      desc: "AI-powered productivity app built with Flutter and Google Gemini 2.5 Flash that intelligently breaks down any task into 8 actionable 15-minute steps. Features real-time AI integration, database persistence, and a polished Material Design 3 interface",
      img: focusFlowImg,
      stack: ["Flutter", "Dart", "Gemini AI", "Firebase"],
      color: "#10b981",
      features: ["AI task breakdown", "15-minute focus sessions", "Offline-first storage", "Visual progress tracking"],
      demo: "https://play.google.com/store/apps/details?id=your.app.id",
      github: "https://github.com/yourusername/ajeep-education",
    },
    {
      id: "shopcraft",
      title: "Zoon e-commerce app",
      subtitle: "E-Commerce Platform",
      desc: "Feature-rich shopping app with AR product previews, gesture navigation, and a one-tap checkout flow that boosted conversion 40%.",
      img: zoonImg,
      stack: ["Flutter", "GetX", "Stripe", "ARCore"],
      color: "#f472b6",
      features: ["Push notifications", "One-tap checkout", "Personalised feed", "Live order tracking"],
      demo: "https://play.google.com/store/apps/details?id=your.app.id",
      github: "https://github.com/yourusername/ajeep-education",
    },
    {
      id: "wanderlust",
      title: "FuelPay",
      subtitle: "Travel Companion",
      desc: "Immersive fuel app with online interactive maps, AI voice analysis",
      img: "https://cdn-icons-png.flaticon.com/512/8809/8809304.png",
      stack: ["Flutter", "Bloc", "Mapbox", "Node.js"],
      color: "#06b6d4",
      features: ["online maps", "AI itineraries", "Managment", "qr generator"],
      demo: "https://play.google.com/store/apps/details?id=your.app.id",
      github: "https://github.com/yourusername/ajeep-education",
    },
  ],
  timeline: [
    { year: "2025 - 2026", role: "Senior Flutter Developer", company: "Ajeep Education.", desc: "built a cross platform applications (android, ios and desktop) for e-learning" },
    { year: "2022 - 2025", role: "Software Developer", company: "The Future university", desc: "built elearning applications & managment applications" },
    { year: "2022", role: "Flutter Developer intern", company: "Code Sudan", desc: "Built community health care application" },
    { year: "2022", role: "CS Graduate", company: "Stanford University", desc: "B.S. Computer Science, focus on software engineering." },
  ],
  socials: [
    { label: "GitHub", icon: "GH",  url: "https://github.com/Mohamed-Mamoun"  },
    { label: "LinkedIn", icon: "LI",  url: "www.linkedin.com/in/mohamed-mamoun-5472b01aa"  },
  ],
};

// ─── SCROLL ANIMATION HOOK ────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────
function AnimCounter({ value, visible }) {
  const [count, setCount] = useState(0);
  const num = parseInt(value);
  const suffix = value.replace(/[\d]/g, "");
  useEffect(() => {
    if (!visible || isNaN(num)) return;
    let start = 0;
    const step = Math.max(1, Math.floor(num / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, num]);
  if (isNaN(num)) return value;
  return count + suffix;
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const sectionRefs = useRef({});

  const sections = [
    { key: "hero", label: "Home" },
    { key: "about", label: "About" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        });
      },
      { threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((key) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = async () => {
    setFormError("");

    // Validate fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormState("sending");
    try {
      // ─────────────────────────────────────────────────────────
      // IMPORTANT: Replace YOUR_FORM_ID with your Formspree ID.
      // 1. Go to https://formspree.io and create a free account.
      // 2. Create a new form — you'll get an ID like "xpznqabc".
      // 3. Replace "YOUR_FORM_ID" below with that ID.
      // ─────────────────────────────────────────────────────────
      const res = await fetch("https://formspree.io/f/mlgowzqe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormError("Something went wrong. Please try again.");
        setFormState("idle");
      }
    } catch (err) {
      setFormError("Network error. Please check your connection.");
      setFormState("idle");
    }
  };

  return (
    <div style={{ background: T.bg, color: T.textPrimary, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <style>{FONTS}{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Instrument Serif', serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes barFill { from { width: 0; } }
        @keyframes typing { from { width: 0; } to { width: 100%; } }
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes orbFloat1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -40px); } }
        @keyframes orbFloat2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-25px, 30px); } }
        @keyframes orbFloat3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, 20px); } }

        .anim-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .anim-in { animation: fadeIn 0.6s ease both; }
        .anim-right { animation: slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .anim-scale { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }
        .delay-7 { animation-delay: 0.7s; }
        .delay-8 { animation-delay: 0.8s; }

        .glass {
          background: rgba(17,17,25,0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${T.border};
          border-radius: ${T.radius};
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass:hover {
          border-color: ${T.borderHover};
          background: rgba(24,24,42,0.7);
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(232,197,71,0.06);
        }
        .gold-gradient {
          background: linear-gradient(135deg, ${T.gold}, #f0d68a, ${T.gold});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-line {
          height: 2px;
          background: linear-gradient(90deg, ${T.gold}, transparent);
        }
        .nav-link {
          position: relative;
          color: ${T.textSecondary};
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.3s;
          background: none;
          border: none;
          font-family: inherit;
        }
        .nav-link:hover, .nav-link.active { color: ${T.gold}; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          background: ${T.gold};
          border-radius: 1px;
        }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${T.gold};
          margin-bottom: 20px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: ${T.gold};
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: ${T.gold};
          color: ${T.bg};
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232,197,71,0.3); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: transparent;
          color: ${T.gold};
          border: 1.5px solid ${T.gold};
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-outline:hover { background: ${T.goldMuted}; transform: translateY(-2px); }
        input, textarea {
          width: 100%;
          padding: 14px 18px;
          background: ${T.bgSurface};
          border: 1px solid ${T.border};
          border-radius: ${T.radiusSm};
          color: ${T.textPrimary};
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        input:focus, textarea:focus {
          border-color: rgba(232,197,71,0.4);
          box-shadow: 0 0 0 3px rgba(232,197,71,0.06);
        }
        textarea { resize: vertical; min-height: 120px; }
        ::placeholder { color: ${T.textTertiary}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,197,71,0.2); border-radius: 3px; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-full { width: 100% !important; flex-direction: column !important; }
        }
      `}</style>

      {/* ═══ BACKGROUND ORBS ═══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,197,71,0.06) 0%, transparent 70%)`, animation: "orbFloat1 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)`, animation: "orbFloat2 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(244,114,182,0.03) 0%, transparent 70%)`, animation: "orbFloat3 10s ease-in-out infinite" }} />
      </div>

      {/* ═══ DOT GRID ═══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.25, backgroundImage: `radial-gradient(circle, ${T.textTertiary} 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />

      {/* ═══ NAV BAR ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 max(24px, 4vw)", transition: "all 0.4s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, borderBottom: `1px solid ${scrollY > 50 ? T.border : "transparent"}`, transition: "border-color 0.4s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <span style={{ fontSize: 22, fontWeight: 600, color: T.gold }} className="mono">{"</>"}</span>
          </div>
          <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
            {sections.map((s) => (
              <button key={s.key} className={`nav-link ${activeSection === s.key ? "active" : ""}`} onClick={() => scrollTo(s.key)}>
                {s.label}
              </button>
            ))}
          </div>
          <button className="btn-primary hide-mobile" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
          {/* Mobile hamburger */}
          <button className="btn-primary hide-mobile" style={{ display: "none" }} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: T.textPrimary, fontSize: 24, cursor: "pointer" }}
            className="show-mobile"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(5,5,8,0.95)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }} className="anim-in">
          {sections.map((s) => (
            <button key={s.key} style={{ background: "none", border: "none", color: activeSection === s.key ? T.gold : T.textSecondary, fontSize: 20, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }} onClick={() => scrollTo(s.key)}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══ HERO SECTION ═══ */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section
          ref={(el) => (sectionRefs.current.hero = el)}
          data-section="hero"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px max(24px, 4vw) 80px" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
            {/* Text */}
            <div style={{ flex: "1 1 500px" }}>
              <div className="anim-up" style={{ marginBottom: 28 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 100, background: T.goldMuted, border: `1px solid rgba(232,197,71,0.2)` }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
                  <span className="mono" style={{ fontSize: 12, color: T.gold, letterSpacing: 1 }}>Available for work</span>
                </div>
              </div>

              <h1 className="anim-up delay-1" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, fontWeight: 300, letterSpacing: -2, marginBottom: 8 }}>
                <span style={{ display: "block", color: T.textSecondary, fontSize: "clamp(16px, 2vw, 20px)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 400, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  Hello, I'm
                </span>
                <span className="serif" style={{ fontWeight: 400 }}>
                  <span className="gold-gradient">{DATA.name}</span>
                </span>
              </h1>

              <div className="anim-up delay-2" style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 300, color: T.textSecondary, marginBottom: 8, lineHeight: 1.3 }}>
                <span className="serif" style={{ fontStyle: "italic", color: T.textPrimary }}>{DATA.role}</span>
              </div>

              <div className="anim-up delay-3" style={{ height: 28, marginBottom: 24, overflow: "hidden" }}>
                <TypeWriter texts={DATA.taglines} />
              </div>

              <p className="anim-up delay-4" style={{ fontSize: 16, lineHeight: 1.7, color: T.textSecondary, maxWidth: 500, marginBottom: 36 }}>
                {DATA.bio}
              </p>

              <div className="anim-up delay-5" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}>
                  View Projects <span style={{ fontSize: 16 }}>→</span>
                </button>
                <button className="btn-outline" onClick={() => scrollTo("contact")}>
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Avatar with glow ring */}
            <div className="anim-scale delay-4 hide-mobile" style={{ flex: "0 0 auto" }}>
              <div style={{ position: "relative", width: 320, height: 320, animation: "float 6s ease-in-out infinite" }}>
                {/* Glow */}
                <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,197,71,0.15) 0%, transparent 70%)` }} />
                {/* Ring */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from 0deg, ${T.gold}, transparent, ${T.accent2}, transparent, ${T.gold})`, animation: "gradientShift 8s linear infinite", padding: 3 }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: T.bg, padding: 6 }}>
                    <img
                      src={DATA.avatar}
                      alt={DATA.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="anim-in delay-8" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 3s ease-in-out infinite" }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.textTertiary }}>Scroll</span>
            <div style={{ width: 1.5, height: 32, background: `linear-gradient(to bottom, ${T.gold}, transparent)` }} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══ ABOUT SECTION ═══ */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AboutSection sectionRef={(el) => (sectionRefs.current.about = el)} />

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══ SKILLS SECTION ═══ */}
        {/* ═══════════════════════════════════════════════════════ */}
        <SkillsSection sectionRef={(el) => (sectionRefs.current.skills = el)} />

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══ PROJECTS SECTION ═══ */}
        {/* ═══════════════════════════════════════════════════════ */}
        <ProjectsSection
          sectionRef={(el) => (sectionRefs.current.projects = el)}
          onSelect={setSelectedProject}
        />

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══ CONTACT SECTION ═══ */}
        {/* ═══════════════════════════════════════════════════════ */}
        <ContactSection
          sectionRef={(el) => (sectionRefs.current.contact = el)}
          formState={formState}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          formError={formError}
        />
      </div>

      {/* ═══ PROJECT MODAL ═══ */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

// ─── TYPEWRITER COMPONENT ─────────────────────────────────────
function TypeWriter({ texts }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const speed = deleting ? 30 : 55;

    if (!deleting && text === current) {
      setTimeout(() => setDeleting(true), 2200);
      return;
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index, texts]);

  return (
    <span className="mono" style={{ fontSize: 15, color: T.gold, borderRight: `2px solid ${T.gold}`, paddingRight: 4, animation: "blink 1s step-end infinite" }}>
      {text}
    </span>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────
function AboutSection({ sectionRef }) {
  const [ref, vis] = useInView();
  return (
    <section ref={(el) => { sectionRef(el); ref.current = el; }} data-section="about" style={{ padding: "120px max(24px, 4vw)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {vis && (
          <>
            <div className="anim-up">
              <div className="section-label">About Me</div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 48 }}>
                Turning vision into<br /><span className="gold-gradient">exceptional reality</span>
              </h2>
            </div>

            <div style={{ display: "flex", gap: 60, flexWrap: "wrap", marginBottom: 64 }}>
              <div className="anim-up delay-2" style={{ flex: "1 1 400px" }}>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: T.textSecondary, marginBottom: 20 }}>{DATA.bio}</p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: T.textSecondary }}>{DATA.longBio}</p>
              </div>
              <div className="anim-up delay-3" style={{ flex: "0 1 320px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {DATA.stats.map((s, i) => (
                  <div key={i} className="glass" style={{ padding: 24, textAlign: "center" }}>
                    <div className="gold-gradient serif" style={{ fontSize: 36, fontWeight: 400, marginBottom: 4 }}>
                      <AnimCounter value={s.value} visible={vis} />
                    </div>
                    <div style={{ fontSize: 12, color: T.textSecondary, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="anim-up delay-4">
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32 }}>My Journey</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {DATA.timeline.map((t, i) => (
                  <div key={i} className={`anim-right delay-${i + 3}`} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Rail */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 20 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === 0 ? T.gold : "transparent", border: `2px solid ${i === 0 ? T.gold : T.textTertiary}`, flexShrink: 0, marginTop: 6 }} />
                      {i < DATA.timeline.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 40, background: `linear-gradient(to bottom, ${T.textTertiary}, transparent)` }} />}
                    </div>
                    <div className="glass" style={{ flex: 1, padding: 20, marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                        <span className="mono" style={{ fontSize: 12, color: T.gold, background: T.goldMuted, padding: "3px 10px", borderRadius: 6 }}>{t.year}</span>
                        <span style={{ fontSize: 12, color: T.textTertiary }}>{t.company}</span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{t.role}</div>
                      <div style={{ fontSize: 14, color: T.textSecondary }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────
function SkillsSection({ sectionRef }) {
  const [ref, vis] = useInView();
  return (
    <section ref={(el) => { sectionRef(el); ref.current = el; }} data-section="skills" style={{ padding: "120px max(24px, 4vw)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {vis && (
          <>
            <div className="anim-up">
              <div className="section-label">Skills</div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 48 }}>
                Expertise that<br /><span className="gold-gradient">delivers results</span>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
              {DATA.skills.map((s, i) => (
                <div key={i} className={`anim-right delay-${i + 1}`} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ minWidth: 160, fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${s.pct}%`,
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                      borderRadius: 100,
                      animation: "barFill 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
                      animationDelay: `${i * 0.12}s`,
                    }} />
                  </div>
                  <span className="mono" style={{ fontSize: 13, color: T.textTertiary, minWidth: 36, textAlign: "right" }}>{s.pct}%</span>
                </div>
              ))}
            </div>

            {/* Tech stack cloud */}
            <div className="anim-up delay-6">
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 20 }}>Tech Stack</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {DATA.techStack.map((t, i) => (
                  <span key={i} className={`anim-scale delay-${Math.min(i % 8, 7) + 1}`} style={{
                    padding: "8px 18px",
                    borderRadius: T.radiusSm,
                    background: T.bgCard,
                    border: `1px solid ${T.border}`,
                    fontSize: 13,
                    color: T.textSecondary,
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.target.style.borderColor = T.borderHover; e.target.style.color = T.gold; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = T.border; e.target.style.color = T.textSecondary; }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────
function ProjectsSection({ sectionRef, onSelect }) {
  const [ref, vis] = useInView();
  return (
    <section ref={(el) => { sectionRef(el); ref.current = el; }} data-section="projects" style={{ padding: "120px max(24px, 4vw)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {vis && (
          <>
            <div className="anim-up">
              <div className="section-label">Projects</div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 48 }}>
                Featured<br /><span className="gold-gradient">work</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
              {DATA.projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onSelect={onSelect} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`anim-up delay-${index + 1}`}
      style={{
        borderRadius: T.radius,
        overflow: "hidden",
        background: T.bgCard,
        border: `1px solid ${hovered ? `${p.color}44` : T.border}`,
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 16px 48px ${p.color}18` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(p)}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bgCard}, transparent 60%)` }} />
        {hovered && (
          <div className="anim-scale" style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>→</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: p.color, marginBottom: 8 }}>{p.subtitle}</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }} className="serif">{p.title}</div>
        <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.stack.map((t) => (
            <span key={t} style={{ padding: "4px 12px", borderRadius: 6, background: `${p.color}15`, border: `1px solid ${p.color}25`, fontSize: 11, color: p.color, letterSpacing: 0.5 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────
function ProjectModal({ project: p, onClose }) {
  return (
    <div
      className="anim-in"
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,5,8,0.92)", backdropFilter: "blur(24px)", overflowY: "auto", padding: "40px max(20px, 4vw)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="anim-up" style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "sticky", top: 0, float: "right", width: 44, height: 44, borderRadius: "50%", background: T.bgCard, border: `1px solid ${T.border}`, color: T.textPrimary, fontSize: 18, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {/* Hero image */}
        <div style={{ borderRadius: T.radius, overflow: "hidden", marginBottom: 32, height: 320 }}>
          <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.parentElement.style.background = T.bgCard; e.target.style.display = "none"; }} />
        </div>

        <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: `${p.color}20`, border: `1px solid ${p.color}30`, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: p.color, marginBottom: 16 }}>{p.subtitle}</div>

        <h2 className="serif" style={{ fontSize: 42, fontWeight: 400, marginBottom: 16 }}>{p.title}</h2>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {p.stack.map((t) => (
            <span key={t} style={{ padding: "6px 16px", borderRadius: 8, background: T.bgCard, border: `1px solid ${T.border}`, fontSize: 13, color: T.textSecondary }}>{t}</span>
          ))}
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.8, color: T.textSecondary, marginBottom: 36 }}>{p.desc}</p>

        {/* Features */}
        <h3 className="serif" style={{ fontSize: 24, marginBottom: 20 }}>Key Features</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {p.features.map((f, i) => (
            <div key={i} className="glass" style={{ padding: 18, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: p.color, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 15 }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Live Demo →</button>
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-outline">Source Code</button>
            </a>
          )}
        </div>

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────
function ContactSection({ sectionRef, formState, onSubmit, formData, setFormData, formError }) {
  const [ref, vis] = useInView();
  return (
    <section ref={(el) => { sectionRef(el); ref.current = el; }} data-section="contact" style={{ padding: "120px max(24px, 4vw) 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {vis && (
          <>
            <div className="anim-up" style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15 }}>
                Let's build something<br /><span className="gold-gradient">extraordinary</span>
              </h2>
            </div>

            <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
              {/* Info */}
              <div className="anim-right delay-2" style={{ flex: "1 1 280px", maxWidth: 360 }}>
                <div className="glass" style={{ padding: 24, marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: T.goldMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✉</div>
                  <div>
                    <div style={{ fontSize: 12, color: T.textTertiary, marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{DATA.email}</div>
                  </div>
                </div>
                <div className="glass" style={{ padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(94,234,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📍</div>
                  <div>
                    <div style={{ fontSize: 12, color: T.textTertiary, marginBottom: 2 }}>Location</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{DATA.location}</div>
                  </div>
                </div>

                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.textTertiary, marginBottom: 14 }}>Find me on</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {DATA.socials.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div className="glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, cursor: "pointer" }} title={s.label}>
                        {s.label === "GitHub" && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill={T.textSecondary}>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        )}
                        {s.label === "LinkedIn" && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill={T.textSecondary}>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="anim-up delay-3" style={{ flex: "1 1 400px", maxWidth: 500 }}>
                {formState === "sent" ? (
                  <div className="glass anim-scale" style={{ padding: 48, textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>✓</div>
                    <div className="serif" style={{ fontSize: 24, marginBottom: 8 }}>Message Sent!</div>
                    <div style={{ color: T.textSecondary, fontSize: 15 }}>Thanks for reaching out. I'll get back to you soon.</div>
                  </div>
                ) : (
                  <div className="glass" style={{ padding: 32 }}>
                    <div className="serif" style={{ fontSize: 22, marginBottom: 24 }}>Send a message</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      />
                      <input
                        placeholder="Your Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      />
                      <textarea
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      />
                      {formError && (
                        <div style={{ fontSize: 13, color: "#ef4444", padding: "8px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                          {formError}
                        </div>
                      )}
                      <button
                        className="btn-primary"
                        onClick={onSubmit}
                        style={{ width: "100%", justifyContent: "center" }}
                        disabled={formState === "sending"}
                      >
                        {formState === "sending" ? "Sending..." : "Send Message →"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="anim-in delay-6" style={{ marginTop: 80, textAlign: "center", paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 14, color: T.textTertiary }}>
                Designed & built with <span style={{ color: T.gold }}>♥</span> — Showcasing Flutter expertise on the web
              </div>
              <div style={{ fontSize: 12, color: T.textTertiary, marginTop: 6 }}>© {new Date().getFullYear()} {DATA.name}</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}