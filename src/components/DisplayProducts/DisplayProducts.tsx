import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { Product } from "../../models/product.model";
import ProductsService from "../../services/products.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import ButtonAddToCart from "../Shared/ButtonAddToCart/ButtonAddToCard";
// import { NavLink } from "react-router-dom";
import favoritesService from "../../services/favorites.service";
import { Favorite } from "../../models/favorite.model";

interface currentUserId {
    userId: string | undefined,
}

const DisplayProducts:FC<currentUserId> = ({ userId }) => {
    const [ productsData, setProductsData ] = useState<Product[]>([]);
    const [ favoritesData, setFavoritesData ] = useState<Favorite[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await ProductsService.getAllProducts();
                setProductsData(products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    console.log('productsData', productsData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favorites = await favoritesService.getUserFavorites(userId);
                setFavoritesData(favorites);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [userId]);
    console.log('favoritesData', favoritesData);

    const favoriteProductsIds: string[] = favoritesData.flatMap(favorite => favorite.productsId);

    const isProductLiked = (productId: string) => {
        return favoriteProductsIds.includes(productId);
    };

    // const likeProduct = (productId: string) => {

    // }

    return (
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            <div className="products-container">
                {productsData.map((product, i) => (
                    <article key={i} className="products-item">
                        {/* <NavLink to="/"> */}
                            <img src={product.imageUrl} alt={product.title} className="products-item-img" />
                            <div className="products-item-container">
                                <h3 className="products-item-title">{product.title}</h3>
                                <div className="products-item-icon">
                                {isProductLiked(product.id) ? (
                                    <FontAwesomeIcon icon={faHeartSolid} />
                                ) : (
                                    <FontAwesomeIcon icon={faHeartRegular} />
                                )}
                            </div>
                            </div>
                            <h4 className="products-item-price">{product.price} $</h4>
                        {/* </NavLink> */}
                        <ButtonAddToCart />
                    </article>
                ))}
            </div>
        </section>
    )
}

export default DisplayProducts;