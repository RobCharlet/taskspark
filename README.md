# Taskspark

Taskspark is a multi-user Todoist-style application built with Next.js, React, and Neon Postgres. Users authenticate via Stack Auth, manage personal todo lists, organize tasks with tags, and track completion state. The project is styled with shadcn/ui and Tailwind CSS, persists data with Drizzle ORM, and includes automated testing with Vitest and Playwright.

## Features

- 🔐 **Stack Auth integration** for secure sign-in/out flows.
- ✅ **Full todo lifecycle**: create, update, archive, and mark tasks complete.
- 🏷️ **Tag management** with unique tag colors per user and many-to-many todo relationships.
- 🌓 **Accessible, responsive UI** built on shadcn/ui primitives.
- 🧪 **Testing setup** with Vitest (unit) and Playwright (E2E).
- 🧰 **DX tooling**: ESLint, Prettier, Tailwind, and pnpm scripts.

## Prerequisites

- Node.js 18+
- pnpm 10+
- A Neon project and Stack Auth project (credentials required at runtime)

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables** – copy `.env.example` to `.env.local` and supply real values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `DATABASE_URL` | Neon Postgres connection string |
   | `STACK_SECRET_SERVER_KEY` | Stack Auth server key |
   | `NEXT_PUBLIC_STACK_PROJECT_ID` | Stack Auth project ID |
   | `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth publishable key |
   | `NEXT_PUBLIC_APP_URL` | Base URL for routing callbacks |

3. **Database migrations** – Drizzle manages schema migrations.

   ```bash
   pnpm db:generate   # generate SQL from schema changes
   pnpm db:migrate    # apply SQL to Neon (requires DATABASE_URL)
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Next.js in development mode |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Lint with ESLint (flat config) |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:e2e` | Execute Playwright tests (requires browsers) |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Verify formatting |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Apply migrations to Neon |

### Testing Notes

- **Vitest**: uses `jsdom` and the automatic JSX runtime. Run `pnpm test`.
- **Playwright**: a basic unauthenticated smoke test is provided in `tests/e2e`. Browsers must be installed (`npx playwright install`). The provided config starts a production server via `pnpm next build && pnpm next start`. In this environment the browsers could not launch, so the test was not executed; adjust the config or install dependencies before running in CI/local.

## Styling & Components

- Tailwind CSS with shadcn/ui components (`pnpm shadcn add ...`).
- Theme tokens defined in `src/app/globals.css` and `tailwind.config.ts`.

## Authentication

- Stack Auth components (`<SignIn />`, `<UserButton />`, `<StackHandler />`) manage flows.
- `src/stack/server.ts` and `src/stack/client.ts` instantiate server/client SDKs with shared env validation in `src/env`.

## Data Layer

- Drizzle schema defined in `src/db/schema.ts`.
- Neon HTTP driver configured in `src/db/index.ts`.
- Server actions in `src/server/actions/todos.ts` perform CRUD with row-level ownership checks.

## Deployment

- Optimized for Vercel (Next.js app directory).
- Ensure production env variables match `.env.example`.
- Run `pnpm next build` during CI/CD, then serve via `pnpm next start` or Vercel serverless.

## License

Apache License 2.0. See [LICENSE](./LICENSE).
