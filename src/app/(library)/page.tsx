import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { libraryStrings } from '@/lib/constants';
import { Tile } from '@/lib/types';
import { HeadingMedium } from '@/components/fonts';
import Slider from '@/components/slider/slider';

const MOCK_TRENDING_TILES: Tile[] = Array.from({ length: 11 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Trending ${index + 1}`,
}));

const MOCK_RECOMMENDED_TILES: Tile[] = Array.from({ length: 13 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Recommended ${index + 1}`,
}));

const MOCK_NEW_RELEASES_TILES: Tile[] = Array.from({ length: 21 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `New Releases Movie ${index + 1}`,
}));

export default async function Home() {
  const homepage = [
    MOCK_TRENDING_TILES, //
    // MOCK_RECOMMENDED_TILES, //
    // MOCK_NEW_RELEASES_TILES, //
  ];

  return (
    <>
      <div className=''>
        {homepage.map(tiles => (
          <div key={tiles.length} className='pt-5'>
            <HeadingMedium className='pl-12'>{libraryStrings.trending}</HeadingMedium>

            <SliderProvider tiles={tiles}>
              <DomContextProvider>
                <Slider />
              </DomContextProvider>
            </SliderProvider>
          </div>
        ))}
      </div>
    </>
  );
}
