'use client';

import { useEffect } from 'react';
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import { useSearchStore } from '@/providers/search/search-provider';
import { Home, Movies, Tv } from '@/routes';

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

  // const segment = useSelectedLayoutSegments();
  // const modalSegment = useSelectedLayoutSegment('modal');
  //
  // useEffect(() => {
  //   console.log({ segment: segment.toString(), modalSegment });
  // }, [modalSegment, segment]);

  return (
    <div className='fixed top-0 z-50 flex h-16 w-full items-center bg-black'>
      <div className='container flex flex-row items-center justify-between px-leftRightCustom'>
        <div className='relative flex w-full flex-row items-center gap-8'>
          <LogoIcon />

          <nav className='flex select-none flex-row gap-4'>
            <Home.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none ': isActiveRoute(Home()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(Home()),
                  'text-primary/70': !isActiveRoute(Home()),
                })}
              >
                Home
              </BodySmall>
            </Home.Link>

            <Movies.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none select-none': isActiveRoute(Movies()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(Movies()),
                  'text-primary/70': !isActiveRoute(Movies()),
                })}
              >
                Movies
              </BodySmall>
            </Movies.Link>

            <Tv.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none select-none': isActiveRoute(Tv()) })}
            >
              <BodySmall
                className={cn('transition-colors duration-300 hover:text-primary/50', {
                  'text-primary': isActiveRoute(Tv()),
                  'text-primary/70': !isActiveRoute(Tv()),
                })}
              >
                TV Shows
              </BodySmall>
            </Tv.Link>
          </nav>

          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
