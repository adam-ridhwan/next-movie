import { Suspense } from 'react';
import Modal from '@/modalComponents/client/modal';
import Backdrop from '@/modalComponents/server/backdrop';
import { Label } from '@/modalComponents/server/label';
import { Actors, Genres, Keywords } from '@/modalComponents/server/metadata';
import { BackdropSkeleton, MetadataSkeleton, OverviewSkeleton } from '@/modalComponents/skeleton';

import { ContentRouteParams } from '@/lib/types';

export default function ContentModal({ params: { contentType, id } }: { params: ContentRouteParams }) {
  return (
    <Modal>
      <Suspense fallback={<BackdropSkeleton />}>
        <Backdrop {...{ contentType, id }} />
      </Suspense>

      <div className='flex flex-col gap-12 px-14 lg:flex-row'>
        <div className='flex w-full flex-col gap-4 lg:w-3/5'>
          <Suspense fallback={<OverviewSkeleton />}>
            <Label {...{ contentType, id }} />
          </Suspense>
        </div>

        <div className='flex w-full flex-col gap-4 lg:w-2/5'>
          <Suspense fallback={<MetadataSkeleton />}>
            <Actors {...{ contentType, id }} />
            <Genres {...{ contentType, id }} />
            <Keywords {...{ contentType, id }} />
          </Suspense>
        </div>
      </div>
    </Modal>
  );
}
