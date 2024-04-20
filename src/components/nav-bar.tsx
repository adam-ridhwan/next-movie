'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon, NavHomeIcon, NavMoviesIcon, NavTvSeriesIcon } from '@/components/icons';

const ROUTES = {
  home: { path: '/', Icon: NavHomeIcon, label: 'Home' },
  movies: { path: '/movies', Icon: NavMoviesIcon, label: 'TV Shows' },
  tvSeries: { path: '/tv-series', Icon: NavTvSeriesIcon, label: 'Movies' },
} as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className='flex h-16 flex-row items-center justify-between bg-black px-leftRightCustom'>
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
    </div>
  );
};

export default NavBar;
