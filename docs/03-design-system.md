# Phase 4 & 5 — Wireframes and Design System

---

## Part I — Wireframes (low fidelity)

Structure only. Every block below maps to a component in Phase 6.

### Home

```
┌──────────────────────────────────────────────────────────┐
│ MM      Work  Writing  About  Uses      ⌘K  ☾  Let's talk│  sticky, blur on scroll
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ● Available for work                                   │  status pill
│                                                          │
│   Mohamed Mamoun                                         │  h1, tight, balanced
│   I build mobile apps that feel inevitable.              │  positioning line
│                                                          │
│   Senior mobile engineer. Flutter architecture,          │  2-line sub
│   shipped end to end. I write down how.                  │
│                                                          │
│   [ View my work → ]  [ Download résumé ]                │  primary + ghost
│                                                          │
│   ─────────────────────────────────────────────          │
│   4+ yrs · 20+ apps · 10k+ users · Live on Play ↗        │  proof bar, verifiable
└──────────────────────────────────────────────────────────┘
│  SELECTED WORK                                           │
│  ┌────────────────────────┐  ┌──────────┐ ┌──────────┐  │
│  │  Focus Flow            │  │ Ajeep    │ │ Zoon     │  │  1 large + 2 small
│  │  [phone mock]  problem │  │          │ │          │  │  asymmetric, editorial
│  │  → read case study     │  │          │ │          │  │
│  └────────────────────────┘  └──────────┘ └──────────┘  │
├──────────────────────────────────────────────────────────┤
│  NOW ─ what I'm building        │  WRITING ─ 3 latest    │  two-up
├──────────────────────────────────────────────────────────┤
│  STACK  grouped by domain, each chip → proof             │
├──────────────────────────────────────────────────────────┤
│  EXPERIENCE  condensed rail → /experience                │
├──────────────────────────────────────────────────────────┤
│  OPEN SOURCE  contribution grid + packages               │
├──────────────────────────────────────────────────────────┤
│  NEWSLETTER  one field, honest promise                   │
├──────────────────────────────────────────────────────────┤
│  Let's talk. [email] [calendar]                          │
├──────────────────────────────────────────────────────────┤
│  FOOTER  4 columns · full IA · rss · theme               │
└──────────────────────────────────────────────────────────┘
```

### Article (`/blog/[slug]`)

```
┌─────────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░  progress bar, 2px, top       │
├──────────┬──────────────────────────────┬───────────────┤
│          │  Series · Part 2 of 5        │  ON THIS PAGE │
│  ← Back  │                              │  ─ Intro      │  sticky TOC
│          │  Why offline-first           │  ▸ The problem│  active highlight
│  ┌────┐  │                              │  ─ Trade-offs │
│  │like│  │  12 Jul 2026 · 8 min · 1.2k  │  ─ Result     │
│  └────┘  │  [flutter] [architecture]    │               │
│  ┌────┐  │                              │               │
│  │share│ │  ────────────────────────    │               │
│  └────┘  │                              │               │
│          │  Body — 68ch measure         │               │
│  sticky  │  ┌──────────────────────┐    │               │
│  rail    │  │ code   dart   [copy] │    │               │
│          │  └──────────────────────┘    │               │
│          │  > callout                   │               │
│          │  [mermaid diagram]           │               │
│          │                              │               │
│          │  ── Related posts ──         │               │
│          │  ── Newsletter ──            │               │
└──────────┴──────────────────────────────┴───────────────┘
   < 1280px: TOC collapses to a floating button + sheet
   < 768px:  rail moves to a bottom bar
```

### Case study (`/projects/[slug]`)

