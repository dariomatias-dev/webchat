import { auth, createUserWithEmailAndPassword } from '@/services/firebase';

import { useData } from '../components/Context';
import LoginCreateScreen from '../components/LoginCreateScreen';

const SignIn = () => {
    const { saveUserUid } = useData();

    const singnInData = (email: string, password: string, name?: string) => {
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
            screen='createUser'
            formData={singnInData}
        />
    );
};

export default SignIn;
