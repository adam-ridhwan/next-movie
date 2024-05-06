import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import { VideoResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

export default async function Trailers({ mediaType, id }: ContentRouteParams) {
  try {
    const { results } = await fetchTMDB(VideoResponse, {
      mediaType,
      id,
      category: 'videos',
    });

    const trailers = results.filter(
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
