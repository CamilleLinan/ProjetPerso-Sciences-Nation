import { FC, createContext, useEffect, useState } from "react";
import { User } from "../types/user.model";
import { auth } from "../../firebase.config";
import { db } from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface UserData {
    currentUser: User | null,
    signUp: (e: React.MouseEvent<HTMLButtonElement>, lastName: string, firstName: string, email: string, password: string) => Promise<void>,
    signIn: (e: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => Promise<void>,
    logOut: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

interface ProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserData>({
    currentUser: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {}
});

const UserContextProvider: FC<ProviderProps> = (props) => {
    const signUp = async (e: React.MouseEvent<HTMLButtonElement>, lastName: string, firstName: string, email: string, password: string) => {
        try {
            e.preventDefault();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userUid = user.uid;
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });
            await setDoc(doc(db, "users", userUid), {
                email: email,
                lastName: lastName,
                firstName: firstName,
                password: password,
            })
        } catch (error) {
            console.error("Sign Up Error:", error);
            throw error;
        }
    };

    const signIn = async (e: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            await signOut(auth)
        } catch {
            alert("Oups. An error occured")
        }
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // const user = mapFirebaseUserToUser(currentUser);
                const userData: User = {
                    id: user.uid,
                    email: user.email || "",
                    lastName: "",
                    firstName: "",
                    password: ""
                };
                console.log('user: ', user);
                setCurrentUser(userData);
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, signIn, signUp, logOut }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;