'use client';

import { createContext, ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BrowseRoute } from '@/routes';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';

import { useEffectOnce } from '@/hooks/use-effect-once';

type SearchContextProps = {
  state: {
    isSearchInputExpanding: boolean;
    isSearchInputFocused: boolean;
  };
  actions: {
    handleFocus: () => void;
    handleSearch: (query: string) => void;
    handleClear: () => void;
    handleNavigate: () => void;
  };
  refs: {
    searchContainerRef: RefObject<HTMLDivElement>;
    searchInputRef: RefObject<HTMLInputElement>;
  };
} | null;

type SearchProviderProps = { children: ReactNode };

const SearchContext = createContext<SearchContextProps>(null);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    value: isSearchInputExpanding,
    setTrue: expandSearchInput,
    setFalse: collapseSearchInput,
  } = useBoolean(false);

  const {
    value: isSearchInputFocused,
    setTrue: focusSearchInput,
    setFalse: blurSearchInput,
  } = useBoolean(false);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffectOnce(() => {
    if (!searchInputRef.current) return;
    if (searchParams.get('q')) focusSearchInput();
  });

  useEffect(() => {
    if (!searchInputRef.current) return;
    if (pathname === BrowseRoute() && isSearchInputFocused) searchInputRef.current.focus();
  }, [pathname, isSearchInputFocused, searchInputRef]);

  useOnClickOutside(searchContainerRef, () => {
    if (searchParams.get('q')) return;
    blurSearchInput();
    collapseSearchInput();
  });

  const handleFocusSearchInput = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.focus();
    focusSearchInput();
  };
  const handleBlurSearchInput = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.blur();
    searchInputRef.current.value = '';
    blurSearchInput();
  };

  const handleFocus = () => {
    expandSearchInput();
    if (isSearchInputFocused) handleBlurSearchInput();
    else handleFocusSearchInput();
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

  const handleNavigate = () => {
    handleClear();
    blurSearchInput();
  };

  return (
    <SearchContext.Provider
      value={{
        state: {
          isSearchInputExpanding,
          isSearchInputFocused,
        },
        actions: {
          handleFocus,
          handleSearch,
          handleClear,
          handleNavigate,
        },
        refs: {
          searchContainerRef,
          searchInputRef,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchStore = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchStore must be used within a SearchProvider');
  return context;
};
