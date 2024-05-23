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
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search } from '@/routes';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';

import { useEffectOnce } from '@/hooks/use-effect-once';

type SearchContextProps = {
  state: {
    isSearchInputExpanded: boolean;
    isSearchInputFocused: boolean;
    lastActiveRoute: string;
    query: string;
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

  const [lastActiveRoute, setLastActiveRoute] = useState(Home());

  const [query, setQuery] = useState('');

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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

  useEffectOnce(() => {
    if (!query && pathname === Search()) replace(Home());
  });

  useEffect(() => {
    if (isSearchInputFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (pathname === Search()) return;
    setLastActiveRoute(pathname);
  }, [isSearchInputFocused, pathname]);

  useOnClickOutside(searchContainerRef, () => {
    if (query) return;
    blurSearchInput();
    collapseSearchInput();
  });

  const handleFocusSearchInput = () => {
    if (query) return;
    focusSearchInput();
  };

  const handleBlurSearchInput = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.blur();
    setQuery('');
    blurSearchInput();
  };

  const handleFocus = () => {
    expandSearchInput();
    if (isSearchInputFocused) handleBlurSearchInput();
    else handleFocusSearchInput();
    collapseSearchInput();
  };

  const handleSearch = (inputQuery: string) => {
    setQuery(inputQuery);
    if (inputQuery.length === 0) return replace(lastActiveRoute);
    replace(Search());
  };

  const handleClear = () => {
    setQuery('');
    replace(lastActiveRoute);
  };

  const handleNavigate = () => {
    setQuery('');
    blurSearchInput();
    replace(lastActiveRoute);
  };

  return (
    <SearchContext.Provider
      value={{
        state: {
          isSearchInputExpanded,
          isSearchInputFocused,
          lastActiveRoute,
          query,
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
