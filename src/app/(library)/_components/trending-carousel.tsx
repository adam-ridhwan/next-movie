import { AppFonts } from '@/app/_components/app-fonts';
import { AppIcons } from '@/app/_components/app-icons';

const TrendingCarousel = () => {
  const cards = Array.from({ length: 11 }, (_, index) => ({
    year: '2019',
    category: 'Movie',
    rating: 'PG',
    title: `Beyond Earth ${index + 1}`,
  }));

  return (
    <>
      <div className='hide-scrollbar trending-carousel flex w-full overflow-x-scroll px-10 py-5'>
        {cards.map((card, index) => (
          <div
            key={index}
            className='card relative flex aspect-video flex-col justify-end gap-1 border border-green-100 p-4'
          >
            <div className='item-center absolute right-2 top-2 flex justify-center  rounded-full bg-darkBlue/30 p-1.5'>
              <AppIcons.bookMarkEmpty />
            </div>

            <div className='flex flex-row'>
              <AppFonts.bodySmall className='text-[12px] opacity-75'>{card.year}</AppFonts.bodySmall>
              <AppIcons.dot />
              <div className='flex flex-row items-center gap-1'>
                <AppIcons.categoryMovie />
                <AppFonts.bodySmall className='text-[12px] opacity-75'>{card.category}</AppFonts.bodySmall>
              </div>
              <AppIcons.dot />
              <AppFonts.bodySmall className='text-[12px] opacity-75'>{card.rating}</AppFonts.bodySmall>
            </div>

            <AppFonts.bodyMedium>{card.title}</AppFonts.bodyMedium>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingCarousel;
