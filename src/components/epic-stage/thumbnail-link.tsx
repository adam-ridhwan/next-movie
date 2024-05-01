'use client';

import { ReactNode } from 'react';
import { useSearchStore } from '@/providers/search/search-provider';
import { MediaRoute } from '@/routes';

import { cn } from '@/lib/utils';

type ThumbnailLinkProps = {
  children: ReactNode;
  id: number;
};

// TODO: Implement carousel
const ThumbnailLink = ({ children, id }: ThumbnailLinkProps) => {
  const { state: { isSearchInputFocused } } = useSearchStore(); // prettier-ignore

  return (
    <MediaRoute.Link
      id={id.toString()}
      mediaType='movie'
      scroll={false}
      className={cn({ 'pointer-events-none': isSearchInputFocused })}
    >
      {children}
    </MediaRoute.Link>
  );
};

export default ThumbnailLink;
