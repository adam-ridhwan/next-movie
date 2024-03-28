'use client';

import { ReactNode } from 'react';
import { Provider } from 'jotai';

type SliderProviderProps = {
  children: ReactNode;
};

export const SliderProvider = ({ children }: SliderProviderProps) => {
  return (
    <>
      <Provider>{children}</Provider>
    </>
  );
};
