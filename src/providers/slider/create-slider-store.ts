import { create } from 'zustand';

import { MediaType, Pages, Section, TODO } from '@/types/global-types';

type SetPagesParams = {
  pages: Pages;
  maxPages: number;
  currentPage: number;
  tileCountPerPage: number;
  firstPageLength: number;
  lastPageLength: number;
  isMounted?: boolean;
};

type SliderState = {
  CONTENT: TODO[];
  mediaType: MediaType;
  section: Section;
  pages: Pages;
  maxPages: number;
  currentPage: number;
  tileCountPerPage: number;
  firstPageLength: number;
  lastPageLength: number;
  slideAmount: number;
  hasPaginated: boolean;
  isAnimating: boolean;
  isMounted: boolean;
};

type SliderActions = {
  setCurrentPage: (currentPage: number) => void;
  setPages: (params: SetPagesParams) => void;
  setSlideAmount: (slideAmount: number) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  markAsPaginated: () => void;
};

export type SliderStore = SliderState & SliderActions;

/* ───────────────────────────────────────────────────────────────────────
 * Overview of Pages Map State Layout
 * ───────────────────────────────────────────────────────────────────────
 * This documentation explains the organization of page states within a list,
 * particularly how tiles are distributed across pages, including the use of placeholders.
 *
 * Configuration Example:
 * - Total tiles: 6
 * - Tiles per page: 3
 *
 * Pages Layout:
 * - Page 0 (placeholder): [4, 5, 6]
 * - Page 1:               [1, 2, 3]
 * - Page 2:               [4, 5, 6]
 * - Page 3 (placeholder): [1, 2, 3]
 *
 * Purpose of placeholders:
 * - Placeholders (Page 0 and Page 3) prevent empty spaces,
 *   when transitioning out of the central pages (Page 1 and Page 2).
 * - They aid in maintaining alignment due to the use of 'justify-center' in CSS.
 *
 * Key Management:
 * - Unique keys are necessary for each page to ensure proper rendering by list media-modal.
 * - To prevent key duplication between placeholder pages (Page 0 and Page 3),
 *   UUIDs are updated before adding tiles to the pages map.
 */

export const createSliderStore = (CONTENT: TODO[], mediaType: MediaType, section: Section) =>
  create<SliderStore>(set => ({
    CONTENT,
    mediaType,
    section,
    pages: new Map<number, TODO[]>().set(1, CONTENT.slice(0, 7)),
    maxPages: 0,
    currentPage: 1,
    tileCountPerPage: 0,
    firstPageLength: 0,
    lastPageLength: 0,
    slideAmount: 0,
    hasPaginated: false,
    isAnimating: false,
    isMounted: false,

    setPages: (params: SetPagesParams) => set(() => params),
    setCurrentPage: (currentPage: number) => set(() => ({ currentPage })),
    setSlideAmount: (slideAmount: number) => set(() => ({ slideAmount })),
    setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
    markAsPaginated: () => set(() => ({ hasPaginated: true })),
  }));
