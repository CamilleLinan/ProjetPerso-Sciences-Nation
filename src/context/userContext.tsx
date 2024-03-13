import { FC, createContext, useEffect, useState } from "react";
import { User } from "../types/user.model";
import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface UserData {
    currentUser: User | null,
    signIn: (email: string, password: string) => Promise<void>,
    signUp: (email: string, password: string) => Promise<void>
}

interface ProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserData>({
    currentUser: null,
    signIn: async () => {},
    signUp: async () => {}
});

const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
    return {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        password: ''
    };
};

const UserContextProvider: FC<ProviderProps> = (props) => {
    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign Up Error:", error);
            throw error;
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const user = mapFirebaseUserToUser(firebaseUser);
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, signIn, signUp }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;