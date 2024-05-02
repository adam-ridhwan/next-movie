'use client';

import { ReactNode } from 'react';
import { useSearchStore } from '@/providers/search/search-provider';

import { cn } from '@/lib/utils';

type ThumbnailLinkProps = {
  children: ReactNode;
  id: number;
};

// TODO: Implement carousel
const ThumbnailLink = ({ children, id }: ThumbnailLinkProps) => {
  const {
    state: { isSearchInputFocused },
  } = useSearchStore();

  const ConditionalWrapper = ({ children }: { children: ReactNode }) => {
    // return isSearchInputFocused ? (
    //   <div>{children}</div>
    // ) : (
    //   <MovieModal.Link
    //     id={id.toString()}
    //     mediaType='movie'
    //     scroll={false}
    //     className={cn({ 'pointer-events-none': isSearchInputFocused })}
    //   >
    //     {children}
    //   </MovieModal.Link>
    // );
  };

  // return <ConditionalWrapper>{children}</ConditionalWrapper>;
};

export default ThumbnailLink;
