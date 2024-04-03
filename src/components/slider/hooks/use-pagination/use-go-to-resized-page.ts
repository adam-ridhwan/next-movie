import { Tile } from '@/lib/types';
import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToResizedPage = () => {
  const goToResizedPage = (previousTiles: Tile[]) => {
    log('RESIZED');

    console.log(
      'previousTiles',
      previousTiles.map(tile => tile.id)
    );
  };

  return { goToResizedPage };
};
