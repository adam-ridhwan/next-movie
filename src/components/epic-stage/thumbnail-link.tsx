'use client';

import { ReactNode } from 'react';
import { MediaRoute } from '@/routes';

import { TODO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';

type ThumbnailLinkProps = {
  children: ReactNode;
  content: TODO;
};

// TODO: Implement carousel
const ThumbnailLink = ({ children, content }: ThumbnailLinkProps) => {
  const { state: { isSearchInputFocused } } = useSearch(); // prettier-ignore

  return (
    <MediaRoute.Link
      id={content.id.toString()}
      mediaType='movie'
      scroll={false}
      className={cn({ 'pointer-events-none': isSearchInputFocused })}
    >
      {children}
    </MediaRoute.Link>
  );
};

export default ThumbnailLink;
