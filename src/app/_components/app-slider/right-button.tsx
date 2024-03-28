import { useBoolean, usePages, usePagination } from '@/app/_components/app-slider/_hooks';
import {
  calcTranslatePercentage,
  useAtoms,
  useRefContext,
} from '@/app/_components/app-slider/slider-store';
import { Button } from '@/app/_components/ui/button';
import { Card } from '@/app/(library)/page';

const RightButton = () => {
  const [pages, actions, cache] = usePages();
  const [currentPage, { resetToFirstPage, goToNextPage }] = usePagination();
  const { value: isAnimating, setTrue: startAnimation, setFalse: stopAnimation } = useBoolean();
  const { CARDS, visibleCardsTotal, trailingCardsTotal, setTranslatePercentage } = useAtoms();
  const { sliderRef, sliderItemRef } = useRefContext();

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks RIGHT arrow
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  const handleRightScroll = () => {
    startAnimation();

    const newCurrentPage = currentPage + 1;
    const isLastPage = newCurrentPage === pages.size;
    const canGoToNextPage = newCurrentPage <= Math.ceil(CARDS.length / visibleCardsTotal);

    !canGoToNextPage || !isLastPage
      ? setTranslatePercentage(
          calcTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef }) * -1
        )
      : setTranslatePercentage(
          calcTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef, isLastPage })
        );

    setTimeout(() => {
      stopAnimation();
      setTranslatePercentage(0);

      if (!canGoToNextPage) {
        resetToFirstPage();
        cache.get();
        return;
      }

      goToNextPage();
      if (!isLastPage) return;
      const newCardList: Card[] = [];
      const cardsTotal = pages.size * visibleCardsTotal;

      let decrementingCardIndex = CARDS.length - 1;
      for (let i = cardsTotal; i > 0; i--) {
        newCardList.unshift(CARDS[decrementingCardIndex--]);
        if (decrementingCardIndex === -1) {
          decrementingCardIndex = CARDS.length - 1;
        }
      }

      newCardList.push(...CARDS.slice(0, visibleCardsTotal));

      const newPages: [number, Card[]][] = Array.from(
        { length: pages.size + 1 },
        (_, pageIndex) => {
          const startIndex = pageIndex * visibleCardsTotal;
          return [pageIndex + 1, newCardList.slice(startIndex, startIndex + visibleCardsTotal)];
        }
      );

      actions.reset();
      actions.setAll(newPages);
    }, 800);

    return;
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={() => handleRightScroll()}
        className='absolute right-0 top-0 flex h-full w-10 items-center justify-center
        rounded-br-none rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'>'}
      </Button>
    </>
  );
};

export default RightButton;
