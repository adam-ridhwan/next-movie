import { getServerSession } from 'next-auth';

import { AppFonts } from '../_components/app-fonts';
import { LibraryStrings } from '../_components/app-strings';
import TrendingCarousel from './_components/trending-carousel';

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <div className=''>
        <div className='pt-5'>
          <AppFonts.headingMedium className='pl-10'>{LibraryStrings.trending}</AppFonts.headingMedium>
          <TrendingCarousel />
        </div>

        <div className='pl-10'>
          <AppFonts.headingMedium>{LibraryStrings.recommendedForYou}</AppFonts.headingMedium>
          <div>2-column vertical cards</div>
        </div>
      </div>
    </>
  );
}
