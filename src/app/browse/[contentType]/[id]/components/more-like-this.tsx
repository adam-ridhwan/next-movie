import * as React from 'react';
import { fetchRecommendations } from '@/actions/fetch-recommendations';
import { fetchSimilar } from '@/actions/fetch-similar';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { ContentRouteParams } from '@/lib/types';
import Slider from '@/components/slider/slider';

export default async function MoreLikeThis({ id, contentType }: ContentRouteParams) {
  const [recommendations, similar] = await Promise.all([
    fetchRecommendations(id, contentType),
    fetchSimilar(id, contentType),
  ]);

  const moreLikesThis = recommendations.results.length > 0 ? recommendations.results : similar.results;

  return (
    <SliderProvider content={moreLikesThis} contentType={contentType}>
      <DomContextProvider>
        <Slider header={'More like this'} />
      </DomContextProvider>
    </SliderProvider>
  );
}
