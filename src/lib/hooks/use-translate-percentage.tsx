import { useDomContext } from '@/providers/dom-provider';

import { DIRECTION, PADDING } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

export type GetTranslatePercentageParams = {
  direction?: SlideDirection;
  lastPageLength: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const useTranslatePercentage = () => {
  const { sliderRef, tileRef } = useDomContext();

  return ({
    direction,
    lastPageLength,
    isFirstPage = false,
    isLastPage = false,
  }: GetTranslatePercentageParams) => {
    if (!sliderRef.current || !tileRef.current) throw new Error('Missing ref');

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = tileRef.current;

    const offsetPercentage = ((lastPageLength * sliderItemWidth) / windowWidth) * 100;
    if (isLastPage) return -offsetPercentage;
    if (isFirstPage) return offsetPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };
};
