import Image from 'next/image';
import { useHomepageStore } from '@/providers/homepage/homepage-provider';
import { Dot, Info } from 'lucide-react';

import { MOVIE_GENRES, TODO, TV_GENRES } from '@/types/global-types';
import { Movie, Tv } from '@/types/tmdb-types';
import { isMovie, isNullish } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BodyMedium, HeadingLarge } from '@/components/fonts';

// TODO: Create carousel component for epic stage
const EpicStage = () => {
  const { epicStageContent } = useHomepageStore();
  const firstResult = epicStageContent[0];
  const isMovieType = isMovie<Movie, Tv>(firstResult, 'movie');

  const alt = isMovieType
    ? isNullish(firstResult.title, firstResult.original_title)
    : isNullish(firstResult.name, firstResult.original_name);

  // prettier-ignore
  const title = isMovieType
    ? isNullish(firstResult.title)
    : isNullish(firstResult.name);

  // prettier-ignore
  const genresObject = isMovieType
    ? MOVIE_GENRES
    : TV_GENRES;

  const genreIds = firstResult.genre_ids ?? [];

  return (
    <div className='relative mb-4 mt-16 aspect-poster overflow-hidden sm:aspect-video min-[1700px]:rounded-b-2xl'>
      <Image
        src={`https://image.tmdb.org/t/p/original${firstResult.backdrop_path || firstResult.poster_path}`}
        alt={alt}
        unoptimized
        priority
        fill
        className='object-cover max-sm:hidden'
      />

      <Image
        src={`https://image.tmdb.org/t/p/original${firstResult.poster_path || firstResult.backdrop_path}`}
        alt={alt}
        unoptimized
        priority
        fill
        className='object-cover sm:hidden'
      />

      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black' />

      <div className='absolute bottom-0 left-0 z-40 flex flex-col gap-2 p-10'>
        <HeadingLarge className='line-clamp-1'>{title}</HeadingLarge>

        <ul className='flex flex-row'>
          {genreIds.map((genreId: TODO, i: number) => (
            <li key={genreId} className='flex'>
              <BodyMedium className='font-medium text-primary/70'>
                {/*@ts-expect-error genreid is a number but expecting a literal type */}
                {genresObject[genreId]}
              </BodyMedium>
              {i < genreIds.length - 1 && <Dot className='text-primary/70' />}
            </li>
          ))}
        </ul>

        {/*<ModalCatchAll.Link id={firstResult.id.toString()} mediaType='movie'>*/}
        <Button className='mt-4 flex w-fit gap-2' size='lg'>
          <Info className='size-5' />
          More Info
        </Button>
        {/*</ModalCatchAll.Link>*/}
      </div>
    </div>
  );
};

export default EpicStage;
