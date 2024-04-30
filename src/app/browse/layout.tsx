import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams, Section } from '@/types/global';
import { MovieListSchema, TvListSchema } from '@/types/tmdb';
import EpicStage from '@/components/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

const BrowseLayout = async ({ children }: { children: ReactNode }) => {
  const contentParams: Array<FetchTMDBParams & { section: Section }> = [
    { label: 'Trending: Movies', category: 'trending', mediaType: 'movie', section: 'movie' },
    { label: 'Trending: TV Shows', category: 'trending', mediaType: 'tv', section: 'tv' },
    { label: 'Action Movies', category: 'discover', mediaType: 'movie', section: 'movie', genreId: 28 },
    { label: 'Drama Movies', category: 'discover', mediaType: 'movie', section: 'tv', genreId: 18 },
  ];

  const fetchedContent = await Promise.all(
    contentParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const schema = params.mediaType === 'movie' ? MovieListSchema : TvListSchema;

      const parsedMedia = schema.safeParse(media);
      if (!parsedMedia.success) throw new Error(`BrowseLayout() Invalid ${params.label} media schema`);

      return {
        ...params,
        results: parsedMedia.data.results,
      };
    })
  );

  return (
    <>
      <EpicStage />

      {fetchedContent.map(content => (
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType={content.mediaType}
          section={content.section}
        >
          <Slider headerTitle={content.label || ''} />
        </SliderProvider>
      ))}

      {children}
    </>
  );
};
export default BrowseLayout;
