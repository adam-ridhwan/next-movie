import Link from 'next/link';

export default function Home() {
  return (
    <div className='container flex h-screen justify-between'>
      <Link href='/signin'>sing-in</Link>
      <Link href='/signup'>sign-up</Link>
    </div>
  );
}
