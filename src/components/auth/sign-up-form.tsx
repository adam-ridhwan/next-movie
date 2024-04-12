'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/actions/sign-in';
import { signUp, SignUpPayload } from '@/actions/sign-up';

import { authStrings } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { BodyMedium } from '@/components/fonts';

import SignUpButton from './sign-up-button';

export const SignUpForm = () => {
  const router = useRouter();
  const [SignUpPayload, setSignUpPayload] = useState<SignUpPayload>({
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, repeatedPassword } = SignUpPayload;
    const registered = await signUp({ email, password, repeatedPassword });
    if (!registered.success) return setError(registered.message);

    const authenticated = await signIn({ email, password });
    if (!authenticated.success) return setError(authenticated.message);

    return router.push('/');
  };

  return (
    <form onSubmit={handleSignUp} className='w-full'>
      <Input
        id='email'
        type='email'
        name='email'
        value={SignUpPayload.email}
        onChange={e => setSignUpPayload({ ...SignUpPayload, email: e.target.value })}
        placeholder={authStrings.emailAddress}
        autoComplete='email'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='password'
        value={SignUpPayload.password}
        onChange={e => setSignUpPayload({ ...SignUpPayload, password: e.target.value })}
        placeholder={authStrings.password}
        autoComplete='new-password'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='repeated-password'
        value={SignUpPayload.repeatedPassword}
        onChange={e => setSignUpPayload({ ...SignUpPayload, repeatedPassword: e.target.value })}
        placeholder={authStrings.repeatPassword}
        autoComplete='new-password'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <div className='h-10 pt-2'>
        <BodyMedium className='font-medium text-red'>{error}</BodyMedium>
      </div>
      <SignUpButton />
    </form>
  );
};
