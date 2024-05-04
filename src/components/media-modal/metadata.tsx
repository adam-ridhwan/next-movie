import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/types/global-types';
import {
  CreditsResponse,
  DetailsMovieResponse,
  DetailsTvResponse,
  KeywordsMovieResponse,
  KeywordsTvResponse,
} from '@/types/tmdb-types';
import { capitalize, isMovie } from '@/lib/utils';

export async function Actors({ mediaType, id }: ContentRouteParams) {
  const credits = await fetchTMDB({ mediaType, id, category: 'credits' });

  const { success, data, error } = CreditsResponse.safeParse(credits);
  if (!success)
    throw new Error(`Actors() Invalid credits schema: ${error.message}`);
  if (data.cast.length === 0) return null;

  const actors = data.cast
    .filter(({ known_for_department }) => known_for_department === 'Acting')
    .slice(0, 3)
    .map(({ name }) => name ?? '');
  if (!actors.length) return null;

  return <Metadata label='Actors' metadata={actors} />;
}

export async function Genres({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ mediaType, id, category: 'details' });
  const schema =
    mediaType === 'movie' ? DetailsMovieResponse : DetailsTvResponse;

  const { success, data, error } = schema.safeParse(details);
  if (!success)
    throw new Error(`Genres() Invalid ${mediaType} schema: ${error.message}`);
  if (!data.genres) return null;

  const genres = data.genres.map(({ name }) => name).slice(0, 3);
  if (!genres.length) return null;

  return <Metadata label='Genres' metadata={genres} />;
}

export async function Keywords({ mediaType, id }: ContentRouteParams) {
  const keywords = await fetchTMDB({ mediaType, id, category: 'keywords' });
  const schema =
    mediaType === 'movie' ? KeywordsMovieResponse : KeywordsTvResponse;

  const { success, data, error } = schema.safeParse(keywords);
  if (!success)
    throw new Error(`Keywords() Invalid keywords schema: ${error.message}`);

  const parsedKeywords = isMovie<KeywordsMovieResponse, KeywordsTvResponse>(
    data,
    mediaType
  )
    ? data.keywords
    : data.results;
  if (!parsedKeywords.length) return null;

  const firstThreeKeywords = parsedKeywords.map(({ name }) => name).slice(0, 3);

  return <Metadata label='Keywords' metadata={firstThreeKeywords} />;
}

export function Metadata({
  label,
  metadata,
}: {
  label: string;
  metadata: Array<string>;
}) {
  if (!metadata.length) return null;

  return (
    <div className='flex flex-wrap items-start gap-x-2'>
      <span className='font-light text-primary/40'>{label}:</span>

      {metadata.map((data: string, index: number) => (
        <span key={data} className='whitespace-nowrap font-light'>
          {capitalize(data)}
          {index < metadata.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  );
}
