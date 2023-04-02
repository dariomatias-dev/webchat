import { useState, FormEvent } from 'react';

type Props = {
    formData: (email: string, password: string) => void;
    screen: string;
}

const Form = ({ formData, screen }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        formData(
            email,
            password,
        );
    };

    const formName = screen === 'login' ? 'Login' : 'Criar';

    return (
        <form onSubmit={handleSubmit}>
            <h2
                style={screen === 'login' ? { marginBottom: '24px' } : { marginBottom: '12px' }}
                className='text-2xl text-center font-bold'
            >
                {formName}
                {formName !== 'Login' && ' conta'}
            </h2>

            {
                screen === 'signIn' && (
                    <label className='flex flex-col gap-1 mb-2'>
                        Nome:
                        <input
                            type='text'
                            placeholder='Dário Matias'
                            onChange={e => setName(e.target.value)}
                            className='bg-transparent border border-zinc-400 rounded-md outline-none px-2 py-1'
                        />
                    </label>
                )
            }

            <label className='flex flex-col gap-1'>
                Email:
                <input
                    type='email'
                    placeholder='exemplo@gmail.com'
                    onChange={e => setEmail(e.target.value)}
                    className='bg-transparent border border-zinc-400 rounded-md outline-none px-2 py-1'
                />
            </label>
            <label className='flex flex-col gap-1 mt-2'>
                Senha:
                <input
                    type='password'
                    placeholder='•••••••••••'
                    autoComplete='off'
                    onChange={e => setPassword(e.target.value)}
                    className='bg-transparent border border-zinc-400 rounded-md outline-none px-2 py-1'
                />
            </label>

            {
                screen === 'login' && (
                    <label className='flex items-center gap-1 text-zinc-400 text-sm mt-4'>
                        <input
                            type="checkbox"
                            className='w-[14px] h-[14px] mt-[2px]'
                        />
                        Manter conectado após sair
                    </label>
                )
            }

            <button
                type='submit'
                className='w-full bg-blue-500 font-bold mt-6 py-2 px-4 rounded-lg'
            >
                {formName}
            </button>
        </form>
    );
};

export default Form;
