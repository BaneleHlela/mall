# Testing infrastructure

This document describes the current test setup for The Mall. The setup is intentionally split by runtime so fast unit tests do not start MongoDB, while integration tests exercise the real Express request cycle against an isolated database.

## Stack

### Backend

- **Jest 30** for test execution and assertions.
- **Babel Jest** for transforming the ESM backend source for Jest.
- **Supertest** for Express route-level HTTP integration tests without starting a listening server.
- **MongoDB Memory Server** for an isolated in-memory MongoDB instance.
- **Jest mocks** for Redis, email delivery, Google Cloud Storage, Puppeteer, and bcrypt.
- **jsonwebtoken** in integration tests for generating deliberately invalid tokens.

The backend uses two Jest projects:

- `unit`: pure utility tests with no database or network services.
- `integration`: route/controller tests with MongoDB Memory Server and mocked external services.

### Frontend

- **Vitest** for React, Redux, and utility tests.
- **Testing Library React** for user-focused component assertions.
- **Testing Library User Event** for realistic keyboard and pointer interactions.
- **jest-dom** for DOM matchers such as `toBeInTheDocument`.
- **MSW v2** for network-level API mocking.
- **jsdom** as the browser-like test environment.

## Repository layout

```text
backend/
  tests/
    setup/
      jest.setup.js       # Unit-test environment and external-service mocks
      testSetup.js        # Integration environment, Redis mock, and MongoDB lifecycle
    unit/                 # Pure utility tests
    integration/          # Express route integration tests

frontend/
  src/
    __tests__/
      setupTests.ts       # Vitest lifecycle and browser globals
      mocks/
        handlers.ts       # MSW request handlers
        server.ts         # MSW test server
      testUtils.ts        # Redux and router render helpers
      components/         # Component tests
      pages/              # Page and interaction tests
      features/           # Redux slice and thunk tests
```

## Prerequisites

Use Node.js 20.19 or newer. The current environment uses Node 24.

Install dependencies from the repository root:

```bash
npm install
```

Install frontend dependencies separately:

```bash
cd frontend
npm install
```

Backend integration tests use MongoDB Memory Server. The current local setup points to:

```text
C:\Users\banel\Desktop\8.0\bin\mongod.exe
```

That path is configured in `backend/tests/setup/testSetup.js`. Change it if MongoDB is installed elsewhere. The test server uses a random port and does not connect to the development MongoDB service on port `27017`.

## Backend commands

Run all backend projects:

```bash
npm test
```

Run only unit tests:

```bash
npm run test:unit
```

Run only integration tests:

```bash
npm run test:integration
```

Run a project in watch mode:

```bash
npm run test:unit:watch
npm run test:integration:watch
```

The integration setup:

1. Sets test-only JWT, session, client URL, and Redis environment values.
2. Mocks Redis with an in-memory token map.
3. Mocks email, GCS, Puppeteer, and bcrypt side effects.
4. Starts MongoDB Memory Server.
5. Connects Mongoose.
6. Deletes all collection documents after each test.
7. Disconnects Mongoose and stops MongoDB after the suite.

The Redis mock stores refresh tokens in a `Map`, so signup/login can store a token and a later refresh request can retrieve the same token. The map is cleared after every test.

## Frontend commands

Run the frontend test suite:

```bash
cd frontend
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run the configured coverage report:

```bash
npm run test:coverage
```

The Vitest setup starts the MSW server, resets handlers and test users after each test, closes MSW after the suite, and supplies mocks for browser APIs used by UI libraries.

MSW handlers use the v2 API:

```ts
import { http, HttpResponse } from 'msw';
```

Do not use the removed `rest` API from MSW v1.

## Current auth coverage

### Backend integration coverage

`backend/tests/integration/auth.test.js` covers:

- Signup success, password hashing, duplicate users, required fields, and username generation.
- Login success, invalid credentials, blocked users, and password redaction.
- Logout and refresh-token behavior.
- Email verification, forgot password, and reset password.
- Authenticated user lookup and token rejection.
- Admin-only block/unblock routes and non-admin authorization.

### Frontend coverage

The frontend suite covers:

- Social login button rendering and OAuth redirects.
- Login rendering, validation, Redux state updates, errors, and navigation.
- Signup rendering, password strength, validation, and navigation.
- Email verification input behavior, paste, auto-submit, URL token autofill, backspace handling, loading, and errors.
- User Redux state, thunks, authentication clearing, and API mocking.

## Adding a backend test

1. Put pure function tests in `backend/tests/unit`.
2. Put Express route tests in `backend/tests/integration`.
3. Use Supertest against a test app rather than importing `server.js`, because `server.js` starts listening when imported.
4. Keep external services mocked in `testSetup.js`.
5. Use unique email addresses so test cleanup remains isolated.
6. Assert both status codes and response bodies.
7. Run `npm run test:integration -- --runInBand` while debugging one file.

A minimal route test shape is:

```js
import request from 'supertest';

it('returns the expected response', async () => {
  const res = await request(app)
    .post('/api/user/login')
    .send({ email: 'test@example.com', password: 'Test123!' });

  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe('test@example.com');
});
```

## Adding a frontend test

1. Put component/page tests under `frontend/src/__tests__`.
2. Use `renderWithProviders` from `testUtils.ts` when the component needs Redux or routing.
3. Use `server.use(http... )` for a test-specific API response.
4. Prefer Testing Library queries based on roles, labels, and text.
5. Use `userEvent.setup()` for keyboard and pointer flows.
6. Reset test state through the existing MSW and Redux helpers.
7. Run `npm run test -- --run` from `frontend` while debugging.

## Validation commands

The following checks are available even though they are not all wired as package scripts:

```bash
# Backend syntax
Get-ChildItem -Path backend -Filter *.js -Recurse -File |
  ForEach-Object { node --check $_.FullName }

# Frontend lint
cd frontend
npx eslint src

# Frontend typecheck
cd frontend
npx tsc -b

# Frontend production build
cd frontend
npm run build
```

The backend test suites currently pass. The frontend test suite and production build currently pass.

The full frontend lint command reports pre-existing issues across the application, including unused imports, explicit `any` types, hook dependency warnings, and other strict TypeScript ESLint findings. The full frontend typecheck currently stops on a pre-existing syntax error in:

```text
frontend/src/components/store_layout/sections/hero/hero_with_container_and_image/HeroWithContainerAndImage.tsx:22
```

These validation failures are tracked separately from the testing infrastructure work and should not be silently treated as test failures.

## Known test-environment notes

- Jest may print `Force exiting Jest` because an open handle remains after the suite. The tests themselves pass; `--detectOpenHandles` can be used to investigate it.
- MongoDB Memory Server may print a version warning when the configured local `mongod.exe` is version 8.0.0 while the package default is 8.2.6. The configured system binary is intentionally used.
- Test output includes expected JWT verification logs for invalid-token cases.
- Do not run auth tests against production Redis, email, GCS, or MongoDB. The integration setup mocks those services.
