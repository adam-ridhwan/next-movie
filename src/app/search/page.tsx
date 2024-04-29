import { Suspense } from 'react';

import SearchResult from '@/components/search-input/search-result';

export default async function SearchPage() {
  return (
    <Suspense>
      <SearchResult />;
    </Suspense>
  );
}
