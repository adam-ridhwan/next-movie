import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import { FetchTMDBParams, MovieTvSchema, Section } from '@/lib/types';
import EpicStage from '@/components/epic-stage';
import Slider from '@/components/slider/slider';

export default async function BrowseLayout({ children }: { children: ReactNode }) {
  const content: Array<FetchTMDBParams & { section: Section }> = [
    { label: 'Trending: Movies', category: 'trending', mediaType: 'movie', section: 'movie' },
    { label: 'Trending: TV Shows', category: 'trending', mediaType: 'tv', section: 'tv' },
    { label: 'Action Movies', category: 'discover', mediaType: 'movie', section: 'movie', genreId: 28 },
    { label: 'Drama Movies', category: 'discover', mediaType: 'movie', section: 'tv', genreId: 18 },
  ];

  const contentPromises = content.map(async content => {
    const unknownResult = await fetchTMDB({ ...content });
    const parsedMovieTv = MovieTvSchema.safeParse(unknownResult);
    if (!parsedMovieTv.success) throw new Error('Error');
    return { ...content, results: parsedMovieTv.data.results };
  });

  const fetchedContent = await Promise.all(contentPromises);

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
          <DomContextProvider>
            <Slider headerTitle={content.label || ''} />
          </DomContextProvider>
        </SliderProvider>
      ))}

      {children}
    </>
  );
}
