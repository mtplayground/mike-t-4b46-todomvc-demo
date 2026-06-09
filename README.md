# mike-t-4b46-todomvc-demo

TodoMVC application scaffolded with Vite, React, and TypeScript.

## Scripts

- `npm run dev` starts the Vite dev server on `0.0.0.0:8080`.
- `npm run build` type-checks and builds the production bundle.
- `npm run lint` runs ESLint.
- `npm test` runs Vitest unit tests.
- `npm run test:e2e` runs the Playwright end-to-end spec.
- `npm run format:check` checks Prettier formatting.
- `npm run serve` serves the production build on `0.0.0.0:8080`.

## Environment

Copy `.env.example` when local overrides are needed. Vite exposes only
`VITE_`-prefixed values to the browser.

- `VITE_TODO_STORAGE_KEY` controls the localStorage key used for persisted
  todos.

## Self-Hosting

Build the static bundle and serve it locally:

```bash
npm ci
npm run build
npm run serve
```

The production files are written to `dist/`. `npm run serve` uses Vite's static
preview server on `0.0.0.0:8080`; any static file server can also host the
contents of `dist/`.
