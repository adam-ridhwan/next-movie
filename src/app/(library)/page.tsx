import { fetchDiscover } from '@/actions/fetch-discover';
import { fetchTrending } from '@/actions/fetch-trending';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CONTENT_TYPES, GENRES } from '@/lib/types';
import EpicStage from '@/components/slider/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const getRandomPage = () => Math.floor(Math.random() * 10) + 1;

  const genreIds = [
    { genre: GENRES.ACTION, language: 'ko', label: 'Korean Movies' },
    { genre: GENRES.ACTION, label: 'Action Movies' },
    // { genre: GENRES.DRAMA, label: 'Drama Movies' },
    // { genre: GENRES.ADVENTURE, label: 'Adventure Movies' },
    // { genre: GENRES.ANIMATION, label: 'Animation Movies' },
    // { genre: GENRES.CRIME, label: 'Crime Movies' },
    // { genre: GENRES.DOCUMENTARY, label: 'Documentary Movies' },
    // { genre: GENRES.FAMILY, label: 'Family Movies' },
    // { genre: GENRES.FANTASY, label: 'Fantasy Movies' },
    // { genre: GENRES.HISTORY, label: 'History Movies' },
    // { genre: GENRES.HORROR, label: 'Horror Movies' },
    // { genre: GENRES.MUSIC, label: 'Music Movies' },
    // { genre: GENRES.MYSTERY, label: 'Mystery Movies' },
    // { genre: GENRES.ROMANCE, label: 'Romance Movies' },
    // { genre: GENRES.SCIENCE_FICTION, label: 'Science Fiction Movies' },
    // { genre: GENRES.TV_MOVIE, label: 'TV Movie Movies' },
    // { genre: GENRES.THRILLER, label: 'Thriller Movies' },
    // { genre: GENRES.WAR, label: 'War Movies' },
    // { genre: GENRES.WESTERN, label: 'Western Movies' },
  ];

  // const tiles = await fetchAllGenreMovies();
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

  const [trendingMovies, trendingTvShows, koreanTvShows, actionMovies] = await Promise.all([
    trendingMoviesPromise,
    trendingTvShowsPromise,
    koreanTvShowsPromise,
    actionMoviesPromise,
  ]);

  return (
    <>
      <EpicStage />

      <div key={'Trending: Movies'} className='flex flex-col gap-1 overflow-hidden'>
        <SliderProvider tiles={trendingMovies.results}>
          <DomContextProvider>
            <Slider header={'Trending: Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Trending: TV Shows'} className='flex flex-col gap-1 overflow-hidden'>
        <SliderProvider tiles={trendingTvShows.results}>
          <DomContextProvider>
            <Slider header={'Trending: TV Shows'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Korean'} className='flex flex-col gap-1 overflow-hidden'>
        <SliderProvider tiles={koreanTvShows.results}>
          <DomContextProvider>
            <Slider header={'Korean Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>

      <div key={'Action'} className='flex flex-col gap-1 overflow-hidden'>
        <SliderProvider tiles={actionMovies.results}>
          <DomContextProvider>
            <Slider header={'Action Movies'} />
          </DomContextProvider>
        </SliderProvider>
      </div>
    </>
  );
}
