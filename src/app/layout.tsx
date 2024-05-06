import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import Providers from '@/providers/providers';

import { FetchTMDBParams, Section } from '@/types/global-types';
import { MovieResponse, TvResponse } from '@/types/tmdb-types';
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
  const fetchTMDBParams: Array<
    FetchTMDBParams & { label: string; section: Section }
  > = [
    {
      label: 'Trending: Movies',
      section: 'movie',
      category: 'trending',
      mediaType: 'movie',
    },
    {
      label: 'Trending: TV Shows',
      section: 'tv',
      category: 'trending',
      mediaType: 'tv',
    },
    {
      label: 'Action Movies',
      section: 'movie',
      category: 'discover',
      mediaType: 'movie',
      genreId: 28,
    },
    {
      label: 'Drama Movies',
      section: 'movie',
      category: 'discover',
      mediaType: 'movie',
      genreId: 18,
    },
  ];

  const homepageContent = await Promise.all(
    fetchTMDBParams.map(async params => {
      if (params.mediaType === 'movie') {
        const { results } = await fetchTMDB(MovieResponse, { ...params });
        return { ...params, results };
      }

      if (params.mediaType === 'tv') {
        const { results } = await fetchTMDB(TvResponse, { ...params });
        return { ...params, results };
      }
    })
  );

  const { results: epicStageContent } = await fetchTMDB(MovieResponse, {
    mediaType: 'movie',
    category: 'popular',
  });

  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          `${inter.className} dark flex flex-col overflow-x-hidden bg-appBackground`
        )}
      >
        <main className='flex flex-col overflow-x-hidden'>
          <Providers
            homepageContent={homepageContent}
            epicStageContent={epicStageContent}
          >
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
