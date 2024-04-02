/* eslint no-restricted-imports: 0 */

import { nonEmptyTilesSchema, Pages } from '@/lib/types';

type validatePagesParams = {
  label: string;
  pages: Pages;
  expectedMaxPages: number;
  expectedTilesPerPage: number;
};

export const useValidators = () => {
  const validatePages = ({
    label,
    pages,
    expectedMaxPages,
    expectedTilesPerPage,
  }: validatePagesParams): void => {
    if (pages.size !== expectedMaxPages) {
      throw new Error(`${label} Expected ${expectedMaxPages} pages, found ${pages.size}.`);
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
