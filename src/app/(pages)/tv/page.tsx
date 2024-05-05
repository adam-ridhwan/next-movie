import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams, TV_GENRES } from '@/types/global-types';
import { TvResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

const TvPage = async () => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string }> = [
    {
      label: 'Action TV',
      category: 'discover',
      mediaType: 'tv',
      genreId: 10759,
      page: 2,
    },
    {
      label: 'Sci-Fi TV',
      category: 'discover',
      mediaType: 'tv',
      genreId: 10765,
      page: 3,
    },
    {
      label: 'Trending: TV',
      category: 'trending',
      mediaType: 'tv',
    },
    {
      label: 'Popular: TV',
      category: 'popular',
      mediaType: 'tv',
    },
  ];

  const content = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const { success, data, error } = TvResponse.safeParse(media);
      if (!success)
        throw new Error(`TvPage() Invalid Tv schema : ${error.message}`);

      return {
        ...params,
        results: data.results,
      };
    })
  );

  const genresArray = Object.entries(TV_GENRES).map(([key, value]) => {
    return { id: key, slug: value, mediaType: 'tv' };
  });

  return (
    <div className='pt-16'>
      <SliderProvider
        key='Genres'
        content={genresArray}
        mediaType='tv'
        section='genre'
      >
        <Slider headerTitle='Genres' />
      </SliderProvider>

      {content.map(content => (
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType='tv'
          section='tv'
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      ))}
    </div>
  );
};

export default TvPage;
