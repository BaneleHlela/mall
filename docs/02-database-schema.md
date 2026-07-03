# Database schema — current vs. proposed

_Last updated: 2026-07-03_

## The core problem

`StoreLayout.sections`, `.routes`, `.floats`, `.background`, `.menubar` and `SearchPost.style` are all Mongoose `Mixed` (`{}`) — Mongoose enforces no shape at all on the content that actually defines what a page looks like. The only "schema" that exists lives in scattered frontend TypeScript types and default-config files, with nothing guaranteeing the database and the frontend agree. That's the root cause behind needing bespoke render + settings components per variation (see `01-website-builder-architecture.md`) — there's no generic shape to write a generic renderer against.

## Proposed shape

Keep the same top-level documents (minimize churn to `Store` references, auth, existing indexes) but replace the *content* fields with a typed, recursive block tree.

```js
// A node in the tree — this shape is reused identically by StoreLayout and SearchPost
const blockNodeSchema = {
  id: String,          // stable id for React keys / selection / dnd-kit
  type: String,         // registry key, e.g. "hero.imageNextToText"
  props: Object,         // validated at the app layer against the registry's propsSchema, not by Mongoose
  style: {
    color: String,        // references a theme token name, same idea as today's colors.primary etc.
    background: Object,
    spacing: Object,
    responsive: Object,    // per-breakpoint overrides
  },
  children: [/* BlockNode */],  // recursive
};
```

Note: Mongoose subdocuments can't trivially self-reference for recursion. Two practical options — (a) store the whole `tree` as one `Mixed` field per route and validate it in the app layer with a real schema library (zod/Joi) on read/write, which is simpler and is what most page-builder backends actually do, or (b) flatten to a parent-id-referenced list (`nodes: [{ id, parentId, ... }]`) if per-node Mongoose-level querying is ever needed. **Recommend (a) for v1** — real validation without fighting Mongoose's subdocument model, and the whole tree is naturally what you load/save together anyway (matches how the current autosave/undo-redo already treats the settings object as one unit).

```js
// StoreLayout — same document, new content shape
const storeLayoutSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  screenshot: String,
  source: { source: String, websiteName: String, websiteUrl: String },  // unchanged
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  theme: {
    colors: mongoose.Schema.Types.Mixed,   // open token map, replaces the fixed primary/secondary/accent/quad/pent
    fonts: mongoose.Schema.Types.Mixed,
  },
  routeOrder: [String],
  routes: mongoose.Schema.Types.Mixed,     // { [routeName]: { name, url, tree: BlockNode[] } } — validated in app layer
  draftTree: mongoose.Schema.Types.Mixed,  // autosave target; "Publish" copies this into routes
  isDemo: Boolean,
  isSharable: Boolean,
}, { timestamps: true });
```

```js
// SearchPost — becomes a single block, using the exact same node shape
const searchPostSchema = new mongoose.Schema({
  type: { type: String, required: true },
  node: mongoose.Schema.Types.Mixed,   // one BlockNode — same shape as any node inside a StoreLayout tree
  departments: [String],
  stores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  isActive: { type: Boolean, default: true },
  stats: { clicks: { type: Number, default: 0 }, likelihoodIndex: { type: Number, default: 1, min: 1 } },
});
```

New/formalized supporting collection:

```js
// Asset — formalizes what's currently just a GCS URL typed into a field
const assetSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  url: String,
  type: { type: String, enum: ["image", "video"] },
  width: Number,
  height: Number,
  altText: String,
}, { timestamps: true });
```

`ComponentDefinition` is deliberately **not** a collection — the registry lives in code (see `01-website-builder-architecture.md` §2). Block *types* are developer-defined and ship with a deploy; there's no product need for vendors to define new block types, so a DB table for it would add indirection without a real use case.

## What doesn't need to change

- `Store` itself, auth, `Product`/`Service`/`Booking`/`Post` models — untouched.
- The GCS upload pipeline and folder conventions.
- The `Section` model — generalized in place to catalog block-registry entries instead of the old fixed section list (same shape, broader `type` values).

## Migration strategy — additive, not a flag day

1. **Add fields alongside the old ones.** `draftTree` and the new `routes[...].tree` shape ship next to the existing `sections`/legacy `routes.contains` fields on the same `StoreLayout` documents. Nothing breaks for stores that haven't been touched yet.
2. **Write a one-time converter.** The mapping from legacy → new is mechanical: each known `(sectionKey, variation)` pair becomes `{ type: "<sectionKey>.<variation>", props: <reshaped legacy config>, style: {...} }`. Can run as a script (similar to the existing standalone `captureLayoutSections.js` pattern) or lazily on first load of a given layout in the new builder.
3. **New builder reads/writes the new shape only.** The old builder and live storefront rendering keep working off the legacy fields untouched during the transition — or better, the storefront's `sectionMap` rendering checks for `tree` first and falls back to the legacy renderer, so a store is "migrated" the moment its layout has been opened once in the new builder. No separate cutover step needed.
4. **Verify with what's already in the stack.** Puppeteer/Playwright are already used for screenshot capture — reuse that to screenshot-diff a store's storefront before/after migration and catch visual regressions automatically, rather than manually eyeballing every store.
5. **Retire legacy fields and switch-statement components** once all active stores are confirmed migrated (see `03-roadmap.md` Phase 6).

## Direct answer to "how drastic"

The **content shape** changes substantially — fixed named `Mixed` blobs become a generic typed tree — because that's the actual precondition for a real component registry and DND canvas; there's no way to get industry-standard builder behavior while sections are hardcoded slots. But it's a change you can roll out additively, store by store, without downtime, reusing almost everything else: the `Store` ↔ `StoreLayout` relationship, the screenshot/GCS pipeline, the autosave debounce pattern, the iframe/postMessage channel, and the "duplicate a demo layout" flow all carry over with little to no change. `SearchPost`'s change is smaller still, since it's already shaped like a single widget rather than a page.
