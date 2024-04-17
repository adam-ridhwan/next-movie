import { fetchMovies } from '@/actions/movies';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { GenreId, GENRES } from '@/lib/types';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const getRandomPage = () => Math.floor(Math.random() * 100) + 1;

  const fetchMoviesBasedOnGenre = async (genre: GenreId, language?: string) => {
    try {
      const page1 = DEVELOPMENT_MODE ? 1 : getRandomPage();
      const page2 = DEVELOPMENT_MODE ? 2 : getRandomPage();

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

  const koreanMovies = await fetchMoviesBasedOnGenre(GENRES.ACTION, 'ko');
  const actionMovies = await fetchMoviesBasedOnGenre(GENRES.ACTION);
  const comedyMovies = await fetchMoviesBasedOnGenre(GENRES.COMEDY);
  const dramaMovies = await fetchMoviesBasedOnGenre(GENRES.DRAMA);
  const boomADVENTURE = await fetchMoviesBasedOnGenre(GENRES.ADVENTURE);
  const boomANIMATION = await fetchMoviesBasedOnGenre(GENRES.ANIMATION);
  const boomCRIME = await fetchMoviesBasedOnGenre(GENRES.CRIME);
  const boomDOCUMENTARY = await fetchMoviesBasedOnGenre(GENRES.DOCUMENTARY);
  const boomFAMILY = await fetchMoviesBasedOnGenre(GENRES.FAMILY);
  const boomFANTASY = await fetchMoviesBasedOnGenre(GENRES.FANTASY);
  const boomHISTORY = await fetchMoviesBasedOnGenre(GENRES.HISTORY);
  const boomHORROR = await fetchMoviesBasedOnGenre(GENRES.HORROR);
  const boomMUSIC = await fetchMoviesBasedOnGenre(GENRES.MUSIC);
  const boomMYSTERY = await fetchMoviesBasedOnGenre(GENRES.MYSTERY);
  const boomROMANCE = await fetchMoviesBasedOnGenre(GENRES.ROMANCE);
  const boomSCIENCE_FICTION = await fetchMoviesBasedOnGenre(GENRES.SCIENCE_FICTION);
  const boomTV_MOVIE = await fetchMoviesBasedOnGenre(GENRES.TV_MOVIE);
  const boomTHRILLER = await fetchMoviesBasedOnGenre(GENRES.THRILLER);
  const boomWAR = await fetchMoviesBasedOnGenre(GENRES.WAR);
  const boomWESTERN = await fetchMoviesBasedOnGenre(GENRES.WESTERN);

  const tiles = {
    'Korean Movies': koreanMovies,
    'Action Movies': actionMovies,
    'Comedy Movies': comedyMovies,
    'Drama Movies': dramaMovies,
    'Adventure Movies': boomADVENTURE,
    'Animation Movies': boomANIMATION,
    'Crime Movies': boomCRIME,
    'Documentary Movies': boomDOCUMENTARY,
    'Family Movies': boomFAMILY,
    'Fantasy Movies': boomFANTASY,
    'History Movies': boomHISTORY,
    'Horror Movies': boomHORROR,
    'Music Movies': boomMUSIC,
    'Mystery Movies': boomMYSTERY,
    'Romance Movies': boomROMANCE,
    'Science Fiction Movies': boomSCIENCE_FICTION,
    'TV Movie Movies': boomTV_MOVIE,
    'Thriller Movies': boomTHRILLER,
    'War Movies': boomWAR,
    'Western Movies': boomWESTERN,
  };

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
