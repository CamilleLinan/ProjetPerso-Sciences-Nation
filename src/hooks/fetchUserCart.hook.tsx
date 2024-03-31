import { useState, useEffect } from 'react';
// import FavoritesService from '../services/favorites.service';
// import { Favorite } from '../models/favorite.model';
import cartService from '../services/cart.service';
import { Cart } from '../models/cart.model';

const useFetchUserCart = (userId: string | undefined) => {
    const [ userCartData, setUserCartData ] = useState<Cart>();
    const [ errorUserCartData, setErrorUserCartData ] = useState<string>('');
    const [ isLoadingUserCartData, setIsLoadingUserCartData ] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const userCart = await cartService.getUserCart(userId);
                if (userCart) {
                    setUserCartData(userCart);
                }
            } catch (error) {
                setErrorUserCartData("Une erreur est survenue lors de la récupération du panier, veuillez réessayer plus tard.");
            } finally {
                setIsLoadingUserCartData(false);
            }
        };

        fetchUserCart();
    }, [userId]);

    return { userCartData, errorUserCartData, isLoadingUserCartData };
};

export default useFetchUserCart;