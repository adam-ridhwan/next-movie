import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams } from '@/lib/types';
import { MediaHeader } from '@/components/fonts';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({ id, mediaType }: ContentRouteParams) {
  const [recommendations, similar] = await Promise.all([
    fetchTMDB({ category: 'recommendations', mediaType, id }),
    fetchTMDB({ category: 'similar', mediaType, id }),
  ]);

  const moreLikesThis = recommendations.results.length > 0 ? recommendations.results : similar.results;

  if (!moreLikesThis.length) return null;

  return (
    <SliderProvider content={moreLikesThis} mediaType={mediaType}>
      <DomContextProvider>
        <MediaHeader>More like this</MediaHeader>
        <Slider />
      </DomContextProvider>
    </SliderProvider>
  );
}
