import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, VideosListSchema } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Trailers({ id, mediaType }: ContentRouteParams) {
  const videos = await fetchTMDB({ label: 'Trailers', category: 'videos', mediaType, id });
  const parsedVideos = VideosListSchema.safeParse(videos);
  if (!parsedVideos.success) throw new Error('Error');

  const trailers = parsedVideos.data.results.filter(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailers.length) return null;

  return (
    <section>
      <SliderProvider content={trailers} mediaType={mediaType} section='trailer'>
        <DomContextProvider>
          <Slider headerTitle='Trailers' />
        </DomContextProvider>
      </SliderProvider>
    </section>
  );
}
