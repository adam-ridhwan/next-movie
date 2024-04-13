import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { prisma } from '@/lib/client';
import { DEVELOPMENT_MODE, libraryStrings } from '@/lib/constants';
import { MOCK_TRENDING_TILES } from '@/lib/mock';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Home() {
  const fetchedTiles = await prisma.movie.findMany({});

  const tiles = DEVELOPMENT_MODE ? [MOCK_TRENDING_TILES] : [fetchedTiles];

  // Need to add a new uuid to each tile to prevent flickering when the slider is re-rendered
  for (const tile of tiles[0]) tile.uuid = uuid();

  return (
    <div>
      {tiles.map(tiles => (
        <div key={tiles.length} className='flex flex-col gap-1 pt-5'>
          <SliderProvider tiles={tiles}>
            <DomContextProvider>
              <HeadingExtraSmall className='px-12'>{libraryStrings.trending}</HeadingExtraSmall>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      ))}
    </div>
  );
}
