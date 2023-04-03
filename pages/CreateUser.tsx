import { auth, createUserWithEmailAndPassword } from '@/services/firebase';

import { useData } from '../components/Context';
import LoginCreateScreen from '../components/LoginCreateScreen';

import { FormDataProps } from '@/@types/FormDataProps';

const SignIn = () => {
    const { saveUserUid } = useData();

    const singnInData = (data: FormDataProps) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                saveUserUid(userCredential.user.uid);
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <LoginCreateScreen
            screen='createUser'
            formData={singnInData}
        />
    );
};

export default SignIn;
