import { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '@/services/firebase';

import { useData } from '../Context';
import LoginCreateScreen from '../LoginCreateScreen';

import { FormDataProps } from '@/@types/FormDataProps';

const CreateUser = () => {
    const [error, setError] = useState('');
    const { registerUser } = useData();

    const createUserData = async (data: FormDataProps) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                const dataUser = {
                    uid: userCredential.user.uid,
                    name: userCredential.user.displayName || data.name || null,
                    email: userCredential.user.email,
                    photoUrl: userCredential.user.photoURL,
                };
                registerUser(dataUser);
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use')
                    setError('O email inserido já está em uso. Forneça outro email ou faça login no email que colocou.');
                else
                    console.log(err);
            });
    };

    return (
        <LoginCreateScreen
            screen='createUser'
            error={error}
            formData={createUserData}
        />
    );
};

export default CreateUser;
