import { 
    FC, 
    createContext, 
    useCallback, 
    useEffect, 
    useState 
} from "react";
import { User } from "../models/user.model";
import userService from "../services/user.service";
import useFetchUserFavorites from "../hooks/fetchUserFavorites.hook";
// import { Cart } from "../models/cart.model";
// import cartService from "../services/cart.service";

interface UserData {
    currentUser: User | undefined,
    signIn: (email: string, token: string) => void,
    logOut: () => void,
    userFavorites: string[] | [],
    errorFavorites: string | undefined,
    // userCart: Cart | null,
    // totalCartQty: number,
    onAddProductToCart: (productId: string) => Promise<void>,
}

interface ProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserData>({
    currentUser: undefined,
    signIn: async () => {},
    logOut: async () => {},
    userFavorites: [],
    errorFavorites: "",
    // userCart: null,
    // totalCartQty: 0,
    onAddProductToCart: async () => {},
});

const userIdLocalStorage = localStorage.getItem('userId');
const tokenLocalStorage = localStorage.getItem('token');

const UserContextProvider: FC<ProviderProps> = (props) => {
    const [ userId, setUserId ] = useState(userIdLocalStorage);
    const [ token, setToken ] = useState(tokenLocalStorage);
    const [ currentUser, setCurrentUser ] = useState<User | undefined>();
    const [ userFavorites, setUserFavorites ] = useState<string[] | []>([]);
    const [ errorFavorites, setErrorFavorites ] = useState<string>();
    // const [ userCart, setUserCart ] = useState<Cart | null>(null);
    // const [ totalCartQty, setTotalCartQty ] = useState<number>(0);

    const signIn = (userId: string, token: string) => {
        setUserId(userId);
        setToken(token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
    };

    const logOut = async () => {
        localStorage.clear();
        setUserId(null);
        setToken(null);
        window.location.reload();
    }

    const userIsLoggedIn = !!token;

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                const userData = await userService.getUserById(userId);
                setCurrentUser(userData ?? undefined);
                console.log(userData);
            } else {
                return new Error("User not found")
            }
        }

        fetchUserData();
    }, [userId]);

    const { userFavoritesId, errorUserFavoritesData } = useFetchUserFavorites(userId ?? "");

    useEffect(() => {
        if (userId) {
            setUserFavorites(userFavoritesId ?? []);
            setErrorFavorites(errorUserFavoritesData);
            console.log('fav context', userFavoritesId);
        }

        // const fetchUserCart = async () => {
        //     if (currentUser) {
        //         const cart = await cartService.getUserCart(currentUser.id);
        //         setUserCart(cart);
        //         if (cart) {
        //             const total = cart.products.reduce((sum, product) => sum + product.qty, 0);
        //             setTotalCartQty(total);
        //         }
        //     }
        // };
    }, [errorUserFavoritesData, userFavoritesId, userId]);

    const onAddProductToCart = useCallback(async () => {
        if (currentUser) {
            // try {
            //     const updatedCart = await cartService.addProductToCart(currentUser.id, productId);
            //     setUserCart(updatedCart);
            //     setTotalCartQty(prevQty => prevQty + 1);
            // } catch (error) {
            //     console.error("Error adding product to cart:", error);
            // }
        }
    }, [currentUser]);

    const contextValue = {
        currentUser: currentUser,
        token: token,
        isLoggedIn: userIsLoggedIn,
        signIn: signIn,
        logOut: logOut,
        userFavorites: userFavorites,
        errorFavorites: errorFavorites,
        // userCart: userCart,
        // totalCartQty: totalCartQty,
        onAddProductToCart: onAddProductToCart
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;