# Local dev setup

## Running the app

Two processes, run separately:

```bash
# from repo root — backend (Express, nodemon)
npm run dev

# from frontend/ — frontend (Vite)
cd frontend && npm run dev
```

The root `package.json` runs `node backend/server.js` (via nodemon in dev). `frontend/package.json` runs Vite's dev server independently — there's no single combined dev command today.

## Environment variables

No `.env.example` exists in the repo currently — this list is inferred from `process.env.*` reads across `backend/`. Create a `.env` at the repo root with these:

| Variable | Used for |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Environment mode (dev/production branching in cookies, OAuth callback URLs, etc.) |
| `CLIENT_URL` | Frontend origin — CORS, email links, OAuth redirects |
| `FRONTEND_PUBLIC_URL` | Public-facing frontend URL (emails, PayFast redirect) |
| `BACKEND_URL` | Public-facing backend URL (PayFast ITN callback) |
| `PRODUCTION_URL` | Used by Passport OAuth config for prod callback URLs |
| `MONGODB_URL` / `MONGODB_URI` / `MONGO_URI` | MongoDB connection string — **inconsistent across the codebase**, see note below |
| `SESSION_SECRET` | Express session signing |
| `ACCESS_TOKEN_SECRET` | JWT access token signing |
| `REFRESH_TOKEN_SECRET` | JWT refresh token signing |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (Passport) |
| `FACEBOOK_APP_ID` / `FACEBOOK_APP_SECRET` | Facebook OAuth (Passport) |
| `GOOGLE_APPLICATION_CREDENTIALS` | GCS service account credentials path, for uploads (`gcsClient.js`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `GMAIL_APP_PASSWORD` | Outgoing email (Nodemailer) |
| `CONTACT_EMAIL` | Destination address for the contact form |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_WHATSAPP_FROM` | WhatsApp messaging (Twilio) |
| `PAYFAST_MERCHANT_ID` / `PAYFAST_MERCHANT_KEY` / `PAYFAST_PASSPHRASE` / `PAYFAST_URL` | PayFast payment integration |

**Note on Mongo env var naming:** the codebase reads `MONGODB_URL` in most controllers/scripts, but `MONGODB_URI` in a handful of scripts (`migrateUserStores.js`, `initializeProductPerfomanceStats.js`, `initializeLayoutSource.js`, `migratePackagesSessions.js`, `initializeSearchPostStats.js`) and `MONGO_URI` in one (`initializePosts.js`). Set all three to the same value in `.env` until this is consolidated, or scripts using the "wrong" name will silently fail to connect.

**Redis:** `backend/config/redis.js` currently connects to a **hardcoded Upstash Redis URL** (not read from an env var) — no `REDIS_URL` env var is needed today, but this is a hardcoded credential in source, worth flagging for cleanup/rotation rather than treating as normal.

## Other prerequisites

- Node.js (version not pinned in `package.json` — no `engines` field found)
- MongoDB instance (local or Atlas)
- Google Cloud Storage bucket + service account (`the-mall-uploads-giza` in the current deployment — see [`docs/design/asset-locations.md`](../design/asset-locations.md))
- Puppeteer/Playwright are used for screenshot capture — their browser binaries install via the normal `npm install` postinstall steps
