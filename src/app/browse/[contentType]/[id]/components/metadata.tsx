import { fetchCredits } from '@/actions/fetch-credits';
import { fetchDetails } from '@/actions/fetch-details';
import { fetchKeywords } from '@/actions/fetch-keywords';

import { ContentRouteParams, TODO } from '@/lib/types';
import { capitalize } from '@/lib/utils';

export async function Actors({ id, contentType }: ContentRouteParams) {
  const credits: TODO = await fetchCredits(id, contentType);
  if (!credits.cast) return null;
  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstThreeActors = actors.slice(0, 3).map((actor: TODO) => actor.name);
  return <Metadata label='Actors' metadata={firstThreeActors} />;
}

export async function Genres({ id, contentType }: ContentRouteParams) {
  const details: TODO = await fetchDetails(id, contentType);
  if (!details.genres) return null;
  const genres = details.genres.map(({ name }: TODO) => name).slice(0, 3);
  return <Metadata label='Genres' metadata={genres} />;
}

export async function Keywords({ id, contentType }: ContentRouteParams) {
  const keywords: TODO = await fetchKeywords(id, contentType);
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
