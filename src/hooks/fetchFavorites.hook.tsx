import { useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import favoriteService from '../services/favorite.service';

interface UseFetchFavoritesOptions {
    fetchAll?: boolean;
    fetchAllId?: boolean;
}

interface FetchFavoritesProps {
    options?: UseFetchFavoritesOptions,
    userId?: string,
}

const useFetchFavorites = ({ options, userId }: FetchFavoritesProps) => {
    const [ favoritesData, setFavoritesData ] = useState<Product[]>([]);
    const [ favoritesId, setFavoritesId ] = useState<string[]>([]);
    const [ error, setError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (userId) {
                    const favorites = await favoriteService.getFavorites(userId);
                    if (favorites.length > 0) {
                        setFavoritesData(favorites);
                    }
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des favoris, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchFavoritesId = async () => {
            try {
                if (userId) {
                    const favorites = await favoriteService.getFavoritesId(userId);
                    if (favorites.length > 0) {
                        setFavoritesId(favorites);
                    }
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des favoris, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        if (options?.fetchAll) fetchFavorites();
        if (options?.fetchAllId) fetchFavoritesId();
    }, [options?.fetchAll, options?.fetchAllId, userId]);
    
    return { favoritesData, favoritesId, error, isLoading };
};

export default useFetchFavorites;