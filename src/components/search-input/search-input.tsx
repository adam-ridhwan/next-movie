import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BrowseRoute } from '@/routes';
import { X } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';
import { useEffectOnce } from '@/hooks/use-effect-once';
import { SearchIcon } from '@/components/icons';

const SearchInput = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffectOnce(() => {
    if (!inputRef.current) return;
    if (searchParams.get('q')) setIsSearchFocused(true);
  });

  useEffect(() => {
    if (!inputRef.current) return;
    if (pathname === BrowseRoute() && isSearchFocused) inputRef.current.focus();
  }, [pathname, isSearchFocused]);

  const focusSearch = () => {
    if (!inputRef.current) return;

    setIsAnimating(true);

    if (isSearchFocused) {
      inputRef.current.blur();
      inputRef.current.value = '';
      setIsSearchFocused(false);
    } else {
      inputRef.current.focus();
      setIsSearchFocused(true);
    }

    setIsAnimating(false);
  };

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`/search?${params.toString()}`);
  }, 1000);

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = '';
    replace(BrowseRoute());
  };

  return (
    <div
      className={cn('absolute right-0 flex flex-row items-center border border-transparent bg-black', {
        'border-primary/80': isSearchFocused,
      })}
    >
      <button
        type='button'
        disabled={isAnimating}
        onClick={() => focusSearch()}
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
          ref={inputRef}
          disabled={isAnimating}
          type='text'
          defaultValue={searchParams.get('q')?.toString()}
          onChange={e => {
            if (pathname === BrowseRoute()) replace(`/search`);
            return handleSearch(e.target.value);
          }}
          placeholder='Movies, TV shows, genres'
          className={cn('h-8 bg-black pr-2 text-sm')}
        />

        <button disabled={isAnimating} onClick={() => handleClear()} className='pr-2'>
          <X className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
