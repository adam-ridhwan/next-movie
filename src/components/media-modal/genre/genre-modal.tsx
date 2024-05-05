import { GenreId, GenreSlug } from '@/types/global-types';
import MediaModal from '@/components/media-modal/media-modal';
import Overlay from '@/components/media-modal/movie-tv/overlay';

type GenreModalProps = {
  slug: GenreSlug;
  genreId: GenreId;
};

const GenreModal = ({ slug, genreId }: GenreModalProps) => (
  <>
    <Overlay />
    <MediaModal>
      <div>
        {slug}:{genreId}
      </div>
    </MediaModal>
  </>
);

export default GenreModal;
