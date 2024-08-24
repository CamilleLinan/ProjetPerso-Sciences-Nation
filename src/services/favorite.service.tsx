import axios from "axios";
import { Product } from "../models/product.model";

const clientHTTP = axios.create({
    baseURL: "http://localhost:5011",
  });

const getFavorites = async (userId: string): Promise<Product[] | []> => {
    try {
        const response = await clientHTTP.get(`/api/favorite/${userId}/all`);
        return response.data;
    } catch (error) {
        console.error('Error to fetch user favorites:', error);
        throw error;
    }
}

const getFavoritesId = async (userId: string): Promise<string[] | []> => {
    try {
        const response = await clientHTTP.get(`/api/favorite/${userId}/all-id`);
        const allFavoritesId = response.data;
        return allFavoritesId;
    } catch (error) {
        console.error('Error to fetch user favorites Id:', error);
        throw error;
    }
}

const addOrRemoveProductToFavorites = async (userId: string, productId: string): Promise<string[] | []> => {
    try {
        const response = await clientHTTP.post(`/api/favorite/${userId}/products/${productId}`);
        const updatedFavoritesId = response.data;
        return updatedFavoritesId;
    } catch (error) {
        console.log('Error adding/removing product to/from favorites:', error);
        throw error;
    }
};

export default { getFavorites, getFavoritesId, addOrRemoveProductToFavorites };