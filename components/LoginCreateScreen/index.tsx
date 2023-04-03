import Link from 'next/link';
import styles from '../../styles/Login.module.scss';
import { BsGoogle } from 'react-icons/bs';

import { useData } from '../Context';
import Form from '../Form';
import WelcomeImage from '../WelcomeImage';

import { FormDataProps } from '@/@types/FormDataProps';

const screenMessages = {
    login: {
        welcome: 'Faça login para acessar o WebChat.',
        connect: 'Ou Login com',
        changeScreen: {
            part1: 'Não possue uma conta?',
            parte2: 'Crie uma agora',
        },
    },
    createUser: {
        welcome: 'Crie uma conta para acessar o WebChat.',
        connect: 'Ou criar com',
        changeScreen: {
            part1: 'Possue uma conta?',
            parte2: 'Entre nela agora',
        },
    },
};

type Props = {
    screen: string;
    formData: (data: FormDataProps) => void;
};

const LoginCreateScreen = ({ screen, formData }: Props) => {
    const { loginCreateAccountWithGoogle } = useData();

    return (
        <div className={styles.background}>
            <div className='flex w-[800px] h-[550px] rounded-xl overflow-hidden'>
                <WelcomeImage message={screenMessages[screen as keyof typeof screenMessages].welcome} />

                <div
                    style={screen === 'login' ? { alignItems: 'center' } : {}}
                    className='w-2/4 flex justify-center bg-[#1C1C1C] overflow-auto'
                >
                    <div className='w-full px-8'>
                        <Form
                            formData={formData}
                            screen={screen}
                        />

                        {
                            screen === 'login' && (
                                <p className='text-blue-700 text-sm text-end mt-5'>
                                    Esqueceu a senha?
                                </p>
                            )
                        }

                        <div
                            style={screen === 'login' ? { marginTop: '20px' } : { marginTop: '24px' }}
                            className='relative flex justify-center items-center'
                        >
                            <span className='w-full inline-block h-px bg-zinc-600 mt-[3px]' />
                            <p className='absolute bg-[#1C1C1C] text-zinc-500 text-sm px-1'>
                                {screenMessages[screen as keyof typeof screenMessages].connect}
                            </p>
                        </div>

                        <div
                            style={screen === 'login' ? { marginTop: '28px', marginBottom: '16px' } : { marginTop: '20px', marginBottom: '8px' }}
                            className='flex justify-center gap-4'
                        >
                            <button
                                type='button'
                                onClick={loginCreateAccountWithGoogle}
                                className='border border-zinc-500 rounded-lg p-3'
                            >
                                <BsGoogle className='w-4 h-4 text-zinc-500' />
                            </button>
                        </div>

                        <p className='flex justify-center gap-1 text-zinc-400 text-sm text-center pb-4'>
                            {screenMessages[screen as keyof typeof screenMessages].changeScreen.part1}
                            <Link
                                href={screen === 'login' ? '/CreateUser' : '/Login'}
                                legacyBehavior
                            >
                                <a className='text-blue-700'>
                                    {screenMessages[screen as keyof typeof screenMessages].changeScreen.parte2}
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCreateScreen;
