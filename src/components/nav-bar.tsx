'use client';

import { usePathname } from 'next/navigation';
import { BrowseRoute } from '@/routes';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';
import Search from '@/components/search/search';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className='flex h-16 flex-row items-center justify-between bg-black px-leftRightCustom'>
      <div className='relative flex w-full flex-row items-center gap-8'>
        <LogoIcon />
        <nav>
          <BrowseRoute.Link>
            <BodySmall
              className={cn('transition-colors hover:text-primary/50', {
                'text-primary': pathname === BrowseRoute(),
                'text-primary/70': pathname !== BrowseRoute(),
              })}
            >
              Browse
            </BodySmall>
          </BrowseRoute.Link>
        </nav>

        <Search />
      </div>
    </div>
  );
};

export default NavBar;
