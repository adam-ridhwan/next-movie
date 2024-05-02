'use client';

import { useHomepageStore } from '@/providers/homepage/homepage-provider';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { TODO } from '@/types/global-types';
import EpicStage from '@/components/epic-stage';
import Slider from '@/components/slider/slider';

const HomePage = () => {
  const { homepageContent } = useHomepageStore();

  return (
    <div>
      <EpicStage />

      {homepageContent.map((content: TODO) => (
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType={content.mediaType}
          section={content.section}
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      ))}
    </div>
  );
};

export default HomePage;
