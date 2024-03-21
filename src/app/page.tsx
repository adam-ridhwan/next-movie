import Link from 'next/link';

export default function Home() {
  return (
    <div className='container flex h-screen justify-between'>
      <Link href='/sign-in' className='h-min border-2 border-white p-10'>
        sign-in
      </Link>
      <Link href='/sign-up' className='h-min border-2 border-white p-10'>
        sign-up
      </Link>
    </div>
  );
}
