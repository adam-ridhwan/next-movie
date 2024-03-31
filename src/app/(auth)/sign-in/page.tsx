import { authStrings } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { SignInForm } from '@/components/auth/sign-in-form';
import { BodyMedium, HeadingLarge } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';

export default async function SignInPage() {
  return (
    <>
      <div className='container flex h-full max-w-[500px] flex-col items-center'>
        <div className='lg:p-25 p-12 md:p-20'>
          <LogoIcon />
        </div>
        <div className='flex w-full flex-col items-center rounded-lg bg-darkerBlue p-6'>
          <div className='w-full pb-6'>
            <HeadingLarge>{authStrings.signIn}</HeadingLarge>
          </div>
          <SignInForm />
          <div>
            <BodyMedium>{authStrings.dontHaveAnAccount}</BodyMedium>
            <Button variant='link' className='px-2 text-red'>
              <BodyMedium>{authStrings.signUp}</BodyMedium>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
