import '../globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/providers/auth-provider';
import { StateProvider } from '@/providers/state-provider';

import { cn } from '@/lib/utils';

import AppNavBar from '../_components/app-nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Entertainment Web App by Frontend Mentor',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StateProvider>
        <html lang='en'>
          <body
            className={cn(
              `${inter.className} dark flex max-h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-darkestBlue`
              // 'border-4 border-green-500'
            )}
          >
            <AppNavBar />
            <div className='fixed bottom-0 left-1/2 top-0 -translate-x-1/2 border border-pink-500'></div>

            {children}
          </body>
        </html>
      </StateProvider>
    </AuthProvider>
  );
}
