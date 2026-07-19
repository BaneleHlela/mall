# Phase 0 cleanup — Claude Code execution prompt

_Written: 2026-07-03. Paste the prompt below into Claude Code once `CLAUDE.md` and `docs/` are in the repo._

Everything referenced here was found via a search index over the repo, not a live checkout, so the prompt asks Claude Code to re-verify before applying anything destructive.

---

```
I'm working on The Mall (React/TS/Vite frontend, Node/Express/Mongoose backend).
Read CLAUDE.md and docs/04-phase-0-findings.md in the repo root first — they
describe the current Phase 0 cleanup pass. This prompt asks you to verify and
apply the rest of it.

## 1. Verify, then apply — dependency + dead code cleanup

Everything below was found via a search index, not a live grep, so re-verify
each "no usage found" claim before deleting anything, and stop and tell me if
you find a usage I missed.

- react-dnd / react-dnd-html5-backend: confirm the only real usage was
  frontend/src/components/layout_settings/extras/OrderDnD.tsx, and that the
  dnd-kit rewrite (in docs/04-phase-0-findings.md) is a safe drop-in — check
  every call site (likely all the *MenubarSettings.tsx files) still passes
  `order` and `objectPath` props unchanged. Then remove react-dnd and
  react-dnd-html5-backend from frontend/package.json.
- Legacy tiptap v1: confirm no import of the bare `tiptap` package (as opposed
  to @tiptap/*) anywhere in frontend/src, then remove `tiptap` from
  frontend/package.json.
- zustand: confirm no `import ... from 'zustand'` anywhere in frontend/src,
  then remove it from frontend/package.json.
- backend/models/NewStoreLayout.js: confirm nothing imports/requires it, then
  delete the file.
- frontend/src/components/store_layout/sections/footer/fast_food_footer/FastFoodFooter.tsx:
  fix the fallback bug — `sections.footer` currently falls back to
  `mockLayout.sections.about`, it should fall back to `mockLayout.sections.footer`.
- Run `npm install` in frontend/ to update the lockfile after the package.json
  edits, then confirm `npm run build` still passes.

## 2. UI library decision — apply the parts that are ready

- Remove @shadcn/ui from frontend/package.json — it's the old pre-CLI shadcn
  npm package, not the real shadcn workflow (which copies source via
  `npx shadcn add`, no runtime dependency). Confirm nothing actually imports
  from @shadcn/ui first.
- @mui/material + @mui/icons-material: find the actual render usage of
  TipsAndUpdatesIcon in
  frontend/src/components/the_mall/home/HomePageReviewsModal.tsx (only the
  import was indexed, not the JSX/props). If that really is the only MUI
  usage in the app, swap it for lucide-react's `Lightbulb` icon (already a
  dependency) and remove both MUI packages. If you find other MUI usage,
  list it instead of removing anything.
- Leave @headlessui/react alone — it's genuinely used for the Listbox
  dropdowns across the booking flow (BookDesktopUI.tsx, BookMobileUI.tsx,
  SecondBookWithCalender.tsx, MainBookWithOpenCalender.tsx,
  FirstStoreBookSection.tsx, possibly more — please check for more too). Not
  a cleanup target.
- Leave @radix-ui/react-dropdown-menu and @radix-ui/react-popover installed
  even though nothing imports them directly right now — real shadcn
  dropdown-menu/popover components need exactly those two packages under the
  hood, and Phase 2 (design tokens + styled primitives) is going to want them
  shortly. Removing and reinstalling in a few weeks is pure churn.

## 3. Update the docs to match reality

Once the above is applied and the build passes, update
docs/00-current-state-audit.md, docs/03-roadmap.md, and
docs/04-phase-0-findings.md to reflect what actually happened (mark items
done, note anything that turned out differently than expected). Don't touch
docs/01-website-builder-architecture.md or docs/02-database-schema.md — those
describe future-state architecture, not current state.

Give me a summary of what you changed, what you left alone and why, and
anything you found that contradicts what's in the findings doc.
```
