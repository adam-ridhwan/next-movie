import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { DIRECTION, PADDING } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

export type CalculateSlideAmountParams = {
  direction?: SlideDirection;
  lastPageLength: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

type SlideAction = (amount: number) => void;

type SlideConfig = {
  calculateSlideAmount: (params: CalculateSlideAmountParams) => number;
  disableAnimation: () => void;
  enableAnimation: () => void;
};

export const useSlide = (): [SlideAction, SlideConfig] => {
  const setSlideAmount = useSliderStore(state => state.setSlideAmount);
  const setIsAnimating = useSliderStore(state => state.setIsAnimating);
  const { sliderRef, tileRef } = useDomContext();

  const slide = (amount: number) => setSlideAmount(amount);

  const calculateSlideAmount = ({
    direction,
    lastPageLength,
    isFirstPage = false,
    isLastPage = false,
  }: CalculateSlideAmountParams) => {
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

  const enableAnimation = () => {
    document.body.style.pointerEvents = 'none';
    return setIsAnimating(true);
  };

  const disableAnimation = () => {
    document.body.style.pointerEvents = '';
    return setIsAnimating(false);
  };

  return [slide, { calculateSlideAmount, enableAnimation, disableAnimation }];
};
