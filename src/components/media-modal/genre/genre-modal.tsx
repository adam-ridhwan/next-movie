import { Suspense } from 'react';

import { GenreId, GenreSlug, MediaType } from '@/types/global-types';
import NewMovieTv from '@/components/media-modal/genre/new';
import Spotlight from '@/components/media-modal/genre/spotlight';
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

const GenreModal = async ({ slug, genreId, mediaType }: GenreModalProps) => {
  return (
    <>
      <Overlay />
      <MediaModal>
        <div className='pt-10'>
          <Suspense>
            <Spotlight slug={slug} mediaType={mediaType} genreId={genreId} />
          </Suspense>

          <Suspense>
            <NewMovieTv slug={slug} mediaType={mediaType} genreId={genreId} />
          </Suspense>
        </div>
      </MediaModal>
    </>
  );
};

export default GenreModal;
