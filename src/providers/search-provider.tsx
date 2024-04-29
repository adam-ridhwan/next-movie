'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BrowseRoute } from '@/routes';

import { useEffectOnce } from '@/hooks/use-effect-once';

type SearchContextType = {
  isExpanding: boolean;
  setIsExpanding: Dispatch<SetStateAction<boolean>>;
  isSearchFocused: boolean;
  setIsSearchFocused: Dispatch<SetStateAction<boolean>>;
  searchInputRef: RefObject<HTMLInputElement>;
  handlesFocus: () => void;
  handleSearch: (query: string) => void;
  handleClear: () => void;
  handleLinkNavigation: () => void;
} | null;

export const SearchContext = createContext<SearchContextType>(null);

// TODO: Implement custom hooks for the functions
export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isExpanding, setIsExpanding] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <SearchContext.Provider
      value={{
        isExpanding,
        setIsExpanding,
        isSearchFocused,
        setIsSearchFocused,
        searchInputRef,
        handlesFocus,
        handleSearch,
        handleClear,
        handleLinkNavigation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchContext must be used within a RefContextProvider');
  return context;
};
