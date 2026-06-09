const DEFAULT_TODO_STORAGE_KEY = 'mike-t-4b46-todomvc-demo:todos';

function envString(value: string | undefined, fallback: string): string {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : fallback;
}

export const appConfig = Object.freeze({
  todoStorageKey: envString(
    import.meta.env.VITE_TODO_STORAGE_KEY,
    DEFAULT_TODO_STORAGE_KEY,
  ),
});
