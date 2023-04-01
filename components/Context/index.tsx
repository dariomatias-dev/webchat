import { useState, useContext, createContext, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '@/services/firebase';

type ContextDataProps = {
    user: User;
    saveUser: (data: User) => void;
    loginCreateAccountWithGoogle: () => void;
};

const ContextData = createContext({} as ContextDataProps);

type ProviderDataProps = {
    children: React.ReactNode;
}

export const ProviderData = ({ children }: ProviderDataProps) => {
    const [user, setUser] = useState({} as User);

    const saveUser = (data: User) => {
        setUser(data);
    };

    const loginCreateAccountWithGoogle = () => {
        const provider = new GoogleAuthProvider;

        signInWithPopup(auth, provider)
            .then(result => {
                saveUser(result.user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, userData => {
            if (userData)
                setUser(userData)
        });
    }, []);

    useEffect(() => {
        if (JSON.stringify(user) !== '{}')
            console.log(user.displayName, user.email);
    }, [user]);

    return (
        <ContextData.Provider value={{
            user,
            saveUser,
            loginCreateAccountWithGoogle,
        }}>
            {children}
        </ContextData.Provider>
    );
};

export const useData = () => {
    const context = useContext(ContextData);
    return context;
};
