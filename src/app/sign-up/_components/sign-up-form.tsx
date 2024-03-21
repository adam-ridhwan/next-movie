'use client';

import { signUp } from '@/actions/signUp';
import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppFonts } from '@/components/app-fonts';
import { AuthStrings } from '@/components/app-strings';

const initialState: { response: string } = {
  response: '',
};

export const SignUpForm = () => {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <form action={formAction} className='w-full'>
      <Input
        type='email'
        name='email'
        placeholder={AuthStrings.emailAddress}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
      />
      <Input
        type='password'
        name='password'
        placeholder={AuthStrings.password}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
      />
      <Input
        type='password'
        name='repeated-password'
        placeholder={AuthStrings.repeatPassword}
        className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
      />

      <div className='h-10 pt-2 text-red'>
        {state.response && (
          <AppFonts.bodyMedium className='font-medium'>{state.response}</AppFonts.bodyMedium>
        )}
      </div>

      <Button type='submit' variant='accent' className='mb-5 w-full py-6'>
        <AppFonts.bodyMedium>{AuthStrings.createAnAccount}</AppFonts.bodyMedium>
      </Button>
    </form>
  );
};
