import { useSliderStore } from '@/providers/slider-provider';

import { nonEmptyTilesSchema, Pages } from '@/lib/types';
import { getMaxPages, getTilesPerPage } from '@/lib/utils';

export const useValidators = () => {
  const TILES = useSliderStore(state => state.TILES);

  const validatePages = ({ label, pages }: { label: string; pages: Pages }): void => {
    const expectedMaxPage = getMaxPages(TILES);
    const expectedTilesPerPage = getTilesPerPage();

    if (pages.size !== expectedMaxPage) {
      throw new Error(`${label} Expected ${expectedMaxPage} pages, found ${pages.size}.`);
    }

    pages.forEach((tiles, pageIndex) => {
      const result = nonEmptyTilesSchema.safeParse(tiles);

      if (!result.success) {
        throw new Error(`${label} Validation failed for page ${pageIndex}: ${result.error}`);
      }

      if (tiles.length !== expectedTilesPerPage) {
        throw new Error(
          `${label} Page ${pageIndex} has ${tiles.length} tiles, expected ${expectedTilesPerPage}`
        );
      }
    });
  };
  return { validatePages };
};
