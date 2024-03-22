import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { AppFonts } from '@/components/app-fonts';
import { AppSpinner } from '@/components/app-spinner';
import { AuthStrings } from '@/components/app-strings';

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type='submit' disabled={pending} variant='accent' className='mb-5 w-full py-6'>
        {pending ? <AppSpinner /> : <AppFonts.bodyMedium>{AuthStrings.createAnAccount}</AppFonts.bodyMedium>}
      </Button>
    </>
  );
}
