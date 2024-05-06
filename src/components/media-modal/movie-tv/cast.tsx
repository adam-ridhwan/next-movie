import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import { CreditsResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  try {
    const { cast } = await fetchTMDB(CreditsResponse, {
      mediaType,
      id,
      category: 'credits',
    });

    const actors = cast
      .filter(({ known_for_department }) => known_for_department === 'Acting')
      .slice(0, 15);

    if (!actors.length) return null;

    return (
      <SliderProvider content={actors} mediaType={mediaType} section='cast'>
        <Slider headerTitle='Cast' />
      </SliderProvider>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
