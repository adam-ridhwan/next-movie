import { useState } from 'react';
import Link from 'next/link';

import { AppIcons } from './app-icons';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const AvatarDropdown = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isAvatarDropdownOpen} onOpenChange={setIsAvatarDropdownOpen} modal={false}>
        <DropdownMenuTrigger>
          <AppIcons.avatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button asChild onClick={() => setIsAvatarDropdownOpen(false)}>
              <Link href='/sign-in' className='w-full border-2 border-white p-10 text-darkestBlue'>
                Sign in
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {session ? (
          <>
            <SignOutButton />
          </>
        ) : (
          <>
            <Button asChild>
              <Link href='/sign-up' className='border-2 border-white p-10'>
                Sign up
              </Link>
            </Button>
            <Button asChild>
              <Link href='/sign-in' className='border-2 border-white p-10'>
                Sign in
              </Link>
            </Button>
          </>
        )} */}
    </>
  );
};
export default AvatarDropdown;
