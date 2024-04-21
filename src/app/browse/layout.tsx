import { ReactNode } from 'react';
import * as React from 'react';
import { fetchDiscover } from '@/actions/fetch-discover';
import { fetchPopular } from '@/actions/fetch-popular';
import { fetchTrending } from '@/actions/fetch-trending';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CONTENT_TYPES, GENRES } from '@/lib/types';
import EpicStage from '@/components/slider/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

export default async function BrowseLayout({ children }: { children: ReactNode }) {
  const popularMoviesPromise = fetchPopular(CONTENT_TYPES.MOVIE);
  const trendingMoviesPromise = fetchTrending(CONTENT_TYPES.MOVIE);
  const trendingTvShowsPromise = fetchTrending(CONTENT_TYPES.TV);
  const actionMoviesPromise = fetchDiscover({
    genre: GENRES.ACTION,
    contentType: CONTENT_TYPES.MOVIE,
  });
  const dramaMoviesPromise = fetchDiscover({
    genre: GENRES.DRAMA,
    contentType: CONTENT_TYPES.MOVIE,
  });

  const [
    popularMovies,
    trendingMovies,
    trendingTvShows,
    actionMovies,
    dramaMovies,
  ] = await Promise.all([
    popularMoviesPromise,
    trendingMoviesPromise,
    trendingTvShowsPromise,
    actionMoviesPromise,
    dramaMoviesPromise,
  ]); // prettier-ignore

  return (
    <>
      <EpicStage content={popularMovies.results[0]} contentType={'movie'} />
      <div key={'Trending: Movies'} className='flex flex-col'>
        <SliderProvider content={trendingMovies.results} contentType={'movie'}>
          <DomContextProvider>
            <Slider header={'Trending: Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>
      <div key={'Trending: TV Shows'} className='flex flex-col'>
        <SliderProvider content={trendingTvShows.results} contentType={'tv'}>
          <DomContextProvider>
            <Slider header={'Trending: TV Shows'} />
          </DomContextProvider>
        </SliderProvider>
      </div>
      <div key={'Drama'} className='flex flex-col'>
        <SliderProvider content={dramaMovies.results} contentType={'movie'}>
          <DomContextProvider>
            <Slider header={'Drama Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>
      <div key={'Action'} className='flex flex-col'>
        <SliderProvider content={actionMovies.results} contentType={'movie'}>
          <DomContextProvider>
            <Slider header={'Action Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      {children}
    </>
  );
}
