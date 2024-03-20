import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Favorite } from "../models/favorite.model";
    
const getUserFavorites = async (userId: string | undefined): Promise<Favorite[]> => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const querySnapshot = await getDocs(favoritesRef);

        const allFavorites: Favorite[] = [];
        querySnapshot.forEach((doc) => {
            const favoriteData = doc.data();
            if (favoriteData.userId === userId) {
                const favorite: Favorite = {
                    id: doc.id,
                    userId: favoriteData.userId,
                    productsId: favoriteData.productsId
                };
                allFavorites.push(favorite);
            }
        });
        console.log('allFavorites', allFavorites);
        return allFavorites;
    } catch (error) {
        console.log('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

export default { getUserFavorites };