'use client';

import chalk from 'chalk';
import { create } from 'zustand';

import { DEVELOPMENT_MODE } from '@/app/_lib/utils';
import { sliderUtils } from '@/app/(library)/_components/app-slider/slider-utils';
import { Card } from '@/app/(library)/page';

// eslint-disable-next-line no-console,@typescript-eslint/no-unused-vars
const log = (x: string) => DEVELOPMENT_MODE && console.log(chalk.bgCyan.black(x));

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
  setPages: (pages: Map<number, Card[]> | Array<[number, Card[]]>) => void;
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

export const createSliderStore = (CARDS: Card[]) => {
  return create<SliderStore>((set, get) => ({
    CARDS: CARDS,

    pages: new Map<number, Card[]>().set(1, CARDS.slice(0, 7)),
    maxPage: Math.ceil(CARDS.length / sliderUtils.getCardsPerPage()),
    isFirstPageVisited: true,
    isLastPageVisited: false,
    setPages: pages => {
      // log('setPages()');
      set(() => {
        return { pages: new Map(pages) };
      });
    },
    resetPages: () => {
      // log('resetPages()');
      set(() => {
        return { pages: new Map() };
      });
    },

    currentPage: 1,
    setCurrentPage: currentPage => {
      // log('setCurrentPage()');
      set(() => {
        return { currentPage };
      });
    },
    goToNextPage: () => {
      // log('goToNextPage()');
      set(state => {
        return { currentPage: state.currentPage + 1 };
      });
    },
    goToPrevPage: () => {
      // log('goToPrevPage()');
      set(state => {
        return { currentPage: state.currentPage - 1 };
      });
    },
    goToLastPage: () => {
      // log('goToLastPage()');
      set(state => {
        return { currentPage: state.maxPage };
      });
    },

    resetToFirstPage: () => {
      // log('resetToFirstPage()');
      set(state => {
        const cardsBeforeFirstIndex = state.CARDS.slice(-state.cardsPerPage);
        const cardsAfterFirstIndex = state.getCache();
        const newPages: [number, Card[]][] = [[0, cardsBeforeFirstIndex], ...cardsAfterFirstIndex];

        return {
          currentPage: 1,
          pages: new Map(newPages),
          isFirstPageVisited: true,
          isLastPageVisited: false,
        };
      });
    },
    updateCardsWhenOnLastPage: () => {
      // log('updateCardsWhenOnLastPage()');
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

    cache: '',
    setCache: pages => {
      // log('setCache()');
      set(() => {
        return { cache: JSON.stringify(pages) };
      });
    },
    getCache: () => {
      // log('getCache()');
      const state = get();
      try {
        return JSON.parse(state.cache);
      } catch (error) {
        console.error('Failed to parse cache:', error);
        return new Map();
      }
    },

    cardsPerPage: sliderUtils.getCardsPerPage(),
    setCardsPerPage: cardsPerPage => {
      // log('setCardsPerPage()');
      set(() => {
        return { cardsPerPage };
      });
    },

    trailingCardsTotal: 0,
    setTrailingCardsTotal: trailingCardsTotal => {
      // log('setTrailingCardsTotal()');
      set(() => {
        return { trailingCardsTotal };
      });
    },

    translatePercentage: 0,
    setTranslatePercentage: translatePercentage => {
      // log('setTranslatePercentage()');
      set(() => ({ translatePercentage }));
    },

    hasPaginated: false,
    markAsPaginated: () => {
      // log('markAsPaginated()');
      set(() => {
        return { hasPaginated: true };
      });
    },

    isAnimating: false,
    setIsAnimating: (isAnimating: boolean) => {
      // log('setIsAnimating()');
      set(() => {
        return { isAnimating };
      });
    },
    enableAnimation: () => {
      // log('enableAnimation()');
      set(() => {
        return { isAnimating: true };
      });
    },
    disableAnimation: () => {
      // log('disableAnimation()');
      set(() => {
        return { isAnimating: false };
      });
    },
  }));
};
