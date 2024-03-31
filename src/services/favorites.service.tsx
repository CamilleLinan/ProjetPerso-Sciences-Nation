import { db } from "../../firebase.config";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Favorite } from "../models/favorite.model";

const getUserFavorites = async (userId: string | undefined): Promise<Favorite[]> => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const userFavoritesQuery = query(favoritesRef, where('userId', '==', userId))
        const userFavoritesDocs = await getDocs(userFavoritesQuery);

        const allFavorites: Favorite[] = [];

        userFavoritesDocs.forEach((doc) => {
            const favoriteData = doc.data();
            const favorite: Favorite = {
                id: doc.id,
                userId: favoriteData.userId,
                productsId: favoriteData.productsId
            };
            allFavorites.push(favorite);
        });

        return allFavorites;
    } catch (error) {
        console.log('Erreur lors de la récupération des favoris');
        throw error;
    }
}

const addProductToFavorites = async (userId: string | undefined, productId: string): Promise<Favorite[]> => {
    try {
        const favorites = await getUserFavorites(userId);

        if (favorites) {
            const favoriteDocId = favorites[0].id;
            const favoriteDocRef = doc(db, 'favorites', favoriteDocId);
            const alreadyLiked = favorites[0].productsId.includes(productId);

            if (alreadyLiked) {
                const updatedProductsId = favorites[0].productsId.filter(id => id !== productId);
                await updateDoc(favoriteDocRef, {
                    productsId: updatedProductsId
                });
            } else {
                await updateDoc(favoriteDocRef, {
                    productsId: [...favorites[0].productsId, productId]
                });
            }
        }

        return getUserFavorites(userId);
    } catch (error) {
        console.log('Erreur lors de l\'ajout du produit aux favoris');
        throw error;
    }
}

export default { getUserFavorites, addProductToFavorites };