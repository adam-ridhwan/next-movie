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

const getFetchParams = (
  mediaType: MediaType,
  genreId: GenreId
): FetchTMDBParams | null => {
  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    return {
      category: 'discover',
      release_date_gte: '2024-01-01',
      release_date_lte: '2024-05-01',
      mediaType: 'movie',
      genreId,
    };
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    return {
      category: 'discover',
      release_date_gte: '2024-01-01',
      release_date_lte: '2024-05-01',
      mediaType: 'tv',
      genreId,
    };
  }

  return null;
};

const GenreModal = async ({ slug, genreId, mediaType }: GenreModalProps) => {
  const params = getFetchParams(mediaType, genreId);
  const newMedia = params ? await fetchTMDB(params) : null;

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
