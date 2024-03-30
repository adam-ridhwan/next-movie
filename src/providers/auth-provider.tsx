'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => (
  <SessionProvider>{children}</SessionProvider>
);
