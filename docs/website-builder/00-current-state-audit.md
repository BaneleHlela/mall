# Current state audit

_Last updated: 2026-07-03_

What exists today. Written to ground the Website Builder v2 work in reality rather than assumptions — update this doc if it drifts out of date, especially once v2 work lands (see `03-roadmap.md` Phase 6).

## The two builders

### Website Builder (`frontend/src/pages/layout_editor/WebsiteBuilder.tsx`)

Edits a `StoreLayout` document. Shell: `TopBar` (exit/save/undo/redo/device-selector) + `LayoutSettings` (left panel) + a live preview rendered inside a real `<iframe>`.

- **Preview sync**: the parent posts the *entire* `layoutSettings` Redux state into the iframe on every change (`iframe.contentWindow.postMessage({ layoutSettings: settings }, "*")`, see `Layouts.tsx`). The iframe's `src` is an in-app preview route (`/layouts/:id/preview/*`) rendering the real storefront components — not a sandboxed document.
- **Content model**: a page (`route`) is an ordered list of section keys (`routes.home.contains: ["hero","about",...]`), reorderable via `@dnd-kit`'s `SortableContext` in the settings panel. Each section key maps to a **hardcoded React component** via a `sectionMap` in `StoreHomePage.tsx` (and equivalents for other routes).
- **Variations**: most section components branch internally on a `variation` string (e.g. About has 7: `aboutWithImageNextToText`, `aboutWithImageBehindText`, `doctorAbout`, `shortAbout`, ...). Each variation is its own hand-built render component **and** its own hand-built settings-form component, wired through two parallel `switch` statements that have to be kept in sync manually (`getSectionComponent` in the render tree, `renderSettings` in the settings panel).
- **Defaults**: each variation has a bespoke, deeply-nested default-config file under `frontend/src/utils/defaults/sections/**` (e.g. `defaultHeroWithReviewCardAndEmailFormConfig.ts`). Separately, `frontend/src/major_updates/mockLayout.ts` is a giant hand-written mock object with six known importers, tangled into production code rather than kept as a dev fixture. It's not one consistent problem: `FastFoodFooter.tsx` had a mismatched fallback (fixed — see `04-phase-0-findings.md`); `EnnockHero.tsx` isn't using it as a fallback at all — it's the *only* source of that variant's styling, so that variant isn't actually editable through Redux/the settings panel today; a few other importers look like dead imports pending a closer look. Full breakdown in `04-phase-0-findings.md`.
- **Undo/redo**: `layoutSettingsSlice.ts` keeps a `_history: Layout[]` array of full state snapshots + `_historyIndex`, pushed on every `updateSetting` call (unless `skipHistory`).
- **Autosave**: 500ms-debounced. Dirty fields are tracked by diffing current vs. last-saved state, but only for fields explicitly listed in two hand-maintained arrays (`PARTIAL_UPDATE_FIELDS`, `SECTION_FIELDS` in `WebsiteBuilder.tsx`) — a new top-level or section field silently won't autosave until someone remembers to add it here.
- **Screenshots**: captured via Puppeteer/Playwright against the preview route, uploaded to GCS (`captureLayoutScreenshot`), used as layout thumbnails.

### Search Post editor (`frontend/src/pages/creators_dashboard/supporting/SearchPostsEditor.tsx`)

Same shell pattern (TopBar/Settings/Preview/device/zoom/undo-redo), edits a single `SearchPost` document instead of a page of sections — one configurable widget (`variation`: carousel/grid/list) that surfaces `stores`/`products`/`services`/`departments` with its own `style` block (text/colors/content/button).

- Has its **own** `searchPostSettingsSlice.ts` with undo/redo logic that's a near line-for-line copy of `layoutSettingsSlice.ts`'s.
- Simpler data shape (one widget, not a section tree) — this is the "simpler" system you described, and structurally it's already halfway to being a single reusable "block" in the sense Website Builder v2 needs.

## Data model today

- **`StoreLayout`** (`backend/models/StoreLayout.js`): `sections`, `routes`, `floats`, `background`, `menubar` are all untyped Mongoose `Mixed` (`{}`) — no server-side shape validation. `sections` is a fixed object with one key per known section type (`hero`, `about`, `products`, ...) rather than an ordered/nestable structure. `colors`/`fonts` are fixed named slots (5 colors, 3 fonts) rather than an open token system.
- **`SearchPost`** (`backend/models/SearchPostModel.js`): same pattern — `style.text`/`style.colors`/`style.content` are empty `Mixed` objects (the intended shape only exists as commented-out placeholders in the schema file itself).
- **`Section`** (`backend/models/SectionModel.js`): a *different* thing from `StoreLayout.sections` — a small catalog of section-variation thumbnails (`images.mobile`/`images.desktop`) that powers the "pick a section" gallery UI. Effectively a proto template picker.
- **`NewStoreLayout`** (`backend/models/NewStoreLayout.js`): an incomplete alternate `StoreLayout` schema (no sections, no routes, no timestamps) — dead code from an earlier attempt.

## Tech stack notes relevant to this rebuild

Frontend `package.json` has some redundant/overlapping choices worth resolving as part of this work rather than around it:

| Concern | Installed | Status |
|---|---|---|
| Drag & drop | `@dnd-kit/*` only | **Resolved.** `react-dnd` was in real use (`OrderDnD.tsx`), ported to `@dnd-kit`, dependency removed. See `04-phase-0-findings.md`. |
| Rich text | `@tiptap/*` v3 only | **Resolved.** Legacy `tiptap` v1 had no real usage; removed. |
| UI components | MUI (real: `Slider` in `SettingsSlider.tsx` + an icon in 5 files), Headless UI (real: `Listbox` in the booking flow), Radix (unused directly, kept for later), `@shadcn/ui` (removed — not real shadcn) | **Resolved.** MUI and Headless UI both stay — genuinely used. New vendor-facing primitives (Phase 2) use the shadcn pattern instead of adding to either. See `04-phase-0-findings.md`. |
| Styling | Tailwind v4 + `sass-embedded` | **Still open.** Tailwind is doing the real work; confirm whether Sass is still needed anywhere. |
| State | Redux Toolkit only | **Resolved.** `zustand` had no real usage found; removed. |

Backend has the same "hand-maintained list that silently goes stale" pattern as the frontend's autosave field arrays: `StoreLayoutController.js`'s `updateLayoutConfig` checks each `sections.*` key individually in a long if-chain rather than assigning the object once — another thing the generic `tree` shape in `02-database-schema.md` removes by construction.

## What's already good and worth keeping

- The iframe-based preview with a postMessage bridge is architecturally the right call — it's what industry page builders do. It needs hardening, not replacing.
- `@dnd-kit` is already correctly chosen and working for list reordering.
- The autosave/dirty-tracking *concept* (debounce + partial PATCH) is sound; it just needs to stop depending on hand-maintained field lists.
- `StoreDivTag.tsx` is a genuine shared layout primitive already in use across sections — proof the codebase already has some reuse instincts to build on.
- The `Section` thumbnail-gallery model is a reasonable seed for a proper template/block picker.
- The "duplicate a demo layout, land straight in the builder" flow (`LayoutCreator.tsx`) is a good pattern worth keeping for whole-page templates too.
