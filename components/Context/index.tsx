import { useState, useContext, createContext, useEffect } from 'react';
import { auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '@/services/firebase';

type ContextDataProps = {
    userUid: string;
    saveUserUid: (uid: string) => void;
    loginCreateAccountWithGoogle: () => void;
};

const ContextData = createContext({} as ContextDataProps);

type ProviderDataProps = {
    children: React.ReactNode;
}

export const ProviderData = ({ children }: ProviderDataProps) => {
    const [userUid, setUserUid] = useState('');

    const saveUserUid = (uid: string) => {
        setUserUid(uid);
    };

    const loginCreateAccountWithGoogle = () => {
        const provider = new GoogleAuthProvider;

        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user)
                saveUserUid(result.user.uid);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (userUid)
            onAuthStateChanged(auth, userData => {
                if (userData)
                    setUserUid(userData.uid)
            });
    }, []);

    useEffect(() => {
        if (userUid)
            console.log(userUid)
    }, [userUid]);

    return (
        <ContextData.Provider value={{
            userUid,
            saveUserUid,
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
