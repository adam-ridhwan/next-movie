'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { HeadingLarge } from '@/components/fonts';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  const router = useRouter();

  const refreshAndReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className='flex h-full flex-col items-center justify-center gap-8 pt-32'>
      <HeadingLarge>Something went wrong!</HeadingLarge>
      <Button className='w-fit' onClick={() => refreshAndReset()}>
        Try again
      </Button>
    </div>
  );
}
