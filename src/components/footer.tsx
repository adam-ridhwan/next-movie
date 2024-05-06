import Image from 'next/image';

import { BodySmall } from '@/components/fonts';
import { NextjsIcon, VercelIcon } from '@/components/icons';

const Footer = () => {
  return (
    <footer className='container px-custom py-10'>
      <div className='flex flex-col gap-2'>
        <div className='flex h-10 items-center gap-2'>
          <BodySmall className='text-sm'>Made with</BodySmall>
          <NextjsIcon />
        </div>

        <div className='flex h-10 items-center gap-2'>
          <BodySmall className='text-sm'>Data provided by</BodySmall>
          <Image
            src='/tmdb-logo.svg'
            alt='The Movie Database Logo'
            width={100}
            height={0}
          />
        </div>

        <div className='flex h-10 items-center gap-2'>
          <BodySmall className='text-sm'>Powered by</BodySmall>
          <VercelIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
