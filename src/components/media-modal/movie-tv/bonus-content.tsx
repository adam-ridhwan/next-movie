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
    if (!videos) throw new Error('Failed to fetch details');

    const { success, data, error } = VideoResponse.safeParse(videos);
    if (!success) {
      throw new Error(`Trailers() Invalid videos schema: ${error.message}`);
    }

    const bonusContent = data.results.filter(
      video =>
        video.official &&
        video.type === 'Featurette' &&
        video.site === 'YouTube'
    );

    if (!bonusContent.length) return null;

    return (
      <SliderProvider
        content={bonusContent}
        mediaType={mediaType}
        section='bonus'
      >
        <Slider headerTitle='Bonus Content' />
      </SliderProvider>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
