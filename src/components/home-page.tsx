import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams, Section } from '@/types/global-types';
import { MovieResponse, TvResponse } from '@/types/tmdb-types';
import EpicStage from '@/components/epic-stage';
import Slider from '@/components/slider/slider';

type HomePageParams = Array<
  FetchTMDBParams & { label: string; section: Section }
>;

const HomePage = async () => {
  const homepageParams: HomePageParams = [
    {
      label: 'Trending: Movies',
      section: 'movie',
      category: 'trending',
      mediaType: 'movie',
    },
    {
      label: 'Trending: TV Shows',
      section: 'tv',
      category: 'trending',
      mediaType: 'tv',
    },
    {
      label: 'Action Movies',
      section: 'movie',
      category: 'discover',
      mediaType: 'movie',
      genreId: 28,
    },
    {
      label: 'Drama Movies',
      section: 'movie',
      category: 'discover',
      mediaType: 'movie',
      genreId: 18,
    },
  ];

  const homepageContent = await Promise.all(
    homepageParams.map(async params => {
      if (params.mediaType === 'movie') {
        const { results } = await fetchTMDB(MovieResponse, { ...params });
        return { ...params, results };
      }

      if (params.mediaType === 'tv') {
        const { results } = await fetchTMDB(TvResponse, { ...params });
        return { ...params, results };
      }

      return undefined;
    })
  );

  const filteredContent = homepageContent.filter(
    (content): content is NonNullable<typeof content> => content !== undefined
  );

  return (
    <div>
      <EpicStage />

      {filteredContent.map(content => (
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
