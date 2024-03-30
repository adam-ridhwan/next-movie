import { useFormStatus } from 'react-dom';

import { AppFonts } from '@/app/components/app-fonts';
import { AppSpinner } from '@/app/components/app-spinner';
import { AuthStrings } from '@/app/components/app-strings';
import { Button } from '@/app/components/ui/button';

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type='submit' disabled={pending} variant='accent' className='mb-5 w-full py-6'>
        {pending ? (
          <AppSpinner />
        ) : (
          <AppFonts.bodyMedium>{AuthStrings.createAnAccount}</AppFonts.bodyMedium>
        )}
      </Button>
    </>
  );
}
