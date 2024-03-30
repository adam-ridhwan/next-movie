import '../globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/app/lib/utils';
import AuthProvider from '@/app/providers/auth-provider';

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
            `${inter.className} dark flex max-h-[100dvh] min-h-[100dvh] flex-col bg-darkestBlue`,
            'lg:flex-row'
          )}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
