import { useState, useEffect } from 'react';
import FavoritesService from '../services/favorites.service';
import { Favorite } from '../models/favorite.model';

const useFetchUserFavorites = (userId: string | undefined) => {
    const [ userFavoritesData, setUserFavoritesData ] = useState<Favorite[]>([]);
    const [ errorUserFavoritesData, setErrorUserFavoritesData ] = useState<string>('');
    const [ isLoadingUserFavoritesData, setIsLoadingUserFavoritesData ] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserFavorites = async () => {
            try {
                const userFavorites = await FavoritesService.getUserFavorites(userId);
                if (userFavorites.length > 0) {
                    setUserFavoritesData(userFavorites);
                }
            } catch (error) {
                setErrorUserFavoritesData("Une erreur est survenue lors de la récupération des favoris, veuillez réessayer plus tard.");
            } finally {
                setIsLoadingUserFavoritesData(false);
            }
        };
        fetchUserFavorites();
    }, [userId]);
    
    return { userFavoritesData, errorUserFavoritesData, isLoadingUserFavoritesData };
};

export default useFetchUserFavorites;