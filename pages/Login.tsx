import { auth, signInWithEmailAndPassword } from '@/services/firebase';

import { useData } from '@/components/Context';
import LoginCreateScreen from "../components/LoginCreateScreen"

const Login = () => {
    const { saveUserUid } = useData();

    const loginData = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
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
