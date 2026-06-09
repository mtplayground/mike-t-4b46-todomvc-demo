import { describe, expect, it } from 'vitest';
import { loadTodos, saveTodos, type TodoStorageDriver } from './todoStorage';
import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos:test';

class MemoryStorage implements TodoStorageDriver {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

class ThrowingStorage implements TodoStorageDriver {
  getItem(): string | null {
    throw new Error('storage unavailable');
  }

  setItem(): void {
    throw new Error('storage unavailable');
  }
}

describe('todoStorage', () => {
  it('hydrates an empty list when localStorage has no value', () => {
    expect(loadTodos(STORAGE_KEY, new MemoryStorage())).toEqual([]);
  });

  it('hydrates valid todos from localStorage', () => {
    const storage = new MemoryStorage();
    const todos: Todo[] = [
      { id: '1', title: 'Buy milk', completed: false },
      { id: '2', title: 'File taxes', completed: true },
    ];

    storage.setItem(STORAGE_KEY, JSON.stringify(todos));

    expect(loadTodos(STORAGE_KEY, storage)).toEqual(todos);
  });

  it('returns an empty list for corrupt JSON', () => {
    const storage = new MemoryStorage();
    storage.setItem(STORAGE_KEY, '{not-json');

    expect(loadTodos(STORAGE_KEY, storage)).toEqual([]);
  });

  it('returns an empty list for non-array JSON', () => {
    const storage = new MemoryStorage();
    storage.setItem(STORAGE_KEY, JSON.stringify({ todos: [] }));

    expect(loadTodos(STORAGE_KEY, storage)).toEqual([]);
  });

  it('drops invalid todo records during hydration', () => {
    const storage = new MemoryStorage();
    const validTodo: Todo = { id: '1', title: 'Buy milk', completed: false };

    storage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        validTodo,
        { id: '2', title: 'Missing completed' },
        { id: 3, title: 'Wrong id type', completed: false },
      ]),
    );

    expect(loadTodos(STORAGE_KEY, storage)).toEqual([validTodo]);
  });

  it('returns an empty list when storage reads throw', () => {
    expect(loadTodos(STORAGE_KEY, new ThrowingStorage())).toEqual([]);
  });

  it('persists todos as JSON', () => {
    const storage = new MemoryStorage();
    const todos: Todo[] = [{ id: '1', title: 'Buy milk', completed: false }];

    expect(saveTodos(todos, STORAGE_KEY, storage)).toBe(true);
    expect(storage.getItem(STORAGE_KEY)).toBe(JSON.stringify(todos));
  });

  it('reports failed persistence when storage writes throw', () => {
    const todos: Todo[] = [{ id: '1', title: 'Buy milk', completed: false }];

    expect(saveTodos(todos, STORAGE_KEY, new ThrowingStorage())).toBe(false);
  });
});
