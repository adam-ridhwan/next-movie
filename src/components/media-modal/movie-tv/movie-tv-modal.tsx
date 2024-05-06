import { Suspense } from 'react';

import { MediaType } from '@/types/global-types';
import MediaModal from '@/components/media-modal/media-modal';
import Backdrop from '@/components/media-modal/movie-tv/backdrop';
import BonusContent from '@/components/media-modal/movie-tv/bonus-content';
import Cast from '@/components/media-modal/movie-tv/cast';
import ExternalLinks from '@/components/media-modal/movie-tv/external-links';
import { Label } from '@/components/media-modal/movie-tv/label';
import {
  Actors,
  Genres,
  Keywords,
  ReleaseDate,
} from '@/components/media-modal/movie-tv/metadata';
import MoreLikeThis from '@/components/media-modal/movie-tv/more-like-this';
import Trailers from '@/components/media-modal/movie-tv/trailers';
import Overlay from '@/components/media-modal/overlay';
import {
  BackdropSkeleton,
  HeadshotsSkeleton,
  MetadataSkeleton,
  OverviewSkeleton,
  TileLoadingSkeleton,
} from '@/components/skeletons';

type MediaModalProps = {
  mediaType: MediaType;
  mediaId: string;
};

const MovieTvModal = ({ mediaType, mediaId }: MediaModalProps) => (
  <>
    <Overlay />
    <MediaModal>
      <Suspense fallback={<BackdropSkeleton />}>
        <Backdrop mediaType={mediaType} id={mediaId} />
      </Suspense>

      <div className='flex flex-col gap-12 px-custom py-4 pb-10 lg:flex-row'>
        <div className='mx-[0.5%] flex w-full flex-col gap-6 lg:w-3/5'>
          <Suspense fallback={<OverviewSkeleton />}>
            <Label mediaType={mediaType} id={mediaId} />
            <ExternalLinks mediaType={mediaType} id={mediaId} />
          </Suspense>
        </div>

        <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
          <Suspense fallback={<MetadataSkeleton />}>
            <Actors mediaType={mediaType} id={mediaId} />
            <Genres mediaType={mediaType} id={mediaId} />
            <Keywords mediaType={mediaType} id={mediaId} />
            <ReleaseDate mediaType={mediaType} id={mediaId} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<TileLoadingSkeleton count={1} />}>
        <MoreLikeThis mediaType={mediaType} id={mediaId} />
      </Suspense>

      <Suspense>
        <Trailers mediaType={mediaType} id={mediaId} />
      </Suspense>

      <Suspense>
        <BonusContent mediaType={mediaType} id={mediaId} />
      </Suspense>

      <Suspense fallback={<HeadshotsSkeleton />}>
        <Cast mediaType={mediaType} id={mediaId} />
      </Suspense>
    </MediaModal>
  </>
);

export default MovieTvModal;
