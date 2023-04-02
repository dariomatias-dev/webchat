import LoginCreateScreen from "../LoginCreateScreen"

const Login = () => {
    const loginData= (email: string, password: string) => {

    };

    return (
        <LoginCreateScreen
            screen='login'
            formData={loginData}
        />
    );
};

export default Login;
