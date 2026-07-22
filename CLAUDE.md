# CLAUDE.md

Personal brand site for **Mohamed Mamoun** — senior mobile engineer (Flutter). Portfolio + technical blog + knowledge base.

Read [`PLAN.md`](PLAN.md) for current phase. Design decisions live in [`docs/`](docs/) — **check there before changing anything visual**; most "why is it like this" questions are already answered.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, RSC, static by default |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Content | Velite + MDX → `.velite/` (generated, gitignored) |
| Components | Radix primitives, shadcn pattern |
| Motion | **CSS transitions + IntersectionObserver** — no animation library |
| Highlighting | Shiki via `rehype-pretty-code` (build time) |
| Deploy | Vercel |

## Commands

```bash
npm run dev              # dev server
npm run build            # production build
npm run check            # typecheck + lint + contrast — run before any commit
npm run typecheck        # tsc --noEmit
npm run lint             # eslint + jsx-a11y + next
npm run check:contrast   # WCAG AA gate; parses tokens out of globals.css
npm run content          # rebuild .velite/ from content/ (velite --strict)
npm run optimize:images  # re-encode oversized sources in public/images
```

`dev` and `build` run Velite first. It is deliberately **not** hooked into
`next.config.ts` — Next 16 loads its config synchronously (no top-level await), and
coupling a content pipeline to the bundler is what killed Contentlayer.

## Layout

```
src/app/            routes (App Router)
src/components/
  ui/               primitives — Button, Card, Dialog…
  layout/           Container, Section, Header, Footer, Prose
  motion/           Reveal, Stagger, PageTransition
  content/          ProjectCard, PostCard, TOC, CodeBlock…
  features/         CommandMenu, ThemeToggle, Newsletter…
src/lib/            utils, metadata, content queries
src/styles/         globals.css — all @theme tokens
content/
  posts/            *.mdx
  projects/         *.mdx
  site.ts           typed profile data (name, socials, stats)
docs/               audit, strategy, IA, design system
```

---

## Non-negotiables

These encode findings from the audit. Violating one re-introduces a bug we already fixed.

1. **No raw values for token concerns.** No inline `style={{}}` (ESLint-enforced), no arbitrary colour/type/spacing (`text-[13px]`, `p-[18px]`, `#5b56e0`). If a token doesn't exist, add it to `@theme` — don't work around it. *(The previous site had a good token system and ~800 lines of inline styles bypassing it.)* Arbitrary values are acceptable **only** for one-off decorative geometry (a gradient blob's radius), never for anything the design system names.

2. **Every text/background pair ≥ 4.5:1 in both themes.** `pnpm check:contrast` gates this. The old palette had four measured AA failures because nothing checked.

3. **Semantic colour tokens only** — `text-secondary`, `surface-raised`. Never `zinc-400`, never a shade number.

4. **Every route is a real URL.** Never put linkable content behind local state. *(Old case studies were modals: unlinkable, unindexable, lost on refresh.)*

5. **Motion:** `transform`/`opacity` only. Scroll reveals 400ms / 12px. Stagger delays live in `globals.css` as `nth-child` rules — never hand-typed per component. `prefers-reduced-motion` disables everything.

   **No animation library.** `motion` was removed after measuring 118 KB on every route to fade elements in by 12px. If something genuinely needs spring physics or shared-layout transitions, load it dynamically on that route only — never from the root layout.

   **Reveals must never be able to hide content permanently.** The hiding CSS is scoped to `.js`, a class added by a head script *only when `IntersectionObserver` exists*. No JS, no observer, no script → content renders. Preserve this property.

6. **Heavy client features load on intent, not on page load.** `cmdk` (~63 KB) is in the header on every route, so `CommandMenuTrigger` ships a button and dynamically imports the menu on hover, click, or ⌘K. Apply the same pattern to anything comparable.

6. **Every interactive element needs hover + active + focus-visible.** 44×44px minimum touch target.

7. **Overlays use Radix** (Dialog/Sheet). Never hand-roll focus trapping. *(The old mobile menu had none.)*

8. **Images:** `next/image`, explicit dimensions, `alt` (or `alt=""` if decorative), lazy below the fold. No unoptimised PNG/JPEG.

9. **Client components are the exception.** `"use client"` only where interactivity demands it, and as deep in the tree as possible. Content routes ship near-zero JS.

10. **Every page exports `metadata`** with title, description, canonical, and OG image.

---

## Content integrity

**Never fabricate social proof.** No invented testimonials, fake company logos, imaginary talks, or placeholder metrics that read as real. A fake quote from "Sarah Chen, CTO" is a lie on someone's professional website.

Where content doesn't exist yet: render an honest empty state or omit the section. Pages without real content stay out of primary navigation (tier T3 in `docs/02` §9) — they do not ship "coming soon" screens.

Statistics must be verifiable. Prefer one sourced number over three round ones.

---

## Voice

The audit identified two voices in the old copy. Use the second one.

- ❌ *"beautiful, high-performance applications that users love"* — generic, could be anyone
- ✅ *"Big tasks stall people. To-do lists record the paralysis; they don't fix it."* — specific, has a point of view

Write like an engineer explaining a decision to a peer. Concrete over adjectival. Admit trade-offs — "I chose GetX here and would choose Riverpod today, because…" is worth more than any superlative.

Anchor line: **"I build mobile apps that feel inevitable."**

---

## Conventions

- Components: named exports, `PascalCase.tsx`, colocated types
- Files: `kebab-case.ts` for lib, `PascalCase.tsx` for components
- Prefer composition over props explosion; no `variant` prop with 9 options
- `cn()` from `lib/utils` for class merging
- Content queries live in `lib/content.ts` — components never read `.velite/` directly
- Slugs are permanent. A rename requires a redirect.
