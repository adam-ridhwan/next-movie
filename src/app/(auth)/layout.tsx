import '../globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/providers/auth-provider';

import { cn } from '@/lib/utils';

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
            'lg:flex-row',
            'border-4 border-green-500'
          )}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
