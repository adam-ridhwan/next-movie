import { RefObject } from 'react';

const MEDIA_QUERY = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const PADDING = 80;

const calcTranslatePercentage = ({
  trailingCardsTotal,
  sliderRef,
  sliderItemRef,
  isLastPage = false,
}: {
  trailingCardsTotal: number;
  sliderRef: RefObject<HTMLDivElement>;
  sliderItemRef: RefObject<HTMLDivElement>;
  isLastPage?: boolean;
}): number => {
  if (!sliderRef.current || !sliderItemRef.current) return 0;

  const windowWidth = window.innerWidth;
  const { offsetWidth: sliderWidth } = sliderRef.current;
  const { offsetWidth: sliderItemWidth } = sliderItemRef.current;

  if (!isLastPage) return ((sliderWidth - PADDING) / windowWidth) * 100;
  return ((trailingCardsTotal * sliderItemWidth) / windowWidth) * -100;
};

const calcVisibleCardsTotal = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < MEDIA_QUERY.sm) return 2;
  if (windowWidth < MEDIA_QUERY.md) return 3;
  if (windowWidth < MEDIA_QUERY.lg) return 4;
  if (windowWidth < MEDIA_QUERY.xl) return 5;
  return 6;
};

export const Utils = {
  calcTranslatePercentage,
  calcVisibleCardsTotal,
};
