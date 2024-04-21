'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { TODO } from '@/lib/types';
import { capitalize } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HeadingLarge } from '@/components/fonts';

type ModalProps = {
  content: {
    details: TODO;
    credits: TODO;
    keywords: TODO;
    recommendations: TODO;
  };
};

const Modal = ({ content }: ModalProps) => {
  const router = useRouter();

  const { details, credits, keywords, recommendations } = content;

  const actors = credits.cast.filter(({ known_for_department }: TODO) => known_for_department === 'Acting');
  const firstThreeActors = actors.slice(0, 3).map((actor: TODO) => actor.name);

  const genres = details.genres.map(({ name }: TODO) => name).slice(0, 3);

  const firstThreeKeywords = keywords.map(({ name }: TODO) => name).slice(0, 3);

  console.log('details', details);

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <div className='relative aspect-video'>
          <Image
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.original_title || details.original_name}
            priority
            fill
            className='object-cover'
          />

          <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-muted via-transparent to-transparent' />
        </div>

        <div className='flex flex-col gap-12 px-14 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-3/5'>
            <HeadingLarge>{details.title || details.name}</HeadingLarge>
            <p className=''>{details.overview}</p>
          </div>
          <div className='flex w-full flex-col gap-4 lg:w-2/5'>
            <DetailsMetadata label='Cast' metadata={firstThreeActors} />
            <DetailsMetadata label='Genre' metadata={genres} />
            <DetailsMetadata label='Keywords' metadata={firstThreeKeywords} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailsMetadata = ({ label, metadata }: { label: string; metadata: string[] }) => {
  return (
    <div className='flex flex-wrap items-start gap-x-2'>
      <span className='font-light text-primary/40'>{label}:</span>

      {metadata.map((data: string, index: number) => (
        <span key={data} className='whitespace-nowrap font-light'>
          {data}
          {index < metadata.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  );
};

export default Modal;
