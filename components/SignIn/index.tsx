import { auth, createUserWithEmailAndPassword } from '@/services/firebase';

import { useData } from '../Context';
import LoginCreateScreen from './../LoginCreateScreen';

const SignIn = () => {
    const { saveUserUid } = useData();

    const singnInData = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                saveUserUid(userCredential.user.uid);
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <LoginCreateScreen
            screen='signIn'
            formData={singnInData}
        />
    );
};

export default SignIn;
