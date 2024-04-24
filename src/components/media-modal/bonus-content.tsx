import * as React from 'react';
import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, TODO } from '@/lib/types';
import { Divider } from '@/components/divider';
import { BodyMedium, HeadingExtraSmall } from '@/components/fonts';

export default async function Trailers({ id, mediaType }: ContentRouteParams) {
  const videos = await fetchTMDB({ category: 'videos', mediaType, id });

  const trailers = videos.results.filter(
    (video: TODO) => video.type === 'Featurette' && video.site === 'YouTube'
  );

  if (!trailers.length) return null;

  return (
    <section>
      <HeadingExtraSmall className='px-leftRightCustom'>Bonus Content</HeadingExtraSmall>
      {/*
       * TODO: Implement a slider for trailers
       */}
      <div className='hide-scrollbar flex flex-row overflow-x-auto px-leftRightCustom pt-2'>
        {trailers.map((trailer: TODO, i: number) => (
          <div key={trailer.id} className='slider-tile'>
            <div className='relative aspect-video overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
              <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target='_blank' rel='noreferrer'>
                {trailer.key ? (
                  <Image
                    src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                    alt={trailer.name || trailer.key}
                    priority
                    unoptimized
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
                    <HeadingExtraSmall className='line-clamp-2'>{trailer.name}</HeadingExtraSmall>
                  </div>
                )}
              </a>
            </div>
            <div className='w-11/12 pt-3'>
              <BodyMedium className='line-clamp-2'>{trailer.name || 'Trailer'}</BodyMedium>
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </section>
  );
}
