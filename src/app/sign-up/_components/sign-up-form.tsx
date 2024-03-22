'use client';

import { useEffect, useState } from 'react';
import { signUp } from '@/actions/signUp';
import { useFormState } from 'react-dom';

import { FormResponse } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { AppFonts } from '@/components/app-fonts';
import { AuthStrings } from '@/components/app-strings';

import SignUpButton from './sign-up-button';

const initialFormState: FormResponse = {
  success: false,
  message: '',
};

export const SignUpForm = () => {
  const [formState, formAction] = useFormState(signUp, initialFormState);
  const [error, setError] = useState('');

  // TODO: Hacky way to do this. Need to fix this when React team releases a better way to handle this.
  useEffect(() => {
    if (!formState.success) setError(formState.message);
  }, [formState]);

  return (
    <form action={formAction} className='w-full'>
      <Input
        type='email'
        name='email'
        placeholder={AuthStrings.emailAddress}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='password'
        placeholder={AuthStrings.password}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <Input
        type='password'
        name='repeated-password'
        placeholder={AuthStrings.repeatPassword}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
        onFocus={() => setError('')}
      />
      <div className='h-10 pt-2 text-red'>
        {<AppFonts.bodyMedium className='font-medium'>{error}</AppFonts.bodyMedium>}
      </div>
      <SignUpButton />
    </form>
  );
};
