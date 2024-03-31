'use client';

import { signOut } from 'next-auth/react';

import { authStrings } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    window.location.reload();
  };

  return (
    <Button onClick={handleSignOut} className='w-full'>
      {authStrings.signOut}
    </Button>
  );
};

export default SignOutButton;
