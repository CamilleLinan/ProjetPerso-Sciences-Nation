import { FC } from "react";
import './_Toaster.scss';

const Toaster:FC = () => {
    return (
        <div className="toaster">
            <span className="toaster-text">Le produit a été ajouté au panier !</span>
        </div>
    )
}

export default Toaster;