/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

type UseAnimationReturn = {
  isAnimating: boolean;
  enableAnimation: () => void;
  disableAnimation: () => void;
};

export const useAnimation = (): UseAnimationReturn => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const setIsAnimating = useSliderStore(state => state.setIsAnimating);
  const enableAnimation = () => {
    document.body.style.pointerEvents = 'none';
    return setIsAnimating(true);
  };

  const disableAnimation = () => {
    document.body.style.pointerEvents = '';
    return setIsAnimating(false);
  };

  return { isAnimating, enableAnimation, disableAnimation };
};
