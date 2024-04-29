import { NextRequest, NextResponse } from 'next/server';
import { fetchTMDB } from '@/actions/fetch-tmdb';

export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams.get('q');
  if (!searchParam) return NextResponse.json({ 'Bad request': 'No search query provided' }, { status: 400 });

  const data = await fetchTMDB({ category: 'search', q: searchParam.toString(), mediaType: 'movie' });

  return NextResponse.json({ data }, { status: 200 });
}
