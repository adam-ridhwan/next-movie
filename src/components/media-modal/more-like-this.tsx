import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, TODO } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({ id, mediaType }: ContentRouteParams) {
  const [recommendations, similar]: [TODO, TODO] = await Promise.all([
    fetchTMDB({ label: '', category: 'recommendations', mediaType, id }),
    fetchTMDB({ label: '', category: 'similar', mediaType, id }),
  ]);

  const moreLikesThis: TODO = recommendations.results.length > 0 ? recommendations.results : similar.results;

  if (!moreLikesThis.length) return null;

  return (
    <SliderProvider content={moreLikesThis} mediaType={mediaType} section={mediaType}>
      <DomContextProvider>
        <Slider headerTitle='More like this' />
      </DomContextProvider>
    </SliderProvider>
  );
}
