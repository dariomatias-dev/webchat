import styles from '../../styles/Login.module.scss';
import { BsGoogle } from 'react-icons/bs';

import { useData } from '../Context';
import WelcomeImage from '../WelcomeImage';
import Form from '../Form';

const screenMessages = {
    login: {
        welcome: 'Faça login para acessar o WebChat.',
        connect: 'Ou Login com',
        changeScreen: {
            part1: 'Não possue uma conta?',
            parte2: 'Crie uma agora',
        },
    },
    signIn: {
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
    formData: (email: string, password: string) => void;
};

const LoginCreateScreen = ({ screen, formData }: Props) => {
    const { loginCreateAccountWithGoogle } = useData();

    return (
        <div className={styles.background}>
            <div className='flex w-[800px] h-[500px] rounded-xl overflow-hidden'>
                <WelcomeImage message={screenMessages[screen as keyof typeof screenMessages].welcome} />

                <div className='w-2/4 flex justify-center items-center bg-[#1C1C1C]'>
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
                            style={screen === 'login' ? { marginTop: '20px' } : { marginTop: '32px' }}
                            className='relative flex justify-center items-center'
                        >
                            <span className='w-full inline-block h-px bg-zinc-600 mt-[3px]' />
                            <p className='absolute bg-[#1C1C1C] text-zinc-500 text-sm px-1'>
                                {screenMessages[screen as keyof typeof screenMessages].connect}
                            </p>
                        </div>

                        <div className='flex justify-center gap-4 mt-6'>
                            <button
                                type='button'
                                onClick={loginCreateAccountWithGoogle}
                                className='border border-zinc-500 rounded-lg p-3'
                            >
                                <BsGoogle className='w-4 h-4 text-zinc-500' />
                            </button>
                        </div>

                        <p className='text-zinc-400 text-sm text-center mt-4'>
                            {screenMessages[screen as keyof typeof screenMessages].changeScreen.part1}
                            <span className='text-blue-700'> {screenMessages[screen as keyof typeof screenMessages].changeScreen.parte2}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCreateScreen;
