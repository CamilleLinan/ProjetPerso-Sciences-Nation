import { FC, useEffect, useState } from "react"
import "./_DisplayCart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Shared/Loading/Loading";
import productsService from "../../../services/products.service";
import { Product } from "../../../models/product.model";
import useFetchUserCart from "../../../hooks/fetchUserCart.hook";

interface ProductInCart extends Product {
    quantity: number;
}

interface DisplayCartProps {
    userId: string | undefined
}

const DisplayCart:FC<DisplayCartProps> = ({ userId }) => {
    const { userCartData, isLoadingUserCartData, errorUserCartData } = useFetchUserCart(userId);
    const [ productInfos, setProductInfos ] = useState<ProductInCart[]>([]);
    const [ totalPrice, setTotalPrice ] = useState<number>(0);

    useEffect(() => {
        if (userCartData) {
            const fetchProductInfos = async () => {
                const products = await Promise.all(userCartData.products.map(async (productCart) => {
                    const productInfo = await productsService.getProductById(productCart.productId);
                    return { ...productInfo, quantity: productCart.qty } as ProductInCart;
                }));
                console.log('products', products);
                setProductInfos(products);
            };

            fetchProductInfos();
        }

        if (productInfos.length > 0) {
            const totalPrice = productInfos.reduce((acc, product) => {
                return acc + product.price * product.quantity;
            }, 0);
            setTotalPrice(totalPrice);
        }
    }, [productInfos, userCartData]);

    return (
        <>
        <section className="cart">
            <h2 className="cart-title">Votre panier <FontAwesomeIcon icon={faBagShopping} /></h2>
            <div className="cart-container">
                {isLoadingUserCartData && <Loading />}
                {userCartData ? <>
                    {productInfos.map((product, i) => ( <>
                        <article key={i} className="cart-item">
                            <img src={product.imageUrl} alt={product.title} className="cart-item-img" />
                            <div className="cart-item-container">
                                <h3 className="cart-item-title">{product.title}</h3>
                                <div>
                                    <h4 className="cart-item-price">{product.price} $</h4>
                                    <input 
                                        type="number"
                                        className="cart-item-qty" 
                                        value={product.quantity} 
                                    />
                                </div>
                            </div>
                        </article>
                        <span className="bar"></span>
                    </> ))}
                    <div>Total : {totalPrice} $</div>
                </> : <> 
                    {errorUserCartData} 
                </>}
            </div>
        </section>
        </>
    )
}

export default DisplayCart;