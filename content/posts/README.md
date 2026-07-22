# ⚠️ Seed posts need factual review before launch

The two `.mdx` files in this directory were **drafted by Claude** to exercise the blog
pipeline end to end — MDX, syntax highlighting, callouts, tables, TOC, series
navigation, related posts, RSS, and OG images.

**They are not verified fact.**

The *decisions* they describe are real — they're derived from your own project data
(Focus Flow is offline-first with Gemini; Ajeep uses Bloc; Zoon uses GetX). But the
supporting narrative detail is invented, including:

| File | Invented specifics to check |
| --- | --- |
| `offline-first-is-a-trust-decision.mdx` | The streak-counter merge bug, "~200 lines" for the sync queue, per-field last-write-wins as the chosen strategy, the exact `TaskRepository` / `SyncQueue` API |
| `state-management-is-a-per-project-decision.mdx` | The claim you'd choose Riverpod over GetX today, the `LessonBloc` / `CartController` shapes, that `blocTest` covers payment logic |

## Before publishing

For each post, either:

1. **Correct it** so every specific matches what you actually built, or
2. **Set `draft: true`** in the frontmatter — drafts are excluded from the production
   build, RSS, and the sitemap, but still render in `npm run dev`.

Publishing an invented war story under your own name is the exact failure mode
`CLAUDE.md § Content integrity` exists to prevent. The pipeline is proven; the words
need to become yours.

Delete this file once both posts are reviewed.
