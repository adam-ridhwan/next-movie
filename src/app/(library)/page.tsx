import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import AppSlider from '@/components/app-slider/app-slider';
import { HeadingMedium } from '@/components/shared/fonts';
import { LibraryStrings } from '@/components/shared/strings';

export type Card = {
  id: string;
  imageUrl: string;
  year: string;
  category: string;
  rating: string;
  title: string;
};

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

export default function Home() {
  return (
    <>
      <div className=''>
        <div className='pt-5'>
          <HeadingMedium className='pl-10'>{LibraryStrings.trending}</HeadingMedium>

          <SliderProvider cards={MOCK_TRENDING_CARDS}>
            <DomContextProvider>
              <AppSlider />
            </DomContextProvider>
          </SliderProvider>
        </div>

        <div className='pt-5'>
          <HeadingMedium className='pl-10'>{LibraryStrings.recommendedForYou}</HeadingMedium>

          <SliderProvider cards={MOCK_RECOMMENDED_CARDS}>
            <DomContextProvider>
              <AppSlider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      </div>
    </>
  );
}
