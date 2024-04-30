import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { SliderRefProvider } from '@/providers/slider/slider-ref-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ mediaType, id, label: '', category: 'credits' });

  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstTenActors = actors.slice(0, 10);

  return (
    <section>
      <SliderProvider content={firstTenActors} mediaType={mediaType} section='cast'>
        <Slider headerTitle='Cast' />
      </SliderProvider>
    </section>
  );
}
