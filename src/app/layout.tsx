import './globals.css';

import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SearchContextProvider } from '@/providers/search/search-provider';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { cn } from '@/lib/utils';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Entertainment Web App by Frontend Mentor',
};

const RootLayout = async ({ children }: { children: ReactNode }) => (
  <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
    <SpeedInsights />
    <HydrationOverlay>
      <SearchContextProvider>
        <body className={cn(`${inter.className} dark flex flex-col overflow-x-hidden bg-appBackground`)}>
          <main className='flex flex-col overflow-x-hidden'>
            <Suspense>
              <NavBar />
            </Suspense>
            <div className='container min-h-[100dvh] flex-1'>{children}</div>
            <footer className='p-10'></footer>
          </main>
        </body>
      </SearchContextProvider>
    </HydrationOverlay>
  </html>
);
export default RootLayout;
