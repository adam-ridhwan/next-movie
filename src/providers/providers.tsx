'use client';

import { ReactNode, Suspense } from 'react';
import { SearchContextProvider } from '@/providers/search/search-provider';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <HydrationOverlay>
      <Suspense>
        <SearchContextProvider>
          {children} {/* prettier-ignore */}
        </SearchContextProvider>
      </Suspense>
    </HydrationOverlay>
  );
};

export default Providers;
