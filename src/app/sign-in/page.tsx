import { Button } from '@/components/ui/button';
import { AppFonts } from '@/components/app-fonts';
import { AppIcons } from '@/components/app-icons';
import { AuthStrings } from '@/components/app-strings';

import { SignInForm } from './_components/sign-in-form';

export default function SignInPage() {
  return (
    <>
      <div className='container flex h-full max-w-[500px] flex-col items-center'>
        <div className='lg:p-25 p-12 md:p-20'>
          <AppIcons.logo />
        </div>
        <div className='flex w-full flex-col items-center rounded-lg bg-darkerBlue p-6'>
          <div className='w-full pb-6'>
            <AppFonts.headingLarge>{AuthStrings.signIn}</AppFonts.headingLarge>
          </div>
          <SignInForm />
          <div>
            <AppFonts.bodyMedium>{AuthStrings.dontHaveAnAccount}</AppFonts.bodyMedium>
            <Button variant='link' className='px-2 text-red'>
              <AppFonts.bodyMedium>{AuthStrings.signUp}</AppFonts.bodyMedium>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
