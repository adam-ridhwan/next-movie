import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, CreditsSchema, DetailsSchema, KeywordsSchema } from '@/lib/types';
import { capitalize } from '@/lib/utils';

export async function Actors({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ category: 'credits', mediaType, id });
  const parsedCredits = CreditsSchema.safeParse(credits);
  if (!parsedCredits.success) return null;
  const actors = parsedCredits.data.cast.filter(
    ({ known_for_department }) => known_for_department === 'Acting'
  );
  const firstThreeActors = actors.slice(0, 3).map(actor => actor.name);
  if (firstThreeActors !== undefined) return null;
  return <Metadata label='Actors' metadata={firstThreeActors} />;
}

export async function Genres({ id, mediaType }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });
  const parseDetails = DetailsSchema.safeParse(details);
  if (!parseDetails.success || !parseDetails.data.genres) return null;
  const genres = parseDetails.data.genres.map(({ name }) => name).slice(0, 3);
  if (genres !== undefined) return null;
  return <Metadata label='Genres' metadata={genres} />;
}

export async function Keywords({ id, mediaType }: ContentRouteParams) {
  const keywords = await fetchTMDB({ category: 'keywords', mediaType, id });
  const parsedKeywords = KeywordsSchema.safeParse(keywords);
  if (!parsedKeywords.success) return null;
  const keywordData = parsedKeywords.data;
  const keywordList = keywordData.keywords || keywordData.results;
  if (!keywordList || keywordList.length === 0) return null;
  const firstThreeKeywords = keywordList.map(({ name }) => name).slice(0, 3);
  return <Metadata label='Keywords' metadata={firstThreeKeywords} />;
}

export function Metadata({ label, metadata }: { label: string; metadata: Array<string> }) {
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
