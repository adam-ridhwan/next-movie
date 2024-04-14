import { useFormStatus } from 'react-dom';

import { authStrings } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { BodyMedium } from '@/components/fonts';
import { LoadingIcon } from '@/components/icons';

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} variant='accent' className='mb-5 w-full py-6'>
      {pending ? <LoadingIcon /> : <BodyMedium>{authStrings.createAnAccount}</BodyMedium>}
    </Button>
  );
}
