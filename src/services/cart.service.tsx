import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Cart } from "../models/cart.model";

const getUserCart = async (userId: string | undefined): Promise<Cart | null> => {
    try {
        const cartRef = collection(db, 'carts');
        const querySnapshot = await getDocs(cartRef);

        let userCart: Cart | null = null;

        querySnapshot.forEach((doc) => {
            const cartData = doc.data();
            if (cartData.userId === userId) {
                userCart = {
                    id: doc.id,
                    userId: cartData.userId,
                    products: cartData.products
                };
            }
        })
        console.log('userCart', userCart)
        return userCart;
    } catch (error) {
        console.log('Erreur lors de la récupération du panier :', error);
        throw error;
    }
};

export default { getUserCart };