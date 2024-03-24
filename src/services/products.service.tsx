import { db } from "../../firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

const getProductById = async (productId: string): Promise<Product | null> => {
    try {
        const productDocRef = doc(db, 'products', productId);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
            const productData = productDocSnapshot.data();
            const product: Product = {
                id: productDocSnapshot.id,
                title: productData.title,
                description: productData.description,
                price: productData.price,
                imageUrl: productData.imageUrl
            };
            return product;
        } else {
            return null; 
        }
    } catch (error) {
        console.log('Erreur lors de la récupération du produit :', error);
        throw error;
    }
};

export default { getAllProducts, getProductById };
