import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { Product } from "../../../models/product.model";
import ProductsService from "../../../services/products.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import ButtonAddToCart from "../../Shared/ButtonAddToCart/ButtonAddToCard";
// import { NavLink } from "react-router-dom";
import FavoritesService from "../../../services/favorites.service";
import { Favorite } from "../../../models/favorite.model";
import Loading from "../../Shared/Loading/Loading";
import cartService from "../../../services/cart.service";
import Toaster from "../../Shared/Toaster/Toaster";

interface UserInfos {
    userId: string | undefined,
    updateCartQty: (newQty: number | undefined) => void
}

const DisplayProducts:FC<UserInfos> = ({ userId, updateCartQty }) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ toaster, setToaster ] = useState<boolean>(false);
    const [ productsData, setProductsData ] = useState<Product[]>([]);
    const [ favoritesData, setFavoritesData ] = useState<Favorite[]>([]);
    const [ error, setError ] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            await ProductsService.getAllProducts()
                .then((res) => {
                    if (res.length > 0) {
                        setProductsData(res);
                    } else {
                        setError("Une erreur est survenue lors de la récupération des données, veuillez réessayer plus tard.");
                    }
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                    setError("Une erreur est survenue lors de la récupération des données, veuillez réessayer plus tard.");
                })
        };

        const fetchFavorites = async () => {
            try {
                const favorites = await FavoritesService.getUserFavorites(userId);
                setFavoritesData(favorites);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
        fetchFavorites();
    }, [userId]);

    const isProductLiked = (productId: string) => {
        const favoriteProductsIds: string[] = favoritesData.flatMap(favorite => favorite.productsId);
        return favoriteProductsIds.includes(productId);
    };

    const onAddProductToFavorites = async (productId: string) => {
        try {
            const updatedFavorites = await FavoritesService.addProductToFavorites(userId, productId)
            setFavoritesData(updatedFavorites);
        } catch (error) {
            alert('Erreur lors de l\'ajout du produit aux favoris');
        }
    }

    const onAddProductToCart = async (productId: string) => {
        try {
            const updatedCart = await cartService.addProductToCart(userId, productId);
            updateCartQty(updatedCart?.products.length);
            setToaster(true);
        } catch (error) {
            alert('Erreur lors de l\'ajout du produit au panier');
        }
    }

    return (
        <>
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            <div className="products-container">
                {isLoading && <Loading />}
                {productsData.length > 0 ? <>
                    {productsData.map((product, i) => (
                        <article key={i} className="products-item">
                            {/* <NavLink to="/"> */}
                                <img src={product.imageUrl} alt={product.title} className="products-item-img" />
                                <div className="products-item-container" onClick={() => onAddProductToFavorites(product.id)}>
                                    <h3 className="products-item-title">{product.title}</h3>
                                    <div className="products-item-icon">
                                        {isProductLiked(product.id) ? (
                                            <span className="products-item-icon-solid">
                                                <FontAwesomeIcon icon={faHeartSolid} />
                                            </span>
                                        ) : (
                                            <span className="products-item-icon-regular">
                                                <FontAwesomeIcon icon={faHeartRegular} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <h4 className="products-item-price">{product.price} $</h4>
                            {/* </NavLink> */}
                            <ButtonAddToCart onClick={() => onAddProductToCart(product.id)} />
                        </article>
                    ))}
                </> : <> {error} </>}
            </div>
        </section>
        { toaster && <Toaster /> }
        </>
    )
}

export default DisplayProducts;