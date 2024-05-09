import { redirect } from 'next/navigation';
import { ErrorPage } from '@/routes';

import {
  GenreSlug,
  MediaModalSlug,
  MediaType,
  TODO,
} from '@/types/global-types';
import { extractGenreMediaTypeSlugs, getGenreIdBySlug } from '@/lib/utils';
import GenreModal from '@/components/media-modal/genre/genre-modal';
import MovieTvModal from '@/components/media-modal/movie-tv/movie-tv-modal';

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

    const genreIdSlug = getGenreIdBySlug(genre, mediaType);
    if (!genreIdSlug) redirect(ErrorPage());

    return (
      <GenreModal mediaType={mediaType} slug={genre} genreId={genreIdSlug} />
    );
  }
};
export default MediaModalPage;
