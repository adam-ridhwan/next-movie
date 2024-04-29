import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { TODO } from '@/lib/types';
import { cn, extractYear } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall, HeadingSmall } from '@/components/fonts';

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || '';

  const movies: TODO = await fetchTMDB({ category: 'search', mediaType: 'movie', q: query });
  const tiles = movies.results;

  if (!tiles) return null;

  return (
    <div className='flex flex-col gap-8 px-leftRightCustom pt-10'>
      <div className='flex flex-row gap-2'>
        <HeadingSmall className='text-muted-foreground'>Search result for: </HeadingSmall>
        <HeadingSmall>{query}</HeadingSmall>
      </div>

      <div
        className={cn('grid grid-cols-3 gap-x-2 gap-y-6 ', 'sm:gap-x-4', 'lg:grid-cols-4', 'xl:grid-cols-5')}
      >
        {tiles.map((tile: TODO) => (
          <div key={tile.id} className='flex flex-col'>
            <div
              className='relative aspect-poster w-full overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow sm:aspect-video'
              key={tile.id}
            >
              {tile.backdrop_path || tile.poster_path ? (
                <>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${tile.backdrop_path || tile.poster_path}`}
                    alt={tile.title || tile.name}
                    priority
                    unoptimized
                    fill
                    className='object-cover max-sm:hidden'
                  />
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${tile.poster_path || tile.backdrop_path}`}
                    alt={tile.title || tile.name}
                    priority
                    unoptimized
                    fill
                    className='object-cover sm:hidden'
                  />
                </>
              ) : (
                <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
                  <HeadingExtraSmall className='line-clamp-2'>
                    {tile.name || tile.original_title || tile.original_name}
                  </HeadingExtraSmall>
                </div>
              )}
            </div>

            <div className='pt-3 max-sm:hidden'>
              <div className='flex flex-col'>
                <BodyMedium className='line-clamp-1'>
                  {tile.name || tile.title || tile.original_title}
                </BodyMedium>
                <BodySmall className='line-clamp-1'>
                  {extractYear(tile.release_date || tile.first_air_date)}
                </BodySmall>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
