# Phase 2 & 3 — Product Strategy and Information Architecture

---

## Part I — Product Strategy

### 1. The core strategic problem

The brief asks for fifteen sections. That is the right *ambition* and the wrong *sequencing*, and it's worth being direct about why.

**Seniority reads as depth, not breadth.** A site with fifteen navigation items and four of them empty reads as *aspirational*. A site with eight items where every one is dense reads as *established*. Recruiters and engineers both pattern-match on this within seconds: a `/speaking` page with "coming soon," a `/bookmarks` page with three links, and a blog with one post do more damage than not having those pages at all — because they convert an unknown into a known negative.

**Therefore:** we build the full architecture, but we *ship* pages in tiers as content exists to fill them. Every page in the brief gets designed, routed, and built. Pages without real content stay unlinked from primary navigation until they have it. The system is complete; the surface is honest.

This is not scope reduction. It's release sequencing — and it's the same call any senior engineer would make about a feature flag.

### 2. Positioning

**Current:** "Senior Flutter Developer." Accurate, single-axis, and interchangeable with several thousand other people.

**Target:** the specific thing that's actually true and hard to copy —

> **Mobile engineer who architects Flutter products end to end — and writes down how.**

The differentiator isn't Flutter. It's the combination of *shipping production mobile products solo* + *articulating the engineering reasoning behind them*. Most Flutter developers do the first. Very few do the second in public. The second is what converts "competent" into "senior" in a stranger's mind, and it's the axis the current site scores zero on.

**Positioning pillars** — every page must serve at least one:

| Pillar | Proven by | Current status |
|---|---|---|
| **Ships production mobile products** | Play Store links, real user numbers, case studies | ⚠️ Partial — 1 verifiable link |
| **Architects systems, not screens** | Architecture diagrams, trade-off writing, decision records | ❌ Absent |
| **Writes and teaches** | Blog, series, talks | ❌ Absent |
| **Contributes in public** | GitHub, pub.dev packages, PRs | ❌ Absent |

Two of four pillars are currently unevidenced. **Closing those two is the entire strategic project.** Everything else is polish.

### 3. Audiences and jobs-to-be-done

Four audiences arrive with different jobs. The IA must serve all four without compromising for any.

| Audience | Job to be done | Time budget | Needs | Primary path |
|---|---|---|---|---|
| **Recruiter / hiring manager** | "Is this person senior, real, and available?" | **~30 seconds** | Title, proof, resume, contact | Home hero → stats → resume PDF |
| **Engineering lead / interviewer** | "Can they reason about hard problems?" | 5–15 min | Architecture, trade-offs, code, writing | Home → case study → blog |
| **Client / founder** | "Can they ship my product and can I trust them?" | 2–5 min | Outcomes, testimonials, process, price signal | Home → projects → contact |
| **Fellow developer** | "Is this worth reading and following?" | Variable, recurring | Articles, OSS, uses, RSS | Blog → article → subscribe |

**Design implication:** the homepage must satisfy the 30-second job *above the fold* while opening doors to the 15-minute job. These are not in tension if the hero carries proof rather than adjectives.

**The 30-second test** — an unfamiliar recruiter must, without scrolling past the second viewport, learn: who you are, what you do, that it's real, and how to reach you. The current hero delivers only the first two.

### 4. Success metrics

| Metric | Baseline | 6-month target |
|---|---|---|
| Indexable URLs | 1 | 40+ |
| Published articles | 0 | 12 |
| Lighthouse (all 4, mobile) | not measured | 100 |
| LCP (mobile, p75) | ~2.5–3.5s est. | < 1.2s |
| Resume downloads | n/a | tracked |
| Newsletter subscribers | n/a | 100 |
| Organic non-branded impressions | ~0 | growing |

### 5. Content strategy — the honesty constraint

**A hard rule for this build:** no fabricated social proof. No invented testimonials with plausible-sounding names, no fake company logos, no imaginary conference talks, no placeholder metrics that read as real. A testimonial from "Sarah Chen, CTO at TechCorp" is a lie on your website, and a hiring manager who searches for it and finds nothing has learned something much worse than "he has no testimonials yet."

Where the brief calls for testimonials, we build the **component** and an **honest empty state** — either omitted from the page entirely, or rendered as a visibly-marked authoring placeholder that cannot ship to production. Same for speaking, OSS, and metrics.

**Content acquisition is the critical path.** The build unblocks publishing; it doesn't substitute for it. Realistic first-90-days plan:

- **Week 1–2:** Resume PDF, OG image, 2 deep case studies rewritten from existing material, `/uses`, `/now`
- **Week 3–8:** 6 articles — the highest-leverage topics are the ones only you can write: *why offline-first for Focus Flow*, *Bloc vs Riverpod vs GetX, decided per project not per habit*, *shipping a Flutter app to Play Store solo*, *Gemini in production Flutter*
- **Week 9–12:** OSS contributions, first talk, testimonial requests from actual past clients

### 6. Content management — the decision

**Requirement:** long-lived, low-maintenance, version-controlled, zero-cost, offline-authorable, fully typed, no vendor lock-in, no runtime dependency, compatible with static generation.

