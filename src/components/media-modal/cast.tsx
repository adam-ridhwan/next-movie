import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits: TODO = await fetchTMDB({ mediaType, id, label: '', category: 'credits' });
  if (!credits.cast) return null;

  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstTenActors = actors.slice(0, 10);

  return (
    <section>
      <SliderProvider content={firstTenActors} mediaType={mediaType} section='cast'>
        <DomContextProvider>
          <Slider headerTitle='Cast' />
        </DomContextProvider>
      </SliderProvider>
    </section>
  );
}
