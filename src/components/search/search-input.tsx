import { useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/providers/search/search-provider';
import { X } from 'lucide-react';

import { QUERY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SearchIcon } from '@/components/icons';

const SearchInput = () => {
  const searchParams = useSearchParams();

  const {
    state: { isSearchInputExpanding, isSearchInputFocused },
    actions: { handleFocus, handleSearch, handleClear },
    refs: { searchInputRef, searchContainerRef },
  } = useSearchStore();

  return (
    <div
      className={cn('absolute right-0 flex flex-row items-center border border-transparent bg-black', {
        'border-primary/80': isSearchInputFocused,
      })}
    >
      <button
        type='button'
        disabled={isSearchInputExpanding}
        onClick={handleFocus}
        className='grid size-8 place-items-center'
      >
        <SearchIcon />
      </button>

      <label htmlFor='search-input' className='sr-only'>
        Search input
      </label>

      <div
        ref={searchContainerRef}
        className={cn(
          'flex h-8 overflow-hidden',
          { 'w-0': !isSearchInputFocused },
          { 'w-52  transition-all duration-300': isSearchInputFocused }
        )}
      >
        <input
          id='search-input'
          ref={searchInputRef}
          disabled={isSearchInputExpanding}
          type='text'
          defaultValue={searchParams.get(QUERY)?.toString()}
          onChange={e => handleSearch(e.target.value)}
          placeholder='Movies, TV shows, genres'
          className={cn('w-full bg-black text-sm')}
        />

        <button
          disabled={isSearchInputExpanding}
          onClick={handleClear}
          className={cn('flex aspect-square items-center justify-center', {
            hidden: (searchParams.get('q')?.length ?? 0) < 1,
          })}
        >
          <X className='size-4' />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
