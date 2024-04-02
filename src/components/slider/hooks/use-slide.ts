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
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const { sliderRef, tileRef } = useDomContext();

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

    const offsetPercentage = ((lastPageLength * sliderItemWidth) / windowWidth) * 100;
    if (isLastPage) return -offsetPercentage;
    if (isFirstPage) return offsetPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };

  const slide = (amount: number) => {
    setSlideAmount(amount);
  };

  return [slide, { calculateSlideAmount, enableAnimation, disableAnimation }];
};
