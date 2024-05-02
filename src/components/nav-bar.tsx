'use client';

import { useSearchStore } from '@/providers/search/search-provider';
import { Home, Movies, Tv } from '@/routes';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';
import SearchInput from '@/components/search/search-input';

const tabs = [
  { label: 'Home', route: Home(), Link: Home.Link },
  { label: 'Movies', route: Movies(), Link: Movies.Link },
  { label: 'TV Shows', route: Tv(), Link: Tv.Link },
];

const NavBar = () => {
  const {
    state: { lastActiveRoute },
    actions: { handleNavigate },
  } = useSearchStore();

  const isActiveRoute = (route: string) => route === lastActiveRoute;

  return (
    <div className='fixed top-0 z-50 flex h-16 w-full items-center bg-black'>
      <div className='container flex flex-row items-center justify-between px-leftRightCustom'>
        <div className='relative flex w-full flex-row items-center gap-8'>
          <LogoIcon />

          <nav className='flex select-none flex-row gap-4'>
            {tabs.map(({ label, route, Link }) => (
              <Link
                key={label}
                onClick={handleNavigate}
                className={cn({ 'pointer-events-none': isActiveRoute(route) })}
              >
                <BodySmall
                  className={cn('transition-colors duration-300 hover:text-primary/50', {
                    'text-primary': isActiveRoute(route),
                    'text-primary/70': !isActiveRoute(route),
                  })}
                >
                  {label}
                </BodySmall>
              </Link>
            ))}
          </nav>

          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
