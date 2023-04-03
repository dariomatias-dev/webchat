import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import styles from '../../styles/Form.module.scss';

import { FormDataProps } from '@/@types/FormDataProps';

const schema = yup.object({
    name: yup.string().min(3, 'O nome precisa ter 3 ou mais letras. ').optional(),
    email: yup.string().email().required('O email é obrigatório.'),
    password: yup.string().min(6, 'A senha precisa ter 6 ou mais caracteres.').required('A senha é obrigatória.'),
    confirmPassword: yup.string().min(6, 'A confirmação da senha precisa ter 6 ou mais caracteres.').oneOf([yup.ref('password')], 'As senhas precisam ser iguais.'),
    keepConnected: yup.boolean().optional(),
}).required();


type Props = {
    screen: string;
    formData: (data: FormDataProps) => void;
};

const borderRed = { borderColor: '#FF0000' };

const Form = ({ formData, screen }: Props) => {
    const [buttonShowPassword, setbuttonShowPassword] = useState(false);
    const [buttonShowConfirmationPassword, setbuttonShowConfirmationPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({
        resolver: yupResolver(schema),
    });

    const sendFormData = (data: FormDataProps) => {
        formData(data);

        reset({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            keepConnected: false,
        });
    };

    const formName = screen === 'login' ? 'Login' : 'Criar';

    const showPassword = buttonShowPassword ? 'text' : 'password';
    const showConfirmationPassword = buttonShowConfirmationPassword ? 'text' : 'password';

    return (
        <form onSubmit={handleSubmit(sendFormData)}>
            <h2
                style={screen === 'createUser' ?  { marginTop: '24px', marginBottom: '12px' } : {}}
                className='text-2xl text-center font-bold'
            >
                {formName}
                {formName !== 'Login' && ' conta'}
            </h2>

            {
                screen === 'createUser' && (
                    <div className='mb-1'>
                        <label className='flex flex-col gap-1'>
                            Nome:
                            <input
                                type='text'
                                placeholder='Dário Matias'
                                {...register('name')}
                                style={errors.name ? borderRed : {}}
                                className={`${styles.input} bg-transparent border border-zinc-400 hover:border-zinc-300 focus:border-blue-400 rounded-md outline-none px-2 py-1 transition duration-300`}
                            />
                        </label>
                        <span className='text-red-500 text-sm'>
                            {errors.name?.message}
                        </span>
                    </div>
                )
            }

            <div>
                <label className='flex flex-col gap-1'>
                    Email:
                    <input
                        type='email'
                        placeholder='exemplo@gmail.com'
                        {...register('email')}
                        style={errors.email ? borderRed : {}}
                        className={`${styles.input} bg-transparent border border-zinc-400 hover:border-zinc-300 focus:border-blue-400 rounded-md outline-none px-2 py-1 transition duration-300`}
                    />
                </label>
                <span className='text-red-500 text-sm'>
                    {errors.email?.message}
                </span>
            </div>
            <div style={screen === 'login' ? { marginTop: '8px' } : { marginTop: '4px' }}>
                <label className='flex flex-col gap-1'>
                    Senha:
                    <div className='relative'>
                        <input
                            type={showPassword}
                            placeholder='•••••••••••'
                            autoComplete='off'
                            {...register('password')}
                            style={errors.password ? borderRed : {}}
                            className={`${styles.input} w-full bg-transparent border border-zinc-400 hover:border-zinc-300 focus:border-blue-400 rounded-md outline-none px-2 py-1 transition duration-300`}
                        />
                        <button
                            type='button'
                            onClick={() => setbuttonShowPassword(!buttonShowPassword)}
                            className='absolute top-[28%] right-2'
                        >
                            {
                                buttonShowPassword ?
                                    <BsFillEyeFill className='w-4 h-4' />
                                    :
                                    <BsFillEyeSlashFill className='w-4 h-4' />
                            }
                        </button>
                    </div>
                </label>
                <span className='text-red-500 text-sm'>
                    {errors.password?.message}
                </span>
            </div>

            {
                screen === 'createUser' && (
                    <div className='mt-2'>
                        <label className='flex flex-col gap-1'>
                            Confirmar senha:
                            <div className='relative'>
                                <input
                                    type={showConfirmationPassword}
                                    placeholder='•••••••••••'
                                    autoComplete='off'
                                    {...register('confirmPassword')}
                                    style={errors.confirmPassword ? borderRed : {}}
                                    className={`${styles.input} w-full bg-transparent border border-zinc-400 hover:border-zinc-300 focus:border-blue-400 rounded-md outline-none px-2 py-1 transition duration-300`}
                                />
                                <button
                                    type='button'
                                    onClick={() => setbuttonShowConfirmationPassword(!buttonShowConfirmationPassword)}
                                    className='absolute top-[28%] right-2'
                                >
                                    {
                                        buttonShowConfirmationPassword ?
                                            <BsFillEyeFill className='w-4 h-4' />
                                            :
                                            <BsFillEyeSlashFill className='w-4 h-4' />
                                    }
                                </button>
                            </div>
                        </label>
                        <span className='text-red-500 text-sm'>
                            {errors.confirmPassword?.message}
                        </span>
                    </div>
                )
            }

            {
                screen === 'login' && (
                    <label className='flex items-center gap-1 text-zinc-400 text-sm mt-4'>
                        <input
                            type="checkbox"
                            {...register('keepConnected')}
                            className='w-[14px] h-[14px] mt-[2px]'
                        />
                        Manter conectado após sair
                    </label>
                )
            }

            <button
                type='submit'
                style={screen === 'login' ? { marginTop: '24px' } : { marginTop: '20px' }}
                className='w-full bg-blue-500 font-bold py-2 px-4 rounded-lg'
            >
                {formName}
            </button>
        </form>
    );
};

export default Form;
