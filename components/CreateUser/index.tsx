import { auth, createUserWithEmailAndPassword, db, collection, getDocs, query, where } from '@/services/firebase';

import { useData } from '../Context';
import LoginCreateScreen from '../LoginCreateScreen';

import { FormDataProps } from '@/@types/FormDataProps';

const CreateUser = () => {
    const { registerUser } = useData();

    const createUserData = async (data: FormDataProps) => {
        let createUser = true;
        const registeredEmail = await getDocs(query(collection(db, 'users'), where('email', '==', data.email)));
        registeredEmail.forEach(() => createUser = false);

        if (createUser)
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
                    console.log(err)
                });
    };

    return (
        <LoginCreateScreen
            screen='createUser'
            formData={createUserData}
        />
    );
};

export default CreateUser;
