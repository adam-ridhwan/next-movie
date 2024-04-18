import { wait } from 'next/dist/lib/wait';
import { fetchMovies } from '@/actions/movies';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { GenreId, GENRES, Movie } from '@/lib/types';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

type MoviesByGenre = {
  [key: string]: Movie[];
};

export default async function Home() {
  const getRandomPage = () => Math.floor(Math.random() * 10) + 1;

  const fetchMoviesBasedOnGenre = async (genre: GenreId, language?: string) => {
    try {
      const page1 = !DEVELOPMENT_MODE ? 1 : getRandomPage();
      const page2 = !DEVELOPMENT_MODE ? 2 : getRandomPage();

      const results = await Promise.all([
        fetchMovies({ page: page1, genre, language }),
        fetchMovies({ page: page2, genre, language }),
      ]);

      return [...results[0].results, ...results[1].results];
    } catch (error) {
      console.error('Error fetching action movies:', error);
      throw error;
    }
  };

  const genreIds = [
    { genre: GENRES.ACTION, language: 'ko', label: 'Korean Movies' },
    { genre: GENRES.ACTION, label: 'Action Movies' },
    { genre: GENRES.COMEDY, label: 'Comedy Movies' },
    { genre: GENRES.DRAMA, label: 'Drama Movies' },
    { genre: GENRES.ADVENTURE, label: 'Adventure Movies' },
    { genre: GENRES.ANIMATION, label: 'Animation Movies' },
    { genre: GENRES.CRIME, label: 'Crime Movies' },
    { genre: GENRES.DOCUMENTARY, label: 'Documentary Movies' },
    { genre: GENRES.FAMILY, label: 'Family Movies' },
    { genre: GENRES.FANTASY, label: 'Fantasy Movies' },
    { genre: GENRES.HISTORY, label: 'History Movies' },
    { genre: GENRES.HORROR, label: 'Horror Movies' },
    { genre: GENRES.MUSIC, label: 'Music Movies' },
    { genre: GENRES.MYSTERY, label: 'Mystery Movies' },
    { genre: GENRES.ROMANCE, label: 'Romance Movies' },
    { genre: GENRES.SCIENCE_FICTION, label: 'Science Fiction Movies' },
    { genre: GENRES.TV_MOVIE, label: 'TV Movie Movies' },
    { genre: GENRES.THRILLER, label: 'Thriller Movies' },
    { genre: GENRES.WAR, label: 'War Movies' },
    { genre: GENRES.WESTERN, label: 'Western Movies' },
  ];

  const movieFetchPromises = genreIds.map(({ genre, language, label }) =>
    fetchMoviesBasedOnGenre(genre, language).then(movies => ({ label, movies }))
  );

  const fetchAllGenreMovies = async () => {
    try {
      const moviesResults = await Promise.all(movieFetchPromises);
      return moviesResults.reduce((acc, { label, movies }) => {
        acc[label] = movies;
        return acc;
      }, {} as MoviesByGenre);
    } catch (error) {
      console.error('Error fetching movies for all genres:', error);
      throw error;
    }
  };

  const tiles = await fetchAllGenreMovies();

  return (
    <main>
      {Object.entries(tiles).map(([header, movies]) => (
        <div key={header} className='flex flex-col gap-1 pt-10'>
          <SliderProvider tiles={movies}>
            <DomContextProvider>
              <HeadingExtraSmall className='px-leftRightCustom'>{header}</HeadingExtraSmall>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      ))}
    </main>
  );
}
