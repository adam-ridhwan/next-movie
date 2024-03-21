import { signUp } from '@/actions/signUp';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppFonts } from '@/components/app-fonts';
import { AppIcons } from '@/components/app-icons';
import { AuthStrings } from '@/components/app-strings';

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
          <form action={signUp} className='w-full'>
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
              className='mb-3 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
            />
            <Input
              type='password'
              name='repeated-password'
              placeholder={AuthStrings.repeatPassword}
              className='mb-10 rounded-none border-x-0 border-b-2 border-t-0 border-b-darkBlue py-6 text-[13px] font-light focus-visible:ring-red'
            />

            <Button type='submit' variant='accent' className='mb-5 w-full py-6'>
              <AppFonts.bodyMedium>{AuthStrings.createAnAccount}</AppFonts.bodyMedium>
            </Button>
          </form>

          <div>
            <AppFonts.bodyMedium>{AuthStrings.alreadyHandAnAccount}</AppFonts.bodyMedium>
            <Button variant='link' className='px-2 text-red'>
              <AppFonts.bodyMedium>{AuthStrings.signIn}</AppFonts.bodyMedium>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
