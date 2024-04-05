/* eslint no-restricted-imports: 0 */

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { PADDING, SLIDE_DIRECTION } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

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

  const { sliderRef, tileRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    isSecondPage = false,
    isSecondToLastPage = false,
  }: GetSlideAmountParams) => {
    if (!sliderRef.current) throw new Error('sliderRef is missing');
    if (!tileRef.current) throw new Error('tileRef is missing');

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = tileRef.current;

    const pageLength = isSecondPage ? firstPageLength : lastPageLength;
    const trailingPercentage = ((pageLength * sliderItemWidth) / windowWidth) * 100;
    if (isSecondPage && trailingPercentage) return trailingPercentage;
    if (isSecondToLastPage && trailingPercentage) return -trailingPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === SLIDE_DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };

  return {
    slide,
    slideAmount,
    getSlideAmount,
  };
};
