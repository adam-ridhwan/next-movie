'use client';

import { useEffect, useState } from 'react';
import { signIn } from '@/actions/signIn';
import { atom, useAtom } from 'jotai';
import { useFormState, useFormStatus } from 'react-dom';

import { FormResponse } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { AppFonts } from '@/components/app-fonts';
import { AuthStrings } from '@/components/app-strings';

import { SignInButton } from './sign-in-button';

const initialFormState: FormResponse = {
  success: false,
  message: '',
};

export const SignInForm = () => {
  const [formState, formAction] = useFormState(signIn, initialFormState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!formState.success) setError(formState.message);
  }, [formState]);

  return (
    <>
      <form action={formAction} className='w-full'>
        <Input
          type='email'
          name='email'
          placeholder={AuthStrings.emailAddress}
          autoComplete='email'
          className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
          onFocus={() => setError('')}
        />
        <Input
          type='password'
          name='password'
          placeholder={AuthStrings.password}
          autoComplete='current-password'
          className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
          onFocus={() => setError('')}
        />
        <div className='h-10 pt-2 text-red'>
          {<AppFonts.bodyMedium className='font-medium'>{error}</AppFonts.bodyMedium>}
        </div>
        <SignInButton />
      </form>
    </>
  );
};
