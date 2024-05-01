import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { ContentRouteParams, FetchTMDBParams } from '@/types/global';
import { MovieListSchema, TvListSchema } from '@/types/tmdb';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({ id, mediaType }: ContentRouteParams) {
  const content: FetchTMDBParams[] = [
    { mediaType, id, category: 'recommendations' },
    { mediaType, id, category: 'similar' },
  ];
  const schema = mediaType === 'movie' ? MovieListSchema : TvListSchema;

  const contentPromises = content.map(async content => {
    const movieTvs = await fetchTMDB({ ...content });

    const { success, data, error } = schema.safeParse(movieTvs);
    if (!success) throw new Error(`MoreLikeThis() Invalid ${mediaType} schema: ${error.message}`);

    return {
      ...content,
      results: data.results,
    };
  });

  const [recommendations, similar] = await Promise.all(contentPromises);
  const moreLikesThis = recommendations.results.length ? recommendations.results : similar.results;

  if (!moreLikesThis.length) return null;

  return (
    <SliderProvider content={moreLikesThis} mediaType={mediaType} section={mediaType}>
      <Slider headerTitle='More like this' />
    </SliderProvider>
  );
}
