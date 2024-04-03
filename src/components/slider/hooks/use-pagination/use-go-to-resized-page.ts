import { Tile } from '@/lib/types';
import { logToConsoleUsePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToResizedPage = () => {
  const goToResizedPage = (previousTiles: Tile[]) => {
    logToConsoleUsePagination('RESIZED');
    console.log(
      'previousTiles',
      previousTiles.map(tile => tile.id)
    );
  };

  return { goToResizedPage };
};
