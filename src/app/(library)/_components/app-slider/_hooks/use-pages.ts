import { useCallback } from 'react';
import { useAtom } from 'jotai/index';

import {
  cachedPagesAtom,
  pagesAtom,
  useAtoms,
} from '@/app/(library)/_components/app-slider/slider-store';
import { Card } from '@/app/(library)/page';

type PagesMap = Map<number, Card[]> | [number, Card[]][];

type PageActions = {
  set: (key: number, value: Card[]) => void;
  setAll: (entries: PagesMap) => void;
  remove: (key: number) => void;
  reset: Map<number, Card[]>['clear'];
  resetToInitial: () => void;
};

type CachePageAction = {
  get: () => void;
  set: (entries: PagesMap) => void;
};

type UseMapReturn = {
  pages: Omit<Map<number, Card[]>, 'set' | 'clear' | 'delete'>;
  pageActions: PageActions;
  cachePageActions: CachePageAction;
};

export const usePages = (): UseMapReturn => {
  const [pages, setPages] = useAtom(pagesAtom);
  const [cachedPages, setCachedPages] = useAtom(cachedPagesAtom);
  const { CARDS, visibleCardsTotal } = useAtoms();

  const pageActions: PageActions = {
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

    resetToInitial: useCallback(() => {
      const newCards: Card[] = [];
      const cardsTotal = pages.size * visibleCardsTotal;

      let decrementingCardIndex = CARDS.length - 1;
      for (let i = cardsTotal; i > 0; i--) {
        newCards.unshift(CARDS[decrementingCardIndex--]);
        if (decrementingCardIndex === -1) {
          decrementingCardIndex = CARDS.length - 1;
        }
      }

      newCards.push(...CARDS.slice(0, visibleCardsTotal));

      const newPages: [number, Card[]][] = Array.from(
        { length: pages.size + 1 },
        (_, pageIndex) => {
          const startIndex = pageIndex * visibleCardsTotal;
          return [pageIndex + 1, newCards.slice(startIndex, startIndex + visibleCardsTotal)];
        }
      );

      setPages(() => new Map());
      setPages(() => new Map(newPages));
    }, [CARDS, pages.size, setPages, visibleCardsTotal]),
  };

  const cachePageActions: CachePageAction = {
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

  return { pages, pageActions, cachePageActions };
};
