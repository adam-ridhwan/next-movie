/* eslint no-restricted-imports: 0 */

import { useRefContext } from '@/providers/slider/ref-provider';
import { useSliderStore } from '@/providers/slider/slider-provider';

import { SlideDirection } from '@/lib/constants';

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

  const { tileContainerRef, tileItemRef } = useRefContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    isSecondPage = false,
    isSecondToLastPage = false,
  }: GetSlideAmountParams) => {
    if (!tileContainerRef.current) throw new Error('tileContainerRef is missing');
    if (!tileItemRef.current) throw new Error('tileItemRef is missing');

    const { offsetWidth: tileContainerWidth } = tileContainerRef.current;
    const { offsetWidth: tileItemWidth } = tileItemRef.current;

    const pageLength = isSecondPage ? firstPageLength : lastPageLength;
    const trailingPercentage = ((pageLength * tileItemWidth) / tileContainerWidth) * 100;

    if (isSecondPage && trailingPercentage) return trailingPercentage;
    if (isSecondToLastPage && trailingPercentage) return -trailingPercentage;

    return direction === 'right' ? -100 : 100;
  };

  return {
    slide,
    slideAmount,
    getSlideAmount,
  };
};
