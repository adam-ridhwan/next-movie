import { Suspense } from 'react';

import MediaModal from '@/components/media-modal/media-modal';
import Overlay from '@/components/media-modal/overlay';
import Spotlight from '@/components/media-modal/person/spotlight';

type PersonModalProps = {
  personId: string;
};

const PersonModal = async ({ personId }: PersonModalProps) => {
  return (
    <>
      <Overlay />
      <MediaModal>
        <div className='pt-14'>
          <Suspense>
            <Spotlight personId={personId} />
          </Suspense>

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
