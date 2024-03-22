import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return <div className='container flex h-full gap-4 bg-red'></div>;
}
