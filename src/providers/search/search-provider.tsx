'use client';

import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Home, Search } from '@/routes';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';

import { q } from '@/lib/constants';
import { useEffectOnce } from '@/hooks/use-effect-once';

type SearchContextProps = {
  state: {
    isSearchInputExpanded: boolean;
    isSearchInputFocused: boolean;
    lastActiveRoute: string;
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

  const [lastActiveRoute, setLastActiveRoute] = useState(Home());

  const {
    value: isSearchInputExpanded,
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
    if (searchParams.get(q)) focusSearchInput();
  });

  useEffect(() => {
    if (pathname === Search()) return;
    if (isSearchInputFocused && searchInputRef.current)
      searchInputRef.current.focus();
    setLastActiveRoute(pathname);
  }, [isSearchInputFocused, pathname]);

  useOnClickOutside(searchContainerRef, () => {
    if (searchParams.get(q)) return;
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
    if (query.length === 0) return replace(lastActiveRoute);

    const params = new URLSearchParams(searchParams);
    if (query) params.set(q, query);
    else params.delete(q);
    replace(Search(undefined, { q: query }));
  };

  const handleClear = () => {
    if (searchInputRef.current) searchInputRef.current.value = '';
    replace(lastActiveRoute);
  };

  const handleNavigate = () => {
    handleClear();
    blurSearchInput();
  };

  return (
    <SearchContext.Provider
      value={{
        state: {
          isSearchInputExpanded,
          isSearchInputFocused,
          lastActiveRoute,
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
  if (!context) {
    throw new Error('useSearchStore must be used within a SearchProvider');
  }
  return context;
};
