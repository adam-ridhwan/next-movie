import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { GENRES } from '@/types/global';
import { MovieListSchema } from '@/types/tmdb';
import { getFirstSentence, getObjectKey, isNullish, toPascalCase } from '@/lib/utils';
import ThumbnailLink from '@/components/epic-stage/thumbnail-link';
import { HeadingLarge } from '@/components/fonts';

const EpicStage = async () => {
  const popularMovies = await fetchTMDB({ category: 'popular', mediaType: 'movie' });
  const parsedPopularMovies = MovieListSchema.safeParse(popularMovies);
  if (!parsedPopularMovies.success) throw new Error('EpicStage() Invalid popularMovies schema');

  const firstMovie = parsedPopularMovies.data.results[0];

  const genres = getObjectKey({
    label: 'genre_ids',
    object: GENRES,
    value: firstMovie.genre_ids,
  });

  return (
    <ThumbnailLink content={firstMovie}>
      <div className='relative mb-4 mt-16 aspect-video overflow-hidden min-[1700px]:rounded-b-2xl'>
        <Image
          src={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`}
          alt={isNullish((firstMovie.original_title, firstMovie.title))}
          priority
          fill
          className='object-cover'
        />

        <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black' />

        <div className='absolute bottom-0 left-0 z-40 flex w-1/2 flex-col gap-2 p-10'>
          <HeadingLarge>{isNullish(firstMovie.title)}</HeadingLarge>
          <ul className='flex flex-row gap-2'>
            {genres.map(genre => (
              <li key={genre}>
                <p className='text-genre'>{toPascalCase(genre)}</p>
              </li>
            ))}
          </ul>
          <p className='text-overview'>{getFirstSentence(isNullish(firstMovie.overview))}</p>
        </div>
      </div>
    </ThumbnailLink>
  );
};

export default EpicStage;
