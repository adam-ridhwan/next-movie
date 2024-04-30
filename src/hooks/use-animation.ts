/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider/slider-provider';

type UseAnimationReturn = {
  isAnimating: boolean;
  enableAnimation: () => void;
  disableAnimation: () => void;
};

export const useAnimation = (): UseAnimationReturn => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const setIsAnimating = useSliderStore(state => state.setIsAnimating);

  const enableAnimation = () => setIsAnimating(true);
  const disableAnimation = () => setIsAnimating(false);

  return { isAnimating, enableAnimation, disableAnimation };
};
