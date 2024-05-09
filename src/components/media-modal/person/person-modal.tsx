import { Suspense } from 'react';

import MediaModal from '@/components/media-modal/media-modal';
import Overlay from '@/components/media-modal/overlay';
import PersonMovieTv from '@/components/media-modal/person/person-movie-tv';
import PersonSpotlight from '@/components/media-modal/person/person-spotlight';

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
            <PersonSpotlight personId={personId} />
          </Suspense>

          <Suspense>
            <PersonMovieTv personId={personId} />
          </Suspense>

          {/*<Suspense>*/}
          {/*  <HighRated slug={slug} mediaType={mediaType} genreId={genreId} />*/}
          {/*</Suspense>*/}
        </div>
      </MediaModal>
    </>
  );
};

export default PersonModal;
