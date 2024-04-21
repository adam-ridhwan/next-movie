/* eslint no-restricted-imports: 0 */

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { SLIDE_DIRECTION, SlideDirection } from '@/components/slider/slider-constants';

export type GetSlideAmountParams = {
  direction?: SlideDirection;
  isSecondPage?: boolean;
  isSecondToLastPage?: boolean;
};

type UseSlideReturn = {
  slideAmount: number;
  slide: (amount: number) => void;
  getSlideAmount: (params: GetSlideAmountParams) => number;
};

export const useSlide = (): UseSlideReturn => {
  const slideAmount = useSliderStore(state => state.slideAmount);
  const setSlideAmount = useSliderStore(state => state.setSlideAmount);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);

  const { tileListRef, tileItemRef, paginationButtonRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    isSecondPage = false,
    isSecondToLastPage = false,
  }: GetSlideAmountParams) => {
    if (!tileListRef.current) throw new Error('tileListRef is missing');
    if (!tileItemRef.current) throw new Error('tileItemRef is missing');
    if (!paginationButtonRef.current) throw new Error('paginationButtonRef is missing');

    const { offsetWidth: sliderWidth } = tileListRef.current;
    const { offsetWidth: sliderItemWidth } = tileItemRef.current;

    const pageLength = isSecondPage ? firstPageLength : lastPageLength;
    const trailingPercentage = ((pageLength * sliderItemWidth) / sliderWidth) * 100;

    if (isSecondPage && trailingPercentage) return trailingPercentage;
    if (isSecondToLastPage && trailingPercentage) return -trailingPercentage;

    return direction === SLIDE_DIRECTION.RIGHT ? -100 : 100;
  };

  return {
    slide,
    slideAmount,
    getSlideAmount,
  };
};
