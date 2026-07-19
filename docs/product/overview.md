# Product overview

The Mall is a vendor commerce and social platform for township markets in South Africa, founded and built by Banele Hlela. It gives small business vendors a customizable storefront — products, services, bookings — a social posts feed, and a drag-and-drop website builder, without requiring technical skill or expensive tooling. Dashboards serve both store owners (managing their own store, orders, content) and platform admins (full platform oversight).

The mission: improve the informal business landscape so that anyone with a good idea, product, or service — regardless of background, budget, or technical skill — has a fair chance to be seen and grow.

**Status:** pre-launch / MVP, sole proprietorship. Piloting with early vendors in eMadadeni before wider launch.

**Active work:** bringing the Search Posts editor in line with the website builder, building the display/ranking algorithm and analytics behind post performance ([`docs/search-posts/overview.md`](../search-posts/overview.md)), and ongoing incremental improvements to the website builder itself ([`docs/website-builder/`](../website-builder/)).

## Feature list (confirmed against code)

- **Storefronts** — a store gets orderable products (`ProductController.js`), bookable services (`ServiceContoller.js`), rentals (`RentalController.js`), donations (`DonationController.js`), a logo/team/images, and posters.
- **Website builder** — drag-and-drop store website editing, section-based layout, currently being rewritten as a component-registry system (`docs/website-builder/`).
- **Search Posts** — merchandising content vendors build to surface products/services/bundles on the platform's search/discovery page (`docs/search-posts/`), separate from the general posts feed.
- **Social posts feed** — a general home-page feed (`SimplePosts.tsx` and related components), distinct from Search Posts.
- **Booking flow** — service/staff/date selection UI (`BookDesktopUI.tsx`, `BookMobileUI.tsx`, and variants) built on `@headlessui/react` `Listbox` dropdowns.
- **Store dashboard** — for vendors managing their own store, orders, and content (`creators_dashboard/`).
- **Admin dashboard** — platform-wide oversight.
- **Auth** — email/password plus Google and Facebook OAuth (Passport).
- **Payments** — PayFast integration (`payfastRoutes.js`).
- **Notifications/comms** — email (Nodemailer/SMTP) and WhatsApp (Twilio).
- **Asset storage** — Google Cloud Storage for all uploaded images/screenshots (`docs/design/asset-locations.md`).

## Not yet built / in progress

- Search Posts ranking algorithm and vendor-facing analytics — schema scaffolding exists, logic doesn't yet.
- Unified editing/rendering approach between the website builder and Search Posts editor.
- Website Builder v2's component registry / design tokens / typed schema (currently `Mixed` blobs) — see `docs/website-builder/03-roadmap.md` for phase status.
