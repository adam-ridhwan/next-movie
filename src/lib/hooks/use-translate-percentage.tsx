'use client';

import { useDomContext } from '@/providers/dom-provider';

import { PADDING, SLIDE_DIRECTION } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';

type GetTranslatePercentageParams = {
  direction?: SlideDirection;
  trailingCardsTotal: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const useTranslatePercentage = () => {
  const { sliderRef, sliderItemRef } = useDomContext();

  return ({
    direction,
    trailingCardsTotal,
    isFirstPage = false,
    isLastPage = false,
  }: GetTranslatePercentageParams) => {
    if (!sliderRef.current || !sliderItemRef.current) throw new Error('Missing ref');

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = sliderItemRef.current;

    const offsetPercentage = ((trailingCardsTotal * sliderItemWidth) / windowWidth) * 100;
    if (isLastPage) return -offsetPercentage;
    if (isFirstPage) return offsetPercentage;

    const sliderWidthPercentage = ((sliderWidth - PADDING) / windowWidth) * 100;
    return direction === SLIDE_DIRECTION.RIGHT ? -sliderWidthPercentage : sliderWidthPercentage;
  };
};
