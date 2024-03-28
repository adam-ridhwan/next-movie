import { useCallback } from 'react';
import { useAtom } from 'jotai/index';

import { cachedPagesAtom, pagesAtom } from '@/app/_components/app-slider/slider-store';
import { Card } from '@/app/(library)/page';

type PagesMap = Map<number, Card[]> | [number, Card[]][];

type UseMapActions = {
  set: (key: number, value: Card[]) => void;
  setAll: (entries: PagesMap) => void;
  remove: (key: number) => void;
  reset: Map<number, Card[]>['clear'];
};

type CacheActions = {
  get: () => void;
  set: (entries: PagesMap) => void;
};

type UseMapReturn = [
  Omit<Map<number, Card[]>, 'set' | 'clear' | 'delete'>,
  UseMapActions,
  CacheActions,
];

export const usePages = (): UseMapReturn => {
  const [pages, setPages] = useAtom(pagesAtom);
  const [cachedPages, setCachedPages] = useAtom(cachedPagesAtom);

  const actions: UseMapActions = {
    set: useCallback(
      (key, value) => {
        setPages(prev => {
          const copy = new Map(prev);
          copy.set(key, value);
          return copy;
        });
      },
      [setPages]
    ),

    setAll: useCallback(
      entries => {
        setPages(() => new Map(entries));
      },
      [setPages]
    ),

    remove: useCallback(
      key => {
        setPages(prev => {
          const copy = new Map(prev);
          copy.delete(key);
          return copy;
        });
      },
      [setPages]
    ),

    reset: useCallback(() => {
      setPages(() => new Map());
    }, [setPages]),
  };

  const cache = {
    get: useCallback(() => {
      setPages(new Map(JSON.parse(cachedPages)));
    }, [cachedPages, setPages]),
    set: useCallback(
      (mappedPages: PagesMap) => {
        setCachedPages(JSON.stringify(mappedPages));
      },
      [setCachedPages]
    ),
  };

  return [pages, actions, cache];
};
