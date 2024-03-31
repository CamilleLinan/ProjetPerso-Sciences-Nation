import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Favorite } from "../../../models/favorite.model";
import FavoritesService from "../../../services/favorites.service";
import CartService from "../../../services/cart.service";
import Loading from "../../Shared/Loading/Loading";
import Toaster, { ToasterProps } from "../../Shared/Toaster/Toaster";
import ButtonAddToCart from "../../Shared/ButtonAddToCart/ButtonAddToCard";
import useFetchProducts from "../../../hooks/fetchProducts.hook";
import useFetchUserFavorites from "../../../hooks/fetchUserFavorites.hook";
import useFetchUserCart from "../../../hooks/fetchUserCart.hook";

interface UserInfos {
    userId: string | undefined,
}

const DisplayProducts:FC<UserInfos> = ({ userId }) => {
    const { productsData, errorProductsData, isLoadingProductsData } = useFetchProducts();
    const { userFavoritesData, errorUserFavoritesData } = useFetchUserFavorites(userId);
    const { updateCart } = useFetchUserCart(userId);
    const [ favoritesData, setFavoritesData ] = useState<Favorite[]>([]);
    const [ toaster, setToaster ] = useState<ToasterProps | null>();

    useEffect(() => {
        setFavoritesData(userFavoritesData);
    }, [userFavoritesData])

    const showToaster = (success: boolean, text: string) => {
        setToaster({ classProp: success ? "success" : "error", toasterText: text });
        setTimeout(() => {
            setToaster(null);
        }, 5000);
    }

    const isProductLiked = (productId: string) => {
        const favoriteProductsIds: string[] = favoritesData.flatMap(favorite => favorite.productsId);
        return favoriteProductsIds.includes(productId);
    };

    const onAddProductToFavorites = async (productId: string) => {
        try {
            const updatedFavorites = await FavoritesService.addProductToFavorites(userId, productId)
            setFavoritesData(updatedFavorites);
        } catch (error) {
            showToaster(false, "Erreur lors de l'ajout du produit aux favoris");
        }
    }

    const onAddProductToCart = async (productId: string) => {
        try {
            await CartService.addProductToCart(userId, productId)
                .then((res) => {
                    if(res) {
                        const totalQty = res.products.reduce(
                            (total, product) => {
                                return total + product.qty;
                            }, 0)
                        localStorage.setItem('qty', totalQty.toString());
                    }
                    updateCart();
                    showToaster(true, "Produit ajouté au panier !");
                })
        } catch (error) {
            showToaster(false, "Erreur lors de l'ajout du produit au panier");
        }
    }

    return (
        <>
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            {!userFavoritesData && <p>{errorUserFavoritesData}</p>}

            <div className="products-container">
                {isLoadingProductsData && <Loading />}
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
                </> : <> 
                    {errorProductsData} 
                </>}
            </div>
        </section>
        { toaster && <Toaster classProp={toaster.classProp} toasterText={toaster.toasterText} /> }
        </>
    )
}

export default DisplayProducts;