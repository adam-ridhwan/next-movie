import * as React from 'react';
import { Suspense } from 'react';

import Backdrop from '@/components/media-modal/backdrop';
import Headshots from '@/components/media-modal/headshots';
import { Label } from '@/components/media-modal/label';
import MediaModal from '@/components/media-modal/media-modal';
import { Actors, Genres, Keywords } from '@/components/media-modal/metadata';
import MoreLikeThis from '@/components/media-modal/more-like-this';
import TileLoadingSkeleton, { BackdropSkeleton, HeadshotsSkeleton, MetadataSkeleton, OverviewSkeleton } from '@/components/skeletons'; // prettier-ignore

import { ContentRouteParams } from '@/lib/types';

export default function ContentModalPage({ params: { mediaType, id } }: { params: ContentRouteParams }) {
  return (
    <>
      {/* Need this so that when we navigate directly to url, the overlay appears immediately */}
      <div
        className='fixed inset-0 z-50 bg-black/80
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
      />

      <MediaModal>
        <Suspense fallback={<BackdropSkeleton />}>
          <Backdrop mediaType={mediaType} id={id} />
        </Suspense>

        <div className='flex flex-col gap-12 px-leftRightCustom py-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-3/5'>
            <Suspense fallback={<OverviewSkeleton />}>
              <Label mediaType={mediaType} id={id} />
            </Suspense>
          </div>

          <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
            <Suspense fallback={<MetadataSkeleton />}>
              <Actors mediaType={mediaType} id={id} />
              <Genres mediaType={mediaType} id={id} />
              <Keywords mediaType={mediaType} id={id} />
            </Suspense>
          </div>
        </div>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />

        <Suspense fallback={<TileLoadingSkeleton count={1} />}>
          <MoreLikeThis mediaType={mediaType} id={id} />
        </Suspense>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />

        <Suspense fallback={<HeadshotsSkeleton />}>
          <Headshots mediaType={mediaType} id={id} />
        </Suspense>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />
      </MediaModal>
    </>
  );
}
