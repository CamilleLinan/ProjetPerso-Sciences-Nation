import { FC, useContext, useEffect, useState } from 'react';
import "./_Product.scss";
import { Product as ProductDto } from '../../../models/product.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import favoritesService from '../../../services/favorite.service';
import { UserContext } from '../../../context/userContext';
import { NavLink } from 'react-router-dom';
import ButtonMain from '../../Shared/ButtonMain/ButtonMain';

interface ProductProps {
    product: ProductDto;
    showToaster: (success: boolean, text: string) => void;
}

const Product: FC<ProductProps> = ({ product, showToaster }) => {
    const { currentUser: user, userFavorites: favoritesId, onAddProduct } = useContext(UserContext);
    const [ favoritesData, setFavoritesData ] = useState<string[] | undefined>(favoritesId);

    useEffect(() => {
        setFavoritesData(favoritesId);
    }, [favoritesId]);

    const isFavorite = (productId: string) => {
        return favoritesData?.includes(productId);   
    }

    const handleToggleFavorite = async (productId: string) => {
        try {
            if (user) {
                const updatedFavorites = await favoritesService.addOrRemoveProductToFavorites(user.id, productId);
                setFavoritesData(updatedFavorites);
                if (isFavorite(productId)) {
                    showToaster(true, "Produit retiré des favoris !");
                } else {
                    showToaster(true, "Produit ajouté aux favoris !");
                }
            }
        } catch (error) {
            showToaster(false, 'Une erreur interne est survenue.');
        }
    };

    const addProductToCart = async (productId: string) => {
        try {
            onAddProduct(productId)
            showToaster(true, "Produit ajouté au panier !");
        } catch (error) {
            showToaster(false, "Erreur lors de l'ajout du produit au panier");
        }
    }

  return (
    <article className="products-item">
        <NavLink to={`/product/${product.id}`}>
            <img src={product.img} alt={product.name} className="products-item-img" />
        </NavLink>
            <div className="products-item-container">
                <h3 className="products-item-title">{product.name}</h3>
                <div className="products-item-icon" onClick={() => handleToggleFavorite(product.id)}>
                    {isFavorite(product.id) ? (
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
            <h4 className="products-item-price">{product.price} €</h4>
        <ButtonMain onClick={() => addProductToCart(product.id)} text='AJOUTER AU PANIER' />
    </article>
  );
};

export default Product;