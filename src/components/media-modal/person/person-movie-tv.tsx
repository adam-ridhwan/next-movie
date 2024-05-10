import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { Dot } from 'lucide-react';

import {
  CombinedCreditsResponse,
  MoviePersonCredits,
  TvPersonCredits,
} from '@/types/tmdb-types';
import { cn, extractYear, isMovie, isNullish } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall } from '@/components/fonts';

type PersonMovieTvProps = {
  personId: string;
};

const PersonMovieTv = async ({ personId }: PersonMovieTvProps) => {
  const results = await fetchTMDB(CombinedCreditsResponse, {
    mediaType: 'person',
    category: 'combined_credits',
    personId,
  });
  if (!results) return null;

  const uniqueMedia: Array<MoviePersonCredits | TvPersonCredits> = [];
  const ids = new Set();

  results.cast.forEach(movie => {
    if (!ids.has(movie.id)) {
      ids.add(movie.id);
      uniqueMedia.push(movie);
    }
  });

  return (
    <div
      className={cn(
        'mx-[0.5%]] grid grid-cols-3 gap-x-[1%] gap-y-6 px-custom',
        'custom-xs:grid-cols-2',
        'custom-sm:grid-cols-3',
        'custom-md:grid-cols-4',
        'custom-lg:grid-cols-5'
      )}
    >
      {uniqueMedia.map(tile => {
        const title = isMovie<MoviePersonCredits, TvPersonCredits>(
          tile,
          tile.media_type
        )
          ? isNullish(tile.title, tile.original_title)
          : isNullish(tile.name, tile.original_name);

        const releaseDate = isMovie<MoviePersonCredits, TvPersonCredits>(
          tile,
          tile.media_type
        )
          ? isNullish(tile.release_date)
          : isNullish(tile.first_air_date);

        const mediaType = isMovie<MoviePersonCredits, TvPersonCredits>(
          tile,
          tile.media_type
        )
          ? 'Movie'
          : 'TV Series';

        return (
          <div key={tile.id} className='flex flex-col'>
            <div
              className='relative aspect-poster w-full overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow sm:aspect-video'
              key={tile.id}
            >
              {tile.backdrop_path || tile.poster_path ? (
                <>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${tile.backdrop_path || tile.poster_path}`}
                    alt={title}
                    priority
                    unoptimized
                    fill
                    className='object-cover max-sm:hidden'
                  />
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${tile.poster_path || tile.backdrop_path}`}
                    alt={title}
                    priority
                    unoptimized
                    fill
                    className='object-cover sm:hidden'
                  />
                </>
              ) : (
                <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
                  <HeadingExtraSmall className='line-clamp-2'>
                    {title}
                  </HeadingExtraSmall>
                </div>
              )}
            </div>

            <div className='pt-3 max-sm:hidden'>
              <div className='flex flex-col'>
                <BodyMedium className='line-clamp-1'>{title}</BodyMedium>
                <div className='flex flex-row items-center'>
                  <BodySmall className='line-clamp-1'>
                    {extractYear(releaseDate)}
                  </BodySmall>
                  <Dot />
                  <BodySmall>{mediaType}</BodySmall>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PersonMovieTv;
