import { useCallback, useEffect, useState } from 'react';
import type { TodoFilter } from '../types/todo';

const DEFAULT_FILTER: TodoFilter = 'all';

const HASH_BY_FILTER = {
  all: '#/',
  active: '#/active',
  completed: '#/completed',
} as const satisfies Record<TodoFilter, string>;

export function useHashFilter(): readonly [
  TodoFilter,
  (filter: TodoFilter) => void,
] {
  const [activeFilter, setActiveFilter] = useState<TodoFilter>(() =>
    readFilterFromLocation(),
  );

  const setFilter = useCallback((filter: TodoFilter) => {
    setActiveFilter(filter);
    writeFilterToLocation(filter);
  }, []);

  useEffect(() => {
    if (!canUseWindow()) {
      return undefined;
    }

    const syncFilter = () => {
      const filter = readFilterFromLocation();
      setActiveFilter(filter);
      normalizeCurrentHash(filter);
    };

    syncFilter();
    window.addEventListener('hashchange', syncFilter);

    return () => {
      window.removeEventListener('hashchange', syncFilter);
    };
  }, []);

  return [activeFilter, setFilter];
}

export function filterFromHash(hash: string): TodoFilter {
  switch (hash) {
    case HASH_BY_FILTER.active:
      return 'active';
    case HASH_BY_FILTER.completed:
      return 'completed';
    case HASH_BY_FILTER.all:
    case '':
      return 'all';
    default:
      return DEFAULT_FILTER;
  }
}

export function hashForFilter(filter: TodoFilter): string {
  return HASH_BY_FILTER[filter];
}

function readFilterFromLocation(): TodoFilter {
  if (!canUseWindow()) {
    return DEFAULT_FILTER;
  }

  return filterFromHash(window.location.hash);
}

function writeFilterToLocation(filter: TodoFilter): void {
  if (!canUseWindow()) {
    return;
  }

  const nextHash = hashForFilter(filter);

  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
}

function normalizeCurrentHash(filter: TodoFilter): void {
  if (!canUseWindow()) {
    return;
  }

  const canonicalHash = hashForFilter(filter);

  if (window.location.hash === canonicalHash) {
    return;
  }

  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}${canonicalHash}`,
  );
}

function canUseWindow(): boolean {
  return typeof window !== 'undefined';
}
