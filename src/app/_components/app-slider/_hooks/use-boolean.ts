import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useAtom } from 'jotai/index';

import { isAnimatingAtom } from '@/app/_components/app-slider/slider-store';

type UseBooleanReturn = {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const useBoolean = (): UseBooleanReturn => {
  const [value, setValue] = useAtom(isAnimatingAtom);

  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue(x => !x);
  }, [setValue]);

  return { value, setValue, setTrue, setFalse, toggle };
};
