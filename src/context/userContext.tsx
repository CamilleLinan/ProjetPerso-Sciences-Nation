import { FC, createContext, useEffect, useState } from "react";
import { User } from "../types/user.model";
import { auth } from "../../firebase.config";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    updateProfile 
} from "firebase/auth";

interface UserData {
    currentUser: User | null,
    signUp: (e: React.MouseEvent<HTMLButtonElement>, userName: string, email: string, password: string) => Promise<void>,
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
    const signUp = async (e: React.MouseEvent<HTMLButtonElement>, userName: string, email: string, password: string) => {
        try {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    updateProfile(res.user, {
                        displayName: userName
                    });
                });
        } catch (error) {
            console.error("Sign Up Error:", error);
            throw error;
        }
    };

    const signIn = async (e: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            await signOut(auth);
        } catch {
            alert("Oups. An error occured");
        }
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData: User = {
                    id: user.uid,
                    email: user.email || "",
                    userName: user.displayName || "",
                };
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