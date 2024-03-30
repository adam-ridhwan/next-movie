'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getCardsPerPage } from '@/lib/getCardsPerPage';
import { Card } from '@/lib/types';

export type PagesMap = Map<number, Card[]>;
export type PagesArray = Array<[number, Card[]]>;

type State = {
  CARDS: Card[];
  pages: PagesMap;
  maxPage: number;
  currentPage: number;
  cache: string;
  cardsPerPage: number;
  trailingCardsTotal: number;
  translatePercentage: number;
  isFirstPageVisited: boolean;
  isLastPageVisited: boolean;
  hasPaginated: boolean;
  isAnimating: boolean;
};

type Actions = {
  setCurrentPage: (currentPage: number) => void;
  resetToFirstPage: () => void;
  updateCardsWhenOnLastPage: () => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToLastPage: () => void;
  setPages: (pages: PagesArray, trailingCardsTotal: number) => void;
  resetPages: () => void;
  setCache: (pages: PagesArray) => void;
  getCache: () => PagesArray;
  setCardsPerPage: (cardsPerPage: number) => void;
  setTrailingCardsTotal: (trailingCardsTotal: number) => void;
  setTranslatePercentage: (translatePercentage: number) => void;
  markAsPaginated: () => void;
  setIsAnimating: (isAnimating: boolean) => void;
  enableAnimation: () => void;
  disableAnimation: () => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (CARDS: Card[]) =>
  create(
    devtools<SliderStore>((set, get) => ({
      CARDS: CARDS,
      pages: new Map<number, Card[]>().set(1, CARDS.slice(0, 7)),
      maxPage: Math.ceil(CARDS.length / getCardsPerPage()),
      cache: '',
      cardsPerPage: getCardsPerPage(),
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      trailingCardsTotal: 0,
      translatePercentage: 0,

      disableAnimation: () => set(() => ({ isAnimating: false })),
      enableAnimation: () => set(() => ({ isAnimating: true })),
      setCardsPerPage: cardsPerPage => set(() => ({ cardsPerPage })),
      goToLastPage: () => set(state => ({ currentPage: state.maxPage })),
      goToNextPage: () => set(state => ({ currentPage: state.currentPage + 1 })),
      goToPrevPage: () => set(state => ({ currentPage: state.currentPage - 1 })),
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setTrailingCardsTotal: trailingCardsTotal => set(() => ({ trailingCardsTotal })),
      setTranslatePercentage: translatePercentage => set(() => ({ translatePercentage })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      setCache: pages => set(() => ({ cache: JSON.stringify(pages) })),
      getCache: () => {
        const state = get();
        try {
          return JSON.parse(state.cache);
        } catch (error) {
          console.error('Failed to parse cache:', error);
          return new Map();
        }
      },
      resetToFirstPage: () =>
        set(state => {
          const cardsBeforeFirstIndex = state.CARDS.slice(-state.cardsPerPage);
          const cardsAfterFirstIndex = state.getCache();
          const newPages: PagesArray = [[0, cardsBeforeFirstIndex], ...cardsAfterFirstIndex];

          return {
            currentPage: 1,
            pages: new Map(newPages),
            isFirstPageVisited: true,
            isLastPageVisited: false,
          };
        }),
      setPages: (pages, trailingCardsTotal) =>
        set(() => ({
          pages: new Map(pages),
          cache: JSON.stringify(pages),
          trailingCardsTotal,
        })),
      updateCardsWhenOnLastPage: () =>
        set(state => {
          const newCards: Card[] = [];
          const totalCards = state.maxPage * state.cardsPerPage;

          let decrementingCardIndex = CARDS.length - 1;
          for (let i = totalCards; i > 0; i--) {
            newCards.unshift(CARDS[decrementingCardIndex--]);
            if (decrementingCardIndex === -1) {
              decrementingCardIndex = CARDS.length - 1;
            }
          }

          // Need to add the first few cards to the end,
          // so that the cards are aligned properly
          newCards.push(...CARDS.slice(0, state.cardsPerPage));

          // TODO: Instead of using array, just directly create the pages using a map
          const newPages: PagesArray = Array.from({ length: state.maxPage + 1 }, (_, pageIndex) => {
            const startIndex = pageIndex * state.cardsPerPage;
            const endIndex = startIndex + state.cardsPerPage;
            const newCardsGroup = newCards.slice(startIndex, endIndex);
            return [pageIndex + 1, newCardsGroup];
          });

          return {
            pages: new Map(newPages),
            isFirstPageVisited: false,
            isLastPageVisited: true,
          };
        }),
    }))
  );
