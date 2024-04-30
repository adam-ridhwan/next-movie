import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, TODO } from '@/types/global';
import { capitalize } from '@/lib/utils';

export async function Actors({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ category: 'credits', mediaType, id });
  if (!credits) return null;
  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstThreeActors = actors.slice(0, 3).map((actor: TODO) => actor.name);
  return <Metadata label='Actors' metadata={firstThreeActors} />;
}

export async function Genres({ id, mediaType }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });
  if (!details) return null;
  const genres = details.genres.map(({ name }: TODO) => name).slice(0, 3);
  if (genres !== undefined) return null;
  return <Metadata label='Genres' metadata={genres} />;
}

export async function Keywords({ id, mediaType }: ContentRouteParams) {
  const keywords = await fetchTMDB({ category: 'keywords', mediaType, id });
  if (!keywords) return null;
  const keywordList = keywords.keywords || keywords.results;
  const firstThreeKeywords = keywordList.map(({ name }: TODO) => name).slice(0, 3);
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
