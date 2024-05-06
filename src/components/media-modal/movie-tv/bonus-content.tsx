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

    const bonusContent = results.filter(
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
