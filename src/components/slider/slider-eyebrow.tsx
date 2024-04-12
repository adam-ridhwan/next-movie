import { libraryStrings } from '@/lib/constants';
import { BodyMedium } from '@/components/fonts';
import PageIndicator from '@/components/slider/page-indicator/page-indicator';

const SliderEyebrow = () => {
  return (
    <div className='flex flex-row justify-between px-12'>
      <BodyMedium>{libraryStrings.trending}</BodyMedium>
      <PageIndicator />
    </div>
  );
};

export default SliderEyebrow;
