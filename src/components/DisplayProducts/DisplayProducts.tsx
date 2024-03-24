import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { Product } from "../../models/product.model";
import ProductsService from "../../services/products.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import ButtonAddToCart from "../Shared/ButtonAddToCart/ButtonAddToCard";
// import { NavLink } from "react-router-dom";
import FavoritesService from "../../services/favorites.service";
import { Favorite } from "../../models/favorite.model";
import Loading from "../Shared/Loading/Loading";

interface currentUserId {
    userId: string | undefined,
}

const DisplayProducts:FC<currentUserId> = ({ userId }) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
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

    const favoriteProductsIds: string[] = favoritesData.flatMap(favorite => favorite.productsId);

    const isProductLiked = (productId: string) => {
        return favoriteProductsIds.includes(productId);
    };

    const onLikeProduct = async (productId: string) => {
        try {
            const res = await FavoritesService.addProductToFavorites(userId, productId)
            const updatedFavorites = res;
            setFavoritesData(updatedFavorites);
        } catch (error) {
            console.log('Erreur lors de l\'ajout du produit aux favoris :', error);
            alert('Erreur lors de l\'ajout du produit aux favoris');
        }
    }

    return (
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            <div className="products-container">
                {isLoading && <Loading />}
                {productsData.length > 0 ? <>
                    {productsData.map((product, i) => (
                        <article key={i} className="products-item">
                            {/* <NavLink to="/"> */}
                                <img src={product.imageUrl} alt={product.title} className="products-item-img" />
                                <div className="products-item-container" onClick={() => onLikeProduct(product.id)}>
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
                            <ButtonAddToCart />
                        </article>
                    ))}
                </> : <> {error} </>}
            </div>
        </section>
    )
}

export default DisplayProducts;