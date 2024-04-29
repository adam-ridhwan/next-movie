import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams, FetchTMDBParams } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({ id, mediaType }: ContentRouteParams) {
  const content: FetchTMDBParams[] = [
    { category: 'recommendations', mediaType, id },
    { category: 'similar', mediaType, id },
  ];

  const contentPromises = content.map(async content => {
    const movieTvs = await fetchTMDB({ ...content });
    return { ...content, results: movieTvs.results ?? [] };
  });

  const [recommendations, similar] = await Promise.all(contentPromises);
  const moreLikesThis = recommendations.results.length > 0 ? recommendations.results : similar.results;

  if (!moreLikesThis.length) return null;

  return (
    <SliderProvider content={moreLikesThis} mediaType={mediaType} section={mediaType}>
      <DomContextProvider>
        <Slider headerTitle='More like this' />
      </DomContextProvider>
    </SliderProvider>
  );
}
