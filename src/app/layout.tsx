import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/providers/providers';

import { cn } from '@/lib/utils';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Entertainment Web App by Frontend Mentor',
};

const RootLayout = async ({ children }: { children: ReactNode }) => (
  <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
    <body className={cn(`${inter.className} dark flex flex-col overflow-x-hidden bg-appBackground`)}>
      <main className='flex flex-col overflow-x-hidden'>
        <Providers>
          <NavBar />
          <div className='container min-h-[100dvh] flex-1'>{children}</div>
        </Providers>
        <footer className='p-10'></footer>
      </main>
    </body>
  </html>
);
export default RootLayout;
