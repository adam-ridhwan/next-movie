import { fetchMovies } from '@/actions/movies';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { prisma } from '@/lib/client';
import { DEVELOPMENT_MODE, libraryStrings } from '@/lib/constants';
import { MOCK_TRENDING_TILES } from '@/lib/mock';
import { GenreId, GENRES } from '@/lib/types';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const fetchedTiles = await prisma.movie.findMany({});

  const tiles = DEVELOPMENT_MODE ? [MOCK_TRENDING_TILES] : [fetchedTiles];

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

  return (
    <>
      <div key={tiles.length} className='flex flex-col gap-1 pt-5'>
        <SliderProvider tiles={actionMovies}>
          <DomContextProvider>
            <HeadingExtraSmall className='px-leftRightCustom'>{libraryStrings.action}</HeadingExtraSmall>
            <Slider />
          </DomContextProvider>
        </SliderProvider>
      </div>
    </>
  );

  // return (
  //   // <div>
  //   //   {tiles.map(tiles => (
  //   //     <div key={tiles.length} className='flex flex-col gap-1 pt-5'>
  //   //       <SliderProvider tiles={actionMovies.results}>
  //   //         <DomContextProvider>
  //   //           <HeadingExtraSmall className='px-leftRightCustom'>{libraryStrings.trending}</HeadingExtraSmall>
  //   //           <Slider />
  //   //         </DomContextProvider>
  //   //       </SliderProvider>
  //   //     </div>
  //   //   ))}
  //     {/*{*/}
  //     {/*  <div key={tiles.length} className='flex flex-col gap-1 pt-5'>*/}
  //     {/*    <SliderProvider tiles={actionMovies.results}>*/}
  //     {/*      <DomContextProvider>*/}
  //     {/*        <HeadingExtraSmall className='px-leftRightCustom'>{libraryStrings.action}</HeadingExtraSmall>*/}
  //     {/*        <Slider />*/}
  //     {/*      </DomContextProvider>*/}
  //     {/*    </SliderProvider>*/}
  //     {/*  </div>*/}
  //     {/*}*/}
  //   // </div>
  // );
}
