import { FC, createContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import userService from "../services/user.service";
import useFetchFavorites from "../hooks/fetchFavorites.hook";
import { ProductLS } from "../models/LocalStorage/productLS.model";
import { UserLS } from "../models/LocalStorage/userLS.model";

interface UserData {
    currentUser: User | undefined,
    signIn: (email: string, token: string) => void,
    logOut: () => void,
    userFavorites: string[],
    errorFavorites: string | undefined,
    userCart: ProductLS[],
    totalCartQty: number,
    onAddProduct: (productId: string) => void,
    onRemoveProduct: (productId: string) => boolean,
    onDeleteProductFromCart: (productId: string) => void, 
}

interface ProviderProps {
    children: React.ReactNode
}

const userLocalStorage = JSON.parse(localStorage.getItem('user') || 'null') as UserLS | null;
const tokenLocalStorage = userLocalStorage?.token;

// Creating the UserContext
export const UserContext = createContext<UserData>({
    currentUser: undefined,
    signIn: () => {},
    logOut: () => {},
    userFavorites: [],
    errorFavorites: "",
    userCart: [],
    totalCartQty: 0,
    onAddProduct: () => {},
    onRemoveProduct: () => false,
    onDeleteProductFromCart: () => {},
});

const UserContextProvider: FC<ProviderProps> = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState<User | undefined>();
    const [ userFavorites, setUserFavorites ] = useState<string[]>([]);
    const [ errorFavorites, setErrorFavorites ] = useState<string | undefined>();
    const [ userCart, setUserCart ] = useState<ProductLS[]>([]);
    const [ totalCartQty, setTotalCartQty ] = useState<number>(0);

    // Function signIn & logOut
    const signIn = (id: string, token: string) => {
        const newUser = { id, token };
        localStorage.setItem('user', JSON.stringify(newUser))
    };

    const logOut = async () => {
        localStorage.clear();
        window.location.reload();
    }

    const userIsLoggedIn = !!tokenLocalStorage;

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (userLocalStorage) {
                const userData = await userService.getUserById(userLocalStorage.id);
                setCurrentUser(userData ?? undefined);
            } else {
                return new Error("User not found")
            }
        }

        fetchUserData();
    }, []);

    // Fetch user favorites & cart
    const { favoritesId, error: errorFavoritesId } = useFetchFavorites({
        options: {fetchAllId: true},
        userId: currentUser?.id,
    });

    useEffect(() => {
        if (currentUser?.id) {
            setUserFavorites(favoritesId ?? []);
            setErrorFavorites(errorFavoritesId);

            const cart = JSON.parse(localStorage.getItem('cart') || '[]') as ProductLS[];
            setUserCart(cart.length ? cart : []);
        }

    }, [favoritesId, errorFavoritesId, currentUser]);

    // Update total quantity
    useEffect(() => {
        const totalQty = userCart.reduce((total, item) => total + item.qty, 0);
        setTotalCartQty(totalQty);
    }, [userCart]);

    // Function to add product to cart
    const onAddProduct = (productId: string) => {
        if (userIsLoggedIn) {
            const existingProduct = userCart.find(i => i.productId === productId);

            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                userCart.push({ productId, qty: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(userCart));
            setUserCart([...userCart]);
        } else {
            alert('Vous devez être connecté pour ajouter un produit au panier.');
        }
    }

    const onRemoveProduct = (productId: string): boolean => {
        const existingProduct = userCart.find(i => i.productId === productId);
        if (existingProduct && existingProduct.qty > 1) {
            existingProduct.qty -= 1;
    
            localStorage.setItem('cart', JSON.stringify(userCart));
            setUserCart([...userCart]);
            return true;
        } else {
            return false;
        }
    };

    const onDeleteProductFromCart = (productId: string) => {
        const updatedCart = userCart.filter(product => product.productId !== productId);

        if (updatedCart.length === 0) {
            localStorage.removeItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }

        setUserCart(updatedCart);
    };

    // Context value to be provided
    const contextValue = {
        currentUser,
        userIsLoggedIn,
        signIn,
        logOut,
        userFavorites,
        errorFavorites,
        userCart,
        totalCartQty,
        onAddProduct,
        onRemoveProduct,
        onDeleteProductFromCart,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;