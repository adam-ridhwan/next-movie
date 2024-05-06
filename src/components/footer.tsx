import Image from 'next/image';
import { Github } from 'lucide-react';

import { BodySmall } from '@/components/fonts';
import { GithubIcon, NextjsIcon, VercelIcon } from '@/components/icons';

const Footer = () => (
  <footer className='container px-custom py-10'>
    <div className='flex flex-col gap-2'>
      <div className='flex h-10 items-center gap-2'>
        <BodySmall className='text-sm'>Made with</BodySmall>
        <a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
          <NextjsIcon />
        </a>
      </div>

      <div className='flex h-10 items-center gap-2'>
        <BodySmall className='text-sm'>Data provided by</BodySmall>
        <a
          href='https://developer.themoviedb.org/docs/getting-started'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src='/tmdb-logo.svg'
            alt='The Movie Database Logo'
            width={100}
            height={0}
          />
        </a>
      </div>

      <div className='flex h-10 items-center gap-2'>
        <BodySmall className='text-sm'>Powered by</BodySmall>
        <a href='https://vercel.com/' target='_blank' rel='noreferrer'>
          <VercelIcon />
        </a>
      </div>

      <div className='flex h-10 items-center gap-2'>
        <BodySmall className='text-sm'>Contribute</BodySmall>
        <a
          href='https://github.com/adam-ridhwan/next-imdb'
          target='_blank'
          rel='noreferrer'
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
