import { describe, expect, it } from 'vitest';
import { todoReducer } from './todoReducer';
import type { Todo } from '../types/todo';

const baseTodos: Todo[] = [
  { id: '1', title: 'Buy milk', completed: false },
  { id: '2', title: 'File taxes', completed: true },
];

describe('todoReducer', () => {
  it('adds a todo with a trimmed title', () => {
    const nextState = todoReducer(baseTodos, {
      type: 'add',
      id: '3',
      title: '  Call Alex  ',
    });

    expect(nextState).toEqual([
      ...baseTodos,
      { id: '3', title: 'Call Alex', completed: false },
    ]);
  });

  it('ignores add actions with empty or whitespace-only titles', () => {
    expect(todoReducer(baseTodos, { type: 'add', id: '3', title: '   ' })).toBe(
      baseTodos,
    );
  });

  it('toggles one todo completion state', () => {
    expect(todoReducer(baseTodos, { type: 'toggle', id: '1' })).toEqual([
      { id: '1', title: 'Buy milk', completed: true },
      { id: '2', title: 'File taxes', completed: true },
    ]);
  });

  it('edits a todo title with trimming', () => {
    expect(
      todoReducer(baseTodos, {
        type: 'edit',
        id: '1',
        title: '  Buy oat milk  ',
      }),
    ).toEqual([
      { id: '1', title: 'Buy oat milk', completed: false },
      { id: '2', title: 'File taxes', completed: true },
    ]);
  });

  it('deletes a todo when edited to an empty title', () => {
    expect(
      todoReducer(baseTodos, { type: 'edit', id: '1', title: ' ' }),
    ).toEqual([{ id: '2', title: 'File taxes', completed: true }]);
  });

  it('deletes a todo by id', () => {
    expect(todoReducer(baseTodos, { type: 'delete', id: '2' })).toEqual([
      { id: '1', title: 'Buy milk', completed: false },
    ]);
  });

  it('marks every todo completed with toggle-all', () => {
    expect(
      todoReducer(baseTodos, { type: 'toggle-all', completed: true }),
    ).toEqual([
      { id: '1', title: 'Buy milk', completed: true },
      { id: '2', title: 'File taxes', completed: true },
    ]);
  });

  it('marks every todo active with toggle-all', () => {
    expect(
      todoReducer(baseTodos, { type: 'toggle-all', completed: false }),
    ).toEqual([
      { id: '1', title: 'Buy milk', completed: false },
      { id: '2', title: 'File taxes', completed: false },
    ]);
  });

  it('clears completed todos', () => {
    expect(todoReducer(baseTodos, { type: 'clear-completed' })).toEqual([
      { id: '1', title: 'Buy milk', completed: false },
    ]);
  });
});
