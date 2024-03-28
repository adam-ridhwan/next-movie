'use client';

import { useBoolean, usePages, usePagination } from '@/app/_components/app-slider/_hooks';
import LeftButton from '@/app/_components/app-slider/left-button';
import RightButton from '@/app/_components/app-slider/right-button';
import SliderItem from '@/app/_components/app-slider/slider-item';
import { useAtoms, useRefContext } from '@/app/_components/app-slider/slider-store';
import { cn } from '@/app/_lib/utils';
import { Card } from '@/app/(library)/page';

const AppSlider = () => {
  const [pages] = usePages();
  const [currentPage] = usePagination();
  const { value: isAnimating } = useBoolean();
  const { translatePercentage } = useAtoms();
  const { sliderRef, sliderItemRef } = useRefContext();

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the resize event when the user resizes the window
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!sliderRef.current) return;
  //
  //     const newCardsPerPage = getVisibleCardsTotal();
  //
  //     if (newCardsPerPage !== prevCardsPerPageRef.current) {
  //       const newTotalCardsPerPage = newCardsPerPage * SECTION_LENGTH + TWO_EXTRA_CARDS;
  //
  //       const [first, second, ...rest] = cards;
  //       const startIndex = 0;
  //       const endIndex = startIndex + newTotalCardsPerPage;
  //       const newCards = rest.slice(startIndex, endIndex);
  //
  //       console.log('first', first.id);
  //       console.log('second', second.id);
  //       console.log('rest', rest);
  //       console.log('newCardsPerPage', newCards.length);
  //       console.log('newCards', newCards.length);
  //       console.log('totalCardsPerPage', newTotalCardsPerPage);
  //       console.log('───────────────────────────────────────────────────────');
  //
  //       setCards(newCards);
  //       setVisibleCardsTotal(newCardsPerPage);
  //       prevCardsPerPageRef.current = newCardsPerPage;
  //     }
  //
  //     const newWidth = window.innerWidth;
  //     const { offsetWidth } = sliderRef.current;
  //     const percentage = ((offsetWidth - PADDING) / window.innerWidth) * 100;
  //
  //     prevWidth.current = newWidth;
  //   };
  //
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [cards, visibleCardsTotal, cards, cards.length, currentPage, setVisibleCardsTotal,
  // totalCardsPerPage]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        'relative flex w-full',
        'bg-yellow-600' // for testing purposes
      )}
    >
      <div className='fixed left-1/2 top-0  text-[60px] font-bold'>{currentPage}</div>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-10',
          'bg-green-600', // for testing purposes
          { 'justify-center': currentPage > 1 },
          {
            'transition-transform duration-700': isAnimating,
          }
        )}
        style={{
          transform: translatePercentage ? `translate3d(${translatePercentage}%, 0, 0)` : undefined,
        }}
      >
        {[-1, 0, 1].map(offset => {
          // Determine the actual page number based on offset
          // -1 = previous page
          //  0 = current page
          //  1 = next page
          const page = currentPage + offset;
          return pages
            ?.get(page)
            ?.map((card: Card, index: number) => (
              <SliderItem
                key={`${page}-${index}`}
                ref={page === currentPage && index === 0 ? sliderItemRef : undefined}
                card={card}
                index={index}
                isVisible={offset === 0}
              />
            ));
        })}
      </div>

      {currentPage > 1 && <LeftButton />}
      <RightButton />
    </div>
  );
};

export default AppSlider;
