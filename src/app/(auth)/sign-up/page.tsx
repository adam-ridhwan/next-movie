import { SignUpForm } from '@/components/auth/sign-up-form';
import { BodyMedium, HeadingLarge } from '@/components/shared/fonts';
import { LogoIcon } from '@/components/shared/icons';
import { AuthStrings } from '@/components/shared/strings';
import { Button } from '@/components/shared/ui/button';

export default async function SignUpPage() {
  return (
    <>
      <div className='container flex h-full max-w-[500px] flex-col items-center'>
        <div className='lg:p-25 p-12 md:p-20'>
          <LogoIcon />
        </div>
        <div className='flex w-full flex-col items-center rounded-lg bg-darkerBlue p-6'>
          <div className='w-full pb-6'>
            <HeadingLarge>{AuthStrings.signUp}</HeadingLarge>
          </div>
          <SignUpForm />
          <div>
            <BodyMedium>{AuthStrings.alreadyHandAnAccount}</BodyMedium>
            <Button variant='link' className='px-2 text-red'>
              <BodyMedium className='font-medium'>{AuthStrings.signIn}</BodyMedium>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
