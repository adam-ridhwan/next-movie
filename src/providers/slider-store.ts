'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Card } from '@/lib/types';
import { getCardsPerPage } from '@/lib/utils';

export type PagesMap = Map<number, Card[]>;

type State = {
  CARDS: Card[];
  pages: PagesMap;
  maxPage: number;
  currentPage: number;
  cache: PagesMap;
  cardsPerPage: number;
  lastPageLength: number;
  translatePercentage: number;
  isFirstPageVisited: boolean;
  isLastPageVisited: boolean;
  hasPaginated: boolean;
  isAnimating: boolean;
};

type Actions = {
  setCurrentPage: (currentPage: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setInitialPages: (pages: PagesMap, lastPageLength: number) => void;
  resetPages: () => void;
  setCache: (pages: PagesMap) => void;
  setCardsPerPage: (cardsPerPage: number) => void;
  setLastPageLength: (lastPageLength: number) => void;
  setTranslatePercentage: (translatePercentage: number) => void;
  markAsPaginated: () => void;
  setIsAnimating: (isAnimating: boolean) => void;
  enableAnimation: () => void;
  disableAnimation: () => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (CARDS: Card[]) =>
  create(
    devtools<SliderStore>(set => ({
      CARDS: CARDS,
      pages: new Map<number, Card[]>().set(1, CARDS.slice(0, 7)),
      maxPage: Math.ceil(CARDS.length / getCardsPerPage()),
      cache: new Map(),
      cardsPerPage: getCardsPerPage(),
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      lastPageLength: 0,
      translatePercentage: 0,

      disableAnimation: () => set(() => ({ isAnimating: false })),
      enableAnimation: () => set(() => ({ isAnimating: true })),
      setCardsPerPage: cardsPerPage => set(() => ({ cardsPerPage })),
      goToNextPage: () =>
        set(state => ({ currentPage: state.currentPage + 1, hasPaginated: true })),
      goToPrevPage: () => set(state => ({ currentPage: state.currentPage - 1 })),
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setLastPageLength: lastPageLength => set(() => ({ lastPageLength })),
      setTranslatePercentage: translatePercentage => set(() => ({ translatePercentage })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      setCache: pages => set(() => ({ cache: pages })),
      setInitialPages: (pages, lastPageLength) => {
        set(() => ({
          pages: pages,
          cache: pages,
          lastPageLength,
        }));
      },
      goToFirstPage: () =>
        set(state => {
          const cardsBeforeFirstIndex = state.CARDS.slice(-state.cardsPerPage);
          const page = state.cache.set(0, cardsBeforeFirstIndex);

          return {
            pages: page,
            currentPage: 1,
            isFirstPageVisited: true,
            isLastPageVisited: false,
          };
        }),
      goToLastPage: () =>
        set(state => {
          const newCards: Card[] = [];
          const totalCards = state.maxPage * state.cardsPerPage;

          let decrementingCardIndex = state.CARDS.length - 1;
          for (let i = totalCards; i > 0; i--) {
            newCards.unshift(state.CARDS[decrementingCardIndex--]);
            if (decrementingCardIndex === -1) {
              decrementingCardIndex = state.CARDS.length - 1;
            }
          }

          // Add the first few cards to the end to align properly
          newCards.push(...state.CARDS.slice(0, state.cardsPerPage));

          const newPages = new Map<number, Card[]>();
          for (let pageIndex = 0; pageIndex < state.maxPage + 1; pageIndex++) {
            const startIndex = pageIndex * state.cardsPerPage;
            const endIndex = startIndex + state.cardsPerPage;
            const newCardsGroup = newCards.slice(startIndex, endIndex);
            newPages.set(pageIndex + 1, newCardsGroup);
          }

          return {
            pages: newPages,
            currentPage: state.maxPage,
            isFirstPageVisited: false,
            isLastPageVisited: true,
          };
        }),
    }))
  );
