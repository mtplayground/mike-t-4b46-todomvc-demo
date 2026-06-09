import type { Todo, TodoId } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: TodoId) => void;
  onDeleteTodo: (id: TodoId) => void;
}

export function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  const handleToggle = () => {
    onToggleTodo(todo.id);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <li className={todo.completed ? 'completed' : undefined}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark ${todo.title} as ${
            todo.completed ? 'active' : 'completed'
          }`}
        />
        <label>{todo.title}</label>
        <button
          className="destroy"
          type="button"
          onClick={handleDelete}
          aria-label={`Delete ${todo.title}`}
        />
      </div>
    </li>
  );
}
