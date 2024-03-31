import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarIcon } from '@/components/icons';

import SignOutButton from './auth/sign-out-button';

const AvatarDropdown = () => {
  const { data: session, status } = useSession();

  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        open={isAvatarDropdownOpen}
        onOpenChange={setIsAvatarDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger>
          <AvatarIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {session ? (
            <>
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <Button asChild>
                  <Link href={'/sign-in'} className='w-full border-2 border-white p-10'>
                    Sign in
                  </Link>
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default AvatarDropdown;
