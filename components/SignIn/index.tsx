import styles from '../../styles/SignIn.module.scss';
import { FcGoogle } from 'react-icons/fc';

import { auth, signInWithPopup, GoogleAuthProvider } from '../../services/firebase';

import { useData } from '../Context';

const SignIn = () => {
    const { saveUser } = useData()

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider;

        signInWithPopup(auth, provider)
            .then(result => {
                saveUser(result.user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className={styles.background}>
            <div className='flex flex-col gap-4'>
                <h1 className='text-4xl text-center font-bold'>
                    Chat Web
                </h1>
                <div className='bg-black bg-opacity-50 px-4 py-8 rounded-xl'>
                    <h2 className='text-2xl text-center font-semibold'>
                        Faça login ou cadastre-se
                    </h2>
                    <p className='text-center'>
                        Escolha um dos métodos abaixo para poder usar o Chat Web.
                    </p>

                    <div className='w-full flex justify-center mt-10'>
                        <button
                            type='button'
                            onClick={loginWithGoogle}
                            className='flex justify-center items-center gap-2 bg-blue-500 text-xl font-bold py-2 px-4 rounded-lg'
                        >
                            <FcGoogle className='w-8 h-8' />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
