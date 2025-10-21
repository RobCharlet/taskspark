# Taskspark

Taskspark is a multi-user Todoist-style application built with Next.js, React, and Neon Postgres. Users authenticate via Stack Auth, manage personal todo lists, organize tasks with tags, and track completion state. The project is styled with shadcn/ui and Tailwind CSS, persists data with Drizzle ORM, and includes automated testing with Vitest and Playwright.

## Features

- 🔐 **Stack Auth integration** for secure sign-in/out flows.
- ✅ **Full todo lifecycle**: create, update, archive, and mark tasks complete.
- 🏷️ **Tag management** with unique tag colors per user and many-to-many todo relationships.
- 🌓 **Accessible, responsive UI** built on shadcn/ui primitives.
- 🧪 **Testing setup** with Vitest (unit) and Playwright (E2E).
- 🧰 **DX tooling**: ESLint, Prettier, Tailwind, and pnpm scripts.
