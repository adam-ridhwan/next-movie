import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { ContentRouteParams, TODO } from '@/types/global';
import Slider from '@/components/slider/slider';

export default async function Trailers({ mediaType, id }: ContentRouteParams) {
  const videos = await fetchTMDB({ mediaType, id, label: 'Bonus Content', category: 'videos' });

  const bonusContent = videos.results.filter(
    (video: TODO) => video.type === 'Featurette' && video.site === 'YouTube'
  );

  if (!bonusContent.length) return null;

  return (
    <SliderProvider content={bonusContent} mediaType={mediaType} section='bonus'>
      <Slider headerTitle='Bonus Content' />
    </SliderProvider>
  );
}
