# Roadmap — Website Builder v2

_Last updated: 2026-07-03_

Phased so each step ships something verifiable and nothing is a big-bang rewrite. Check off / annotate as we go — this file should reflect actual status, not the original plan. Update `00-current-state-audit.md` as items here land.

## Phase 0 — Foundation cleanup ✅ applied 2026-07-03 (parallel to everything else)
- [x] `@dnd-kit` only, drop `react-dnd` — applied and verified via live grep (4 call sites, all `*MenubarSettings.tsx`), `npm run build` passes. Browser smoke-test of the drag-reorder UI still outstanding.
- [x] `@tiptap/*` v3 only, drop legacy `tiptap` v1 — applied, verified via live grep.
- [x] Decide UI primitive foundation — **corrected from the first pass**: MUI has real usage (`Slider` in `SettingsSlider.tsx`, an icon in 5 files) and is staying installed, not just "one icon" as first estimated. Headless UI also stays (booking flow). `@shadcn/ui` npm package (not real shadcn) removed. Going with the shadcn *pattern* (Radix + Tailwind + `cva`, source copied in) for the new Phase 2 vendor-facing primitives specifically — doesn't require touching MUI or Headless UI's existing usage. Reasoning: `04-phase-0-findings.md`.
- [x] Remove `backend/models/NewStoreLayout.js` — applied, verified via live grep.
- [x] Fix the mismatched `FastFoodFooter` → `sections.about` fallback — key fixed; a residual data-shape mismatch remains (no `logo`, wrong `text` keys) and is intentionally deferred to Phase 1.
- [x] (bonus) `zustand` — applied, verified via live grep.
- [x] (bonus) `@shadcn/ui` — applied, verified via live grep.

**Corrections found during application** (search-based estimates vs. live-repo reality): `mockLayout.ts` has ~20 importers, not the 6 originally catalogued — full inventory deferred to Phase 1. MUI's usage was undercounted (see above). Full detail: `04-phase-0-findings.md`.

## Phase 1 — Data model + registry skeleton
- [ ] **Complete inventory pass first** (live repo, not search-index) — full catalog of every section type + variation (render component, settings component, current default-config shape), every `mockLayout.ts` importer (~20, not the 6 in `04-phase-0-findings.md`) with its usage pattern, written to `docs/05-phase-1-inventory.md`. Phase 0 showed search-index estimates undercount real scope by ~3x — don't design the registry schema against an incomplete list.
- [ ] Add `draftTree` / `tree`-shaped fields alongside legacy `StoreLayout` fields (additive, see `02-database-schema.md`)
- [ ] Stand up the code-based component registry with existing section+variation pairs mapped 1:1 (no visual changes — this is re-plumbing, not a redesign)
- [ ] Write the legacy → tree converter

## Phase 2 — Design tokens + styled primitives
- [ ] Formalize the theme object (open color/font token map)
- [ ] Build the primitives library (Button, Card, Badge, Input, Heading/Text) with variants

## Phase 3 — Canvas rebuild
- [ ] Harden the postMessage bridge (explicit origin, patches instead of full state)
- [ ] Add the iframe → parent select/hover return channel
- [ ] Palette → canvas drag-and-drop insertion (`@dnd-kit`)
- [ ] Registry-schema-driven settings panel (replacing hand-built per-variation forms, starting with new blocks; migrate old ones opportunistically)

## Phase 4 — Migrate Website Builder
- [ ] New builder UI on the new engine, behind a flag
- [ ] Store-by-store rollout, screenshot-diff verified (Puppeteer/Playwright)
- [ ] Extract the shared undo/redo + autosave-diff implementation, used here first

## Phase 5 — Migrate Search Post editor
- [ ] Rebuild as a thin shell over the same engine (one block, no canvas DND needed — see `01-website-builder-architecture.md`)
- [ ] Retire `searchPostSettingsSlice.ts`'s duplicated history logic in favor of the shared implementation from Phase 4

## Phase 6 — Cleanup
- [ ] Drop legacy `sections`/`routes.contains` fields once all active stores are confirmed migrated
- [ ] Delete retired switch-statement render/settings components and per-variation default-config files
- [ ] Delete `react-dnd`, legacy `tiptap`, and unused UI-library dependencies from `package.json`
- [ ] Update `00-current-state-audit.md` to reflect the new reality (it should describe v2, not v1, once this ships)
