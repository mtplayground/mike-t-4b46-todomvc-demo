# mike-t-4b46-todomvc-demo

## What It Is

`mike-t-4b46-todomvc-demo` is a TodoMVC implementation built as a static Vite
React and TypeScript app. It follows the canonical TodoMVC markup and styling
using the official `todomvc-app-css` and `todomvc-common` packages.

## Current Features

- Add todos from the header input with Enter; empty or whitespace-only entries
  are ignored.
- View todos through hash-based filters: `#/`, `#/active`, and `#/completed`.
- Toggle individual todos complete or active.
- Delete todos with the TodoMVC destroy button.
- Edit todos inline by double-clicking a label; Enter or blur saves, Escape
  cancels, and saving an empty title deletes the todo.
- Toggle all todos complete or active with the TodoMVC toggle-all control.
- Footer shows the active count with correct pluralization, filter links, and a
  clear-completed button only when completed todos exist.
- Todos persist in `localStorage` and hydrate on reload. Missing, unavailable, or
  corrupt storage data falls back to an empty list.

## Architecture

- `src/App.tsx` composes the TodoMVC shell and wires app state to components.
- `src/components/` contains focused UI components for header, list/items,
  toggle-all, and footer.
- `src/types/todo.ts` defines the shared `Todo`, `TodoId`, and `TodoFilter`
  contracts.
- `src/state/todoReducer.ts` owns todo state transitions for add, toggle, edit,
  delete, toggle-all, and clear-completed.
- `src/storage/todoStorage.ts` isolates localStorage reads/writes and validates
  hydrated records.
- `src/hooks/usePersistentTodos.ts` connects the reducer to persistence.
- `src/hooks/useHashFilter.ts` owns TodoMVC hash filter parsing, normalization,
  and navigation.
- `src/config.ts` reads Vite build-time config. `VITE_TODO_STORAGE_KEY` can
  override the localStorage key documented in `.env.example`.

## Quality And Operations

- Unit tests cover reducer behavior and localStorage hydrate/persist edge cases
  with Vitest.
- A Playwright E2E spec covers add, edit, toggle, toggle-all, filter,
  clear-completed, and reload persistence.
- The app builds to static files in `dist/` with `npm run build`.
- The production build can be served with `npm run serve`, which runs Vite
  preview on `0.0.0.0:8080`.

## Conventions

- Browser-exposed configuration must use `VITE_`-prefixed environment variables.
- Runtime todo data stays client-side in localStorage; there is no backend or
  database in the current app.
- Keep TodoMVC class names and structure aligned with the official CSS so the UI
  remains compatible with the upstream TodoMVC styles.
