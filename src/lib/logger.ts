/* eslint-disable */

import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';

export const logger = (message: string) => (DEVELOPMENT_MODE ? console.log(message) : null);

const bold = (text: string) => chalk.underline.bold(text);
const GO_TO = ' GO TO';
const PAGE = 'PAGE ';
const VIEW = ' VIEW';

export const usePaginationLogger = {
  first: () => logger(chalk.bgGreenBright.black(GO_TO, bold('FIRST'), PAGE)),
  last: () => logger(chalk.bgBlueBright.black(GO_TO, bold('LAST'), PAGE)),
  next: () => logger(chalk.bgYellowBright.black(GO_TO, bold('NEXT'), PAGE)),
  prev: () => logger(chalk.bgMagentaBright.black(GO_TO, bold('PREV'), PAGE)),
  maximized: () => logger(chalk.bgCyanBright.black(VIEW, bold('MAXIMIZED'), '')),
  minimized: () => logger(chalk.bgRedBright.black(VIEW, bold('MINIMIZED'), '')),
};
