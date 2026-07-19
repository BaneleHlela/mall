# docs/

Living architecture & reference documentation for The Mall. Update these as the system changes — they should always describe reality, not a stale snapshot.

## Structure

- **`product/`** — what the platform is, who it's for, and how to run it locally: `overview.md`, `user-personas.md`, `setup.md`.
- **`design/`** — design/asset-level reference, e.g. `asset-locations.md` (GCS bucket/path structure).
- **`business/`** — business context: `pricing.md`, `growth-strategy.md`. Full pitch/business-plan content lives in `frontend/src/utils/businessPlanContent.tsx`; these docs summarize and point back to it, not duplicate it.
- **`website-builder/`** — workstream folder for the Website Builder v2 overhaul (canvas, component registry, design tokens, DND, schema migration). Numbered files, own [`README.md`](website-builder/README.md).
- **`search-posts/`** — workstream folder for the current active Search Posts work (editor unification with the website builder, ranking algorithm, analytics).

Category folders (`product/`, `design/`, `business/`) describe things that don't go stale quickly. Workstream folders (`website-builder/`, `search-posts/`) track active, evolving initiatives — expect more churn there.

## `docs/` vs `plans/`

- **`docs/`** — how the system currently works and where it's headed. Should stay accurate; edit in place as things change.
- **`plans/`** (repo root, predates this folder) — "here's how we implemented feature X," written once, can go stale after shipping. Keep using it for narrowly-scoped feature plans (e.g. `plans/partial_update_autosave_plan.md`); use `docs/` for anything architectural, cross-cutting, or that needs to stay current.
