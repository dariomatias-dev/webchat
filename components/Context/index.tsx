import { useState, useContext, createContext, useEffect } from 'react';
import { auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '@/services/firebase';
import { db, doc, collection, setDoc, getDocs, query, where } from '@/services/firebase';

import { UserProps } from '@/@types/UserProps';
import { UsersProps } from '@/@types/UsersProps';

type DataUserProps = {
    uid: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
};

type ContextDataProps = {
    userUid: string;
    saveUserUid: (uid: string) => void;
    users: UsersProps;
    registerUser: (dataUser: DataUserProps) => void;
    loginCreateAccountWithGoogle: () => void;
};

const ContextData = createContext({} as ContextDataProps);

type ProviderDataProps = {
    children: React.ReactNode;
};

export const ProviderData = ({ children }: ProviderDataProps) => {
    const [userUid, setUserUid] = useState('');
    const [users, setUsers] = useState({} as UsersProps);

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
            const usersWithEmail = await getDocs(query(collection(db, 'users'), where('email', '==', dataUser.email)));
            usersWithEmail.forEach(() => emailFound = true);
            if (!emailFound) registerUser(dataUser);
        }
    };

    const searchUsers = async () => {
        const usersData: UsersProps = {};
        const docs = await getDocs(collection(db, 'users'));
        docs.forEach(doc => {
            const data = doc.data() as UserProps;
            usersData[data.uid] = data;
        });
        setUsers(usersData);
    };

    useEffect(() => {
        if (userUid)
            searchUsers();
    }, [userUid]);

    useEffect(() => {
        onAuthStateChanged(auth, userData => {
            if (userData)
                saveUserUid(userData.uid);
        });
    }, []);

    return (
        <ContextData.Provider value={{
            userUid,
            saveUserUid,
            users,
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
