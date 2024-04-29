import { usePathname, useSearchParams } from 'next/navigation';
import { useSearchContext } from '@/providers/search-provider';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/components/icons';

const SearchInput = () => {
  const searchParams = useSearchParams();

  const {
    isExpanding,
    isSearchFocused,
    searchInputRef,
    handlesFocus,
    handleSearch,
    handleClear
  } = useSearchContext(); // prettier-ignore

  return (
    <div
      className={cn('absolute right-0 flex flex-row items-center border border-transparent bg-black', {
        'border-primary/80': isSearchFocused,
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
          { 'w-0': !isSearchFocused },
          { 'w-52 px-2 transition-all duration-300': isSearchFocused }
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
