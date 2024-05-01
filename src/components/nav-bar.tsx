'use client';

import { useSearchStore } from '@/providers/search/search-provider';
import { BrowseRoute, MoviesRoute, TvRoute } from '@/routes';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';
import SearchInput from '@/components/search/search-input';

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
            <BrowseRoute.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none ': isActiveRoute(BrowseRoute()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(BrowseRoute()),
                  'text-primary/70': !isActiveRoute(BrowseRoute()),
                })}
              >
                Home
              </BodySmall>
            </BrowseRoute.Link>

            <TvRoute.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none select-none': isActiveRoute(TvRoute()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(TvRoute()),
                  'text-primary/70': !isActiveRoute(TvRoute()),
                })}
              >
                TV Shows
              </BodySmall>
            </TvRoute.Link>

            <MoviesRoute.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none select-none': isActiveRoute(MoviesRoute()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(MoviesRoute()),
                  'text-primary/70': !isActiveRoute(MoviesRoute()),
                })}
              >
                Movies
              </BodySmall>
            </MoviesRoute.Link>
          </nav>

          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
