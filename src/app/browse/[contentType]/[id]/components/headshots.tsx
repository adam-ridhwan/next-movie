import Image from 'next/image';
import { fetchCredits } from '@/actions/fetch-credits';

import { ContentRouteParams, TODO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall } from '@/components/fonts';

export default async function Headshots({ id, contentType }: ContentRouteParams) {
  const credits = await fetchCredits(id, contentType);
  if (!credits.cast) return null;

  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstTenActors = actors.slice(0, 10);

  return (
    <section>
      <HeadingExtraSmall className='px-leftRightCustom'>Cast</HeadingExtraSmall>
      <ol className='hide-scrollbar flex flex-row overflow-x-auto pt-2'>
        <div className='min-w-leftRightCustom' />
        {firstTenActors.map((actor: TODO, i: number) => (
          <li
            key={actor.id}
            className={cn('flex flex-col gap-4', { 'pr-4': i !== firstTenActors.length - 1 })}
          >
            <div className='relative aspect-[4/5] min-h-48 overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
              {actor.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name || actor.original_name}
                  fill
                  sizes='500px'
                  className='object-cover object-top'
                />
              ) : (
                <div className='absolute bottom-0 z-50 flex h-full w-full flex-wrap items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 py-8'>
                  <HeadingExtraSmall className='text-center'>
                    {actor.name || actor.original_name}
                  </HeadingExtraSmall>
                </div>
              )}
            </div>

            <div className='flex flex-col'>
              <BodyMedium>{actor.name}</BodyMedium>
              <BodySmall>{actor.character}</BodySmall>
            </div>
          </li>
        ))}
        <div className='min-w-leftRightCustom' />
      </ol>
    </section>
  );
}
