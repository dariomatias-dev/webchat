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
    const { loginCreateAccountWithGoogle, registerScreen } = useData();

    return (
        <div className='w-[850px] h-[550px] flex justify-center rounded-xl mx-8 select-none overflow-hidden'>
            <div className='md:w-2/4 hidden md:flex'>
                <WelcomeImage message={screenMessages[screen as keyof typeof screenMessages].welcome} />
            </div>

            <div
                style={screen === 'login' ? { alignItems: 'center' } : {}}
                className='w-[400px] md:w-2/4 flex justify-center bg-[#1C1C1C] rounded-xl md:rounded-none overflow-auto'
            >
                <div className='w-full px-8'>
                    <Form
                        formData={formData}
                        screen={screen}
                    />

                    {
                        screen === 'login' && (
                            <p className='text-blue-700 hover:text-blue-600 text-sm text-end mt-5 transition duration-300'>
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
                            className='border border-zinc-500 hover:border-zinc-400 rounded-lg p-3 group transition duration-300'
                        >
                            <BsGoogle className='w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition duration-500' />
                        </button>
                    </div>

                    <p className='flex justify-center gap-1 text-zinc-400 text-sm text-center pb-4'>
                        {screenMessages[screen as keyof typeof screenMessages].changeScreen.part1}

                        <button
                            type='button'
                            onClick={() => registerScreen(screen === 'login' ? 'createUser' : 'login')}
                            className='text-blue-700 hover:text-blue-600 transition duration-300'
                        >
                            {screenMessages[screen as keyof typeof screenMessages].changeScreen.parte2}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginCreateScreen;
