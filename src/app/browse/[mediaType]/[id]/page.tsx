import * as React from 'react';
import { Suspense } from 'react';
import Backdrop from '@/browse/components/backdrop';
import Headshots from '@/browse/components/headshots';
import { Label } from '@/browse/components/label';
import { Actors, Genres, Keywords } from '@/browse/components/metadata';
import Modal from '@/browse/components/modal';
import MoreLikeThis from '@/browse/components/more-like-this';
import { BackdropSkeleton, HeadshotsSkeleton, MetadataSkeleton, OverviewSkeleton } from '@/browse/components/skeletons'; // prettier-ignore

import { ContentRouteParams } from '@/lib/types';

import TileLoadingSkeleton from '@/components/tile-loading-skeleton';

export default function ContentModalPage({ params: { mediaType, id } }: { params: ContentRouteParams }) {
  return (
    <>
      {/* Need this so that when we navigate directly to url, the overlay appears immediately */}
      <div
        className='fixed inset-0 z-50 bg-black/80
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
      />

      <Modal>
        <Suspense fallback={<BackdropSkeleton />}>
          <Backdrop {...{ mediaType, id }} />
        </Suspense>

        <div className='flex flex-col gap-12 px-leftRightCustom py-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-3/5'>
            <Suspense fallback={<OverviewSkeleton />}>
              <Label {...{ mediaType, id }} />
            </Suspense>
          </div>

          <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
            <Suspense fallback={<MetadataSkeleton />}>
              <Actors {...{ mediaType, id }} />
              <Genres {...{ mediaType, id }} />
              <Keywords {...{ mediaType, id }} />
            </Suspense>
          </div>
        </div>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />

        <Suspense fallback={<TileLoadingSkeleton count={1} />}>
          <MoreLikeThis {...{ mediaType, id }} />
        </Suspense>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />

        <Suspense fallback={<HeadshotsSkeleton />}>
          <Headshots {...{ mediaType, id }} />
        </Suspense>

        <div className='mx-leftRightCustom my-8 border border-b-muted-foreground/20' />
      </Modal>
    </>
  );
}
