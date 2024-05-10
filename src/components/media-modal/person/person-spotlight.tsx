import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { DetailsPersonResponse } from '@/types/tmdb-types';
import { extractInitials } from '@/lib/utils';
import { BodyMedium, HeadingLarge } from '@/components/fonts';

type SpotlightProps = {
  personId: string;
};

const PersonSpotlight = async ({ personId }: SpotlightProps) => {
  const results = await fetchTMDB(DetailsPersonResponse, {
    mediaType: 'person',
    category: 'details',
    personId,
  });
  if (!results) return null;

  return (
    <div className='mx-[0.5%] flex flex-col items-center gap-4 px-custom pb-12 md:flex-row md:justify-center md:gap-8'>
      <div className='relative flex aspect-[4/5] h-[150px] flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
        {results.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${results.profile_path}`}
            alt={results.id.toString() || 'Image not found'}
            priority
            unoptimized
            fill
            className='object-cover object-top'
          />
        ) : (
          <div className='absolute bottom-0 z-50 flex h-full w-full items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
            <HeadingLarge className='line-clamp-1 text-[32px]'>
              {extractInitials(results.name || '')}
            </HeadingLarge>
          </div>
        )}
      </div>

      <div className='flex flex-col items-center gap-4 md:w-[50%] md:items-start'>
        <HeadingLarge>{results.name || ''}</HeadingLarge>
        <BodyMedium className='line-clamp-4'>
          {results.biography || ''}
        </BodyMedium>
      </div>
    </div>
  );
};

export default PersonSpotlight;
