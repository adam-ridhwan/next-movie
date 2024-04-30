'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

type SearchContextType = {
  isExpanding: boolean;
  setIsExpanding: Dispatch<SetStateAction<boolean>>;
  isSearchInputFocused: boolean;
  setIsSearchInputFocused: Dispatch<SetStateAction<boolean>>;
  searchInputRef: RefObject<HTMLInputElement>;
  searchContainerRef: RefObject<HTMLDivElement>;
} | null;

export const SearchContext = createContext<SearchContextType>(null);

// TODO: Implement custom hooks for the functions
export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <SearchContext.Provider
      value={{
        isExpanding,
        setIsExpanding,
        isSearchInputFocused,
        setIsSearchInputFocused,
        searchInputRef,
        searchContainerRef,
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
