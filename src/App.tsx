import { useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { useHashFilter } from './hooks/useHashFilter';
import { usePersistentTodos } from './hooks/usePersistentTodos';
import type { Todo, TodoFilter, TodoId } from './types/todo';

function App() {
  const [activeFilter] = useHashFilter();
  const [todos, dispatch] = usePersistentTodos();

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, activeFilter),
    [activeFilter, todos],
  );

  const handleAddTodo = useCallback(
    (title: string) => {
      dispatch({ type: 'add', id: createTodoId(), title });
    },
    [dispatch],
  );

  const handleToggleTodo = useCallback(
    (id: TodoId) => {
      dispatch({ type: 'toggle', id });
    },
    [dispatch],
  );

  const handleDeleteTodo = useCallback(
    (id: TodoId) => {
      dispatch({ type: 'delete', id });
    },
    [dispatch],
  );

  return (
    <>
      <section className="todoapp">
        <Header onAddTodo={handleAddTodo} />

        <main className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </main>

        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> items left
          </span>
          <ul className="filters">
            <li>
              <a className="selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed" type="button">
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Part of <a href="https://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;

function createTodoId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getVisibleTodos(
  todos: ReadonlyArray<Todo>,
  filter: TodoFilter,
): ReadonlyArray<Todo> {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'all':
      return todos;
    default:
      return assertNever(filter);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled todo filter: ${value}`);
}
