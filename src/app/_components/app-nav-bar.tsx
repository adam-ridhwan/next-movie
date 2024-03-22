'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { AppIcons } from './app-icons';
import AvatarDropdown from './avatar-dropdown';

const ROUTES = {
  home: { path: '/', Icon: AppIcons.navHome },
  movies: { path: '/movies', Icon: AppIcons.navMovies },
  tvSeries: { path: '/tv-series', Icon: AppIcons.navTvSeries },
  bookmarks: { path: '/bookmarks', Icon: AppIcons.navBookmark },
} as const;

const AppNavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-between bg-darkerBlue px-4 py-4',
          'md:m-6 md:rounded-lg',
          'lg:flex-col lg:py-8'
        )}
      >
        <AppIcons.logo />
        <nav className='lg:flex-1'>
          <ul className={cn('flex flex-row', 'lg:flex-col lg:gap-10 lg:pt-20')}>
            {Object.entries(ROUTES).map(([key, { path, Icon }]) => (
              <Link key={key} href={path} className='group rounded-lg p-2 hover:bg-darkBlue/30 lg:p-6'>
                <Icon
                  className={cn({
                    'fill-white': pathname === path,
                    'group-hover:fill-white/70': pathname !== path,
                  })}
                />
              </Link>
            ))}
          </ul>
        </nav>
        <AvatarDropdown />
      </div>
    </>
  );
};

export default AppNavBar;
