'use client';

import { ReactNode, Suspense } from 'react';
import { SearchProvider } from '@/providers/search/search-provider';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    // prettier-ignore
    <HydrationOverlay>
      <Suspense>
        <SearchProvider>
          {children}
        </SearchProvider>
      </Suspense>
    </HydrationOverlay>
  );
};

export default Providers;
