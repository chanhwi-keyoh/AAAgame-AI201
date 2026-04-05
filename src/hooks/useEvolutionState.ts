import { useState, useCallback, useRef } from 'react';
import { PathId } from '../types';
import { PATHS } from '../data/paths';

const DEBOUNCE_MS = 60;

export function useEvolutionState() {
  const [activePath, setActivePath] = useState<PathId>('human');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectPath = useCallback((id: PathId) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setActivePath(id);
    }, DEBOUNCE_MS);
  }, []);

  const selectPathImmediate = useCallback((id: PathId) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setActivePath(id);
  }, []);

  const currentPath = PATHS[activePath];

  return { activePath, currentPath, selectPath, selectPathImmediate };
}
