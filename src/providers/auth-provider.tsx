'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);
