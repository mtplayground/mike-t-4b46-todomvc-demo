import type { Todo, TodoId } from '../types/todo';

export type TodoAction =
  | { type: 'add'; id: TodoId; title: string }
  | { type: 'toggle'; id: TodoId }
  | { type: 'edit'; id: TodoId; title: string }
  | { type: 'delete'; id: TodoId }
  | { type: 'toggle-all'; completed: boolean }
  | { type: 'clear-completed' };

export type TodoState = ReadonlyArray<Todo>;

export function todoReducer(
  state: ReadonlyArray<Todo>,
  action: TodoAction,
): TodoState {
  switch (action.type) {
    case 'add': {
      const title = normalizeTitle(action.title);

      if (!title) {
        return state;
      }

      return [
        ...state,
        {
          id: action.id,
          title,
          completed: false,
        },
      ];
    }

    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );

    case 'edit': {
      const title = normalizeTitle(action.title);

      if (!title) {
        return state.filter((todo) => todo.id !== action.id);
      }

      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title } : todo,
      );
    }

    case 'delete':
      return state.filter((todo) => todo.id !== action.id);

    case 'toggle-all':
      return state.map((todo) => ({ ...todo, completed: action.completed }));

    case 'clear-completed':
      return state.filter((todo) => !todo.completed);

    default:
      return assertNever(action);
  }
}

function normalizeTitle(title: string): string {
  return title.trim();
}

function assertNever(value: never): never {
  throw new Error(`Unhandled todo action: ${JSON.stringify(value)}`);
}
