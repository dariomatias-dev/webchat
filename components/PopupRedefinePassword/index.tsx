import { Dispatch, SetStateAction, MouseEvent } from "react";
import { auth, sendPasswordResetEmail } from "@/services/firebase";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../../styles/InputWithValue.module.scss';

type Props = {
    setPopupRedefinePassword: Dispatch<SetStateAction<boolean>>;
};

const schema = yup.object({
    email: yup.string().email().required('Preencha esse campo.'),
}).required();

type EmailProps = yup.InferType<typeof schema>;

const PopupRedefinePassword = ({ setPopupRedefinePassword }: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailProps>({
        resolver: yupResolver(schema),
    });

    const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const clickedTagNameClass = (e.target as Element).classList[0];

        if (clickedTagNameClass === 'popup-wrapper')
            setPopupRedefinePassword(false);
    };

    const sendEmail = (data: EmailProps) => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                console.log('Email enviao')
            })
            .catch(err => {
                console.log(err);
            });
            
        reset({
            email: '',
        });
        setPopupRedefinePassword(false);
    };

    return (
        <div
            onClick={e => handleClick(e)}
            onSubmit={handleSubmit(sendEmail)}
            className="popup-wrapper fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-60"
        >
            <form className="max-w-[400px] flex flex-col bg-zinc-900 rounded-xl py-12 px-8">
                <h1 className="text-xl text-justify font-bold leading-tight mb-6">
                    Insirá abaixo o email que quer trocar a senha para poder ser enviado um e-mail de redefinição de senha:
                </h1>

                <label className="flex flex-col gap-1">
                    Email:
                    <input
                        type="email"
                        placeholder="examplo@gmail.com"
                        {...register('email')}
                        style={errors.email?.message ? { borderColor: '#FF0000' } : {}}
                        className={`${styles.input} bg-transparent border border-zinc-400 hover:border-zinc-300 focus:border-blue-400 rounded-md outline-none px-2 py-1 transition duration-300`}
                    />
                </label>

                <span className="text-sm text-red-500">
                    {errors.email?.message}
                </span>

                <button
                    type='submit'
                    className='w-full bg-blue-500 bg-opacity-80 hover:bg-opacity-100 font-bold mt-10 py-2 px-4 rounded-lg transition duration-300'
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default PopupRedefinePassword;
