import { NextRequest, NextResponse } from 'next/server';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { SearchResultsSchema } from '@/types/tmdb-types';
import { QUERY } from '@/lib/constants';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParam = request.nextUrl.searchParams.get(QUERY);
  if (!searchParam) {
    return NextResponse.json({ 'Bad request': 'No search query provided' }, { status: 400 });
  }

  const movieAndTv = await Promise.all([
    fetchTMDB({ category: 'search', q: searchParam.toString(), mediaType: 'movie' }),
    fetchTMDB({ category: 'search', q: searchParam.toString(), mediaType: 'tv' }),
  ]);

  const results = {
    movieData: movieAndTv[0],
    tvData: movieAndTv[1],
  };

  const { success, data, error } = SearchResultsSchema.safeParse(results);
  if (!success) {
    return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
