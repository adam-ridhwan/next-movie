'use client';

import { signOut } from 'next-auth/react';

import { Button } from './ui/button';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    window.location.reload();
  };

  return (
    <Button onClick={handleSignOut} className='w-full'>
      Sign out
    </Button>
  );
};

export default SignOutButton;
