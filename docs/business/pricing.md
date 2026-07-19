# Pricing

Three plans, defined in `frontend/src/components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStorePlans.tsx`. This is currently static marketing content — the "Choose Plan" button just prompts the user to create a store first; there's no billing/plan-enforcement logic wired to these tiers yet (not checked beyond this component).

| Plan | Price | Duration | Notes |
|---|---|---|---|
| **Pre-launch** | R25 | 12 months | "Limited Offer!" badge, early-bird pricing |
| **Standard** | R49 | per month | |
| **Enterprise** | Contact us | per month | Custom |

## ⚠️ Feature-list parity flag

All three plans currently list the **identical** five features:

- All business tools and programs
- Unlimited Website Layouts
- Unlimited Posts
- 15GB Cloud Storage
- AI Business Advisor

This is very likely placeholder content rather than an intentional decision — a paid Standard tier and a contact-us Enterprise tier with no differentiation from the R25/12-month early-bird plan doesn't hold up as a real pricing ladder. Flagging rather than assuming: confirm with Banele whether Standard/Enterprise are meant to unlock anything (higher storage, priority support, more posts, team seats, etc.) before this goes in front of real customers.
