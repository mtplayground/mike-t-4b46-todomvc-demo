import { useCallback } from 'react';
import { Header } from './components/Header';
import { useHashFilter } from './hooks/useHashFilter';
import { usePersistentTodos } from './hooks/usePersistentTodos';

function App() {
  useHashFilter();
  const [, dispatch] = usePersistentTodos();

  const handleAddTodo = useCallback(
    (title: string) => {
      dispatch({ type: 'add', id: createTodoId(), title });
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
          <ul className="todo-list"></ul>
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
