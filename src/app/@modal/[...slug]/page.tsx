import { Suspense } from 'react';

import { GenreId, MOVIE_GENRES, TODO } from '@/types/global-types';
import { getKeyByValue } from '@/lib/utils';
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

type MediaPageProps = {
  params: TODO;
};

function isEmpty(obj: TODO) {
  return Object.keys(obj).length === 0;
}

function extractGenreSlug(slug: string) {
  const match = slug.match(/^(.+?)-(movies|tv)$/);
  if (!match) return null;

  let genre = match[1];
  const mediaType = match[2];

  if (mediaType === 'movies' && genre.endsWith('s')) genre = genre.slice(0, -1);

  return genre;
}

const MediaPage = async ({ params }: MediaPageProps) => {
  if (isEmpty(params)) return null;

  const slug = params.slug[0];
  const mediaId = params.slug[1];
  const genre = extractGenreSlug(slug);

  const mediaType = slug === 'movie' || slug === 'tv' ? slug : 'genre';
  const genreId = getKeyByValue(MOVIE_GENRES, genre);

  return <ModalSelector mediaType={mediaType} slug={slug} mediaId={mediaId} genreId={genreId} />;
};
export default MediaPage;

type ModalSelectorProps = {
  mediaType: 'movie' | 'tv' | 'genre';
  slug: string;
  mediaId: string;
  genreId: GenreId | null;
};

const ModalSelector = ({ mediaType, slug, mediaId, genreId }: ModalSelectorProps) => {
  switch (mediaType) {
    case 'movie':
    case 'tv':
      return (
        <>
          <Overlay />
          <MediaModal>
            <Suspense fallback={<BackdropSkeleton />}>
              <Backdrop mediaType={mediaType} id={mediaId} />
            </Suspense>

            <div className='flex flex-col gap-12 px-custom py-4 pb-10 lg:flex-row'>
              <div className='mx-[0.5%] flex w-full flex-col gap-4 lg:w-3/5'>
                <Suspense fallback={<OverviewSkeleton />}>
                  <Label mediaType={mediaType} id={mediaId} />
                </Suspense>
              </div>

              <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
                <Suspense fallback={<MetadataSkeleton />}>
                  <Actors mediaType={mediaType} id={mediaId} />
                  <Genres mediaType={mediaType} id={mediaId} />
                  <Keywords mediaType={mediaType} id={mediaId} />
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

    case 'genre':
      return (
        <>
          <Overlay />
          <MediaModal>
            <div>
              {slug}:{genreId}
            </div>
          </MediaModal>
        </>
      );

    default:
      return <></>;
  }
};
