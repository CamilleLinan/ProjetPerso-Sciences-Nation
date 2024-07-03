import { FC } from "react";
import "./_ButtonAddToCart.scss";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

const ButtonAddToCart:FC<ButtonProps> = ({ onClick }) => {
    return (
        <button className="button-add-cart" onClick={onClick}>
            <span>AJOUTER AU PANIER</span>
        </button>
    )
}

export default ButtonAddToCart;