import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../models/product.model";
    
const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);

        const allProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            const product: Product = {
                id: doc.id,
                title: productData.title,
                description: productData.description,
                price: productData.price,
                imageUrl: productData.imageUrl
            };
            allProducts.push(product);
        });

        return allProducts;
    } catch (error) {
        console.log('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

export default { getAllProducts };
