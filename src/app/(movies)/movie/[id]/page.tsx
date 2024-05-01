import { Suspense } from 'react';

import Backdrop from '@/components/media-modal/backdrop';
import BonusContent from '@/components/media-modal/bonus-content';
import Cast from '@/components/media-modal/cast';
import { Label } from '@/components/media-modal/label';
import MediaModal from '@/components/media-modal/media-modal';
import { Actors, Genres, Keywords } from '@/components/media-modal/metadata';
import MoreLikeThis from '@/components/media-modal/more-like-this';
import Overlay from '@/components/media-modal/overlay';
import Trailers from '@/components/media-modal/trailers';
import {
  BackdropSkeleton,
  HeadshotsSkeleton,
  MetadataSkeleton,
  OverviewSkeleton,
  TileLoadingSkeleton,
} from '@/components/skeletons';

export default function MovieModalPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <Overlay />

      <MediaModal>
        <Suspense fallback={<BackdropSkeleton />}>
          <Backdrop mediaType='movie' id={id} />
        </Suspense>

        <div className='flex flex-col gap-12 px-leftRightCustom py-4 pb-10 lg:flex-row'>
          <div className='mx-[0.5%] flex w-full flex-col gap-4 lg:w-3/5'>
            <Suspense fallback={<OverviewSkeleton />}>
              <Label mediaType='movie' id={id} />
            </Suspense>
          </div>

          <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
            <Suspense fallback={<MetadataSkeleton />}>
              <Actors mediaType='movie' id={id} />
              <Genres mediaType='movie' id={id} />
              <Keywords mediaType='movie' id={id} />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={<TileLoadingSkeleton count={1} />}>
          <MoreLikeThis mediaType='movie' id={id} />
        </Suspense>

        <Suspense>
          <Trailers mediaType='movie' id={id} />
        </Suspense>

        <Suspense>
          <BonusContent mediaType='movie' id={id} />
        </Suspense>

        <Suspense fallback={<HeadshotsSkeleton />}>
          <Cast mediaType='movie' id={id} />
        </Suspense>
      </MediaModal>
    </>
  );
}
