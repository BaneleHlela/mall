# The Mall

A vendor commerce and social platform for township markets in South Africa — storefronts, bookings, and a website builder, built for entrepreneurs without technical skill or expensive tooling.

## Problem & vision

Millions of entrepreneurs and small businesses across South African townships operate without access to the digital tools, structure, or visibility that formal e-commerce platforms assume — capital, technical readiness, and self-driven marketing chief among them. The Mall combines the accessibility of social media, the structure of e-commerce, and the connectivity of a professional network into one platform, starting with a focused pilot in eMadadeni before expanding to other townships and the wider informal business sector.

## Features

- **Vendor storefronts** — orderable products, bookable services, rentals, and donations, each with their own image galleries and management flows
- **Drag-and-drop website builder** — customizable store websites, currently being rebuilt into a component-registry architecture (canvas + design tokens + reusable primitives)
- **Search Posts** — merchandising content vendors create to surface products/services on the platform's search and discovery page
- **Social posts feed** — a home-page feed distinct from Search Posts
- **Booking flow** — service, staff, and date selection for appointment-based vendors
- **Store owner dashboard** — order, content, and store management for vendors
- **Admin dashboard** — platform-wide oversight
- **Auth** — email/password plus Google and Facebook OAuth
- **Payments** — PayFast integration
- **Notifications** — email and WhatsApp messaging

## Tech stack

**Frontend:** React 19, TypeScript, Vite, Redux Toolkit, React Router, Tailwind CSS v4, Framer Motion, MUI, Radix primitives (shadcn pattern), `@dnd-kit`, Tiptap 3

**Backend:** Node.js, Express 5, Mongoose / MongoDB, Redis, Passport (Google/Facebook OAuth), JWT, Google Cloud Storage, Puppeteer/Playwright (screenshot capture), PayFast, Twilio, Nodemailer

## Status

Pre-launch MVP, sole proprietorship, built by a single developer. Currently piloting with early vendors in the eMadadeni township before a wider launch. Active work: bringing the [Search Posts](docs/search-posts/) editor in line with the [website builder](docs/website-builder/), plus a post ranking algorithm and vendor-facing analytics.

## Screenshots

<!-- add screenshots/GIF here -->

## Getting started

See [`docs/product/setup.md`](docs/product/setup.md) for local dev setup, required environment variables, and prerequisites.

```bash
npm run dev                    # backend, from repo root
cd frontend && npm run dev     # frontend
```

## License

<!-- TODO: Banele to decide -->
No license has been chosen yet. If this repository is made public, either add a proprietary / all-rights-reserved notice here, or keep the repository private and link a deployed demo instead once one exists.