| Option | Verdict |
|---|---|
| **Contentlayer** | ❌ **Unmaintained.** Effectively abandoned since 2023, never got stable App Router or Turbopack support. It's still the most-recommended answer in blog posts, which is exactly why it needs an explicit rejection. Do not use. |
| **Sanity** | ❌ Excellent CMS, wrong shape. Hosted service, runtime API dependency, a schema layer to maintain, and a login required to write. For a solo technical blog it adds an external point of failure and a monthly bill to solve a problem `git` already solves. |
| **Contentful** | ❌ Same as Sanity plus enterprise pricing and a worse authoring experience for code-heavy content. Aimed at marketing teams, not engineers. |
| **Notion as CMS** | ❌ Tempting — great editor. But: unofficial API surface, aggressive rate limits, signed image URLs that **expire** (permanently broken images in old posts), no real code-block language fidelity, and a hard build-time dependency on a third party being up. Your archive should not be able to rot. |
| **Hashnode / dev.to** | ❌ Publishing *platform*, not a CMS. Canonical URLs point away from your domain — you'd be building someone else's SEO. Correct as a *syndication target*, wrong as a source of truth. |
| **Raw MDX + hand-rolled loader** | ⚠️ Viable and lock-in-free, but you re-implement schema validation, type generation, incremental builds, and asset handling. ~300 LOC of undifferentiated work to maintain forever. |
| **Velite** ✅ | ✅ **Chosen.** |

**Why Velite:**

1. **Actively maintained** — last release June 2026, unlike the ecosystem's default recommendation.
2. **Zod schemas → generated TypeScript types.** A malformed frontmatter field fails the *build*, not the page. Content gets the same type safety as code.
3. **Bundler-independent.** It runs as its own process and emits plain JSON + compiled MDX strings into `.velite/`. It does not hook into webpack or Turbopack — which is precisely why Contentlayer died. Next.js can upgrade underneath it without breaking anything.
4. **Full unified/remark/rehype control** — required for the brief's syntax highlighting, Mermaid, math, callouts, footnotes, and heading anchors.
5. **Content is `git`.** Reviewable in PRs, diffable, greppable, offline, portable, free, and yours. If Velite disappears tomorrow, the `content/` directory is still a folder of Markdown files.

**Migration cost if wrong:** low. Content is plain MDX; only the loader would change. That asymmetry is the real argument.

### 7. AI features — practical, ranked by value/effort

The brief asks for suggestions. Ranked honestly, including what to skip:

| Feature | Value | Effort | Verdict |
|---|---|---|---|
| **Semantic search over posts + projects** | High | Medium | ✅ **Build.** Embed content at build time, store vectors as a static JSON artifact, cosine-match in the browser. Zero runtime cost, works offline, no API key on the critical path. Genuinely better than keyword search for "how did he handle offline sync." |
| **AI-generated post summaries** | Medium-high | Low | ✅ **Build.** Generate at *build* time, commit to frontmatter, review before publishing. Feeds meta descriptions, OG cards, and the post index. Never generated at runtime — you should approve every word published under your name. |
| **"Ask about my work" chatbot (RAG)** | Medium | High | ⚠️ **Phase 2, carefully.** Real differentiator when done well, real liability when it hallucinates your experience to a recruiter. Requires strict grounding, refusal on unknowns, citation of source posts, and rate limiting. Ship only after there's enough content to ground it. |
| **Related-posts recommendations** | Medium | Low | ✅ **Build.** Reuse the same embeddings — cosine similarity across posts. Zero marginal cost once search exists. |
| **Reading-history personalisation** | Low | Medium | ❌ **Skip.** Needs meaningful traffic to beat "here's my latest." Privacy cost, complexity cost, negligible benefit at this scale. |
| **AI writing assistant in authoring flow** | High (to you) | Low | ✅ Local tooling, not a site feature. |

**Principle:** AI is used at build time wherever possible. Nothing on the critical rendering path depends on a model being available, and nothing publishes unreviewed text in your voice.

---

## Part II — Information Architecture

### 8. Route map

```
/                       Home
/about                  Story, values, timeline, photos
/projects               Index — filter by tech, type, year
  /projects/[slug]      Full case study
/blog                   Index — search, tags, series
  /blog/[slug]          Article
  /blog/tag/[tag]       Tag archive
  /blog/series/[series] Series index
/experience             Career, résumé, download PDF
/skills                 Competencies, each linked to proof
/open-source            Repos, packages, contributions
/speaking               Talks, workshops, community        ·  T3
/now                    Current focus (Derek Sivers)
/uses                   Hardware, software, setup
/bookmarks              Curated links                       ·  T3
/resources              Guides, templates, cheatsheets      ·  T3
/newsletter             Subscribe + archive                 ·  T2
/contact                Hub — email, calendar, form, social
/search                 Full-site search (also ⌘K)
/rss.xml  /sitemap.xml  /robots.txt  /llms.txt
/og/[...]               Dynamic OG image generation
```

### 9. Release tiers

Every route above is **built**. Tiers govern what appears in primary navigation.

