import type { ChangeEvent } from 'react';

interface ToggleAllProps {
  allCompleted: boolean;
  disabled: boolean;
  onToggleAll: (completed: boolean) => void;
}

export function ToggleAll({
  allCompleted,
  disabled,
  onToggleAll,
}: ToggleAllProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToggleAll(event.target.checked);
  };

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allCompleted}
        disabled={disabled}
        onChange={handleChange}
        aria-label="Mark all as complete"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
