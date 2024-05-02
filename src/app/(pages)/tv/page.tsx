import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams } from '@/types/global';
import { TvListSchema } from '@/types/tmdb';
import Slider from '@/components/slider/slider';

const Tv = async () => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string }> = [
    { label: 'Action TV', category: 'discover', mediaType: 'tv', genreId: 10759, page: 2 },
    { label: 'Sci-Fi TV', category: 'discover', mediaType: 'tv', genreId: 10765, page: 3 },
    { label: 'Trending: TV', category: 'trending', mediaType: 'tv' },
    { label: 'Popular: TV', category: 'popular', mediaType: 'tv' },
  ];

  const content = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const { success, data, error } = TvListSchema.safeParse(media);
      if (!success) throw new Error(`BrowseLayout() Invalid Tv schema : ${error.message}`);

      return {
        ...params,
        results: data.results,
      };
    })
  );

  return (
    <div className='pt-16'>
      {content.map(content =>
        // prettier-ignore
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType="tv"
          section="tv"
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      )}
    </div>
  );
};

export default Tv;
