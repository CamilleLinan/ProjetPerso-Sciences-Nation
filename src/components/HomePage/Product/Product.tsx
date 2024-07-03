import { FC, useContext, useEffect, useState } from 'react';
import "./_Product.scss";
import { Product as ProductDto } from '../../../models/product.model';
import ButtonAddToCart from '../../Shared/ButtonAddToCart/ButtonAddToCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Favorite } from '../../../models/favorite.model';
import favoritesService from '../../../services/favorites.service';
import { UserContext } from '../../../context/userContext';
import { NavLink } from 'react-router-dom';

interface ProductProps {
    userId: string;
    product: ProductDto;
    favorites: Favorite[];
    showToaster: (success: boolean, text: string) => void;
}

const Product: FC<ProductProps> = ({ userId, product, favorites, showToaster }) => {
    const { onAddProductToCart } = useContext(UserContext);
    const [ favoritesData, setFavoritesData ] = useState<Favorite[]>([]);

    useEffect(() => {
        setFavoritesData(favorites);
    }, [favorites])

    const isProductLiked = (productId: string) => {
        const favoriteProductsIds: string[] = favoritesData.flatMap(favorite => favorite.productsId);
        return favoriteProductsIds.includes(productId);
    };

    const onAddProductToFavorites = async (productId: string) => {
        try {
            const updatedFavorites = await favoritesService.addProductToFavorites(userId, productId)
            setFavoritesData(updatedFavorites);
            if (isProductLiked(productId)) {
                showToaster(true, "Produit retiré des favoris !");
            } else {
                showToaster(true, "Produit ajouté aux favoris !");
            }
        } catch (error) {
            showToaster(false, "Erreur lors de l'ajout du produit aux favoris");
        }
    }

    const addProductToCart = async (productId: string) => {
        try {
            onAddProductToCart(productId)
                .then(() => {
                    showToaster(true, "Produit ajouté au panier !");
                })
        } catch (error) {
            showToaster(false, "Erreur lors de l'ajout du produit au panier");
        }
    }
  return (
    <article className="products-item">
        <NavLink to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.title} className="products-item-img" />
        </NavLink>
            <div className="products-item-container">
                <h3 className="products-item-title">{product.title}</h3>
                <div className="products-item-icon" onClick={() => onAddProductToFavorites(product.id)}>
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
        <ButtonAddToCart onClick={() => addProductToCart(product.id)} />
    </article>
  );
};

export default Product;