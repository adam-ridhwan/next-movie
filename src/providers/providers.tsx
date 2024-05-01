'use client';

import { ReactNode, Suspense } from 'react';
import { SearchProvider } from '@/providers/search/search-provider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    // prettier-ignore
    <Suspense>
      <SearchProvider>
        {children}
      </SearchProvider>
    </Suspense>
  );
};

export default Providers;
