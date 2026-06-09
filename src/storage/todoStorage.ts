import { appConfig } from '../config';
import type { Todo } from '../types/todo';

export interface TodoStorageDriver {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function loadTodos(
  key = appConfig.todoStorageKey,
  storage = getLocalStorage(),
): Todo[] {
  if (!storage) {
    return [];
  }

  try {
    const rawTodos = storage.getItem(key);

    if (!rawTodos) {
      return [];
    }

    return parseTodos(JSON.parse(rawTodos));
  } catch {
    return [];
  }
}

export function saveTodos(
  todos: ReadonlyArray<Todo>,
  key = appConfig.todoStorageKey,
  storage = getLocalStorage(),
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

function getLocalStorage(): TodoStorageDriver | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function parseTodos(value: unknown): Todo[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isTodo);
}

function isTodo(value: unknown): value is Todo {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.completed === 'boolean'
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
