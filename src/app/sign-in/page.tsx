import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { signIn } from '../actions/signIn';
import { AppFonts } from '../components/app-fonts';
import { AppIcons } from '../components/app-icons';
import { AuthStrings } from '../components/app-strings';

export default function SignInPage() {
  return (
    <>
      <div className='container flex h-full max-w-[500px] flex-col items-center'>
        <div className='lg:p-25 p-12 md:p-20'>
          <AppIcons.logo />
        </div>
        <div className='flex w-full flex-col items-center rounded-lg bg-darkerBlue p-6'>
          <div className='w-full pb-6'>
            <AppFonts.headingLarge>{AuthStrings.login}</AppFonts.headingLarge>
          </div>
          <form action={signIn} className='w-full'>
            <Input
              type='email'
              name='email'
              placeholder={AuthStrings.emailAddress}
              className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
            />
            <Input
              type='password'
              name='password'
              placeholder={AuthStrings.password}
              className='mb-10 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
            />

            <Button type='submit' variant='accent' className='mb-5 w-full py-6'>
              <AppFonts.bodyMedium>{AuthStrings.loginToYourAccount}</AppFonts.bodyMedium>
            </Button>
          </form>

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
