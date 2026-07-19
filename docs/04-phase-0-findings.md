# Phase 0 findings — library & dead-code cleanup

_Investigated: 2026-07-03_

Audit trail for the Phase 0 cleanup pass. This was done via search over the indexed repo, not a live checkout — treat "no usage found" as strong evidence, not proof, and run the suggested `grep` before deleting anything at the OS level that isn't already handled below. Keep this file or fold its conclusions into `00-current-state-audit.md` once everything here is applied and verified.

## `react-dnd` — in real use, migrated, dependency removed ✅ applied 2026-07-03

Not dead code. `frontend/src/components/layout_settings/extras/OrderDnD.tsx` used `react-dnd` + `react-dnd-html5-backend` for a generic horizontal reorderable list. Claude Code confirmed **4 real call sites, all `*MenubarSettings.tsx`** — matches the original prediction exactly.

Rewritten on `@dnd-kit` (matching the pattern already used in `HomePageSettings.tsx`). `order`/`objectPath` props unchanged, zero call-site edits needed. `react-dnd` + `react-dnd-html5-backend` removed from `package.json`.

**Process note**: the rewritten file drafted in this doc's first pass was never actually copied into the repo, so Claude Code found the original `react-dnd` code still in place and did the rewrite fresh — independently landing on essentially the same solution, which is a good sign the approach was sound. Calibration for next time: "done" in this doc means *drafted and ready to apply*, not *already in your repo*. Anything created outside a live Claude Code session needs to actually be placed at the stated path first.

## Legacy `tiptap` v1 — no usage found, removed

