/* eslint no-restricted-imports: 0 */

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { PADDING, SLIDE_DIRECTION } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

export type GetSlideAmountParams = {
  direction?: SlideDirection;
  isFirstPage?: boolean;
  isLastPage?: boolean;
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

  const { sliderRef, tileRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    isFirstPage = false,
    isLastPage = false,
  }: GetSlideAmountParams) => {
    if (!sliderRef.current) throw new Error('sliderRef is missing');
    if (!tileRef.current) throw new Error('tileRef is missing');

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = tileRef.current;

    const trailingLength = isFirstPage ? firstPageLength : lastPageLength;
    const trailingPercentage = ((trailingLength * sliderItemWidth) / windowWidth) * 100;

    if (isFirstPage) return trailingPercentage;
    if (isLastPage) return -trailingPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === SLIDE_DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };

  return {
    slide,
    slideAmount,
    getSlideAmount,
  };
};
