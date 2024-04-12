import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { prisma } from '@/lib/client';
import { DEVELOPMENT_MODE, libraryStrings } from '@/lib/constants';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

const MOCK_TRENDING_TILES: Movie[] = Array.from({ length: 15 }, (_, index) => ({
  id: uuid(),
  title: `${index + 1}`,
  description: `Description ${index + 1}`,
  thumbnailUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 10) + 1}/200/300`,
}));

export default async function Home() {
  const fetchedTiles = await prisma.movie.findMany({});

  const tiles = DEVELOPMENT_MODE ? [MOCK_TRENDING_TILES] : [fetchedTiles];

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
