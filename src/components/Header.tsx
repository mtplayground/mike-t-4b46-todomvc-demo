import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

interface HeaderProps {
  onAddTodo: (title: string) => void;
}

export function Header({ onAddTodo }: HeaderProps) {
  const [title, setTitle] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    const nextTitle = title.trim();

    if (!nextTitle) {
      return;
    }

    onAddTodo(nextTitle);
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </header>
  );
}
