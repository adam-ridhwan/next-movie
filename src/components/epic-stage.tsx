import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { MediaModal } from '@/routes';
import { Dot, Info } from 'lucide-react';

import { TODO } from '@/types/global-types';
import { MovieResponse } from '@/types/tmdb-types';
import { deslugify, getGenreSlugById, isNullish } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BodyMedium, HeadingLarge } from '@/components/fonts';

// TODO: Create carousel component for epic stage
const EpicStage = async () => {
  const { results } = await fetchTMDB(MovieResponse, {
    mediaType: 'movie',
    category: 'popular',
  });

  const firstResult = results[0];
  const alt = isNullish(firstResult.title, firstResult.original_title);
  const title = isNullish(firstResult.title);
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

      <div className='absolute bottom-0 left-0 z-40 mx-[0.5%] flex flex-col gap-2 px-custom py-10'>
        <HeadingLarge className='line-clamp-1'>{title}</HeadingLarge>

        <ul className='flex flex-row'>
          {genreIds.map((genreId: TODO, i: number) => (
            <li key={genreId} className='flex'>
              <BodyMedium className='font-medium text-primary/70'>
                {deslugify(getGenreSlugById(genreId, 'movie'))}
              </BodyMedium>
              {i < genreIds.length - 1 && <Dot className='text-primary/70' />}
            </li>
          ))}
        </ul>

        <MediaModal.Link
          slug={['movie', firstResult.id.toString()]}
          scroll={false}
        >
          <Button className='mt-4 flex w-fit gap-2' size='lg'>
            <Info className='size-5' />
            More Info
          </Button>
        </MediaModal.Link>
      </div>
    </div>
  );
};

export default EpicStage;
