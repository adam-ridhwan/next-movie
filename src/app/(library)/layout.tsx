import '../globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/providers/auth-provider';

import { cn } from '@/lib/utils';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Entertainment Web App by Frontend Mentor',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body
          className={cn(
            `${inter.className} dark flex max-h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-darkestBlue`
            // 'border-4 border-green-500'
          )}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
