'use client';

import * as React from 'react';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ROUTES } from '@/components/nav-bar';

const MediaModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffectOnce(() => setIsMounted(true));

  return (
    <Dialog open onOpenChange={() => router.push(ROUTES.HOME.PATH, { scroll: false })}>
      {isMounted && <DialogContent>{children}</DialogContent>}
    </Dialog>
  );
};

export default MediaModal;
