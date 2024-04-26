import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CATEGORIES, ContentRouteParams, TODO } from '@/lib/types';
import { MediaHeader } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits: TODO = await fetchTMDB({ category: CATEGORIES.CREDITS, mediaType, id });
  if (!credits.cast) return null;
  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstTenActors = actors.slice(0, 10);

  return (
    <section>
      <SliderProvider content={firstTenActors} mediaType='cast'>
        <DomContextProvider>
          <MediaHeader>Cast</MediaHeader>
          <Slider />
        </DomContextProvider>
      </SliderProvider>
    </section>
  );
}
