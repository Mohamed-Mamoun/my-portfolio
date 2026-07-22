# Phase 1 — UX / Product Audit

**Subject:** `mohamed-mamoun.github.io/my-portfolio` (Vite + React 19 SPA, 2,033 LOC)
**Date:** 21 July 2026
**Method:** Full source read (`index.html`, `src/**`), build-output analysis (`dist/`), measured WCAG contrast, IA and conversion review.

---

## 0. Executive summary

The current site is **a well-built version of the wrong artifact.**

The craft is real: the design tokens are disciplined, `prefers-reduced-motion` is handled properly with no exceptions, the project modal has a correct focus trap with scroll lock and focus restore, the scroll listener is isolated so the tree doesn't re-render, and the writing in the project `problem`/`approach` fields is genuinely good — specific, opinionated, senior-sounding prose. That is above the median developer portfolio.

But it is **a single HTML document**. One URL. No routing. Case studies live in a modal, so they cannot be linked, shared, bookmarked, or indexed. There is no writing, no open-source evidence, no resume, and no `og:image` — so every time this link is pasted into LinkedIn or a recruiter's Slack, it renders as a bare blue string.

The gap between the stated goal ("this engineer is senior") and the artifact is not a visual-polish gap. It is **a surface-area gap**. Seniority is demonstrated by a body of work and thinking that other people can find, link to, and cite. A one-page scroll has a hard ceiling on that, and no amount of restyling raises it.

**The three highest-ROI fixes, in order:**

1. **Give every project and article its own URL** (routing + SSG). Unlocks SEO, sharing, and depth simultaneously.
2. **Ship an `og:image` and a resume PDF.** Two artifacts, hours of work, disproportionate effect on how the link is received.
3. **Start publishing.** The single strongest senior signal available, and the one thing the current architecture cannot accommodate at all.

**Verdict:** rebuild, don't refactor. The architecture — one component tree, one document, state-driven "navigation" — is load-bearing for the current design and actively blocks every requirement on the target list.

---

## 1. Information Architecture

**Current:** `Home` → 5 scroll sections (`hero`, `about`, `skills`, `projects`, `contact`). Depth: 1. Total URLs: 1.

