import { TodoItem } from './TodoItem';
import type { Todo, TodoId } from '../types/todo';

interface TodoListProps {
  todos: ReadonlyArray<Todo>;
  onToggleTodo: (id: TodoId) => void;
  onDeleteTodo: (id: TodoId) => void;
  onEditTodo: (id: TodoId, title: string) => void;
}

export function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}
