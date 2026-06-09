import { useEffect, useReducer, type Dispatch } from 'react';
import {
  todoReducer,
  type TodoAction,
  type TodoState,
} from '../state/todoReducer';
import { loadTodos, saveTodos } from '../storage/todoStorage';

const EMPTY_TODOS: TodoState = [];

export function usePersistentTodos(): readonly [
  TodoState,
  Dispatch<TodoAction>,
] {
  const [todos, dispatch] = useReducer(todoReducer, EMPTY_TODOS, () =>
    loadTodos(),
  );

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return [todos, dispatch];
}
