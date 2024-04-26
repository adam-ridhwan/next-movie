import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import { MediaHeader } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function Trailers({ id, mediaType }: ContentRouteParams) {
  const videos = await fetchTMDB({ category: 'videos', mediaType, id });

  const trailers = videos.results.filter(
    (video: TODO) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailers.length) return null;

  return (
    <section>
      <SliderProvider content={trailers} mediaType='trailer'>
        <DomContextProvider>
          <MediaHeader>Trailers</MediaHeader>
          <Slider />
        </DomContextProvider>
      </SliderProvider>
    </section>
  );
}
