import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { SliderRefProvider } from '@/providers/slider/slider-ref-provider';

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
      <SliderRefProvider>
        <Slider headerTitle='More like this' />
      </SliderRefProvider>
    </SliderProvider>
  );
}
