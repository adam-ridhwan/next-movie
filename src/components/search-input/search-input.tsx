import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';
import { SearchIcon } from '@/components/icons';

const SearchInput = () => {
  const searchParams = useSearchParams();

  const {
    state: { isExpanding, isSearchInputFocused, searchInputRef },
    actions: { handlesFocus, handleSearch, handleClear },
  } = useSearch();

  return (
    <div
      className={cn('absolute right-0 flex flex-row items-center border border-transparent bg-black', {
        'border-primary/80': isSearchInputFocused,
      })}
    >
      <button
        type='button'
        disabled={isExpanding}
        onClick={() => handlesFocus()}
        className='grid size-8 place-items-center'
      >
        <SearchIcon />
      </button>

      <label htmlFor='search-input' className='sr-only'>
        Search input
      </label>

      <div
        className={cn(
          'flex flex-row overflow-hidden',
          { 'w-0': !isSearchInputFocused },
          { 'w-52 px-2 transition-all duration-300': isSearchInputFocused }
        )}
      >
        <input
          id='search-input'
          ref={searchInputRef}
          disabled={isExpanding}
          type='text'
          defaultValue={searchParams.get('q')?.toString()}
          onChange={e => handleSearch(e.target.value)}
          placeholder='Movies, TV shows, genres'
          className={cn('h-8 bg-black pr-2 text-sm')}
        />

        <button
          disabled={isExpanding}
          onClick={() => handleClear()}
          className={cn('pr-2', { hidden: (searchParams.get('q')?.length ?? 0) < 1 })}
        >
          <X className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
