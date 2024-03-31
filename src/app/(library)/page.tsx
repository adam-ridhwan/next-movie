import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { libraryStrings } from '@/lib/constants';
import { Card } from '@/lib/types';
import { HeadingMedium } from '@/components/fonts';
import Slider from '@/components/slider/slider';

const MOCK_TRENDING_CARDS: Card[] = Array.from({ length: 9 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Trending Movie ${index + 1}`,
}));

const MOCK_RECOMMENDED_CARDS: Card[] = Array.from({ length: 13 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Recommended Movie ${index + 1}`,
}));

export default async function Home() {
  return (
    <>
      <div className=''>
        <div className='pt-5'>
          <HeadingMedium className='pl-10'>{libraryStrings.trending}</HeadingMedium>

          <SliderProvider cards={MOCK_TRENDING_CARDS}>
            <DomContextProvider>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>

        <div className='pt-5'>
          <HeadingMedium className='pl-10'>{libraryStrings.recommendedForYou}</HeadingMedium>

          <SliderProvider cards={MOCK_RECOMMENDED_CARDS}>
            <DomContextProvider>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      </div>
    </>
  );
}
