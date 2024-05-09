import MediaModal from '@/components/media-modal/media-modal';
import Overlay from '@/components/media-modal/overlay';

type PersonModalProps = {
  personId: string;
};

// details
// combined credits
// external ids

const PersonModal = async ({ personId }: PersonModalProps) => {
  return (
    <>
      <Overlay />
      <MediaModal>
        <div className='pt-14'>
          {personId}
          {/*<Suspense>*/}
          {/*  <Spotlight slug={slug} mediaType={mediaType} genreId={genreId} />*/}
          {/*</Suspense>*/}

          {/*<Suspense>*/}
          {/*  <NewMovieTv slug={slug} mediaType={mediaType} genreId={genreId} />*/}
          {/*</Suspense>*/}

          {/*<Suspense>*/}
          {/*  <HighRated slug={slug} mediaType={mediaType} genreId={genreId} />*/}
          {/*</Suspense>*/}
        </div>
      </MediaModal>
    </>
  );
};

export default PersonModal;