```
┌─────────────────────────────────────────────────────────┐
│  full-bleed hero — project accent as ambient gradient    │
│  Focus Flow                                              │
│  AI productivity coach · 2026 · Solo                     │
│  [ Play Store ↗ ] [ GitHub ↗ ]                          │
├─────────────────────────────────────────────────────────┤
│  AT A GLANCE   role │ timeline │ stack │ outcome         │  scannable strip
├─────────────────────────────────────────────────────────┤
│  THE PROBLEM        prose, 68ch                          │
│  CONSTRAINTS        list                                 │
│  THE APPROACH       prose + inline screenshots           │
│  ARCHITECTURE       mermaid diagram + prose              │
│  WHAT WENT WRONG    ← the section that signals seniority │
│  OUTCOME            metrics                              │
│  WHAT I'D DO NOW    prose                                │
├─────────────────────────────────────────────────────────┤
│  next project →                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Part II — Design System

### 1. Direction

The audit found the current gold-on-black reads as "luxury template." The reference set (Linear, Vercel, Stripe, Raycast) shares a different formula:

> **Near-neutral surfaces + one functional accent + exceptional typography + restrained motion.**

The premium feeling comes from *spacing, type, and timing* — not from decoration. Colour does work; it doesn't perform.

**Our expression of it:** warm-neutral greys (not the blue-grey everyone uses), a single indigo-violet accent that survives both themes, and per-project accents confined to case-study pages where they aid recognition rather than competing for attention.

### 2. Colour

Tailwind v4 CSS-first tokens in `@theme`. Semantic names only — components never reference a raw hex or a numeric shade.

```
Surface ramp        light            dark
--surface-base      #fdfdfc          #0a0a0b
--surface-subtle    #f7f7f6          #111113
--surface-raised    #ffffff          #17171a
--surface-overlay   #ffffff          #1c1c20

Text ramp
--text-primary      #17171a  16.9:1  #f5f5f4  16.4:1
--text-secondary    #52525b   7.6:1  #a1a1aa   7.2:1
--text-tertiary     #6b6b76   5.1:1  #86868f   5.0:1   ← was 3.96:1. fixed.
--text-inverse      #fdfdfc          #0a0a0b

Border
--border-subtle     #e8e8e6          #232327
--border-default    #d4d4d1          #2e2e33
--border-strong     #a1a1aa          #46464d

Accent (indigo-violet)
--accent            #5b56e0          #7c78f0
--accent-hover      #4b46d0          #918df5
--accent-subtle     #eeedfd          #1a1a2e
--accent-border     #c7c5f8          #35334f
--accent-text       #4a45c4   6.1:1  #a5a1f7   7.4:1   ← for accent text on base

Semantic
--success  --warning  --danger  --info    (each: base / subtle / border / text)
```

**Rules**
1. **Every text/background pair ≥ 4.5:1.** Verified by an automated script in CI (`pnpm check:contrast`) — the audit found four failures precisely because nothing was checking.
2. `--text-tertiary` is raised from the audited `#6a7383` (3.96:1 on cards) to **5.0:1 minimum in both themes**.
3. **Project accents are normalised** — the audit found four arbitrary hues at unequal lightness, two failing contrast. Each project now declares a hue only; lightness and chroma are derived so every accent lands at the same perceived weight and passes AA in both themes.
4. **Four distinguishable surfaces**, not four indistinguishable ones. Minimum ΔL between adjacent steps enforced.

### 3. Typography

**Two families, not three.** The audit found three plus two stacked decorative treatments.

| Role | Family | Why |
|---|---|---|
| UI + body | **Inter Variable** | Optical sizing, superb at small sizes, neutral enough to disappear |
| Display | **Inter Variable, tight tracking** | Same family, different treatment — cohesion over contrast |
| Code | **JetBrains Mono Variable** | Ligatures, clear `0`/`O`, wide language coverage |

Self-hosted via `next/font` — kills the two render-blocking third-party origins found in the audit, and eliminates FOUT via `size-adjust` fallback metrics.

**Scale** — fluid, `clamp()`-based, 1.25 ratio. Defined once as tokens; there is no mechanism to set an arbitrary `fontSize`.

```
display-2xl  clamp(3rem, 6vw, 5rem)      lh 0.95  tracking -0.035em
display-xl   clamp(2.5rem, 5vw, 3.75rem) lh 1.0   tracking -0.03em
display-lg   clamp(2rem, 4vw, 2.75rem)   lh 1.1   tracking -0.025em
heading-lg   1.75rem                     lh 1.2   tracking -0.02em
heading-md   1.375rem                    lh 1.3   tracking -0.015em
heading-sm   1.125rem                    lh 1.4   tracking -0.01em
body-lg      1.125rem                    lh 1.65
body         1rem                        lh 1.65
body-sm      0.875rem                    lh 1.6
caption      0.8125rem                   lh 1.5
mono         0.875rem                    lh 1.7
```

