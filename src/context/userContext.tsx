import { FC, createContext, useCallback, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { auth, db } from "../../firebase.config";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Favorite } from "../models/favorite.model";
import { Cart } from "../models/cart.model";
import cartService from "../services/cart.service";
import favoritesService from "../services/favorites.service";

interface UserData {
    currentUser: User | null,
    signUp: (e: React.MouseEvent<HTMLButtonElement>, userName: string, email: string, password: string) => Promise<void>,
    signIn: (e: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => Promise<void>,
    logOut: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    userFavorites: Favorite[] | [],
    userCart: Cart | null,
    totalCartQty: number,
    onAddProductToCart: (productId: string) => Promise<void>,
}

interface ProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserData>({
    currentUser: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    userFavorites: [],
    userCart: null,
    totalCartQty: 0,
    onAddProductToCart: async () => {},
});

const UserContextProvider: FC<ProviderProps> = (props) => {
    const signUp = async (e: React.MouseEvent<HTMLButtonElement>, userName: string, email: string, password: string) => {
        try {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const favCollection = collection(db, "favorites");
                    const cartCollection = collection(db, "carts");
                    
                    addDoc(favCollection, {user: res.user.uid, products: []})
                    addDoc(cartCollection, {user: res.user.uid, products: []})
                    
                    updateProfile(res.user, {
                        displayName: userName
                    });

                    localStorage.setItem("userId", `${res.user.uid}`);
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
                .then((res) => {
                    localStorage.setItem("userId", `${res.user.uid}`);
                })
        } catch (error) {
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            await signOut(auth)
                .then(() => {
                    localStorage.clear();
                })
        } catch {
            alert("Une erreur est apparue lors de la déconnexion");
        }
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userFavorites, setUserFavorites] = useState<Favorite[] | []>([]);
    const [userCart, setUserCart] = useState<Cart | null>(null);
    const [totalCartQty, setTotalCartQty] = useState<number>(0);

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

    useEffect(() => {
        const fetchUserFavorites = async () => {
            const favorites = await favoritesService.getUserFavorites(currentUser?.id);
            setUserFavorites(favorites);
        };

        const fetchUserCart = async () => {
            if (currentUser) {
                const cart = await cartService.getUserCart(currentUser.id);
                setUserCart(cart);
                if (cart) {
                    const total = cart.products.reduce((sum, product) => sum + product.qty, 0);
                    setTotalCartQty(total);
                }
            }
        };

        if (currentUser) {
            fetchUserFavorites();
            fetchUserCart();
        }
    }, [currentUser]);

    const onAddProductToCart = useCallback(async (productId: string) => {
        if (currentUser) {
            try {
                const updatedCart = await cartService.addProductToCart(currentUser.id, productId);
                setUserCart(updatedCart);
                setTotalCartQty(prevQty => prevQty + 1);
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        }
    }, [currentUser]);

    return (
        <UserContext.Provider 
            value={{ 
                currentUser, 
                userFavorites, 
                userCart, 
                signIn, 
                signUp, 
                logOut, 
                totalCartQty,
                onAddProductToCart, 
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;