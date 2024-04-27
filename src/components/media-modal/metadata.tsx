import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, TODO } from '@/lib/types';
import { capitalize } from '@/lib/utils';

export async function Actors({ id, mediaType }: ContentRouteParams) {
  const credits: TODO = await fetchTMDB({ category: 'credits', mediaType, id });
  if (!credits.cast) return null;
  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstThreeActors = actors.slice(0, 3).map((actor: TODO) => actor.name);
  return <Metadata label='Actors' metadata={firstThreeActors} />;
}

export async function Genres({ id, mediaType }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });
  if (!details.genres) return null;
  const genres = details.genres.map(({ name }: TODO) => name).slice(0, 3);
  return <Metadata label='Genres' metadata={genres} />;
}

export async function Keywords({ id, mediaType }: ContentRouteParams) {
  const keywords = await fetchTMDB({ category: 'keywords', mediaType, id });
  const parsedKeyword = keywords.keywords || keywords.results;
  const firstThreeKeywords = parsedKeyword.map(({ name }: TODO) => name).slice(0, 3);
  return <Metadata label='Keywords' metadata={firstThreeKeywords} />;
}

export function Metadata({ label, metadata }: { label: string; metadata: string[] }) {
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
