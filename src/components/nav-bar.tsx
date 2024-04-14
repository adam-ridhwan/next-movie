'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon, NavBookmarkIcon, NavHomeIcon, NavMoviesIcon, NavTvSeriesIcon } from '@/components/icons';

import AvatarDropdown from './avatar-dropdown';

const ROUTES = {
  home: { path: '/', Icon: NavHomeIcon, label: 'Home' },
  movies: { path: '/movies', Icon: NavMoviesIcon, label: 'TV Shows' },
  tvSeries: { path: '/tv-series', Icon: NavTvSeriesIcon, label: 'Movies' },
  bookmarks: { path: '/my-list', Icon: NavBookmarkIcon, label: 'My List' },
} as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className='px-leftRightCustom flex h-16 flex-row items-center justify-between bg-darkerBlue/50'>
      <div className='flex flex-row items-center  gap-8'>
        <LogoIcon />
        <nav>
          <ul className={cn('flex flex-row gap-4')}>
            {Object.entries(ROUTES).map(([key, { path, label }]) => (
              <Link key={key} href={path} className={cn({ 'pointer-events-none': pathname === path })}>
                <BodySmall
                  className={cn('transition-colors hover:text-primary/50', {
                    'text-primary': pathname === path,
                    'text-primary/70': pathname !== path,
                  })}
                >
                  {label}
                </BodySmall>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <AvatarDropdown />
    </div>
  );
};

export default NavBar;
