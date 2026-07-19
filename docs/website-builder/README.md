# docs/website-builder/

Docs for the Website Builder v2 overhaul specifically — canvas, component registry, design tokens, drag-and-drop, and the schema migration away from the current fixed-section/`Mixed`-blob approach. Numbered so they read in order; kept as their own folder because this is a large, multi-phase initiative distinct from the rest of the project's docs (see `../README.md` for the full `docs/` structure).

| File | What's in it |
|---|---|
| `00-current-state-audit.md` | Honest inventory of the current codebase: website builder, Search Post editor, DB schema, tech stack, known debt |
| `01-website-builder-architecture.md` | Target architecture for Website Builder v2 — canvas, component registry, design tokens, DND, undo/redo, autosave, assets, and how Search Post shares it |
| `02-database-schema.md` | Current Mongoose schemas, proposed replacement schemas, migration strategy |
| `03-roadmap.md` | Phased build-out plan and status |
| `04-phase-0-findings.md` | Audit trail for the Phase 0 dependency/dead-code cleanup pass (2026-07-03) |
| `phase-0-cleanup-execution.md` | The Claude Code execution prompt used to run Phase 0 |

Keep these updated as decisions get made or reversed — that's the whole point of this folder existing.