**Fixes carried from the audit**
- Line-height is bound to each step, so display sizes never inherit `1.65`.
- `text-wrap: balance` on all headings, `text-wrap: pretty` on all paragraphs.
- Prose measure **68ch** for articles (the audited 62ch is slightly tight for technical prose with inline code).
- `font-optical-sizing: auto` — the variable axis actually gets used.
- Uppercase micro-labels: **tracking 0.08em, used at most once per section.**

### 4. Space

4px base. Sections use a dedicated rhythm scale so vertical pacing is a *decision*, not a per-component guess.

```
space: 1 2 3 4 5 6 8 10 12 16 20 24 32 40 48 56 64 80 96 128   (× 4px)
section rhythm: sm 64px · md 96px · lg 128px · xl 160px  (fluid, clamped)
```

### 5. Elevation

Layered shadows with a warm tint — a single-layer `rgba(0,0,0,.35)` reads flat and dirty.

```
xs   0 1px 2px       -- hairline separation
sm   0 1px 3px  + 0 1px 2px
md   0 4px 12px + 0 2px 4px        -- cards on hover
lg   0 12px 32px + 0 4px 8px       -- popovers, command menu
xl   0 24px 64px + 0 8px 16px      -- modals
glow 0 0 0 1px accent-border + 0 8px 32px accent/10
```

In dark mode, shadows are supplemented by a `1px` top inner highlight — depth in dark UI comes from light edges, not dark shadows.

### 6. Radii

`sm 6px · md 10px · lg 14px · xl 20px · 2xl 28px · full`. Nested elements use `parent − padding` so concentric corners stay optically parallel.

### 7. Motion

The audit found one recipe (`translateY(22px)` + fade, `0.8s`) applied to everything. Replaced with a system where **duration is a function of distance and importance**.

```
duration   instant 100ms · fast 150ms · base 250ms · slow 400ms · slower 600ms
easing     out      cubic-bezier(0.16, 1, 0.3, 1)      -- entrances
           in-out   cubic-bezier(0.65, 0, 0.35, 1)     -- transitions
           spring   { stiffness 400, damping 30 }      -- interactive
```

**Rules**
1. **Scroll reveal: 400ms, 12px travel** — not 800ms/22px. Fast enough to feel settled, not arriving.
2. **Stagger is a container concern.** One `<Reveal>` primitive with `staggerChildren`; delays are never hand-typed per component (the audit found the same arithmetic re-derived in three files).
3. **Only `transform` and `opacity` animate.** No layout-triggering properties.
4. **Every interactive element has hover, active, and focus states.** The audit found buttons with hover only.
5. **`prefers-reduced-motion` disables all of it** — carried forward wholesale from the current implementation, which handled this correctly.
6. **Motion is a client-only concern.** No animation library ships in the server bundle.

### 8. Layout

```
content   768px    prose
default   1120px   most pages
wide      1400px   project galleries
ultra     1680px   max — the audit found nothing above 1140px
gutter    clamp(1.25rem, 5vw, 3rem)
```

**Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 · 3xl 1920`. The audit found a single breakpoint at 768px; tablet and ultra-wide are now first-class.

### 9. Component inventory (Phase 6)

**Primitives** — Button · Link · Badge · Chip · Card · Avatar · Separator · Kbd · Tooltip · Dialog · Sheet · Popover · Tabs · Input · Textarea · Switch · Skeleton
**Layout** — Container · Section · Grid · Stack · Prose · Header · Footer · MobileNav
**Motion** — Reveal · Stagger · Magnetic · TextShimmer · PageTransition
**Content** — ProjectCard · PostCard · TimelineItem · StatBlock · TechChip · Callout · CodeBlock · Mermaid · TOC · ReadingProgress · ShareBar · TagList · SeriesNav
**Feature** — CommandMenu · ThemeToggle · Newsletter · ContactForm · GitHubGraph · SearchDialog

### 10. Accessibility baseline (non-negotiable)

Every component ships with: visible `:focus-visible` (2px accent ring, 2px offset) · full keyboard operation · correct roles and names · AA contrast in **both** themes · 44×44px minimum touch target · reduced-motion respect.

Enforced by `eslint-plugin-jsx-a11y`, `axe` in CI, and the contrast script. **The audit's failures existed because nothing was checking. Now something checks.**
