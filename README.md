# mike-t-4b46-todomvc-demo

TodoMVC application scaffolded with Vite, React, and TypeScript.

## Scripts

- `npm run dev` starts the Vite dev server on `0.0.0.0:8080`.
- `npm run build` type-checks and builds the production bundle.
- `npm run lint` runs ESLint.
- `npm run format:check` checks Prettier formatting.

## Environment

Copy `.env.example` when local overrides are needed. Vite exposes only
`VITE_`-prefixed values to the browser.

- `VITE_TODO_STORAGE_KEY` controls the localStorage key used for persisted
  todos.
