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
  isSearchFocused: boolean;
  setIsSearchFocused: Dispatch<SetStateAction<boolean>>;
  searchInputRef: RefObject<HTMLInputElement>;
} | null;

export const SearchContext = createContext<SearchContextType>(null);

// TODO: Implement custom hooks for the functions
export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <SearchContext.Provider
      value={{
        isExpanding,
        setIsExpanding,
        isSearchFocused,
        setIsSearchFocused,
        searchInputRef,
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
