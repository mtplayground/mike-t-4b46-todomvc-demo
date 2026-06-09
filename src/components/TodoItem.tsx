import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import type { Todo, TodoId } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: TodoId) => void;
  onDeleteTodo: (id: TodoId) => void;
  onEditTodo: (id: TodoId, title: string) => void;
}

export function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const editInput = editInputRef.current;

    if (!editInput) {
      return;
    }

    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  }, [isEditing]);

  const handleToggle = () => {
    onToggleTodo(todo.id);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  const handleStartEdit = () => {
    setDraftTitle(todo.title);
    setIsEditing(true);
  };

  const handleDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftTitle(event.target.value);
  };

  const handleSave = () => {
    if (!isEditing) {
      return;
    }

    const nextTitle = draftTitle.trim();
    setIsEditing(false);

    if (nextTitle !== todo.title) {
      onEditTodo(todo.id, draftTitle);
    }
  };

  const handleCancel = () => {
    setDraftTitle(todo.title);
    setIsEditing(false);
  };

  const handleEditKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  return (
    <li className={getItemClassName(todo.completed, isEditing)}>
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
        <label onDoubleClick={handleStartEdit}>{todo.title}</label>
        <button
          className="destroy"
          type="button"
          onClick={handleDelete}
          aria-label={`Delete ${todo.title}`}
        />
      </div>
      <input
        ref={editInputRef}
        className="edit"
        value={draftTitle}
        onChange={handleDraftChange}
        onKeyDown={handleEditKeyDown}
        onBlur={handleSave}
        aria-label={`Edit ${todo.title}`}
      />
    </li>
  );
}

function getItemClassName(completed: boolean, editing: boolean): string {
  return [completed ? 'completed' : undefined, editing ? 'editing' : undefined]
    .filter(Boolean)
    .join(' ');
}
