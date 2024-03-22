import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
    <div className='container flex h-full gap-4 bg-red'>
      {/* {session ? (
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
        )} */}
    </div>
  );
}
