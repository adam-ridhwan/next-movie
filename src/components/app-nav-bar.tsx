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
      <div className={cn('flex flex-row items-center justify-between bg-darkerBlue px-6 py-2 ')}>
        <AppIcons.logo />
        <nav>
          <ul className={cn('flex flex-row gap-4', 'lg:gap-10')}>
            {Object.entries(ROUTES).map(([key, { path, Icon }]) => (
              <Link
                key={key}
                href={path}
                className='group rounded-lg p-2 hover:bg-darkBlue/30 lg:p-5'
              >
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
