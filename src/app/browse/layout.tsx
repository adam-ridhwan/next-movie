import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import EpicStage from '@/components/epic-stage';
import { MediaHeader } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function BrowseLayout({ children }: { children: ReactNode }) {
  const [
    popularMovies,
    trendingMovies,
    trendingTvShows,
    actionMovies,
    dramaMovies,
  ] = await Promise.all([
    fetchTMDB({ category: 'popular', mediaType: 'movie' }),
    fetchTMDB({ category: 'trending', mediaType: 'movie' }),
    fetchTMDB({ category: 'trending', mediaType: 'tv' }),
    fetchTMDB({ category: 'discover', mediaType: 'movie', genreId: 28 }),
    fetchTMDB({ category: 'discover', mediaType: 'movie', genreId: 18  }),
  ]); // prettier-ignore

  return (
    <>
      <EpicStage content={popularMovies.results[0]} mediaType='movie' />

      <div className='flex flex-col'>
        <SliderProvider content={trendingMovies.results} mediaType='movie'>
          <DomContextProvider>
            <MediaHeader>Trending: Movies</MediaHeader>
            <Slider />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='flex flex-col'>
        <SliderProvider content={trendingTvShows.results} mediaType='tv'>
          <DomContextProvider>
            <MediaHeader>Trending: TV Shows</MediaHeader>
            <Slider />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='flex flex-col'>
        <SliderProvider content={actionMovies.results} mediaType='movie'>
          <DomContextProvider>
            <MediaHeader>Action Movies</MediaHeader>
            <Slider />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='flex flex-col'>
        <SliderProvider content={dramaMovies.results} mediaType='movie'>
          <DomContextProvider>
            <MediaHeader>Drama Movies</MediaHeader>
            <Slider />
          </DomContextProvider>
        </SliderProvider>
      </div>

      {children}
    </>
  );
}
