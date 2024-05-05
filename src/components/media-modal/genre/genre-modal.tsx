import { fetchTMDB } from '@/actions/fetch-tmdb';

import {
  FetchTMDBParams,
  GenreId,
  GenreSlug,
  MediaType,
} from '@/types/global-types';
import { isMovieGenreId, isTvGenreId } from '@/lib/utils';
import MediaModal from '@/components/media-modal/media-modal';
import Overlay from '@/components/media-modal/movie-tv/overlay';

type GenreModalProps = {
  slug: GenreSlug;
  mediaType: MediaType;
  genreId: GenreId;
};

// Movies
// - (Released this year) - Filter by date gte and lte
// release_date.gte=2024-01-01
// release_date.lte=2024-05-01
// -

const getFetchTMDBParams = (
  mediaType: MediaType,
  genreId: GenreId
): FetchTMDBParams | null => {
  const currentDate = new Date().toLocaleDateString('en-CA');

  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    return {
      category: 'discover',
      primary_release_date_gte: '2024-01-01',
      primary_release_date_lte: currentDate,
      mediaType: 'movie',
      genreId,
    };
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    return {
      category: 'discover',
      first_air_date_gte: '2024-01-01',
      first_air_date_lte: currentDate,
      mediaType: 'tv',
      genreId,
    };
  }

  return null;
};

const GenreModal = async ({ slug, genreId, mediaType }: GenreModalProps) => {
  const params = getFetchTMDBParams(mediaType, genreId);
  if (!params) throw new Error('getFetchTMDBParams(): Invalid genreId');

  const releasedThisYear = await fetchTMDB(params);

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
};

export default GenreModal;
