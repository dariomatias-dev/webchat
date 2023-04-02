import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex justify-center'>
      <Link href='/Login'>
        Ir
      </Link>
    </div>
  );
};

export default Home;
