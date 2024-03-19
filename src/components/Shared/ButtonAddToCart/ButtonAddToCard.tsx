import { FC } from "react";
import "./_ButtonAddToCart.scss";

const ButtonAddToCart:FC = () => {
    return (
        <button className="button-add-cart">
            <span>AJOUTER AU PANIER</span>
        </button>
    )
}

export default ButtonAddToCart;