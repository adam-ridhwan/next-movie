import { cn } from '@/lib/utils';

export type SVGProps = {
  className?: string;
};

const logo = ({ className }: SVGProps) => (
  <svg
    width='33'
    height='27'
    className={cn('fill-red', className)}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z' />
  </svg>
);

const bookMarkEmpty = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('h-5 w-5 fill-transparent', className)}
  >
    <path d='m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z' />
  </svg>
);

const bookMarkFull = ({ className }: SVGProps) => (
  <svg className={cn('h-6 w-6 fill-secondary', className)} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z'
      fill='#FFF'
    />
  </svg>
);

const categoryMovie = ({ className }: SVGProps) => (
  <svg
    className={cn('h-3.5 w-3.5 fill-secondary', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-0.5 0 13 12'
  >
    <path
      d='M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z'
      fill='#FFF'
      opacity='.75'
    />
  </svg>
);

const categoryTv = ({ className }: SVGProps) => (
  <svg className={cn('h-6 w-6 fill-secondary', className)} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z'
      fill='#FFF'
      opacity='.75'
    />
  </svg>
);

const navHome = ({ className }: SVGProps) => (
  <svg
    className={cn('h-6 w-6 fill-darkBlue', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-0.5 0 21 20'
  >
    <path d='M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z' />
  </svg>
);

const navMovies = ({ className }: SVGProps) => (
  <svg
    className={cn('h-6 w-6 fill-darkBlue', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-0.5 0 21 20'
  >
    <path d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z' />
  </svg>
);

const navTvSeries = ({ className }: SVGProps) => (
  <svg
    className={cn('h-6 w-6 fill-darkBlue', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-0.5 0 21 20'
  >
    <path d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z' />
  </svg>
);

const navBookmark = ({ className }: SVGProps) => (
  <svg
    className={cn('h-6 w-6 fill-darkBlue', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-2 0 21 20'
  >
    <path d='M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z' />
  </svg>
);

const play = ({ className }: SVGProps) => (
  <svg className={cn('h-6 w-6 fill-secondary', className)} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z'
      fill='#FFF'
    />
  </svg>
);

const search = ({ className }: SVGProps) => (
  <svg className={cn('h-6 w-6 fill-secondary', className)} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z'
      fill='#FFF'
    />
  </svg>
);

const avatar = ({ className }: SVGProps) => (
  <svg
    className={cn('h-8 w-8 fill-white', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
  >
    <path d='M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z' />
  </svg>
);

const dot = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('h-4 w-4 fill-white', className)}
  >
    <circle cx='12.1' cy='12.1' r='1' />
  </svg>
);

export const AppIcons = {
  logo,
  bookMarkEmpty,
  bookMarkFull,
  categoryMovie,
  categoryTv,
  navBookmark,
  navHome,
  navMovies,
  navTvSeries,
  play,
  search,
  avatar,
  dot,
} as const;
