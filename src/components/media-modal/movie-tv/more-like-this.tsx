import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { ErrorPage } from '@/routes';

import { ContentRouteParams, FetchTMDBParams } from '@/types/global-types';
import { MovieResponse, TvResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({
  mediaType,
  id,
}: ContentRouteParams) {
  try {
    const content: FetchTMDBParams[] = [
      { mediaType, id, category: 'recommendations' },
      { mediaType, id, category: 'similar' },
    ];
    const schema = mediaType === 'movie' ? MovieResponse : TvResponse;

    const contentPromises = content.map(async content => {
      const movieTvs = await fetchTMDB({ ...content });

      const { success, data, error } = schema.safeParse(movieTvs);
      if (!success)
        throw new Error(
          `MoreLikeThis() Invalid ${mediaType} schema: ${error.message}`
        );

      return {
        ...content,
        results: data.results,
      };
    });

    const [recommendations, similar] = await Promise.all(contentPromises);
    const moreLikesThis = recommendations.results.length
      ? recommendations.results
      : similar.results;

    if (!moreLikesThis.length) return null;

    return (
      <SliderProvider
        content={moreLikesThis}
        mediaType={mediaType}
        section={mediaType}
      >
        <Slider headerTitle='More like this' />
      </SliderProvider>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
