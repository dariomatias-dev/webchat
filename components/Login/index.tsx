import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '@/services/firebase';

import { useData } from '@/components/Context';
import LoginCreateScreen from "../LoginCreateScreen";

import { FormDataProps } from '@/@types/FormDataProps';

const Login = () => {
    const [error, setError] = useState('');
    const { saveUserUid } = useData();

    const loginData = (data: FormDataProps) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                saveUserUid(userCredential.user.uid);
            })
            .catch(err => {
                if (err.code === 'auth/user-not-found')
                    setError('Usuário não encontrado. Caso seja a primeira vez usando o WebChat crie um usuário.')
                else
                    console.log(err);
            });
    };

    return (
        <LoginCreateScreen
            screen='login'
            error={error}
            formData={loginData}
        />
    );
};

export default Login;
