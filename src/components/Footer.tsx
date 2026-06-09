import type { MouseEvent } from 'react';
import { hashForFilter } from '../hooks/useHashFilter';
import type { TodoFilter } from '../types/todo';

const FILTER_LINKS: ReadonlyArray<{
  filter: TodoFilter;
  label: string;
}> = [
  { filter: 'all', label: 'All' },
  { filter: 'active', label: 'Active' },
  { filter: 'completed', label: 'Completed' },
];

interface FooterProps {
  activeCount: number;
  completedCount: number;
  activeFilter: TodoFilter;
  onSelectFilter: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

export function Footer({
  activeCount,
  completedCount,
  activeFilter,
  onSelectFilter,
  onClearCompleted,
}: FooterProps) {
  const itemLabel = activeCount === 1 ? 'item' : 'items';

  const handleFilterClick =
    (filter: TodoFilter) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onSelectFilter(filter);
    };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {itemLabel} left
      </span>
      <ul className="filters">
        {FILTER_LINKS.map(({ filter, label }) => (
          <li key={filter}>
            <a
              className={filter === activeFilter ? 'selected' : undefined}
              href={hashForFilter(filter)}
              onClick={handleFilterClick(filter)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      {completedCount > 0 ? (
        <button
          className="clear-completed"
          type="button"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}
