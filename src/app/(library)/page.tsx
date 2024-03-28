import AppSlider from '@/app/_components/app-slider/app-slider';
import { SliderProvider } from '@/app/_components/app-slider/slider-provider';
import RefContextProvider, { SliderStore } from '@/app/_components/app-slider/slider-store';

import { AppFonts } from '../_components/app-fonts';
import { LibraryStrings } from '../_components/app-strings';

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
          <AppFonts.headingMedium className='pl-10'>
            {LibraryStrings.trending}
          </AppFonts.headingMedium>

          <SliderProvider>
            <SliderStore cards={MOCK_TRENDING_CARDS}>
              <RefContextProvider>
                <AppSlider />
              </RefContextProvider>
            </SliderStore>
          </SliderProvider>
        </div>

        <div className='pt-5'>
          <AppFonts.headingMedium className='pl-10'>
            {LibraryStrings.recommendedForYou}
          </AppFonts.headingMedium>

          <SliderProvider>
            <SliderStore cards={MOCK_RECOMMENDED_CARDS}>
              <RefContextProvider>
                <AppSlider />
              </RefContextProvider>
            </SliderStore>
          </SliderProvider>
        </div>
      </div>
    </>
  );
}
