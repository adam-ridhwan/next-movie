'use client';

import { ReactNode, Suspense } from 'react';
import { NavigationProvider } from '@/providers/navigation/navigation-provider';
import { SearchProvider } from '@/providers/search/search-provider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NavigationProvider>
      <Suspense>
        <SearchProvider>{children}</SearchProvider>
      </Suspense>
    </NavigationProvider>
  );
};

export default Providers;
