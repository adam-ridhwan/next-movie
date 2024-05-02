import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import Providers from '@/providers/providers';

import { FetchTMDBParams, Section } from '@/types/global-types';
import { MovieResponse, TvResponse } from '@/types/tmdb-types';
import { cn } from '@/lib/utils';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Netflix Clone built with Next.js',
};

const RootLayout = async ({ children, modal }: { children: ReactNode; modal: ReactNode }) => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string; section: Section }> = [
    { label: 'Trending: Movies', section: 'movie', category: 'trending', mediaType: 'movie' },
    { label: 'Trending: TV Shows', section: 'tv', category: 'trending', mediaType: 'tv' },
    { label: 'Action Movies', section: 'movie', category: 'discover', mediaType: 'movie', genreId: 28 },
    { label: 'Drama Movies', section: 'tv', category: 'discover', mediaType: 'movie', genreId: 18 },
  ];

  const homepageContent = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const schema = params.mediaType === 'movie' ? MovieResponse : TvResponse;

      const { success, data, error } = schema.safeParse(media);
      if (!success)
        throw new Error(`RootLayout() Invalid homepageContent ${params.mediaType}: ${error.message}`);

      return {
        ...params,
        results: data.results,
      };
    })
  );

  const epicStageContent = await fetchTMDB({ mediaType: 'movie', category: 'popular' });
  const { success, data, error } = MovieResponse.safeParse(epicStageContent);
  if (!success) throw new Error(`RootLayout() Invalid epicStageContent: ${error.message}`);

  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={cn(`${inter.className} dark flex flex-col overflow-x-hidden bg-appBackground`)}>
        <main className='flex flex-col overflow-x-hidden'>
          <Providers homepageContent={homepageContent} epicStageContent={data.results}>
            <NavBar />
            <div className='container min-h-[100dvh] flex-1'>
              {children}
              {modal}
            </div>
          </Providers>
          <footer className='p-10'></footer>
        </main>
      </body>
    </html>
  );
};
export default RootLayout;
