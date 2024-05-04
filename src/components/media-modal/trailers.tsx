import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import { VideoResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

export default async function Trailers({ mediaType, id }: ContentRouteParams) {
  try {
    const videos = await fetchTMDB({ mediaType, id, category: 'videos' });
    const { success, data, error } = VideoResponse.safeParse(videos);
    if (!success)
      throw new Error(`Trailers() Invalid videos schema: ${error.message}`);

    const trailers = data.results.filter(
      video =>
        video.official && video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (!trailers.length) return null;

    return (
      <SliderProvider
        content={trailers}
        mediaType={mediaType}
        section='trailer'
      >
        <Slider headerTitle='Trailers' />
      </SliderProvider>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
