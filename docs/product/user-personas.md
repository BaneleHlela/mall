# User personas

Draft personas covering the platform's core user types. Store examples reference real store slugs seen in the codebase (`ennock-m-art`, `tote-bags`) where their name/category could be inferred from code (e.g. `EnnockHero.tsx`, image paths under `stores/{id}/images/`) — this was **not** cross-checked against live database records, so treat the specific details below as representative drafts, not verified vendor data. Update with real specifics once pulled from the DB directly.

## 1. Product vendor — physical goods

**"Tote Bags" style store.** Sells a small catalog of physical, made-or-sourced products (bags, accessories). Needs: product photos uploaded and organized per-product (`stores/{storeId}/products/{slug}/`), simple order management, a storefront that looks credible without hiring a designer, and a way to get discovered by nearby shoppers who don't yet know the store exists. Not technical — the website builder and product forms need to be usable with no prior e-commerce tooling experience.

## 2. Service-based vendor — bookings

Offers services (not physical stock) — needs staff/date/time booking rather than a shopping cart. Uses the booking flow (`BookDesktopUI.tsx` / `BookMobileUI.tsx`, service + staff + date `Listbox` dropdowns). Needs: a services list with images (`stores/{storeId}/services/{slug}/`), a team page (`stores/{storeSlug}/team/`), and a booking calendar that avoids double-booking. Cares most about reliability of the booking flow — a broken booking is a lost customer, not just a bug.

## 3. Artist/creator vendor

**"Ennock M Art" style store.** Sells creative/original work rather than mass-inventory goods — the storefront is closer to a portfolio-plus-shop than a catalog. Has a custom hero section (`EnnockHero.tsx`) built specifically for this store's branding, currently only editable by directly editing `mockLayout.ts` rather than through the real settings system — a known limitation (see [`docs/website-builder/04-phase-0-findings.md`](../website-builder/04-phase-0-findings.md)). Cares about visual presentation and uniqueness of their storefront more than a typical catalog vendor would.

## 4. Customer — browsing/buying

Discovers stores and products through the search/discovery page (Search Posts — `docs/search-posts/`) and the general social posts feed, not necessarily by knowing a store's name in advance. Wants a fast, trustworthy way to find relevant local vendors, view products/services, place an order or make a booking, and pay (PayFast). Township-market context matters here: assume variable connectivity and mobile-first usage over desktop.

## 5. Platform admin

Not a vendor or shopper — operates the admin dashboard with full platform oversight: managing stores, moderating content, and (per the business plan) surfacing high-performing or promising stores for potential investors/partners. Cares about visibility into platform-wide activity and the ability to intervene (e.g. remove content, manage a flagged store) without needing engineering involvement.
