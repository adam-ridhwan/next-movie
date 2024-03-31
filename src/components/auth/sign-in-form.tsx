'use client';

import { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';

import { authStrings } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { BodyMedium } from '@/components/fonts';

import { SignInButton } from './sign-in-button';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn() {
    const signInResponse: SignInResponse | undefined = await signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
      email,
      password,
    });
    if (signInResponse && signInResponse.error) return setError(signInResponse.error);
    return;
  }

  return (
    <>
      <form action={handleSignIn} className='w-full'>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={authStrings.emailAddress}
          autoComplete='email'
          className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
          onFocus={() => setError('')}
        />
        <Input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder={authStrings.password}
          autoComplete='current-password'
          className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
          onFocus={() => setError('')}
        />
        <div className='h-10 pt-2 text-red'>
          {<BodyMedium className='font-medium'>{error}</BodyMedium>}
        </div>
        <SignInButton />
      </form>
    </>
  );
};
