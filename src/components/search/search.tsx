import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BrowseRoute, SearchRoute } from '@/routes';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/components/icons';

const Search = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [_, setSearchText] = useState('');
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

  const handleSearch = (query: string) => {
    if (query.length === 0) return replace(BrowseRoute());

    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    replace(SearchRoute({ query }));
  };

  /* ──────────────────────────────────────────────────────────────
   * FIXME: Focus the search input when the user clears the search query
   *  (aka, when the user navigates to the browse page)
   * ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!inputRef.current) return;
    if (pathname === BrowseRoute() && isSearchFocused) inputRef.current.focus();
  }, [pathname, isSearchFocused]);

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
        defaultValue={searchParams.get('q')?.toString()}
        onChange={e => handleSearch(e.target.value)}
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
