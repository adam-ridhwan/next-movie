'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { GetTranslatePercentageParams } from '@/lib/hooks/use-translate-percentage';
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
  handleRightScroll: (
    getTranslatePercentage: (params: GetTranslatePercentageParams) => number
  ) => void;
  handleLeftScroll: (
    getTranslatePercentage: (params: GetTranslatePercentageParams) => number
  ) => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (CARDS: Card[]) =>
  create(
    devtools<SliderStore>((set, get) => ({
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

          const newPages: PagesMap = new Map<number, Card[]>();
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
      enableAnimation: () => {
        set(() => {
          document.body.style.pointerEvents = 'none';
          return { isAnimating: true };
        });
      },
      disableAnimation: () => {
        set(() => {
          document.body.style.pointerEvents = '';
          return { isAnimating: false };
        });
      },
      handleRightScroll: getTranslatePercentage => {
        get().enableAnimation();
        const newCurrentPage = get().currentPage + 1;
        const isLastPage = newCurrentPage === get().maxPage;

        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.RIGHT,
          lastPageLength: get().lastPageLength,
          isLastPage: isLastPage && get().isFirstPageVisited,
        });

        get().setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          get().disableAnimation();
          get().setTranslatePercentage(0);
          const canGoToNextPage = newCurrentPage <= get().maxPage;
          canGoToNextPage ? get().goToNextPage() : get().goToFirstPage();
          if (isLastPage) get().goToLastPage();
        }, TIMEOUT_DURATION);

        return;
      },
      handleLeftScroll: getTranslatePercentage => {
        get().enableAnimation();
        const newCurrentPage = get().currentPage - 1;

        const isFirstPage = newCurrentPage === 1;
        const isGoingLeftAfterFirstPage = newCurrentPage < 1;

        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.LEFT,
          lastPageLength: get().lastPageLength,
          isFirstPage: isFirstPage && get().isLastPageVisited,
        });

        get().setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          get().disableAnimation();
          get().setTranslatePercentage(0);
          const canGoToPrevPage = newCurrentPage > 1;
          canGoToPrevPage ? get().goToPrevPage() : get().goToFirstPage();
          if (isGoingLeftAfterFirstPage) get().goToLastPage();
        }, TIMEOUT_DURATION);

        return;
      },
    }))
  );
