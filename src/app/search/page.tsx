import { Suspense } from 'react';

import SearchResult from '@/components/search/search-result';

export default async function SearchPage() {
  return (
    <Suspense>
      <SearchResult />
    </Suspense>
  );
}
