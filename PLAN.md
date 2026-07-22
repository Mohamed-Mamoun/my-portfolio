# Rebuild Plan

Personal brand site for Mohamed Mamoun. Phased execution against the audit in [`docs/01-ux-audit.md`](docs/01-ux-audit.md).

**Status legend:** ✅ done · 🔨 in progress · ⬜ not started

---

## Phase 1–5 — Discovery & Design ✅

| Phase | Deliverable | Status |
|---|---|---|
| 1 | UX/Product audit — [`docs/01-ux-audit.md`](docs/01-ux-audit.md) | ✅ |
| 2 | Product strategy — [`docs/02-strategy-and-ia.md`](docs/02-strategy-and-ia.md) §I | ✅ |
| 3 | Information architecture — [`docs/02-strategy-and-ia.md`](docs/02-strategy-and-ia.md) §II | ✅ |
| 4 | Wireframes — [`docs/03-design-system.md`](docs/03-design-system.md) §I | ✅ |
| 5 | Design system spec — [`docs/03-design-system.md`](docs/03-design-system.md) §II | ✅ |

**Key decisions:** Next.js 16 App Router · TypeScript strict · Tailwind v4 · Velite + MDX · Motion v12 · Radix · Vercel. Rationale in `docs/02` §14.

---

## Phase 5b — Foundation ✅

- [x] Scaffold Next.js 16 + TS strict + Tailwind v4 (npm — pnpm not installed)
- [x] Migrate assets into `public/images/`
- [x] `@theme` tokens: colour, type, space, radii, shadow, motion
- [x] `next/font` — Inter + JetBrains Mono, self-hosted (kills 2 render-blocking origins)
- [x] Theme provider — light/dark/system, class-driven, no flash
- [x] `npm run check:contrast` — **92 checks, both themes, all pass.** Caught 8 real failures on first run.
- [x] ESLint flat config + jsx-a11y + `react/forbid-dom-props` banning inline `style`
- [ ] Optimise `avatar.png` (448 KB) — deferred until it's actually used on a page

**Exit met:** `npm run build` clean and fully static; `npm run check` green.

---

## Phase 6 — Component Library 🔨

- [x] Button / ButtonLink — hover + active + focus, 44px targets
- [x] Layout — Container, Section, SectionHeading
- [x] Motion — `Reveal`, `Stagger`, `StaggerItem` (container-owned delays, 400ms/12px)
- [x] Shell — Header (blur-on-scroll), Footer (4-col full IA), MobileNav (**Radix Dialog**), SkipLink, ThemeToggle
- [ ] Badge, Chip, Card, Avatar, Kbd, Skeleton, Tooltip, Popover, Tabs, Prose
- [ ] `Magnetic`, `PageTransition`

---

## Phase 7 — Homepage 🔨

- [x] Content layer: `content/site.ts` typed profile data (ported from `src/data/portfolio.js`)
- [x] Hero — proof bar in the fold, LCP is text; Play Store stat is a real link
- [x] Featured work — asymmetric editorial layout (1 lead + 3), titles are real `<h3>`s
- [x] Expertise — `provenIn` upgraded from string to **links to the proving project**
- [x] Current focus + experience rail
- [x] Contact CTA — direct `mailto:`, response-time expectation
- [ ] Writing block — blocked on Phase 9; omitted rather than faked
- [ ] Testimonials — component pending; **empty array until real quotes exist** (`docs/02` §5)
- [ ] Résumé CTA — blocked on the PDF existing; won't ship a broken download

**Exit:** 30-second test passes; LCP element is text, not a 448 KB PNG.

---

## Phase 9 — Blog & Content Pipeline ✅

- [x] Velite config — Zod schema for `posts`; malformed frontmatter fails the build (`--strict`)
- [x] MDX pipeline: remark-gfm, remark-math, rehype-katex, rehype-slug, rehype-autolink-headings, rehype-pretty-code (Shiki **dual theme**, zero client JS)
- [x] MDX components — Callout (note/warning/tip), CodeBlock + copy, typed links, `next/image`
- [x] `/blog` index — tag filter, series grouping
- [x] `/blog/[slug]` — sticky TOC with **deterministic** active heading, reading progress, reading time, related posts, series prev/next
- [x] `/blog/tag/[tag]`
- [x] Reading experience — 68ch measure, heading anchors, scroll-margin
- [x] RSS, `sitemap.xml`, `robots.txt`
- [x] 2 seed posts — ⚠️ **AI-drafted, need factual review** (see `content/posts/README.md`)
- [ ] Search / ⌘K · Mermaid · YouTube/Tweet embeds · `llms.txt` · view counts

