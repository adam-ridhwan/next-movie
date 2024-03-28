import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UseBooleanReturn = {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export function useBoolean(defaultValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue(x => !x);
  }, []);

  return { value, setValue, setTrue, setFalse, toggle };
}
