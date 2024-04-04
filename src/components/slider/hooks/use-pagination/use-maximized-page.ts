import { usePaginationLogger } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useMaximizedPage = () => {
  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();
  };
  return { goToMaximizedPage };
};
