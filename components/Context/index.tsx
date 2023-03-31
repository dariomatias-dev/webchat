import { useState, useContext, createContext, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '@/services/firebase';

type ContextDataProps = {
    user: User;
    saveUser: (data: User) => void;
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
        }}>
            {children}
        </ContextData.Provider>
    );
};

export const useData = () => {
    const context = useContext(ContextData);
    return context;
};
