'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';

type Route = {
  PATH: string;
  LABEL: string;
};

export const ROUTES: Record<string, Route> = {
  HOME: { PATH: '/browse', LABEL: 'Home' },
  MOVIES: { PATH: '/movies', LABEL: 'Movies' },
  TV: { PATH: '/tv', LABEL: 'TV Shows' },
} as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className='flex h-16 flex-row items-center justify-between bg-black px-leftRightCustom'>
      <div className='flex flex-row items-center gap-8'>
        <LogoIcon />
        <nav>
          <ul className={cn('flex flex-row gap-4')}>
            {Object.entries(ROUTES).map(([key, { PATH, LABEL }]) => (
              <Link key={key} href={PATH} className={cn({ 'pointer-events-none': pathname === PATH })}>
                <BodySmall
                  className={cn('transition-colors hover:text-primary/50', {
                    'text-primary': pathname === PATH,
                    'text-primary/70': pathname !== PATH,
                  })}
                >
                  {LABEL}
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
