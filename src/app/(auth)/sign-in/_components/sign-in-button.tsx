import { useFormStatus } from 'react-dom';

import { AppFonts } from '@/app/_components/app-fonts';
import { AppSpinner } from '@/app/_components/app-spinner';
import { AuthStrings } from '@/app/_components/app-strings';
import { Button } from '@/app/_components/ui/button';

export const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type='submit' disabled={pending} variant='accent' className='mb-5 w-full py-6'>
        {pending ? (
          <AppSpinner />
        ) : (
          <AppFonts.bodyMedium>{AuthStrings.loginToYourAccount}</AppFonts.bodyMedium>
        )}
      </Button>
    </>
  );
};
