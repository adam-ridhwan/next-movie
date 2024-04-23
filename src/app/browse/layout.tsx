import * as React from 'react';
import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CATEGORIES, GENRES, MEDIA_TYPES } from '@/lib/types';
import EpicStage from '@/components/slider/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

export default async function BrowseLayout({ children }: { children: ReactNode }) {
  const { ACTION, DRAMA } = GENRES;
  const { MOVIE, TV } = MEDIA_TYPES;
  const { POPULAR, TRENDING, DISCOVER } = CATEGORIES;

  const [
    popularMovies,
    trendingMovies,
    trendingTvShows,
    actionMovies,
    dramaMovies,
  ] = await Promise.all([
    fetchTMDB({ category: POPULAR, mediaType: MOVIE }),
    fetchTMDB({ category: TRENDING, mediaType: MOVIE }),
    fetchTMDB({ category: TRENDING, mediaType: TV }),
    fetchTMDB({ category: DISCOVER, mediaType: MOVIE, genre: ACTION }),
    fetchTMDB({ category: DISCOVER, mediaType: MOVIE, genre: DRAMA  }),
  ]); // prettier-ignore

  return (
    <>
      <EpicStage content={popularMovies.results[0]} mediaType={'movie'} />

      <div key={'Trending: Movies'} className='flex flex-col'>
        <SliderProvider content={trendingMovies.results} mediaType={'movie'}>
          <DomContextProvider>
            <Slider header={'Trending: Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='mx-leftRightCustom border border-b-muted-foreground/20' />

      <div key={'Trending: TV Shows'} className='flex flex-col'>
        <SliderProvider content={trendingTvShows.results} mediaType={'tv'}>
          <DomContextProvider>
            <Slider header={'Trending: TV Shows'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='mx-leftRightCustom border border-b-muted-foreground/20' />

      <div key={'Action'} className='flex flex-col'>
        <SliderProvider content={actionMovies.results} mediaType={'movie'}>
          <DomContextProvider>
            <Slider header={'Action Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div className='mx-leftRightCustom border border-b-muted-foreground/20' />

      <div key={'Drama'} className='flex flex-col'>
        <SliderProvider content={dramaMovies.results} mediaType={'movie'}>
          <DomContextProvider>
            <Slider header={'Drama Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      {children}
    </>
  );
}
