import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { ContentRouteParams } from '@/types/global';
import { CreditsSchema } from '@/types/tmdb';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ mediaType, id, category: 'credits' });
  const parsedCredits = CreditsSchema.safeParse(credits);
  if (!parsedCredits.success) throw new Error('Cast() Invalid credits schema');

  const cast = parsedCredits.data.cast.filter(
    ({ known_for_department }) => known_for_department === 'Acting'
  );

  const firstTenActors = cast.slice(0, 15);
  if (!firstTenActors.length) return null;

  return (
    <SliderProvider content={firstTenActors} mediaType={mediaType} section='cast'>
      <Slider headerTitle='Cast' />
    </SliderProvider>
  );
}
