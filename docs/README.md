# docs/

Living architecture & reference documentation for The Mall. Update these as the system changes — they should always describe reality, not a stale snapshot.

| File | What's in it |
|---|---|
| `00-current-state-audit.md` | Honest inventory of the current codebase: website builder, Search Post editor, DB schema, tech stack, known debt |
| `01-website-builder-architecture.md` | Target architecture for Website Builder v2 — canvas, component registry, design tokens, DND, undo/redo, autosave, assets, and how Search Post shares it |
| `02-database-schema.md` | Current Mongoose schemas, proposed replacement schemas, migration strategy |
| `03-roadmap.md` | Phased build-out plan and status |

## `docs/` vs `plans/`

- **`docs/`** — how the system currently works and where it's headed. Should stay accurate; edit in place as things change.
- **`plans/`** (repo root, predates this folder) — "here's how we implemented feature X," written once, can go stale after shipping. Keep using it for narrowly-scoped feature plans (e.g. `plans/partial_update_autosave_plan.md`); use `docs/` for anything architectural or cross-cutting.
