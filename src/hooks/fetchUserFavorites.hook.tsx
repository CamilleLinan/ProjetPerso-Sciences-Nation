import { useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import favoriteService from '../services/favorite.service';

const useFetchUserFavorites = (userId?: string) => {
    const [ userFavoritesData, setUserFavoritesData ] = useState<Product[]>([]);
    const [ userFavoritesId, setUserFavoritesId ] = useState<string[]>([]);
    const [ error, setError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserFavorites = async () => {
            try {
                if (userId) {
                    const userFavorites = await favoriteService.getUserFavorites(userId);
                    if (userFavorites.length > 0) {
                        setUserFavoritesData(userFavorites);
                    }
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des favoris, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchUserFavoritesId = async () => {
            try {
                if (userId) {
                    const userFavorites = await favoriteService.getUserFavoritesId(userId);
                    if (userFavorites.length > 0) {
                        setUserFavoritesId(userFavorites);
                    }
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des favoris, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserFavorites();
        fetchUserFavoritesId();
    }, [userId]);
    
    return { userFavoritesData, userFavoritesId, error, isLoading };
};

export default useFetchUserFavorites;