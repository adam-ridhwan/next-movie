import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import {
  CreditsResponse,
  DetailsMovieResponse,
  DetailsTvResponse,
  KeywordsMovieResponse,
  KeywordsTvResponse,
} from '@/types/tmdb-types';
import { capitalize, extractYear, isMovie, isMovieDetails } from '@/lib/utils';

export async function Actors({ mediaType, id }: ContentRouteParams) {
  try {
    const { cast } = await fetchTMDB(CreditsResponse, {
      mediaType,
      id,
      category: 'credits',
    });

    const actors = cast
      .filter(({ known_for_department }) => known_for_department === 'Acting')
      .slice(0, 3)
      .map(({ name }) => name ?? '');
    if (!actors.length) return null;

    return <Metadata label='Actors' metadata={actors} />;
  } catch (err) {
    redirect(ErrorPage());
  }
}

export async function Genres({ mediaType, id }: ContentRouteParams) {
  try {
    let details: DetailsMovieResponse | DetailsTvResponse | null = null;

    if (mediaType === 'movie') {
      details = await fetchTMDB(DetailsMovieResponse, {
        mediaType: 'movie',
        id,
        category: 'details',
      });
    }

    if (mediaType === 'tv') {
      details = await fetchTMDB(DetailsTvResponse, {
        mediaType: 'tv',
        id,
        category: 'details',
      });
    }

    if (!details) throw new Error('No details found');
    if (!details.genres) return null;

    const genres = details.genres.map(({ name }) => name).slice(0, 3);
    if (!genres.length) return null;

    return <Metadata label='Genres' metadata={genres} />;
  } catch (err) {
    redirect(ErrorPage());
  }
}

export async function Keywords({ mediaType, id }: ContentRouteParams) {
  try {
    let keywordsResponse: KeywordsMovieResponse | KeywordsTvResponse | null =
      null;

    if (mediaType === 'movie') {
      keywordsResponse = await fetchTMDB(KeywordsMovieResponse, {
        mediaType: 'movie',
        id,
        category: 'keywords',
      });
    }

    if (mediaType === 'tv') {
      keywordsResponse = await fetchTMDB(KeywordsTvResponse, {
        mediaType: 'tv',
        id,
        category: 'keywords',
      });
    }

    if (!keywordsResponse) throw new Error('No keywords found');

    const parsedKeywords = isMovie<KeywordsMovieResponse, KeywordsTvResponse>(
      keywordsResponse,
      mediaType
    )
      ? keywordsResponse.keywords
      : keywordsResponse.results;
    if (!parsedKeywords.length) return null;

    const firstThreeKeywords = parsedKeywords
      .map(({ name }) => name)
      .slice(0, 3);

    return <Metadata label='Keywords' metadata={firstThreeKeywords} />;
  } catch (err) {
    redirect(ErrorPage());
  }
}

export async function ReleaseDate({ mediaType, id }: ContentRouteParams) {
  try {
    let details: DetailsMovieResponse | DetailsTvResponse | null = null;

    if (mediaType === 'movie') {
      details = await fetchTMDB(DetailsMovieResponse, {
        mediaType: 'movie',
        id,
        category: 'details',
      });
    }

    if (mediaType === 'tv') {
      details = await fetchTMDB(DetailsTvResponse, {
        mediaType: 'tv',
        id,
        category: 'details',
      });
    }

    if (!details) throw new Error('No details found');
    if (!details.genres) return null;

    const releaseDate = isMovieDetails(details)
      ? details.release_date
      : details.first_air_date;
    if (!releaseDate) return null;

    return <Metadata label='Released' metadata={[extractYear(releaseDate)]} />;
  } catch (err) {
    redirect(ErrorPage());
  }
}

type MetadataProps = {
  label: string;
  metadata: Array<string>;
};

export function Metadata({ label, metadata }: MetadataProps) {
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
