import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { CATEGORIES, ContentRouteParams } from '@/lib/types';
import { MediaHeader } from '@/components/fonts';
import Slider from '@/components/slider/slider';

const { RECOMMENDATIONS, SIMILAR } = CATEGORIES;

export default async function MoreLikeThis({ id, mediaType }: ContentRouteParams) {
  const [recommendations, similar] = await Promise.all([
    fetchTMDB({ category: RECOMMENDATIONS, mediaType, id }),
    fetchTMDB({ category: SIMILAR, mediaType, id }),
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
