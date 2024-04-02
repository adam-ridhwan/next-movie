/* eslint no-restricted-imports: 0 */

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { DIRECTION, PADDING } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

export type getSlideAmountParams = {
  direction?: SlideDirection;
  lastPageLength: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

type UseSlideReturn = {
  slideAmount: number;
  slide: (amount: number) => void;
  getSlideAmount: (params: getSlideAmountParams) => number;
};

export const useSlide = (): UseSlideReturn => {
  const slideAmount = useSliderStore(state => state.slideAmount);
  const setSlideAmount = useSliderStore(state => state.setSlideAmount);

  const { sliderRef, tileRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    lastPageLength,
    isFirstPage = false,
    isLastPage = false,
  }: getSlideAmountParams) => {
    if (!sliderRef.current) throw new Error('sliderRef is missing');
    if (!tileRef.current) throw new Error('tileRef is missing');

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = tileRef.current;

    const lastPageLengthPercentage = ((lastPageLength * sliderItemWidth) / windowWidth) * 100;
    if (isLastPage) return -lastPageLengthPercentage;
    if (isFirstPage) return lastPageLengthPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };

  return {
    slide,
    slideAmount,
    getSlideAmount,
  };
};
