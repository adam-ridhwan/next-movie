import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { SliderRefProvider } from '@/providers/slider/slider-ref-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Trailers({ id, mediaType }: ContentRouteParams) {
  const videos = await fetchTMDB({ label: 'Trailers', category: 'videos', mediaType, id });

  const trailers = videos.results.filter(
    (video: TODO) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailers.length) return null;

  return (
    <section>
      <SliderProvider content={trailers} mediaType={mediaType} section='trailer'>
        <Slider headerTitle='Trailers' />
      </SliderProvider>
    </section>
  );
}
