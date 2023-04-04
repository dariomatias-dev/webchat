import { auth, signInWithEmailAndPassword } from '@/services/firebase';

import { useData } from '@/components/Context';
import LoginCreateScreen from "../LoginCreateScreen";

import { FormDataProps } from '@/@types/FormDataProps';

const Login = () => {
    const { saveUserUid } = useData();

    const loginData = (data: FormDataProps) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                saveUserUid(userCredential.user.uid);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <LoginCreateScreen
            screen='login'
            formData={loginData}
        />
    );
};

export default Login;
