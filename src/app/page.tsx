import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import SignOutButton from '@/components/sign-out-button';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
    <div>
      <h1 className='py-10 text-center text-3xl'>Home</h1>
      <div className='container flex h-full gap-4'>
        {session ? (
          <>
            <SignOutButton />
          </>
        ) : (
          <>
            <Button asChild>
              <Link href='/sign-up' className='border-2 border-white p-10'>
                Sign up
              </Link>
            </Button>
            <Button asChild>
              <Link href='/sign-in' className='border-2 border-white p-10'>
                Sign in
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
