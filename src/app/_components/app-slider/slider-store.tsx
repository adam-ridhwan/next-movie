'use client';

import { createContext, ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import { freezeAtom } from 'jotai/vanilla/utils';

import { usePages } from '@/app/_components/app-slider/_hooks';
import { Card } from '@/app/(library)/page';

const MEDIA_QUERY = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const PADDING = 80;

type SliderStoreProps = {
  cards: Card[];
  children: ReactNode;
};

export const frozenCardsAtom = freezeAtom(atom<Card[]>([]));
export const pagesAtom = atom<Map<number, Card[]>>(new Map<number, Card[]>());
export const cachedPagesAtom = atom<string>('');
export const currentPageAtom = atom(1);

export const visibleCardsTotalAtom = atom(6);
export const trailingCardsTotalAtom = atom<number>(0);
export const translatePercentageAtom = atom<number | undefined>(0);

export const isAnimatingAtom = atom(false);

export const useAtoms = () => {
  const [CARDS] = useAtom(frozenCardsAtom);

  const [visibleCardsTotal, setVisibleCardsTotal] = useAtom(visibleCardsTotalAtom);
  const [trailingCardsTotal, setTrailingCardsTotal] = useAtom(trailingCardsTotalAtom);
  const [translatePercentage, setTranslatePercentage] = useAtom(translatePercentageAtom);

  return {
    CARDS,
    visibleCardsTotal,
    setVisibleCardsTotal,
    trailingCardsTotal,
    setTrailingCardsTotal,
    translatePercentage,
    setTranslatePercentage,
  };
};

export const SliderStore = ({ cards, children }: SliderStoreProps) => {
  const initialPages = new Map<number, Card[]>().set(1, cards.slice(0, 7));

  useHydrateAtoms([
    [frozenCardsAtom, cards],
    [pagesAtom, initialPages],
  ]);

  const { setTrailingCardsTotal, setVisibleCardsTotal } = useAtoms();
  const [_, actions, cache] = usePages();

  /** ──────────────────────────────────────────────────────────────────────────
   * Initializes the slider with the first page of cards
   * ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const initVisibleCardsTotal = calcVisibleCardsTotal();
    const initPagesTotal = Math.ceil(cards.length / initVisibleCardsTotal);

    const initPages: [number, Card[]][] = Array.from({ length: initPagesTotal }, (_, pageIndex) => {
      const startIndex = pageIndex * initVisibleCardsTotal;
      const endIndex = startIndex + initVisibleCardsTotal;
      return [pageIndex + 1, cards.slice(startIndex, endIndex)];
    });

    const lastPage = initPages[initPages.length - 1][1];

    // If the last page has less than the required number of cards,
    // fill it up with the remaining cards
    if (initPages.length > 1 && lastPage.length !== initVisibleCardsTotal) {
      const cardsNeeded = initVisibleCardsTotal - lastPage.length;
      initPages[initPages.length - 1][1] = [...lastPage, ...cards.slice(0, cardsNeeded)];
    }

    actions.setAll(initPages);
    cache.set(initPages);
    setVisibleCardsTotal(initVisibleCardsTotal);
    setTrailingCardsTotal(lastPage.length);

    // prevCardsPerPageRef.current = initVisibleCardsTotal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export const calcVisibleCardsTotal = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < MEDIA_QUERY.sm) return 2;
  if (windowWidth < MEDIA_QUERY.md) return 3;
  if (windowWidth < MEDIA_QUERY.lg) return 4;
  if (windowWidth < MEDIA_QUERY.xl) return 5;
  return 6;
};

export const calcTranslatePercentage = ({
  trailingCardsTotal,
  sliderRef,
  sliderItemRef,
  isLastPage = false,
}: {
  trailingCardsTotal: number;
  sliderRef: RefObject<HTMLDivElement>;
  sliderItemRef: RefObject<HTMLDivElement>;
  isLastPage?: boolean;
}): number => {
  if (!sliderRef.current || !sliderItemRef.current) return 0;

  const windowWidth = window.innerWidth;
  const { offsetWidth: sliderWidth } = sliderRef.current;
  const { offsetWidth: sliderItemWidth } = sliderItemRef.current;

  if (!isLastPage) return ((sliderWidth - PADDING) / windowWidth) * 100;
  return ((trailingCardsTotal * sliderItemWidth) / windowWidth) * -100;
};

export const RefContext = createContext<RefContextType>(null);

type RefContextType = {
  sliderRef: RefObject<HTMLDivElement>;
  sliderItemRef: RefObject<HTMLDivElement>;
} | null;

export default function RefContextProvider({ children }: { children: ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderItemRef = useRef<HTMLDivElement>(null);

  return <RefContext.Provider value={{ sliderRef, sliderItemRef }}>{children}</RefContext.Provider>;
}

export function useRefContext() {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error('useRefContext must be used within a RefContextProvider');
  }
  return context;
}
