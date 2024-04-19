'use client';

import Image from 'next/image';

import { GenreLabel, GENRES, Movie } from '@/lib/types';
import { BodyMedium, BodySmall, HeadingLarge } from '@/components/fonts';

type EpicStageProps = {
  content: Movie[];
};

type GetObjectKeyParams<K extends string, V> = {
  label: string;
  object: Record<K, V>;
  value: V[];
};

const getObjectKey = <K extends string, V>({ label, object, value }: GetObjectKeyParams<K, V>): K[] => {
  return value.map(v => {
    for (const [key, val] of Object.entries(object) as [K, V][]) {
      if (val === v) return key;
    }
    throw new Error(`${label}: Value not found: ${v}`);
  });
};

const toPascalCase = (inputString: GenreLabel) => {
  return inputString
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, c => c.toUpperCase());
};

const getFirstSentence = (text: string) => {
  const match = text.match(/^(.*?[.])\s/);
  return match ? match[1] : text;
};

const EpicStage = ({ content }: EpicStageProps) => {
  const [firstContent] = content;
  console.log('content', firstContent);

  const genres = getObjectKey({ label: 'genre_ids', object: GENRES, value: firstContent.genre_ids });

  return (
    <div className='relative aspect-video overflow-hidden min-[1700px]:rounded-b-2xl'>
      <Image
        src={`https://image.tmdb.org/t/p/original${firstContent.backdrop_path}`}
        alt={firstContent.original_title}
        priority
        fill
        className='object-cover'
      />

      <div className='absolute bottom-0 left-0 z-50 flex w-1/3 flex-col gap-2 p-10'>
        <HeadingLarge>{firstContent.original_title}</HeadingLarge>
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
  );
};

export default EpicStage;
