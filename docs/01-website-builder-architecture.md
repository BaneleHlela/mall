# Website Builder v2 — target architecture

_Last updated: 2026-07-03_

Goal: an editor that matches what's standard in tools like Webflow, Framer, and Builder.io — a canvas, a palette of reusable styled components, real drag-and-drop, a style/settings panel, undo/redo, and a save/publish flow — built as **one engine** that both the Website Builder and the Search Post editor run on.

## Capability checklist

- [x] Iframe canvas with live preview (exists — needs hardening, not replacing)
- [x] Drag-and-drop for list reordering (`@dnd-kit`, exists)
- [ ] Component registry (block type → renderer + editable schema)
- [ ] Design tokens (colors/fonts/spacing) + a reusable styled-primitives library (Button, Card, Badge, Input, ...)
- [ ] Drag-and-drop extended to: palette → canvas insertion, container nesting
- [ ] Click-to-select / hover-to-highlight on canvas, synced to the settings panel
- [ ] Unified undo/redo (one implementation, not two copies)
- [ ] Unified autosave (automatic diffing, not hand-maintained field lists)
- [ ] Responsive per-breakpoint overrides on any block (mobile/tablet/desktop — device switcher already exists)
- [ ] Asset/media library (GCS uploads already work; needs a picker UI + a tracked `Asset` record)
- [ ] Templates/presets (seed from the existing `Section` thumbnail gallery)
- [ ] Draft vs. published state
- [ ] Search Post editor running on the same engine

## Core subsystems

### 1. Canvas & preview

Keep the iframe + postMessage approach — don't rebuild this part, harden it:

- Replace the wildcard `postMessage(data, "*")` with an explicit target origin.
- Send **patches**, not the full settings tree, on every keystroke — the iframe applies incremental updates to its own local store instead of re-hydrating everything.
- Add a **return channel**: the iframe posts back `{ type: 'select', blockId }` / `{ type: 'hover', blockId }` on click/hover inside the preview, so clicking an element in the live preview selects it in the settings panel. This is the single biggest "feels like a real builder" upgrade, and it's a natural extension of the postMessage channel that already exists.

### 2. Component registry

A single source of truth, in code (not the database — block *types* are developer-defined, not user-created, so a DB-driven registry would be overengineering here):

```ts
type BlockDefinition = {
  type: string;                    // "hero.imageNextToText"
  category: "hero" | "about" | "products" | ...;
  render: React.ComponentType<{ node: BlockNode }>;
  propsSchema: JSONSchema;         // drives the settings panel form
  defaultProps: Record<string, any>;
  thumbnail: string;               // reuse the existing Section image gallery
};
```

This directly replaces the current pattern of two hand-written `switch` statements per section type (one for rendering, one for settings) — each block registers itself once, and the settings panel is generated from `propsSchema` instead of hand-built per variation. Existing variations migrate in as entries with a 1:1 mapping first (no visual changes), so this is a mechanical, low-risk first step — see `03-roadmap.md`.

### 3. Design tokens + reusable styled primitives

This is the direct answer to "pre-existing styled buttons the user can use." Formalize what's already half-there (`colors.primary/secondary/accent/quad/pent`, `fonts.primary/secondary/tertiary`) into an explicit open theme object, and build a small primitives library on top of it:

- `Button` with variants (`primary`, `secondary`, `outline`, `ghost`) and sizes, styled from theme tokens
- `Card`, `Badge`, `Input`, `Heading`/`Text` with the same token-driven approach

`@shadcn/ui` is already a dependency and is built exactly for this (Tailwind-native, copy-into-repo components with variants, Radix primitives underneath) — recommend standardizing on it as the primitive foundation rather than continuing to split effort across MUI, bare Headless UI, and hand-rolled Tailwind per component. This is a call worth making explicitly rather than by default, since it touches a lot of existing UI — flag it, don't silently migrate everything at once.

### 4. Drag and drop

Standardize on `@dnd-kit` everywhere:

- Keep it for section/list reordering (already working)
- Extend it for palette → canvas insertion and container nesting (`@dnd-kit/core` + custom drop-zone detection; `@dnd-kit/sortable` already covers reordering)
- Retire `react-dnd` once confirmed unused elsewhere

### 5. Undo/redo

Extract `layoutSettingsSlice.ts`'s history logic into one reusable piece — either a slice factory (`createHistorySlice<T>(name, defaultState)`) or a small Redux middleware that any slice can opt into. Both the Website Builder and Search Post editor consume the same implementation. This alone deletes most of `searchPostSettingsSlice.ts`'s duplicated code.

### 6. Autosave

Replace `PARTIAL_UPDATE_FIELDS`/`SECTION_FIELDS` with a generic deep-diff against `lastSavedSettings` (a small diff utility, or `lodash` — already a backend dependency, fine to use client-side too) that walks the actual object instead of a maintained allowlist. New fields autosave correctly by construction, no allowlist update required.

### 7. Assets

The GCS upload pipeline (per-store folders, already used for products/layouts/screenshots) doesn't need to change. Add a lightweight `Asset` record (store, url, type, dimensions, alt text) so uploaded images become pickable/reusable across blocks instead of only ever referenced by a raw URL string typed into one field.

### 8. Templates

Generalize the existing `Section` model (desktop/mobile thumbnails) from "section variation gallery" into "block/template gallery" for the new registry — same picker UX, broader scope. The "duplicate a demo layout" flow already built in `LayoutCreator.tsx` is a reasonable pattern for whole-page templates too.

### 9. Draft / publish

Simplest version that covers real needs: add `draftTree` alongside the existing published content on the same `StoreLayout` document (autosave writes to `draftTree`; "Publish" copies `draftTree` into the live field). Full version history (a separate `PageVersion` collection per save) is a clean future add if needed — not required for v1.

## How the Search Post editor becomes the same system

Today it's a parallel implementation: its own Redux slice, its own undo/redo copy, its own settings/preview shell. Under v2, a `SearchPost` is just **one block instance** from the same registry (its `variation` maps directly to a `type` in the registry), edited through:

- the same shell components (TopBar, device/zoom, settings panel, iframe preview)
- the same undo/redo implementation
- the same autosave/diff logic
- the same design tokens for its `style.colors`/`style.text`

What correctly stays different: it's a single node instead of a tree, so there's no palette/canvas drag-and-drop needed — just a settings form for that one block, generated from its `propsSchema` like every other block's would be. Net effect: one editor shell + one registry serving both surfaces, instead of two editors that happen to look similar today and will keep drifting apart if left alone.
