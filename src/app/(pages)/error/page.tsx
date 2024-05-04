'use client';

import { useRouter } from 'next/navigation';
import { Home } from '@/routes';

import { Button } from '@/components/ui/button';
import { HeadingLarge, HeadingMedium } from '@/components/fonts';

const Error = () => {
  const { replace } = useRouter();
  return (
    <div className='flex h-full flex-col items-center justify-center gap-6 pt-32'>
      <HeadingLarge className='text-[40px] font-thin text-primary'>
        Sorry
      </HeadingLarge>
      <HeadingMedium className='text-[18px] font-light text-muted-foreground'>
        We've encountered an error processing this request.
      </HeadingMedium>
      <Button className='w-fit' size='lg' onClick={() => replace(Home())}>
        Home
      </Button>
    </div>
  );
};

export default Error;
