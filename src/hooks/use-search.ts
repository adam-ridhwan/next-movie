'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchContext } from '@/providers/search-provider';
import { BrowseRoute } from '@/routes';

import { useEffectOnce } from '@/hooks/use-effect-once';

type UseSearchReturn = {
  handlesFocus: () => void;
  handleSearch: (query: string) => void;
  handleClear: () => void;
  handleLinkNavigation: () => void;
};

export const useSearch = (): UseSearchReturn => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isSearchFocused, setIsSearchFocused, isExpanding, setIsExpanding, searchInputRef } =
    useSearchContext();

  useEffectOnce(() => {
    if (!searchInputRef.current) return;
    if (searchParams.get('q')) setIsSearchFocused(true);
  });

  useEffect(() => {
    if (!searchInputRef.current) return;
    if (pathname === BrowseRoute() && isSearchFocused) searchInputRef.current.focus();
  }, [pathname, isSearchFocused, searchInputRef]);

  const handlesFocus = () => {
    if (!searchInputRef.current) return;

    setIsExpanding(true);

    if (isSearchFocused) {
      searchInputRef.current.blur();
      searchInputRef.current.value = '';
      setIsSearchFocused(false);
    } else {
      searchInputRef.current.focus();
      setIsSearchFocused(true);
    }

    setIsExpanding(false);
  };

  const handleSearch = (query: string) => {
    if (query.length === 0) return replace(BrowseRoute());

    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    replace(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    if (searchInputRef.current) searchInputRef.current.value = '';
    replace(BrowseRoute());
  };

  const handleLinkNavigation = () => {
    handleClear();
    setIsSearchFocused(false);
  };
  return {
    handlesFocus,
    handleSearch,
    handleClear,
    handleLinkNavigation,
  };
};
