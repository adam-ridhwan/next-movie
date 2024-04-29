import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/components/icons';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusSearch = () => {
    if (!inputRef.current) return;

    setIsAnimating(true);

    if (isSearchFocused) {
      inputRef.current.blur();
      setIsSearchFocused(false);
      setSearchText('');
    } else {
      inputRef.current.focus();
      setIsSearchFocused(true);
    }

    setIsAnimating(false);
  };

  return (
    <div
      className={cn('absolute right-0 flex flex-row items-center border border-transparent bg-black', {
        'border-primary/80': isSearchFocused,
      })}
    >
      <button disabled={isAnimating} onClick={() => focusSearch()} className='grid size-8 place-items-center'>
        <SearchIcon />
      </button>

      <label htmlFor='search-input' className='sr-only'>
        Search input
      </label>

      <input
        id='search-input'
        ref={inputRef}
        disabled={isAnimating}
        type='text'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder='Movies, TV shows, genres'
        className={cn(
          'h-8 bg-black text-sm',
          { 'w-0': !isSearchFocused },
          { 'w-52 px-2 transition-all duration-300': isSearchFocused }
        )}
      />
    </div>
  );
};

export default Search;
