# Roadmap — Website Builder v2

_Last updated: 2026-07-03_

Phased so each step ships something verifiable and nothing is a big-bang rewrite. Check off / annotate as we go — this file should reflect actual status, not the original plan. Update `00-current-state-audit.md` as items here land.

## Phase 0 — Foundation cleanup (parallel to everything else)
- [ ] Decide + document: `@dnd-kit` only, drop `react-dnd` (confirm nothing depends on it first)
- [ ] Decide + document: `@tiptap/*` v3 only, drop legacy `tiptap` v1
- [ ] Decide UI primitive foundation (recommend `@shadcn/ui` + Tailwind — see `01-website-builder-architecture.md` §3); no silent full migration, just stop growing the other three
- [ ] Remove `backend/models/NewStoreLayout.js` (confirm truly unused first)
- [ ] Fix or scope down `frontend/src/major_updates/mockLayout.ts` fallback usage, starting with the mismatched `FastFoodFooter` → `sections.about` fallback

## Phase 1 — Data model + registry skeleton
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
