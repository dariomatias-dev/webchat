import { auth, GoogleAuthProvider, signInWithPopup } from '@/services/firebase';

const Home = () => {
  const handleGoogleSignIn = () => {

  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[600px] h-[400px] flex justify-center bg-zinc-900'>
        <h1 className='text-4xl font-bold'>
          Login
        </h1>

        <p>
          Escolha um método de login:
        </p>

        <button
          type='button'
          onClick={handleGoogleSignIn}
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default Home;