| Tier | Routes | Gate |
|---|---|---|
| **T1 — Launch** | `/`, `/about`, `/projects/*`, `/blog/*`, `/experience`, `/skills`, `/contact`, `/uses`, `/now`, `/search` | Ships with real content |
| **T2 — Near-term** | `/open-source`, `/newsletter` | Ships when GitHub data is wired / provider chosen |
| **T3 — Content-gated** | `/speaking`, `/bookmarks`, `/resources` | Routes exist and are crawlable; **hidden from nav until non-trivial** |

T3 pages are reachable by direct URL and from the footer, never advertised in the header. No "coming soon" screens ship.

### 10. Navigation model

**Header (desktop) — 6 items maximum.** Beyond six, scanning cost exceeds navigation value.

```
[MM logo]   Work   Writing   About   Uses      [⌘K]  [☾]  [Let's talk]
```

- **"Work"** and **"Writing"** rather than "Projects" and "Blog" — outcome language, and it lets `/projects` and `/open-source` sit under one label.
- **⌘K is the real navigation.** Everything deep — tags, series, individual posts, T3 pages — is reachable in two keystrokes. This is what permits a six-item header on a forty-page site, and it's itself a seniority signal to the developer audience.
- **One CTA, always visible.** "Let's talk," not "Hire Me" — lower pressure, higher conversion, and it works for all four audiences.

**Footer — the full IA.** Four columns exposing every route including T3. Footers are where crawlers and determined humans both go.

**Mobile** — full-screen sheet with correct dialog semantics (fixing §2 of the audit), search first.

### 11. Homepage composition

Ordered by the 30-second job, then progressive depth:

| # | Block | Job served | Notes |
|---|---|---|---|
| 1 | **Hero** | Recruiter | Name, positioning, availability, 2 CTAs. Proof *in* the hero, not below it. |
| 2 | **Proof bar** | Recruiter | Play Store link, years, apps shipped, users — verifiable numbers only |
| 3 | **Featured work** | Lead / Client | 2–3 case studies, editorial layout — not a card grid |
| 4 | **Current focus** | All | "What I'm building now" — signals live activity, links `/now` |
| 5 | **Selected writing** | Lead / Dev | 3 latest posts with reading time |
| 6 | **Tech stack** | Lead | Grouped by domain, each linked to proof |
| 7 | **Experience** | Recruiter | Condensed timeline → `/experience` |
| 8 | **Open source** | Dev | Contribution graph, packages |
| 9 | **Testimonials** | Client | *Rendered only when real ones exist* |
| 10 | **Newsletter** | Dev | Single field, honest expectations |
| 11 | **Contact CTA** | All | The close |
| 12 | **Footer** | All | Full IA |

**Deliberately omitted:** a full skills grid (it's a page), the full project list (it's a page), a long bio (it's a page). The homepage is a *lobby*, not a lobby with the whole building inside it.

### 12. Case-study template

The brief lists fifteen sections per project. Applied uniformly to four projects, that produces four identical documents with visible padding. Instead — a **required spine** plus **optional modules** the content decides:

**Required:** Hero · Context (problem + constraints) · Approach · Architecture · Outcome (metrics) · Stack · Links

**Optional, included only when there's something real to say:** Screenshots · Challenges · What went wrong · Lessons · Timeline · Downloads · Future work

A case study that admits *"I chose GetX here and would choose Riverpod today, because…"* is worth more than fifteen filled-in headings. **The template must permit variable depth, or it will manufacture filler.**

### 13. URL and taxonomy rules

- Lowercase, hyphenated, no dates in paths (posts get updated; URLs shouldn't lie)
- **Slugs are permanent.** Renames require redirects — enforced in review.
- **Tags** — technology and topic (`flutter`, `architecture`, `state-management`). Cap ~20; a tag with one post is noise.
- **Series** — ordered, with prev/next and a series index. The highest-value blog structure for demonstrating depth: five posts on one architecture decision beats twenty scattered tips.
- Canonical on every page. `og:image` per route.

---

## 14. Decisions locked

| Decision | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16, App Router** | Static generation, per-route metadata, RSC, best-in-class image and font pipelines |
| Language | **TypeScript, strict** | Content schemas and props typed end to end |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` tokens; makes the design system the *only* way to express a value (audit §3) |
| Components | **Radix primitives (shadcn pattern)** | Accessible dialog/popover/menu behaviour we would otherwise re-implement badly — see the mobile-menu finding |
| Content | **Velite + MDX** | §6 |
| Motion | **Motion (`motion` v12)** | Successor to framer-motion; needed for shared-layout and page transitions |
| Highlighting | **Shiki via rehype-pretty-code** | Build-time, zero client JS, real TextMate grammars |
| Hosting | **Vercel** | Per the brief; image optimisation, edge caching, OG generation, analytics |
| Theme | **Light + dark, system-aware** | Audit §3 |
| Rendering | **Static by default** | Every content route pre-rendered |

---

*Phase 4 (Wireframes) and Phase 5 (Design System) are captured in [`03-design-system.md`](03-design-system.md). Execution sequencing lives in [`../PLAN.md`](../PLAN.md).*
