'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { HeadingLarge } from '@/components/fonts';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  const refreshAndReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className='flex h-full flex-col items-center justify-center gap-8 pt-20'>
      <HeadingLarge>Something went wrong!</HeadingLarge>
      <Button className='w-fit' onClick={() => refreshAndReset()}>
        Try again
      </Button>
    </div>
  );
}
