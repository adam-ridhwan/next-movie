'use client';

import React, { createContext, ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import { freezeAtom } from 'jotai/vanilla/utils';

import { usePages } from '@/app/(library)/_components/app-slider/_hooks';
import { Utils } from '@/app/(library)/_components/app-slider/utils';
import { Card } from '@/app/(library)/page';

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
  const { pageActions, cachePageActions } = usePages();

  /** ──────────────────────────────────────────────────────────────────────────
   * Initializes the slider with the first page of cards
   * ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const initVisibleCardsTotal = Utils.calcVisibleCardsTotal();
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

    pageActions.setAll(initPages);
    cachePageActions.set(initPages);
    setVisibleCardsTotal(initVisibleCardsTotal);
    setTrailingCardsTotal(lastPage.length);

    // prevCardsPerPageRef.current = initVisibleCardsTotal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
