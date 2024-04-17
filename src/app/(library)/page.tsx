import { fetchMovies } from '@/actions/movies';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { libraryStrings } from '@/lib/constants';
import { GenreId, GENRES } from '@/lib/types';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const fetchMoviesBasedOnGenre = async (genre: GenreId) => {
    try {
      const results = await Promise.all([
        fetchMovies({ genre: genre, page: 1 }),
        fetchMovies({ genre: genre, page: 2 }),
      ]);

      return [...results[0].results, ...results[1].results];
    } catch (error) {
      console.error('Error fetching action movies:', error);
      throw error;
    }
  };

  const actionMovies = await fetchMoviesBasedOnGenre(GENRES.ACTION);
  const comedyMovies = await fetchMoviesBasedOnGenre(GENRES.COMEDY);
  const dramaMovies = await fetchMoviesBasedOnGenre(GENRES.DRAMA);

  // const tiles = [actionMovies, comedyMovies, dramaMovies];

  const tiles = {
    'Action Movies': actionMovies,
    'Comedy Movies': comedyMovies,
    'Drama Movies': dramaMovies,
  };

  return (
    <div>
      {Object.entries(tiles).map(([header, movies]) => (
        <div key={header} className='flex flex-col gap-1 pt-5'>
          <SliderProvider tiles={movies}>
            <DomContextProvider>
              <HeadingExtraSmall className='px-leftRightCustom'>{header}</HeadingExtraSmall>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      ))}
    </div>
  );
}
