import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function Trailers({ mediaType, id }: ContentRouteParams) {
  const videos: TODO = await fetchTMDB({ mediaType, id, label: 'Bonus Content', category: 'videos' });

  const bonusContent = videos.results.filter(
    (video: TODO) => video.type === 'Featurette' && video.site === 'YouTube'
  );

  if (!bonusContent.length) return null;

  return (
    <section>
      <SliderProvider content={bonusContent} mediaType={mediaType} section='bonus'>
        <DomContextProvider>
          <Slider headerTitle='Bonus Content' />
        </DomContextProvider>
      </SliderProvider>
    </section>
  );
}
