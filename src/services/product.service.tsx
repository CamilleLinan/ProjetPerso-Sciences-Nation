import axios from "axios";
import { Product } from "../models/product.model";
    
const clientHTTP = axios.create({
    baseURL: "http://localhost:5011",
});

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await clientHTTP.get(`/api/product/all`);
        const allProducts = response.data;
        return allProducts;
    } catch (error) {
        console.log('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

const getProductById = async (productId: string): Promise<Product | undefined> => {
    try {
        const response = await clientHTTP.get(`/api/product/${productId}`);
        const product = response.data;
        return product;
    } catch (error) {
        console.log('Erreur lors de la récupération du produit :', error);
        throw error;
    }
};

export default { getAllProducts, getProductById };
