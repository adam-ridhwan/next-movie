import { useFormStatus } from 'react-dom';

import { BodyMedium } from '@/components/shared/fonts';
import { LoadingIcon } from '@/components/shared/icons';
import { AuthStrings } from '@/components/shared/strings';
import { Button } from '@/components/shared/ui/button';

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type='submit' disabled={pending} variant='accent' className='mb-5 w-full py-6'>
        {pending ? <LoadingIcon /> : <BodyMedium>{AuthStrings.createAnAccount}</BodyMedium>}
      </Button>
    </>
  );
}
