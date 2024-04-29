import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, CreditsSchema } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ mediaType, id, label: '', category: 'credits' });
  const parsedCredits = CreditsSchema.safeParse(credits);
  if (!parsedCredits.success) throw new Error('Error');

  const actors = parsedCredits.data.cast.filter(
    ({ known_for_department }) => known_for_department === 'Acting'
  );
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
