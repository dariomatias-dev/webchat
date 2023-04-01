import { useState } from 'react';
import styles from '../../styles/Login.module.scss';
import { BsGoogle } from 'react-icons/bs';

import { auth, signInWithPopup, GoogleAuthProvider } from '../../services/firebase';

import { useData } from '../Context';
import WelcomeImage from '../WelcomeImage';

const imageMessage = 'Faça login para acessar o WebChat.'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <div className='flex w-[800px] h-[500px] rounded-xl overflow-hidden'>
                <WelcomeImage message={imageMessage} />

                <div className='w-2/4 flex justify-center items-center bg-[#1C1C1C]'>
                    <div className='w-full px-8'>
                        <form>
                            <h2 className='text-2xl text-center font-bold'>
                                Login
                            </h2>

                            <label className='flex flex-col gap-1 mt-8'>
                                Email:
                                <input
                                    type='email'
                                    placeholder='exemplo@gmail.com'
                                    onChange={e => setEmail(e.target.value)}
                                    className='bg-transparent border border-zinc-400 rounded-md outline-none px-2 py-1'
                                />
                            </label>
                            <label className='flex flex-col gap-1 mt-4'>
                                Senha:
                                <input
                                    type='password'
                                    placeholder='•••••••••••'
                                    autoComplete='off'
                                    onChange={e => setPassword(e.target.value)}
                                    className='bg-transparent border border-zinc-400 rounded-md outline-none px-2 py-1'
                                />
                            </label>

                            <button
                                type='submit'
                                className='w-full bg-blue-500 font-bold mt-6 py-2 px-4 rounded-lg'
                            >
                                Login
                            </button>
                        </form>

                        <p className='text-blue-700 text-sm text-end my-5'>
                            Esqueceu a senha?
                        </p>

                        <div className='relative flex justify-center items-center'>
                            <span className='w-full inline-block h-px bg-zinc-600 mt-[3px]' />
                            <p className='absolute bg-[#1C1C1C] text-zinc-500 text-sm px-1'>
                                Ou Login com
                            </p>
                        </div>

                        <div className='flex justify-center gap-4 mt-6'>
                            <button
                                type='button'
                                onClick={loginWithGoogle}
                                className='border border-zinc-500 rounded-lg p-3'
                            >
                                <BsGoogle className='w-4 h-4 text-zinc-500' />
                            </button>
                        </div>

                        <p className='text-zinc-400 text-sm text-center mt-4'>
                            Não possue uma conta? <span className='text-blue-700'>Crie uma agora</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;