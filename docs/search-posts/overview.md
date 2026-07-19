# Search Posts — overview

_Last checked against code: 2026-07-19._

## What Search Posts are

Search Posts are content units vendors create that surface on the platform's **search/discovery page** (`MallSearchPage.tsx`, fed by `SearchPostsFeed.tsx` / `RenderSearchPost.tsx`) — carousels, grids, and lists that showcase a store's products, services, or bundles to shoppers browsing or searching. They are distinct from the general home-page social posts feed (`SimplePosts.tsx` and friends); a Search Post's job is discovery/merchandising, not the social feed.

Vendors build Search Posts in the creator's dashboard via `SearchPostsEditor.tsx` / `SearchPostsDashboard.tsx`, using `SearchPostsSettings.tsx` for configuration and `SearchPostsPreview.tsx` for a live preview. State lives in `searchPostSlice.ts` and `searchPostSettingsSlice.ts`; the schema is `backend/models/SearchPostModel.js`, served through `SearchPostController.js` and `searchPostRoutes.js`. author_feedback: Search posts are currently managed by the admin, we will later set up a system for vendors to also create ones for their stores though.  

A post has a `variation` (carousel / grid / list), a `type`, optional `departments`, and references to `stores`/`products`/`services` — plus a `style` object (text, colors, content, button) that's currently unstructured/sparse (mostly commented-out placeholder fields in the schema today). author_feedback: departments is for display the post in the relevant in the search page. 

## Current work

- **Bringing the Search Posts editor in line with the website builder.** The website builder ([`docs/website-builder/`](../website-builder/)) is being rebuilt around a canvas + component registry + reusable styled primitives + design tokens. Search Posts editing is a natural candidate to share that same component/editing system rather than maintaining a second, parallel editor.
- **A ranking/display algorithm for how posts surface on the search page.** The schema already has a `stats` sub-object with `clicks` (Number, default 0) and `likelihoodIndex` (Number, default 1) — scaffolding for ranking exists, but there's no actual scoring/ranking logic wired up yet. Posts currently don't appear to be ordered by these fields anywhere found in the codebase; this is greenfield work.
- **Analytics so vendors get feedback on how their posts are performing.** `clicks` is tracked on the model, but there's no vendor-facing analytics view found yet (no impressions, CTR, or trend-over-time surfaced in the dashboard). Also greenfield.

## Open architecture question: iframe vs. in-document rendering

The website builder previews through an **iframe + `postMessage`** (`WebsiteBuilder.tsx`, `Layouts.tsx`). Search Posts currently render **in-document** — `SearchPostsPreview.tsx` renders `RenderSearchPost` directly inside the editor's own React tree, no iframe involved.

Since the two editors are being brought closer together, this is a natural point to decide whether to unify on one rendering approach. **In-document was the approach previously favored** for Search Posts specifically, to avoid `@dnd-kit` sensor issues crossing an iframe boundary (drag-and-drop sensors don't reliably track pointer/keyboard events across an iframe's separate document). No final decision has been recorded yet on whether the website builder should move to in-document rendering to match, or whether Search Posts should move toward iframe isolation, or whether both are kept as-is with a shared editing layer above the rendering boundary. **Record the actual decision here once it's made.**

## Implementation state (as of 2026-07-19)

| Piece | Status |
|---|---|
| Search Post CRUD (model, controller, routes) | Built |
| Editor UI (`SearchPostsEditor`, `SearchPostsSettings`, `SearchPostsPreview`) | Built |
| Search page rendering (`MallSearchPage`, `SearchPostsFeed`, `RenderSearchPost`) | Built |
| Shared component system with website builder | Not started |
| Ranking algorithm using `stats.clicks` / `stats.likelihoodIndex` | Not started — fields exist, no scoring logic found |
| Vendor-facing analytics view | Not started |
| Rendering-approach unification (iframe vs. in-document) | Undecided |