**Exit met:** articles render fully server-side with dual-theme highlighting.

---

## Phase 8 — Remaining Pages 🔨

- [x] `/projects` — tech filter with `aria-pressed` + live region
- [x] `/projects/[slug]` — hero with per-project accent, at-a-glance strip, prose, screens, next-project, `SoftwareApplication` JSON-LD
- [x] `/about` — story, values, path
- [x] `/experience` — full career history
- [x] `/skills` — every competency **links to the project proving it**
- [x] `/contact` — email, response-time promise, timezone, form with honeypot + per-field error association
- [x] `/uses` — renders only populated groups; **hardware left empty deliberately** (unknown, not invented)
- [x] `/now` — Derek Sivers style, dated
- [ ] Résumé PDF + download CTA — blocked on the file existing
- [ ] `/search`
- [ ] T2: `/open-source`, `/newsletter` · T3: `/speaking`, `/bookmarks`, `/resources` (footer links exist and currently 404 — build or remove)

**27 routes prerendered.** No page ships a "coming soon" screen.

---

## Phase 10 — Animation ✅

- [x] Scroll choreography — 400ms / 12px, **CSS + IntersectionObserver, no library**
- [x] Stagger schedule owned by `globals.css` `nth-child` rules
- [x] Micro-interactions: hover **and** active **and** focus on every control
- [x] Hero ambient gradient (GPU-only, `aria-hidden`)
- [x] Reduced-motion: reveals forced visible, all delays zeroed
- [x] **Progressive enhancement:** hiding CSS gated on `.js` + `IntersectionObserver` support
- [ ] Page transitions (would need a library back — only if it earns its weight)

---

## Phase 11 — SEO 🔨

- [x] Per-route `metadata` + canonicals on every page
- [x] **Dynamic OG images** (`next/og`) — site-wide + per-article, verified 1200×630 PNG
- [x] `summary_large_image`
- [x] Schema: Person, WebSite, SoftwareApplication (per project)
- [ ] BlogPosting + BreadcrumbList schema
- [ ] Custom domain (`site.url` currently points at `mohamedmamoun.dev` — **not yet registered**) + redirects from the GitHub Pages URL

---

## Phase 12 — Accessibility ⬜

- [ ] axe + Lighthouse a11y in CI
- [ ] Manual keyboard pass, every route
- [ ] VoiceOver pass on home + article
- [ ] Focus management on route change
- [ ] Fix all audit §4 findings (verify, don't assume)

---

## Phase 13 — Performance 🔨

- [x] Image pipeline — `npm run optimize:images`; **726 KB saved**, avatar 437 KB → 34 KB
- [x] AVIF/WebP via `next/image`, explicit dimensions matching sources (no CLS), lazy below fold
- [x] Self-hosted fonts (removed 2 render-blocking third-party origins)
- [x] Bundle: dropped `motion` (−118 KB/route), deferred `cmdk` (−63 KB/route)
- [ ] **Lighthouse 100 × 4 — NOT YET VERIFIED.** No browser available in the build
      environment; measured JS by summing chunks (~211 KB gzipped incl. prefetch).
      Run Lighthouse against a preview deploy before claiming any score.
- [ ] Consider deferring the mobile-nav Radix Dialog (deliberately left eager — core
      navigation shouldn't risk a load delay on tap)

---

## Phase 14 — Deployment ⬜

- [ ] Vercel project + preview deployments
- [ ] CI: typecheck, lint, contrast, axe, build
- [ ] Analytics (privacy-respecting), Speed Insights
- [ ] Custom domain + DNS

---

## Post-launch

Semantic search (build-time embeddings, static vectors) · AI summaries (build-time, reviewed) · view counts · guestbook · RAG chatbot (only once there's content to ground it). See `docs/02` §7.