Searched for direct imports of the bare `tiptap` / `tiptap-commands` / `tiptap-utils` packages (the pre-`@tiptap` v1 generation — it has a `vue`/`vue-template-compiler` peer dependency and can't run in this React app regardless). Every real editor-related import in the codebase — `use-tiptap-editor.ts`, `TipTapHandler.tsx`, `use-cursor-visibility.ts`, `use-menu-navigation.ts`, `lib/tiptap-utils.ts`, `DonationModal.tsx` — comes from `@tiptap/*` v3. The bare `tiptap` package only ever showed up in `package.json`/`package-lock.json`, never in an actual import.

**Done**: removed `tiptap` from `package.json`.

## `zustand` — no usage found, removed (bonus — wasn't on the original list)

Two separate searches (for `zustand` store creation, and for a `useStore` hook) found nothing beyond the dependency declaration and a very early `comments.txt` planning note listing an intended stack that also names `react-query` — which was never actually adopted either. Redux Toolkit is the real, deeply-integrated state layer everywhere it matters.

**Done**: removed `zustand` from `package.json`. If something turns out to depend on it, it's a one-line revert.

## `backend/models/NewStoreLayout.js` — no references found

Two targeted searches for `NewStoreLayout` found nothing importing or requiring it anywhere in controllers, routes, or other models — only the model file itself, which was already incomplete (no `sections`, no `routes`, no `timestamps`) next to the real `StoreLayout.js`.

**Apply on your end** — this is a file deletion, outside what I can do from here:
```bash
grep -rn "NewStoreLayout" backend   # final check
rm backend/models/NewStoreLayout.js
```

## `mockLayout.ts` — significantly more tangled than either pass first showed

Original search found six importers. **Claude Code's live grep found ~20** — a 3x undercount. The six below are confirmed and categorized; the rest are cataloged in `docs/05-phase-1-inventory.md` once that pass runs (see `03-roadmap.md` Phase 1). Don't treat "6" as the real scope anywhere else in these docs — it isn't.

| File | Pattern |
|---|---|
| `FastFoodFooter.tsx` | Fallback, and **mismatched** — `sections.footer` fell back to `mockLayout.sections.about`. **Key fixed below — but see the residual issue noted after the table.** |
| `EnnockHero.tsx` | Not a fallback at all — `const style = mockLayout.sections.ennockHero` is the *only* source of this hero variant's styling. It never reads Redux settings, so this variant isn't actually editable through the real settings system today. |
| `SingleStoreProductSection.tsx` | Imported; the actual usage line wasn't in the indexed excerpt — needs a direct look at the full file. |
| `PopularStorePackageCard.tsx` | Same — imported, usage not visible in the excerpt. |
| `FooterWithSocialsAndEmail.tsx` | Imported, but the only usage line is commented out (`//const settings = mockLayout.sections.footer;`) — looks like a dead import. |
| `StylishHero.tsx` | Imported; not visibly used in the excerpt shown. |

**Applied** — `FastFoodFooter.tsx`, one-line patch (this component was only partially indexed, so this was a precise find-and-replace rather than a full replacement file):

```diff
- const config =  useAppSelector(state => state.layoutSettings.sections.footer)|| mockLayout.sections.about;
+ const config =  useAppSelector(state => state.layoutSettings.sections.footer)|| mockLayout.sections.footer;
```

**Residual issue, found by Claude Code, left as-is on purpose**: fixing the key isn't the whole fix. `mockLayout.sections.footer` is shaped for a *different* footer variation than `FastFoodFooter` expects — no `logo`, different `text` keys. If Redux state is ever genuinely empty at that call site, the component will now throw instead of silently rendering with the wrong (but non-crashing) content. Correctly scoped out of Phase 0 — this needs a real typed default for the `fastFood` footer variation, which is exactly what Phase 1's registry work produces. Don't consider this component's fallback "fixed," just "fixed one specific bug in a still-broken pattern."

**Left alone, on purpose**: `EnnockHero.tsx` needs an actual decision (what should this variant's editable shape be?), not a mechanical find-replace — better handled once Phase 1's registry/schema gives it a proper home. The three "needs a direct look" files, and the ~14 other importers Claude Code's grep found that this doc never catalogued, need the same treatment: Phase 1 work, not Phase 0.

## UI primitive foundation — partially resolved, MUI stays

Checked all four libraries now, including a correction to the first pass.

**MUI — corrected, and staying.** The original pass found one icon import (`TipsAndUpdatesIcon`) and concluded MUI's footprint was probably negligible. Live grep found that claim was wrong on two counts: the icon itself is used in **5 files**, not 1, and `SettingsSlider.tsx` has real, styled usage of MUI's `Slider` component (custom thumb/track/rail styling) — an actual interactive component, not just an icon. `@mui/material` and `@mui/icons-material` were **not removed**, and the icon swap was correctly skipped too (it was only ever framed as conditional on MUI being fully removable, which it isn't). Lesson: a single search result for a library that has hundreds of components is weak evidence of "barely used" — should have searched for a couple of common component names (`Slider`, `Button`, `Dialog`, `TextField`) before concluding anything, the same way multiple angles were used for `react-dnd`/`tiptap`/`zustand`.

**`@headlessui/react` — genuinely used, not a cleanup target.** `Listbox` is used for service/staff/date dropdowns across the booking flow: `BookDesktopUI.tsx`, `BookMobileUI.tsx`, `SecondBookWithCalender.tsx`, `MainBookWithOpenCalender.tsx`, `FirstStoreBookSection.tsx` — at least five files. Load-bearing in a working feature, not leftover weight. Leave it alone.

**`@radix-ui/react-dropdown-menu` / `@radix-ui/react-popover` — no direct usage found.** Only appear as declared dependencies and in each other's transitive dependency graph, never actually imported in `frontend/src`. Left installed — see decision below, they're likely to be wanted again shortly.

**`@shadcn/ui` (npm package, `^0.0.4`) — not real shadcn, removed ✅ applied 2026-07-03.** The actual shadcn/ui workflow doesn't install a runtime package by this name; it's a CLI (`npx shadcn add <component>`) that copies component source directly into the repo (typically `components/ui/`), built on Radix primitives + Tailwind + `class-variance-authority`. No such `components/ui/` folder or `cva`/`buttonVariants` pattern was found anywhere. Confirmed zero real imports via live grep and removed. (The one shadcn-*adjacent* thing that IS real: the TipTap editor hooks — `use-tiptap-editor.ts`, `use-cursor-visibility.ts`, `use-menu-navigation.ts`, `lib/tiptap-utils.ts` — have the file/hook naming and `@/` alias conventions of a shadcn-CLI-scaffolded TipTap template. Unrelated to the `@shadcn/ui` package, untouched.)

### The actual design decision

Not "which of the four libraries wins" — Headless UI has a legitimate job (booking dropdowns) and now MUI does too (the `Slider`). Neither needs replacing. The real decision is **what the new design-tokens + styled-primitives library (Button, Card, Badge, Input — Phase 2, `01-website-builder-architecture.md` §3) gets built on**, and whether `SettingsSlider.tsx`'s MUI `Slider` gets left as its own thing or eventually gets a token-driven equivalent for consistency (not urgent — it's an internal settings-panel control, not a block a vendor drags onto their page, so it's lower priority than the vendor-facing primitives).

| Option | Fit | Trade-off |
|---|---|---|
| **shadcn pattern** (Radix primitives + Tailwind + `cva`, source copied into `components/ui/`) | Tailwind-native, matches the app's existing utility-class styling, full source control (important for a page builder where every block needs deep per-instance customization), accessible by default | You own and maintain the copied code; shadcn's default components use a standard Tailwind spacing scale, which will need adapting to this app's `vh`-unit-heavy responsive conventions |
| Build directly on Headless UI | Zero new dependency, proven already | Unstyled-only — no variants or visual patterns out of the box; you'd be hand-building what shadcn already solved |
| Lean into MUI as the design system | Most complete component catalog out of the box, and now has a real foothold (`Slider`) | Fights the Tailwind-first styling used everywhere else; would mean maintaining two parallel styling systems for the vendor-facing builder specifically |

**Recommendation unchanged: shadcn pattern for the new vendor-facing primitives.** MUI staying installed for `SettingsSlider.tsx` doesn't change this — that's an internal admin control, not part of what a vendor drags onto their storefront. It doesn't require touching Headless UI or MUI's existing usage at all. This is why the Radix packages are worth leaving installed: shadcn's `dropdown-menu`/`popover` components need exactly those two, so removing them now just means reinstalling in a few weeks.

Scaffolding `components/ui/` itself is Phase 2 work, not done yet.

## Results — applied 2026-07-03 via Claude Code

Applied:
- `frontend/src/components/layout_settings/extras/OrderDnD.tsx` — rewritten on `@dnd-kit`
- `frontend/package.json` — removed `react-dnd`, `react-dnd-html5-backend`, `tiptap`, `zustand`, `@shadcn/ui`
- `FastFoodFooter.tsx` — one-line key fix (residual data-shape issue noted above, deliberately not fixed further)
- `backend/models/NewStoreLayout.js` — deleted
- `npm install` (68 packages removed) and `npm run build` both pass

Left alone, correctly:
- `@mui/material` / `@mui/icons-material` — real usage found (`Slider` in `SettingsSlider.tsx`, icon in 5 files), not removed
- `@headlessui/react`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover` — untouched as planned

Not done yet: a browser smoke-test of the menubar drag-reorder UI and booking-flow dropdowns — only verified via `npm run build`, which doesn't catch runtime-only issues (e.g. `@dnd-kit` sensor wiring). Worth doing before building more on top of this in Phase 1.
