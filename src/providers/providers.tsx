'use client';

import { ReactNode, Suspense } from 'react';
import { HomepageProvider } from '@/providers/homepage/homepage-provider';
import { NavigationProvider } from '@/providers/navigation/navigation-provider';
import { SearchProvider } from '@/providers/search/search-provider';

import { TODO } from '@/types/global-types';

type ProvidersProps = {
  children: ReactNode;
  homepageContent: TODO;
  epicStageContent: TODO;
};

const Providers = ({ children, homepageContent, epicStageContent }: ProvidersProps) => (
  <HomepageProvider homepageContent={homepageContent} epicStageContent={epicStageContent}>
    <NavigationProvider>
      <Suspense>
        <SearchProvider>{children}</SearchProvider>
      </Suspense>
    </NavigationProvider>
  </HomepageProvider>
);

export default Providers;
