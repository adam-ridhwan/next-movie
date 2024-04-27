'use client';

import Image from 'next/image';
import { Media } from '@/routes';

import { GENRES, MediaType, Movie } from '@/lib/types';
import { getFirstSentence, getObjectKey, toPascalCase } from '@/lib/utils';
import { HeadingLarge } from '@/components/fonts';

type EpicStageProps = {
  content: Movie;
  mediaType: MediaType;
};

const EpicStage = ({ content, mediaType }: EpicStageProps) => {
  const genres = getObjectKey({
    label: 'genre_ids',
    object: GENRES,
    value: content.genre_ids,
  });

  return (
    <Media.Link id={content.id.toString()} mediaType={mediaType} scroll={false}>
      <div className='relative mb-4 aspect-video overflow-hidden min-[1700px]:rounded-b-2xl'>
        <Image
          src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
          alt={content.original_title}
          priority
          fill
          className='object-cover'
        />

        <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black' />

        <div className='absolute bottom-0 left-0 z-50 flex w-1/2 flex-col gap-2 p-10'>
          <HeadingLarge>{content.title}</HeadingLarge>
          <ul className='flex flex-row gap-2'>
            {genres.map(genre => (
              <li key={genre}>
                <p className='text-genre'>{toPascalCase(genre)}</p>
              </li>
            ))}
          </ul>
          <p className='text-overview'>{getFirstSentence(content.overview)}</p>
        </div>
      </div>
    </Media.Link>
  );
};

export default EpicStage;
