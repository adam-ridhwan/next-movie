'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrowseRoute } from '@/routes';

import { useEffectOnce } from '@/hooks/use-effect-once';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Media = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffectOnce(() => setIsMounted(true));

  return (
    <Dialog open onOpenChange={() => router.push(BrowseRoute(), { scroll: false })}>
      {isMounted && <DialogContent>{children}</DialogContent>}
    </Dialog>
  );
};

export default Media;
