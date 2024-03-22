'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
