'use client';

import * as React from 'react';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffectOnce(() => setIsMounted(true));

  return (
    <Dialog open onOpenChange={() => router.push('/browse')}>
      {isMounted && <DialogContent>{children}</DialogContent>}
    </Dialog>
  );
};

export default Modal;
