import { db } from "../../firebase.config";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Cart } from "../models/cart.model";

const getUserCart = async (userId: string | undefined): Promise<Cart> => {
    try {
        const cartsRef = collection(db, 'carts');
        const userCartQuery = query(cartsRef, where('userId', '==', userId))
        const userCartsDocs = await getDocs(userCartQuery);

        let userCart: Cart = {id: '', userId: userId || '', products: []};

        userCartsDocs.forEach((doc) => {
            const userCartData = doc.data();
            userCart = {
                id: doc.id,
                userId: userCartData.userId,
                products: userCartData.products
            };
        })

        return userCart;
    } catch (error) {
        console.log('Erreur lors de la récupération du panier');
        throw error;
    }
};

const addProductToCart = async (userId: string | undefined, productId: string): Promise<Cart | null> => {
    try {
        const userCart = await getUserCart(userId);

        if (userCart) {
            const existingProductIndex = userCart.products.findIndex(product => product.productId === productId);

            if (existingProductIndex !== -1) {
                const updatedProducts = [...userCart.products];
                updatedProducts[existingProductIndex].qty += 1;

                const cartDocRef = doc(db, 'carts', userCart.id);
                await updateDoc(cartDocRef, { products: updatedProducts });

            } else {
                const cartDocRef = doc(db, 'carts', userCart.id);
                await updateDoc(cartDocRef, {
                    products: [...userCart.products, { productId, qty: 1 }]
                });
            }
        }

        return getUserCart(userId);
    } catch (error) {
        console.log('Erreur lors de l\'ajout du produit au panier');
        throw error;
    }
}

export default { getUserCart, addProductToCart };