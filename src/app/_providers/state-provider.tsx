'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'jotai';

type StateProviderProps = {
  children: ReactNode;
};

export const StateProvider: FC<StateProviderProps> = ({ children }) => {
  return (
    <>
      <Provider>{children}</Provider>
    </>
  );
};
