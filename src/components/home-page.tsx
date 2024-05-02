import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams, Section } from '@/types/global-types';
import { MovieResponse, TvResponse } from '@/types/tmdb-types';
import EpicStage from '@/components/epic-stage/epic-stage';
import Slider from '@/components/slider/slider';

const HomePage = async () => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string; section: Section }> = [
    { label: 'Trending: Movies', section: 'movie', category: 'trending', mediaType: 'movie' },
    { label: 'Trending: TV Shows', section: 'tv', category: 'trending', mediaType: 'tv' },
    { label: 'Action Movies', section: 'movie', category: 'discover', mediaType: 'movie', genreId: 28 },
    { label: 'Drama Movies', section: 'tv', category: 'discover', mediaType: 'movie', genreId: 18 },
  ];

  const content = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const schema = params.mediaType === 'movie' ? MovieResponse : TvResponse;

      const { success, data, error } = schema.safeParse(media);
      if (!success) throw new Error(`HomePage() Invalid ${params.mediaType} schema : ${error.message}`);

      return {
        ...params,
        results: data.results,
      };
    })
  );

  return (
    <div>
      <EpicStage mediaType='movie' />

      {content.map(content => (
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType={content.mediaType}
          section={content.section}
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      ))}
    </div>
  );
};

export default HomePage;
