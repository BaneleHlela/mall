# CLAUDE.md

Orientation doc for working on **The Mall** — read this first in any new session.

## What this is

The Mall is a vendor commerce + social platform (South Africa, starting in the eMadadeni township). Vendors get a store with orderable products, bookable services, and a customizable website; customers browse a social-style feed, search, and shop. Single-developer MVP, pre-launch stage.

Full pitch/business context lives in `frontend/src/utils/businessPlanContent.tsx` if you need it — don't duplicate that here.

Docs are organized by category under `docs/` — see [`docs/README.md`](docs/README.md) for the full index before adding a new doc file.

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

- **`react-dnd`, legacy `tiptap` v1, and `zustand`** were audited and removed from `package.json` (Phase 0, 2026-07-03) — `react-dnd`'s one real call site, `OrderDnD.tsx`, was ported to `@dnd-kit` first. Default to `@dnd-kit` and `@tiptap/*` v3 for anything new; don't reintroduce the others without a reason. Full trail: `docs/website-builder/04-phase-0-findings.md`.
- **UI foundation: MUI and Headless UI both stay, `@shadcn/ui` removed.** MUI turned out to have real usage (`Slider` in `SettingsSlider.tsx`, plus an icon in 5 files — the first pass undercounted this) and wasn't removed. `@headlessui/react` is genuinely used for the booking flow's dropdowns (`Listbox` in `BookDesktopUI.tsx` and friends) and also stays. The vestigial `@shadcn/ui` npm package (not real shadcn — that's a CLI, no runtime dependency) was removed. Decision for new work: the vendor-facing primitives library (Phase 2) uses the shadcn *pattern* (Radix + Tailwind + `cva`, source copied into `components/ui/`) — doesn't require touching MUI or Headless UI. See `docs/website-builder/04-phase-0-findings.md`.
- **`frontend/src/major_updates/mockLayout.ts`** is a large hand-written mock object with six known importers (a live grep during Phase 0 found closer to ~20) and more than one problem pattern — a mismatched fallback (fixed, see below), a section (`EnnockHero`) that reads *only* from this file and isn't actually editable, and a couple of dead/unclear imports. See `docs/website-builder/04-phase-0-findings.md`. Treat this file as legacy scaffolding, not a source of truth — don't extend it.
- **`backend/models/NewStoreLayout.js`** was an incomplete, unreferenced alternate schema — deleted as part of Phase 0.
- Content fields on `StoreLayout` (`sections`, `routes`, `floats`, `background`, `menubar`) are all untyped Mongoose `Mixed` (`{}`) — no server-side validation today. Being replaced; see `docs/website-builder/02-database-schema.md`.
- **`backend/config/redis.js`** connects using a hardcoded Upstash Redis connection string in source, not an env var. Known, not yet cleaned up — don't copy this pattern for new integrations.
- **Mongo env var naming is inconsistent**: most of the codebase reads `MONGODB_URL`, but a handful of scripts read `MONGODB_URI` or `MONGO_URI` instead. See `docs/product/setup.md`.

## Current major initiative: Website Builder v2

Rebuilding the website builder — and, consistently, the Search Post editor — into a proper component-based system: canvas + component registry + reusable styled primitives + drag-and-drop + design tokens, replacing the current fixed-section/`Mixed`-blob approach.

Start here:
1. `docs/website-builder/00-current-state-audit.md` — what exists today and why it's limiting
2. `docs/website-builder/01-website-builder-architecture.md` — target architecture
3. `docs/website-builder/02-database-schema.md` — current vs. proposed schema + migration approach
4. `docs/website-builder/03-roadmap.md` — phased plan / current status

Keep these updated as decisions get made or reversed — that's the whole point of this folder existing.

## Also active: Search Posts

Bringing the Search Posts editor in line with the website builder's component system, plus a ranking algorithm and vendor-facing analytics for post performance. See [`docs/search-posts/overview.md`](docs/search-posts/overview.md) — includes an open architecture question (iframe vs. in-document rendering) that should get recorded there once decided.

## Build / status checklist

Grouped by area, reflects what's actually true in the repo as of 2026-07-19 — update as things ship.

**Website Builder**
- [x] Section-based layout with fixed components (current, being replaced)
- [x] Phase 0 dependency/dead-code cleanup (`react-dnd` → `@dnd-kit`, `tiptap` v1/`zustand`/`@shadcn/ui` removed, `NewStoreLayout.js` deleted)
- [ ] Component registry / canvas architecture (Phase 1+, see roadmap)
- [ ] Typed schema replacing `Mixed` content fields
- [ ] Vendor-facing styled primitives library (`components/ui/`, shadcn pattern)

**Search Posts**
- [x] CRUD (model, controller, routes, editor UI, search-page rendering)
- [ ] Shared component system with website builder
- [ ] Ranking algorithm (schema has `stats.clicks` / `stats.likelihoodIndex`, no scoring logic wired up)
- [ ] Vendor-facing analytics view
- [ ] Rendering-approach decision (iframe vs. in-document) recorded

**Dashboards**
- [x] Store owner (creator's) dashboard
- [x] Platform admin dashboard

**Commerce**
- [x] Products, services, rentals, donations (CRUD + GCS image upload)
- [x] Booking flow (service/staff/date selection)
- [x] PayFast payment integration
- [ ] Pricing-tier feature differentiation (Standard/Enterprise currently list identical features to the pre-launch plan — see `docs/business/pricing.md`)

**Auth & comms**
- [x] Email/password + Google/Facebook OAuth
- [x] Email (SMTP) and WhatsApp (Twilio) messaging
- [ ] `.env.example` (doesn't exist yet — see `docs/product/setup.md` for the inferred variable list)
