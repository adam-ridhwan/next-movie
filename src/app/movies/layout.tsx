import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { MovieList, MovieListSchema } from '@/types/tmdb';
import { isNullish } from '@/lib/utils';
import EpicStage from '@/components/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

const MoviesLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <EpicStage mediaType='movie' />

      {/*{content.map(content => (*/}
      {/*  <SliderProvider*/}
      {/*    key={content.label}*/}
      {/*    content={content.results}*/}
      {/*    mediaType={content.mediaType}*/}
      {/*    section={content.section}*/}
      {/*  >*/}
      {/*    <Slider headerTitle={isNullish(content.label)} />*/}
      {/*  </SliderProvider>*/}
      {/*))}*/}

      {children}
    </>
  );
};

export default MoviesLayout;
