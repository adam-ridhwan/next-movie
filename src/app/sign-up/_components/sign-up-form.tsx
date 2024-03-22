'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/actions/signIn';
import { signUp, SignUpData } from '@/actions/signUp';

import { Input } from '@/components/ui/input';
import { AppFonts } from '@/components/app-fonts';
import { AuthStrings } from '@/components/app-strings';

import SignUpButton from './sign-up-button';

export const SignUpForm = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, repeatedPassword } = signUpData;
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
        value={signUpData.email}
        onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
        placeholder={AuthStrings.emailAddress}
        autoComplete='email'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='password'
        value={signUpData.password}
        onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
        placeholder={AuthStrings.password}
        autoComplete='new-password'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='repeated-password'
        value={signUpData.repeatedPassword}
        onChange={e => setSignUpData({ ...signUpData, repeatedPassword: e.target.value })}
        placeholder={AuthStrings.repeatPassword}
        autoComplete='new-password'
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <div className='h-10 pt-2'>
        {<AppFonts.bodyMedium className='font-medium text-red'>{error}</AppFonts.bodyMedium>}
      </div>
      <SignUpButton />
    </form>
  );
};
