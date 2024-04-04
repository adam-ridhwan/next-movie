import { usePaginationLogger } from '@/lib/logger';

export const useMaximizedPage = () => {
  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();
  };
  return { goToMaximizedPage };
};
