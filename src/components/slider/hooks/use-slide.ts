/* eslint no-restricted-imports: 0 */

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { SlideDirection } from '@/lib/types';
import { SLIDE_DIRECTION } from '@/components/slider/slider-constants';

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

  const { sliderRef, tileRef, paginationButtonRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const getSlideAmount = ({
    direction,
    isSecondPage = false,
    isSecondToLastPage = false,
  }: GetSlideAmountParams) => {
    if (!sliderRef.current) throw new Error('sliderRef is missing');
    if (!tileRef.current) throw new Error('tileRef is missing');
    if (!paginationButtonRef.current) throw new Error('paginationButtonRef is missing');

    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = tileRef.current;

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
