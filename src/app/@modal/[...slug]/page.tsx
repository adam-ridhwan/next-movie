import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ErrorPage } from '@/routes';

import {
  GenreId,
  GenreSlug,
  MediaModalSlug,
  MediaType,
  MOVIE_GENRES,
  TODO,
  TV_GENRES,
} from '@/types/global-types';
import { extractGenreMediaTypeSlugs, getGenreIdBySlug } from '@/lib/utils';
import GenreModal from '@/components/media-modal/genre/genre-modal';
import MediaModal from '@/components/media-modal/media-modal';
import Backdrop from '@/components/media-modal/movie-tv/backdrop';
import BonusContent from '@/components/media-modal/movie-tv/bonus-content';
import Cast from '@/components/media-modal/movie-tv/cast';
import { Label } from '@/components/media-modal/movie-tv/label';
import {
  Actors,
  Genres,
  Keywords,
} from '@/components/media-modal/movie-tv/metadata';
import MoreLikeThis from '@/components/media-modal/movie-tv/more-like-this';
import MovieTvModal from '@/components/media-modal/movie-tv/movie-tv-modal';
import Overlay from '@/components/media-modal/movie-tv/overlay';
import Trailers from '@/components/media-modal/movie-tv/trailers';
import {
  BackdropSkeleton,
  HeadshotsSkeleton,
  MetadataSkeleton,
  OverviewSkeleton,
  TileLoadingSkeleton,
} from '@/components/skeletons';

type MediaPageProps = {
  params: {
    slug: MediaModalSlug;
  };
};

/**
 * First slug: [movie, tv, genre]
 *  - movie
 *  - tv
 *  - [genre]-movies | [genre]-tv
 *
 * Second slug: [id]
 *  - movie/[id]
 *  - tv/[id]
 *
 * */

const isEmpty = (obj: TODO) => Object.keys(obj).length === 0;

const MediaModalPage = async ({ params }: MediaPageProps) => {
  if (isEmpty(params)) return null;

  const parsedMediaModalSlug = MediaModalSlug.safeParse(params.slug);
  if (!parsedMediaModalSlug.success) {
    redirect(ErrorPage());
  }

  const mediaCategorySlug = parsedMediaModalSlug.data[0];
  const mediaIdSlug = parsedMediaModalSlug?.data[1] || '';

  const parsedMediaType = MediaType.safeParse(mediaCategorySlug);
  if (parsedMediaType.success) {
    return (
      <MovieTvModal mediaType={parsedMediaType.data} mediaId={mediaIdSlug} />
    );
  }

  const parsedGenreSlug = GenreSlug.safeParse(mediaCategorySlug);
  if (parsedGenreSlug.success) {
    const [genre, mediaType] = extractGenreMediaTypeSlugs(parsedGenreSlug.data);

    const id = getGenreIdBySlug(genre, mediaType);
    if (!id) redirect(ErrorPage());

    return <GenreModal slug={genre} genreId={id} />;
  }
};
export default MediaModalPage;
