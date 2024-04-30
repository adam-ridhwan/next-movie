'use client';

import { RefObject, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchContext } from '@/providers/search-provider';
import { BrowseRoute } from '@/routes';

import { useEffectOnce } from '@/hooks/use-effect-once';

type UseSearchReturn = {
  state: {
    isExpanding: boolean;
    isSearchInputFocused: boolean;
    searchInputRef: RefObject<HTMLInputElement>;
  };
  actions: {
    handlesFocus: () => void;
    handleSearch: (query: string) => void;
    handleClear: () => void;
    handleLinkNavigation: () => void;
  };
};

export const useSearch = (): UseSearchReturn => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    isSearchInputFocused,
    setIsSearchInputFocused,
    isExpanding,
    setIsExpanding,
    searchInputRef
  } = useSearchContext(); // prettier-ignore

  useEffectOnce(() => {
    if (!searchInputRef.current) return;
    if (searchParams.get('q')) setIsSearchInputFocused(true);
  });

  useEffect(() => {
    if (!searchInputRef.current) return;
    if (pathname === BrowseRoute() && isSearchInputFocused) searchInputRef.current.focus();
  }, [pathname, isSearchInputFocused, searchInputRef]);

  const expandSearchInput = () => setIsExpanding(true);
  const collapseSearchInput = () => setIsExpanding(false);
  const focusSearchInput = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.focus();
    setIsSearchInputFocused(true);
  };
  const blurSearchInput = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.blur();
    searchInputRef.current.value = '';
    setIsSearchInputFocused(false);
  };

  const handlesFocus = () => {
    expandSearchInput();
    if (isSearchInputFocused) blurSearchInput();
    else focusSearchInput();
    collapseSearchInput();
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
    setIsSearchInputFocused(false);
  };

  return {
    state: {
      isExpanding,
      isSearchInputFocused,
      searchInputRef,
    },
    actions: {
      handlesFocus,
      handleSearch,
      handleClear,
      handleLinkNavigation,
    },
  };
};
