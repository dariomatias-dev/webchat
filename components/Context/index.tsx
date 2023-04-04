import { useState, useContext, createContext, useEffect } from 'react';
import { auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '@/services/firebase';
import { db, doc, collection, setDoc, getDocs, query, where } from '@/services/firebase';

type DataUserProps = {
    uid: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
};

type ContextDataProps = {
    userUid: string;
    saveUserUid: (uid: string) => void;
    registerUser: (dataUser: DataUserProps) => void;
    loginCreateAccountWithGoogle: () => void;
};

const ContextData = createContext({} as ContextDataProps);

type ProviderDataProps = {
    children: React.ReactNode;
};

export const ProviderData = ({ children }: ProviderDataProps) => {
    const [userUid, setUserUid] = useState('');

    const saveUserUid = (uid: string) => {
        setUserUid(uid);
    }

    const registerUser = async (dataUser: DataUserProps) => {
        await setDoc(doc(db, 'users', dataUser.uid), dataUser);
        saveUserUid(dataUser.uid);
    };

    const loginCreateAccountWithGoogle = async () => {
        const provider = new GoogleAuthProvider;

        await signInWithPopup(auth, provider)
            .then(result => {
                saveUserUid(result.user.uid);
                const dataUser = {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    photoUrl: result.user.photoURL,
                };
                registeredEmail(dataUser);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const registeredEmail = async (dataUser: DataUserProps) => {
        if (dataUser.email !== null) {
            let emailFound = false;
            const users = await getDocs(query(collection(db, 'users'), where('email', '==', dataUser.email)));
            users.forEach(() => emailFound = true);
            if (!emailFound) registerUser(dataUser)
            else console.log('email cadastrado');
        }
    };

    useEffect(() => {
        if (userUid)
            onAuthStateChanged(auth, userData => {
                if (userData)
                    saveUserUid(userData.uid);
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
            registerUser,
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
