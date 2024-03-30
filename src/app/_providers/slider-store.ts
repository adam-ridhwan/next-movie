'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { sliderUtils } from '@/app/(library)/_components/app-slider/slider-utils';
import { Card } from '@/app/(library)/page';

type Pages = Map<number, Card[]> | Array<[number, Card[]]>;

type State = {
  CARDS: Card[];
  pages: Map<number, Card[]>;
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
  setPages: (pages: Pages, trailingCardsTotal: number) => void;
  resetPages: () => void;
  setCache: (pages: [number, Card[]][]) => void;
  getCache: () => Array<[number, Card[]]>;
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
      cache: '',
      cardsPerPage: sliderUtils.getCardsPerPage(),
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      maxPage: Math.ceil(CARDS.length / sliderUtils.getCardsPerPage()),
      pages: new Map<number, Card[]>().set(1, CARDS.slice(0, 7)),
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
      resetToFirstPage: () => {
        set(state => {
          const cardsBeforeFirstIndex = state.CARDS.slice(-state.cardsPerPage);
          const cardsAfterFirstIndex = state.getCache();
          const newPages: [number, Card[]][] = [
            [0, cardsBeforeFirstIndex],
            ...cardsAfterFirstIndex,
          ];

          return {
            currentPage: 1,
            pages: new Map(newPages),
            isFirstPageVisited: true,
            isLastPageVisited: false,
          };
        });
      },
      setPages: (pages, trailingCardsTotal) =>
        set(() => ({
          pages: new Map(pages),
          cache: JSON.stringify(pages),
          trailingCardsTotal,
        })),
      updateCardsWhenOnLastPage: () => {
        set(state => {
          const newCards: Card[] = [];
          const cardsTotal = state.maxPage * state.cardsPerPage;

          let decrementingCardIndex = CARDS.length - 1;
          for (let i = cardsTotal; i > 0; i--) {
            newCards.unshift(CARDS[decrementingCardIndex--]);
            if (decrementingCardIndex === -1) {
              decrementingCardIndex = CARDS.length - 1;
            }
          }

          // Need to add the first few cards to the end,
          // so that the cards are aligned properly
          newCards.push(...CARDS.slice(0, state.cardsPerPage));

          const newPages: [number, Card[]][] = Array.from(
            { length: state.maxPage + 1 },
            (_, pageIndex) => {
              const startIndex = pageIndex * state.cardsPerPage;
              const endIndex = startIndex + state.cardsPerPage;
              const newCardsGroup = newCards.slice(startIndex, endIndex);
              return [pageIndex + 1, newCardsGroup];
            }
          );

          return {
            pages: new Map<number, Card[]>(newPages),
            isFirstPageVisited: false,
            isLastPageVisited: true,
          };
        });
      },
    }))
  );
