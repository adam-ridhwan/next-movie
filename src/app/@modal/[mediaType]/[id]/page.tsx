import { Suspense } from 'react';

import { MediaType } from '@/types/global-types';
import Backdrop from '@/components/media-modal/backdrop';
import BonusContent from '@/components/media-modal/bonus-content';
import Cast from '@/components/media-modal/cast';
import { Label } from '@/components/media-modal/label';
import MediaModal from '@/components/media-modal/media-modal';
import { Actors, Genres, Keywords } from '@/components/media-modal/metadata';
import MoreLikeThis from '@/components/media-modal/more-like-this';
import Trailers from '@/components/media-modal/trailers';
import {
  BackdropSkeleton,
  HeadshotsSkeleton,
  MetadataSkeleton,
  OverviewSkeleton,
  TileLoadingSkeleton,
} from '@/components/skeletons';

export default async function MovieModal({
  params: { mediaType, id },
}: {
  params: { mediaType: MediaType; id: string };
}) {
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

        <div className='flex flex-col gap-12 px-leftRightCustom py-4 pb-10 lg:flex-row'>
          <div className='mx-[0.5%] flex w-full flex-col gap-4 lg:w-3/5'>
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

        <Suspense fallback={<TileLoadingSkeleton count={1} />}>
          <MoreLikeThis mediaType={mediaType} id={id} />
        </Suspense>

        <Suspense>
          <Trailers mediaType={mediaType} id={id} />
        </Suspense>

        <Suspense>
          <BonusContent mediaType={mediaType} id={id} />
        </Suspense>

        <Suspense fallback={<HeadshotsSkeleton />}>
          <Cast mediaType={mediaType} id={id} />
        </Suspense>
      </MediaModal>
    </>
  );
}
