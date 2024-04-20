import { fetchDiscover } from '@/actions/fetch-discover';
import { fetchPopular } from '@/actions/fetch-popular';
import { fetchTrending } from '@/actions/fetch-trending';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CONTENT_TYPES, GENRES } from '@/lib/types';
import EpicStage from '@/components/slider/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const popularMoviesPromise = fetchPopular(CONTENT_TYPES.MOVIE);
  const trendingMoviesPromise = fetchTrending(CONTENT_TYPES.MOVIE);
  const trendingTvShowsPromise = fetchTrending(CONTENT_TYPES.TV);
  const koreanTvShowsPromise = fetchDiscover({
    genre: GENRES.DRAMA,
    language: 'ko',
    contentType: CONTENT_TYPES.TV,
  });
  const actionMoviesPromise = fetchDiscover({
    genre: GENRES.ACTION,
    contentType: CONTENT_TYPES.MOVIE,
  });

  const [
    popularMovies,
    trendingMovies,
    trendingTvShows,
    koreanTvShows,
    actionMovies
  ] = await Promise.all([
    popularMoviesPromise,
    trendingMoviesPromise,
    trendingTvShowsPromise,
    koreanTvShowsPromise,
    actionMoviesPromise,
  ]); // prettier-ignore

  return (
    <>
      {/*<EpicStage content={popularMovies.results[Math.floor(Math.random() * 19)]} />*/}
      <EpicStage content={popularMovies.results[0]} />

      <div key={'Trending: Movies'} className='overflow- flex flex-col gap-1'>
        <SliderProvider tiles={trendingMovies.results}>
          <DomContextProvider>
            <Slider header={'Trending: Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Trending: TV Shows'} className='overflow- flex flex-col gap-1'>
        <SliderProvider tiles={trendingTvShows.results}>
          <DomContextProvider>
            <Slider header={'Trending: TV Shows'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Korean'} className='overflow- flex flex-col gap-1'>
        <SliderProvider tiles={koreanTvShows.results}>
          <DomContextProvider>
            <Slider header={'Korean Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Action'} className='overflow- flex flex-col gap-1'>
        <SliderProvider tiles={actionMovies.results}>
          <DomContextProvider>
            <Slider header={'Action Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>
    </>
  );
}
