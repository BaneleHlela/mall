# CLAUDE.md

Orientation doc for working on **The Mall** — read this first in any new session.

## What this is

The Mall is a vendor commerce + social platform (South Africa, starting in the eMadadeni township). Vendors get a store with orderable products, bookable services, and a customizable website; customers browse a social-style feed, search, and shop. Single-developer MVP, pre-launch stage.

Full pitch/business context lives in `frontend/src/utils/businessPlanContent.tsx` if you need it — don't duplicate that here.

## Stack

**Frontend** — `frontend/`: React 19 + TypeScript, Vite 6, Redux Toolkit + react-redux, React Router 7, Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first config), Framer Motion, TipTap v3 (rich text).

**Backend** — `backend/` (served from the root `package.json`, `node backend/server.js`): Node + Express 5, Mongoose 8 / MongoDB, Redis (`ioredis`), Google Cloud Storage for uploads, Puppeteer + Playwright (screenshot capture), JWT + Passport (Google/Facebook OAuth), Twilio, Nodemailer.

Commands: `npm run dev` (root, nodemon backend), `cd frontend && npm run dev` (Vite).

## Repo layout

```
backend/       Express API, Mongoose models, controllers
frontend/      React app
plans/         Point-in-time implementation plans for specific features
docs/          Living architecture & reference docs (added 2026-07-03)
```

`plans/*.md` = "here's how we're building feature X" — can go stale once shipped. `docs/*.md` = "here's how the system currently works / where it's headed" — kept current. See `docs/README.md`.

## Things to know before touching the codebase

The project grew fast with minimal initial structure, so a few things are still tangled. Don't add to these — ask/flag instead:

- **Two drag-and-drop libraries** are installed: `@dnd-kit/*` (actively used — section reordering in the layout settings panel) and `react-dnd` (status unclear, likely unused — confirm before removing). Default to `@dnd-kit` for anything new.
- **Two TipTap generations** are installed: `@tiptap/*` v3 (current, used in `RichTextEditor.tsx`) and a legacy `tiptap` v1 package (Vue-oriented, almost certainly dead weight). Use `@tiptap/*` only.
- **Four overlapping UI/component libraries** are installed: MUI, Headless UI, Radix (direct), and `@shadcn/ui`. None is fully committed to. See `docs/01-website-builder-architecture.md` for the recommended direction.
- **`frontend/src/major_updates/mockLayout.ts`** is a large hand-written mock object that several *live* section components (`FastFoodFooter.tsx`, `SingleStoreProductSection.tsx`, others) fall back to when Redux state is empty. At least one fallback is mismatched (the footer section falls back to `mockLayout.sections.about`). Treat this file as legacy scaffolding, not a source of truth — don't extend it.
- **`backend/models/NewStoreLayout.js`** is an incomplete, unused alternate schema — dead code from an earlier attempt, safe to remove once confirmed unreferenced.
- Content fields on `StoreLayout` (`sections`, `routes`, `floats`, `background`, `menubar`) are all untyped Mongoose `Mixed` (`{}`) — no server-side validation today. Being replaced; see `docs/02-database-schema.md`.
- `zustand` is installed alongside a deeply-integrated Redux Toolkit setup — worth a quick audit of what it's actually used for. Keep new builder state in Redux Toolkit for consistency either way.

## Current major initiative: Website Builder v2

Rebuilding the website builder — and, consistently, the Search Post editor — into a proper component-based system: canvas + component registry + reusable styled primitives + drag-and-drop + design tokens, replacing the current fixed-section/`Mixed`-blob approach.

Start here:
1. `docs/00-current-state-audit.md` — what exists today and why it's limiting
2. `docs/01-website-builder-architecture.md` — target architecture
3. `docs/02-database-schema.md` — current vs. proposed schema + migration approach
4. `docs/03-roadmap.md` — phased plan / current status

Keep these updated as decisions get made or reversed — that's the whole point of this folder existing.
