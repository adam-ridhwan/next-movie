import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/providers/providers';

import { cn } from '@/lib/utils';
import Footer from '@/components/footer';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Imdb',
  description: 'Imdb clone built with Next.js',
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const RootLayout = async ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          `${inter.className} dark flex flex-col overflow-x-hidden bg-appBackground`
        )}
      >
        <main className='flex flex-col overflow-x-hidden'>
          <Providers>
            <NavBar />
            <div className='container min-h-[100dvh] flex-1'>
              {children}
              {modal}
            </div>
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
};
export default RootLayout;
