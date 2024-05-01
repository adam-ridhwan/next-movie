import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { ContentRouteParams } from '@/types/global';
import { VideoListSchema } from '@/types/tmdb';
import Slider from '@/components/slider/slider';

export default async function Trailers({ mediaType, id }: ContentRouteParams) {
  const videos = await fetchTMDB({ mediaType, id, category: 'videos' });
  const { success, data, error } = VideoListSchema.safeParse(videos);
  if (!success) throw new Error(`Trailers() Invalid videos schema: ${error.message}`);

  const bonusContent = data.results.filter(
    video => video.official && video.type === 'Featurette' && video.site === 'YouTube'
  );

  if (!bonusContent.length) return null;

  return (
    <SliderProvider content={bonusContent} mediaType={mediaType} section='bonus'>
      <Slider headerTitle='Bonus Content' />
    </SliderProvider>
  );
}