| Problem | Evidence | Impact |
|---|---|---|
| No hierarchy, nowhere to grow | `SECTIONS` in [portfolio.js:159-165](src/data/portfolio.js#L159-L165) | Adding a blog requires a rewrite — which is why we're doing one |
| Case studies are modal state, not routes | [App.jsx:12](src/App.jsx#L12), [ProjectModal.jsx](src/components/ProjectModal.jsx) | Not linkable, not shareable, not indexable, lost on refresh, back button doesn't close it |
| Claims and evidence are separated | `Skills` section sits between `About` and `Projects` | The `provenIn` field ([portfolio.js:30](src/data/portfolio.js#L30)) is a genuinely smart idea — competencies cite the projects that prove them — but it's rendered as plain text, not a link to the proof |
| No taxonomy | — | No tags, categories, series, or filters. Nothing to browse *by*. |
| No search | — | With 4 projects it doesn't matter. With 40 artifacts it's the primary navigation. |

**Deeper issue:** the IA is organised around *the page's sections*, not around *what a visitor came to do*. A recruiter, a client, and a fellow developer all get the same linear scroll. They have different jobs to be done and should have different entry points.

---

## 2. Navigation

- **Scroll-spy is non-deterministic.** [App.jsx:16-23](src/App.jsx#L16-L23) sets `activeSection` on *any* entry with `isIntersecting` at threshold `0.35`. When two sections intersect simultaneously — routine on tall viewports and short sections — the last entry in the callback array wins. The active indicator flickers or sticks to the wrong item.
- **No focus management on navigation.** `scrollIntoView` at [App.jsx:29](src/App.jsx#L29) moves the viewport but leaves DOM focus on the nav button. A keyboard user "navigates" and their next Tab continues from the header, not the destination.
- **The mobile menu is not a dialog.** [Nav.jsx:80-92](src/components/Nav.jsx#L80-L92) renders a fixed full-screen overlay with no `role="dialog"`, no `aria-modal`, no focus trap, no body scroll lock, and no focus restore. Background content stays in the tab order *behind* the overlay. (Notably, `ProjectModal` gets all of this right — the pattern exists in the codebase, it just wasn't applied here.)
- **No footer navigation.** The footer ([Contact.jsx:194-208](src/components/Contact.jsx#L194-L208)) contains a credit line and a copyright. Zero links. The footer is prime real estate for secondary IA and it's empty.
- **No command menu**, no keyboard shortcuts, no search entry point.
- **The logo is `</>`** ([Nav.jsx:46](src/components/Nav.jsx#L46)) — the single most generic symbol in the developer-portfolio genre.

---

## 3. UI

### What works
Tokens-first CSS with a real spacing scale and a 1.25 modular type scale. Tiered card system (`card` → `card--interactive` → `flagship`) with genuine hierarchy of intent. The phone frame is bezel-only because the screenshots carry their own status bar — a considered detail, and it's commented ([index.css:424-425](src/index.css#L424-L425)).

### What doesn't

**The design system isn't enforced.** 685 lines of tokenised CSS coexist with roughly 800 lines of inline `style={{}}` objects that bypass it. The scale is decorative:

| Token exists | Bypassed by |
|---|---|
| `--sp-*` scale | `padding: "8px 18px"` ([Hero.jsx:47](src/components/Hero.jsx#L47)), `padding: "3px 10px"` ([About.jsx:97](src/components/About.jsx#L97)) |
| `--t-*` type scale | `fontSize: 22` ([Nav.jsx:40](src/components/Nav.jsx#L40)), `fontSize: 44` ([Projects.jsx:107](src/components/Projects.jsx#L107)), `fontSize: 11` ([ProjectModal.jsx:86](src/components/ProjectModal.jsx#L86)) |
| `--r-*` radii | `borderRadius: 100`, `borderRadius: 6`, `borderRadius: 50%` inline |

Every new component makes this worse. This is the strongest single argument for Tailwind + a constrained token set: the system becomes the *only* way to express a value.

**Gold-on-black is the most-cloned "premium" aesthetic there is.** `#e8c547` on `#050508` with Instrument Serif italic reads as luxury-brand/crypto-landing template — the opposite of the Linear / Vercel / Stripe reference set, which are almost entirely restrained neutrals with one *functional* accent. The current palette signals "designed" rather than "engineered."

**Surface hierarchy is invisible.** `--bg #050508` → `--surface #0b0b12` → `--card #101019` → `--card-2 #161622` are four near-identical values. On anything but a calibrated display, cards do not separate from the page.

**Glyphs as UI.** `☰` / `✕` ([Nav.jsx:75](src/components/Nav.jsx#L75)), `✓` ([Contact.jsx:127](src/components/Contact.jsx#L127)), `→` throughout. These render with different metrics, weights, and baselines on every platform, and some fall back to emoji presentation on Android.

**No light mode.** `color-scheme: dark` is hardcoded at [index.css:69](src/index.css#L69). A meaningful share of readers — especially anyone reading long-form technical content in daylight — will bounce.

---

## 4. Accessibility

Measured against WCAG 2.2 AA.

### Confirmed contrast failures

Computed ratios for the actual palette:

| Foreground | on `--bg` | on `--card` | Verdict |
|---|---|---|---|
| `--text-3` `#6a7383` | **4.26** | **3.96** | ❌ **Fails AA (needs 4.5)** |
| `#6366f1` (Ajeep accent) | 4.56 | **4.23** | ❌ **Fails AA on cards** |
| `#7c6ff0` (Focus Flow accent) | 5.22 | 4.85 | ⚠️ Passes AA, fails AAA |
| `--text-2` `#9aa3b2` | 8.00 | 7.44 | ✅ |
| `--gold` `#e8c547` | 12.12 | 11.27 | ✅ |

`--text-3` is not a rare token. It carries the footer copyright, timeline company names, project subtitles, the "Proven in" label, and — via `::placeholder` ([index.css:630-632](src/index.css#L630-L632)) — every form placeholder, at **4.10** on `--surface`. All of these are set at 12–14px, where legibility is already marginal.

The per-project accent colours are used as *text* at 11–12px uppercase in the modal section headings ([ProjectModal.jsx:50](src/components/ProjectModal.jsx#L50)), which is the worst case for both size and contrast.

### Structural issues

- **No skip-to-content link.** Keyboard users tab through the entire header on every navigation.
- **The `contentinfo` landmark is lost.** `<footer>` is nested inside `<section>` inside `<main>` ([Contact.jsx:194](src/components/Contact.jsx#L194)). Nested in a sectioning element, it stops being a page-level landmark.
- **Invisible focusable content.** `.reveal` starts at `opacity: 0` ([index.css:217-224](src/index.css#L217-L224)). Content below the fold is in the DOM and focusable but not visible — a keyboard user tabbing ahead of the scroll position lands on targets they cannot see. (The reduced-motion escape hatch at [index.css:677-680](src/index.css#L677-L680) correctly neutralises this for that cohort, but not for everyone else.)
- **Project cards aren't headings.** Card titles are `<div className="serif">` ([Projects.jsx:133](src/components/Projects.jsx#L133)). Screen-reader users get no heading structure to navigate the project list.
- **Form fields lack error association.** [Contact.jsx](src/components/Contact.jsx) has no `aria-invalid` and no `aria-describedby` tying the error to the offending input. The shared `role="alert"` announces *that* something is wrong, never *which field*.
- **Mobile menu** — see Navigation above. No dialog semantics, no focus trap.

### Genuine credit

`prefers-reduced-motion` is handled comprehensively and without exceptions ([index.css:664-685](src/index.css#L664-L685)), including `scroll-behavior` and the phone carousel. `useInView` even initialises to `true` for reduced-motion users so nothing depends on the observer firing ([useInView.js:8-10](src/hooks/useInView.js#L8-L10)). `ProjectModal`'s focus trap, scroll lock, and focus restore are correct. `:focus-visible` has a visible 2px outline with offset. This is better a11y hygiene than most portfolios ship.

---

## 5. Responsiveness

- **One breakpoint.** `@media (max-width: 768px)` ([index.css:644](src/index.css#L644)) is the entire responsive strategy. Nothing between 768–1024px (tablet, landscape phone) and nothing above 1140px.
- **Ultra-wide is unhandled.** `.container` caps at 1140px. On a 3440px display the site is a narrow column adrift in black. No max-width scaling, no multi-column adaptation.
- **Hero mobile order costs the fold.** The avatar block (`flex: 0 1 320px; min-width: 240px`, [Hero.jsx:117-124](src/components/Hero.jsx#L117-L124)) wraps *below* the copy, so on a 390×844 phone the CTAs sit above ~320px of decorative portrait. Correct order, but the portrait is consuming the most valuable screen real estate on the page.
- **Nested scroll conflict.** `.case-screens` scrolls horizontally ([index.css:587-593](src/index.css#L587-L593)) inside `.modal-backdrop`, which scrolls vertically. On touch, diagonal gestures fight between the two.
- **Screenshots are cropped.** `.phone-track img { object-fit: cover }` on a fixed `9/19.4` frame ([index.css:426-459](src/index.css#L426-L459)) silently crops any screenshot whose aspect ratio doesn't match.
- `min-height: 100svh` on the hero is correct — small-viewport units avoid the mobile-browser-chrome jump. Credit.

---

## 6. Performance

Build output: **~1.05 MB total, ~950 KB of it images.**

| Asset | Size | Problem |
|---|---|---|
| `avatar.png` | **448 KB** | Rendered at ≤320px wide, circular, PNG. Almost certainly the LCP element. Should be ~15 KB AVIF/WebP. **This one file is ~43% of the page weight.** |
| 5 screenshot JPEGs | 463 KB | Statically imported at [portfolio.js:4-8](src/data/portfolio.js#L4-L8) so they enter the initial module graph — yet they render only inside a modal most visitors never open |
| `index-*.js` | 220 KB | Single chunk. No code splitting, no route splitting (there are no routes). |
| `index-*.css` | 8.9 KB | Fine. |

**Additional issues:**

- **No `width`/`height` on any `<img>`** → layout shift on every image load. Direct CLS penalty.
- **No `loading="lazy"`**, no `srcset`, no modern formats. Every image is fetched at full resolution regardless of viewport.
- **Render-blocking third-party fonts.** [index.html:29-34](src/../index.html#L29-L34) hits `fonts.googleapis.com` *and* `fonts.gstatic.com` — two extra DNS + TLS handshakes on the critical path, plus FOUT. Three families (DM Sans with 4 weights + italic, Instrument Serif regular + italic, JetBrains Mono) is a lot of font payload for a page with this much text.
- **Client-side rendering only.** First paint requires the 220 KB bundle to download, parse, and execute. On mid-tier mobile this is the difference between a ~1s and a ~3s LCP.
- **No caching strategy, no prefetching.** GitHub Pages defaults only.

**Credit:** the scroll listener is `passive` and its state is deliberately isolated in `Nav` so the rest of the tree never re-renders on scroll ([Nav.jsx:8-15](src/components/Nav.jsx#L8-L15)) — with a comment explaining why. That's a considered performance decision.

---

## 7. SEO

**Structural ceiling: one indexable document.** You can rank for "Mohamed Mamoun" and essentially nothing else. There are no article pages, no project pages, no `sitemap.xml`, no `robots.txt`, no RSS feed. Organic discovery is capped at branded search.

| Issue | Detail |
|---|---|
| **`og:image` is missing entirely** | [index.html:15-27](index.html#L15-L27). Every share on LinkedIn, Slack, Discord, iMessage, or X renders as a bare text link. For a link whose primary distribution channel is *being pasted to a recruiter*, this is the highest-ROI single fix on this list. |
| `twitter:card` is `summary` | Should be `summary_large_image`. |
| Client-side rendering | Googlebot renders JS. **LinkedIn, Slack, Discord, and X unfurlers do not.** They see only the static `index.html` — which currently has no image and one generic description. |
| Canonical is a subpath | `mohamed-mamoun.github.io/my-portfolio/` — a subdirectory on a shared domain. No brand, no domain-level authority, no `@yourdomain` email. |
| Schema is thin | The `Person` block ([index.html:36-63](index.html#L36-L63)) is real and correct — credit. But it lacks `image`, `knowsLanguage`, and richer `sameAs`. There's no `WebSite`, no `BreadcrumbList`, no `BlogPosting`, no `SoftwareApplication` for the apps. |
| No RSS / no `alternate` link | Nothing for developers to subscribe to. |
| Possible location inconsistency | Meta and schema say Cairo, Egypt; the timeline lists The Future University and Code Sudan. Worth confirming — inconsistent location data weakens entity resolution. |

---

## 8. Branding

- **There is no brand.** No wordmark, no logotype, no OG image, no favicon beyond a placeholder SVG, no personal domain. The visual signature is "gold accent," which is not ownable.
- **Positioning is single-axis.** The site says *Senior Flutter Developer*. The stated goal includes Software Architect, Open Source Contributor, Technical Writer, and Mobile Engineer — **none of which appear anywhere on the site, in any form.** The gap isn't messaging, it's evidence.
- **Voice is inconsistent.** Compare:
  - `bio`: *"beautiful, high-performance Flutter applications that users love"* — recruiter-speak, could describe anyone.
  - `problem`: *"Big tasks stall people. To-do lists record the paralysis; they don't fix it."* — sharp, specific, a point of view.

  The second voice is the brand. The first one is diluting it. **The tagline — *"I build mobile apps that feel inevitable — this page included"* — is the best sentence on the site** and should anchor the rewrite.

---

## 9. Content

| Gap | Detail |
|---|---|
| **No writing** | Zero articles. The largest single gap against the goal. |
| **No open-source evidence** | GitHub is linked but nothing is shown — no repos, no contributions, no packages, no activity. |
| **Case studies are three paragraphs** | Problem / approach / outcome. Good paragraphs, but this is a summary, not a case study. No architecture, no trade-offs, no metrics, no failures. |
| **The `20+` / `4` credibility gap** | `stats` claims *"20+ apps shipped to production"* ([portfolio.js:21](src/data/portfolio.js#L21)) while the page shows 4. An unexplained 5× gap invites scepticism rather than confidence. Either show the long tail or reframe the claim. |
| **`10k+ users` is unsourced** | It's the only quantitative claim on the site and it's asserted, not evidenced. One verifiable number (a Play Store listing, a real download count) beats three round ones. |
| **Stale timeline framing** | *"2025 – 2026"* for the current role reads as ended, mid-2026. |
| **No process content** | Nothing on how you work, how you decide, what you believe about engineering. This is the content that actually reads as senior — more than any project list. |

---

## 10. Trust signals

Present: employer name, university, a live Google Play link (the strongest signal on the site), GitHub, LinkedIn.

**Absent — the entire recruiter checklist:**

Resume PDF · availability & rates · response-time expectation · timezone (critical for remote/async hiring) · testimonials or references · client logos · GitHub activity · published packages · talks or community work · certifications · email at own domain · verifiable metrics.

---

## 11. Conversion

- **Two CTAs, both scroll.** "View Projects" and "Get in Touch" ([Hero.jsx:107-114](src/components/Hero.jsx#L107-L114)) move the viewport. Neither offers `mailto:`, a calendar link, a resume download, or a copy-email affordance.
- **A form is the only conversion path.** Three fields, no indication of what happens next or when. Many senior hiring conversations start with a calendar link or a direct email — neither is offered.
- **No CTA after the projects section** — the single highest-intent moment on the page, unmonetised.
- **The success state self-destructs.** [Contact.jsx:47](src/components/Contact.jsx#L47) resets to `idle` after 4 seconds, potentially clearing the confirmation before it's read.
- **No spam protection.** The Formspree endpoint is posted to directly with no honeypot and no rate limiting.
- **Nothing to follow.** No newsletter, no RSS, no social follow. Every visitor is a one-time visitor by design.

---

## 12. Animation

- **One recipe, applied uniformly.** Every element uses `translateY(22px)` + fade over `0.8s` ([index.css:217-229](src/index.css#L217-L229)). Uniform motion is invisible motion — nothing is emphasised because everything is animated identically.
- **0.8s is too slow.** The reference set (Apple, Linear, Vercel) lands scroll reveals in 300–500ms. At 800ms the content feels like it's arriving late rather than settling in.
- **Stagger delays are hand-typed everywhere.** `0.15 + 0.08 * i` ([Projects.jsx:90](src/components/Projects.jsx#L90)), `0.08 * (i + 1)` ([Skills.jsx:43](src/components/Skills.jsx#L43)), and a hardcoded ladder in `Hero`. The same logic, re-derived per component, with the delay duplicated in both `className` and `style`.
- **No micro-interactions.** Buttons do `translateY(-2px)` on hover and nothing on press. No active state, no optimistic feedback, no state transitions.
- **No page transitions** — there are no pages.
- The pulsing availability dot is the only ambient motion on the site.

---

## 13. Typography

- **Three families is one too many.** Instrument Serif (display, + italic), DM Sans (body, 4 weights + italic), JetBrains Mono. Compounded by stacking two decorative treatments in the hero: serif italic for the role *and* a gold gradient on the name.
- **The type scale is not real.** A 1.25 modular scale is defined at [index.css:44-51](src/index.css#L44-L51), then overridden by inline `fontSize` in roughly twenty places.
- **Global `line-height: 1.65`** ([index.css:90](src/index.css#L90)) is right for body copy and far too loose for display sizes. `.display` corrects to `1.02`, but `.h3` and `.lead` inherit the body value and read airy.
- **`letter-spacing: 3px` uppercase micro-labels appear six times.** A template tic — it says "designed" the way a drop shadow used to.
- **No `text-wrap: balance`** on headings, **no `text-wrap: pretty`** on paragraphs. Free typographic quality, unused.
- **`opsz` is unused.** DM Sans is loaded as a variable font *with* optical sizing (`opsz 9..40`, [index.html:32](index.html#L32)) and the axis is never exercised.
- `.measure { max-width: 62ch }` is correct — then overridden inline to `48ch` in the hero ([Hero.jsx:102](src/components/Hero.jsx#L102)).

---

## 14. Colour

- **Single accent is the right instinct, wrong colour.** One accent is disciplined; gold-on-black is the most saturated corner of the "premium template" space.
- **Four indistinguishable surfaces** (see §3).
- **`--text-3` fails AA** at every surface (see §4).
- **Per-project accent colours have no system.** `#7c6ff0`, `#6366f1`, `#f59e0b`, `#06b6d4` ([portfolio.js](src/data/portfolio.js)) are arbitrary — unrelated hues, unequal lightness, two of them failing contrast as text.
- **No semantic layer.** `--ok` and `--danger` exist; there's no `--warning`, `--info`, or any token for the states a blog needs (callouts, notes, code diff add/remove).
- **Dark-only** means every colour decision is untested against a light background.

---

## 15. What to carry forward

Not everything should be thrown away. These survive the rebuild:

1. **The tagline** — *"I build mobile apps that feel inevitable."*
2. **The `provenIn` concept** — competencies that cite the projects proving them. This is a genuinely good idea; it should become a *link*, not a string.
3. **"No self-assigned percentages"** ([Skills.jsx:29](src/components/Skills.jsx#L29)) — the explicit refusal to draw skill bars is a senior signal. Keep the stance, keep the sentence.
4. **The case-study voice** in `problem` / `approach`.
5. **Reduced-motion discipline** — port it as a first-class primitive.
6. **The bezel-only phone frame** rationale.
7. **The Google Play link** — the only externally verifiable proof on the site. Make it far more prominent.

---

## 16. Prioritised remediation

**P0 — structural, blocks everything else**
1. Routing + static generation; a URL per project and per article
2. `og:image` (dynamic, per-route) + `summary_large_image`
3. Resume PDF
4. Personal domain
5. Fix `--text-3` and the accent palette to pass AA

**P1 — the seniority signal**
6. Blog with MDX and a real writing experience
7. Deep case studies (architecture, trade-offs, metrics, what went wrong)
8. Open-source / GitHub evidence
9. `sitemap.xml`, `robots.txt`, RSS

**P2 — quality bar**
10. Light + dark mode
11. Image pipeline (AVIF/WebP, `srcset`, dimensions, lazy loading)
12. Self-hosted fonts via `next/font`
13. Skip link, dialog semantics for the mobile menu, form error association
14. Tablet + ultra-wide breakpoints

**P3 — depth and delight**
15. Command menu (⌘K) + search
16. Now / Uses / Speaking / Bookmarks
17. Newsletter, view counts, guestbook
18. Motion system replacing the single reveal recipe

---

*Phase 2 (Product Strategy) and Phase 3 (Information Architecture) follow in [`02-strategy-and-ia.md`](02-strategy-and-ia.md).*
