import React from 'react';

import '../globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/app/_lib/utils';
import AuthProvider from '@/app/_providers/auth-provider';

import AppNavBar from '../_components/app-nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Entertainment Web App by Frontend Mentor',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body
          className={cn(
            `${inter.className} dark flex max-h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-darkestBlue`
            // 'border-4 border-green-500'
          )}
        >
          <AppNavBar />
          <div className='fixed bottom-0 left-1/2 top-0 -translate-x-1/2 border border-pink-500' />

          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
