import { Dispatch, SetStateAction } from 'react';

type Props = {
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
}

const Form = ({ setEmail, setPassword }: Props) => {
    return (
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
    );
};

export default Form;
