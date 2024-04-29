import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { MediaRoute } from '@/routes';

import { FetchTMDBParams, GENRES, MovieSchema, MovieTvSchema } from '@/lib/types';
import { getFirstSentence, getObjectKey, toPascalCase } from '@/lib/utils';
import { HeadingLarge } from '@/components/fonts';

const EpicStage = async () => {
  const params: FetchTMDBParams = { label: 'Popular movies', category: 'popular', mediaType: 'movie' };
  const unknownTMDBResponse = await fetchTMDB(params);
  const parsedMovieTv = MovieTvSchema.safeParse(unknownTMDBResponse);
  if (!parsedMovieTv.success) throw new Error('Expected a movie result');

  const fetchedPopularList = { ...params, results: parsedMovieTv.data.results };

  const unknownMovie = fetchedPopularList.results[0];
  const parsedMovie = MovieSchema.safeParse(unknownMovie);
  if (!parsedMovie.success) throw new Error('Expected a movie object');

  const firstContent = parsedMovie.data;

  const genres = getObjectKey({
    label: 'genre_ids',
    object: GENRES,
    value: firstContent.genre_ids,
  });

  return (
    <MediaRoute.Link id={firstContent.id.toString()} mediaType={params.mediaType} scroll={false}>
      <div className='relative mb-4 aspect-video overflow-hidden min-[1700px]:rounded-b-2xl'>
        <Image
          src={`https://image.tmdb.org/t/p/original${firstContent.backdrop_path}`}
          alt={firstContent.original_title}
          priority
          fill
          className='object-cover'
        />

        <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black' />

        <div className='absolute bottom-0 left-0 z-50 flex w-1/2 flex-col gap-2 p-10'>
          <HeadingLarge>{firstContent.title}</HeadingLarge>
          <ul className='flex flex-row gap-2'>
            {genres.map(genre => (
              <li key={genre}>
                <p className='text-genre'>{toPascalCase(genre)}</p>
              </li>
            ))}
          </ul>
          <p className='text-overview'>{getFirstSentence(firstContent.overview)}</p>
        </div>
      </div>
    </MediaRoute.Link>
  );
};

export default EpicStage;
