import { useCallback, useMemo } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ToggleAll } from './components/ToggleAll';
import { TodoList } from './components/TodoList';
import { useHashFilter } from './hooks/useHashFilter';
import { usePersistentTodos } from './hooks/usePersistentTodos';
import type { Todo, TodoFilter, TodoId } from './types/todo';

function App() {
  const [activeFilter, setActiveFilter] = useHashFilter();
  const [todos, dispatch] = usePersistentTodos();
  const hasTodos = todos.length > 0;
  const allTodosCompleted = hasTodos && todos.every((todo) => todo.completed);
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

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

  const handleEditTodo = useCallback(
    (id: TodoId, title: string) => {
      dispatch({ type: 'edit', id, title });
    },
    [dispatch],
  );

  const handleToggleAll = useCallback(
    (completed: boolean) => {
      dispatch({ type: 'toggle-all', completed });
    },
    [dispatch],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'clear-completed' });
  }, [dispatch]);

  return (
    <>
      <section className="todoapp">
        <Header onAddTodo={handleAddTodo} />

        <main className="main">
          <ToggleAll
            allCompleted={allTodosCompleted}
            disabled={!hasTodos}
            onToggleAll={handleToggleAll}
          />
          <TodoList
            todos={visibleTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
          />
        </main>

        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          onClearCompleted={handleClearCompleted}
        />
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
