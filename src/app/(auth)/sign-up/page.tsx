import { AppFonts } from '@/app/components/app-fonts';
import { AppIcons } from '@/app/components/app-icons';
import { AuthStrings } from '@/app/components/app-strings';
import { Button } from '@/app/components/ui/button';

import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
  return (
    <>
      <div className='container flex h-full max-w-[500px] flex-col items-center'>
        <div className='lg:p-25 p-12 md:p-20'>
          <AppIcons.logo />
        </div>
        <div className='flex w-full flex-col items-center rounded-lg bg-darkerBlue p-6'>
          <div className='w-full pb-6'>
            <AppFonts.headingLarge>{AuthStrings.signUp}</AppFonts.headingLarge>
          </div>
          <SignUpForm />
          <div>
            <AppFonts.bodyMedium>{AuthStrings.alreadyHandAnAccount}</AppFonts.bodyMedium>
            <Button variant='link' className='px-2 text-red'>
              <AppFonts.bodyMedium className='font-medium'>
                {AuthStrings.signIn}
              </AppFonts.bodyMedium>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
