/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import "./_ProductCartItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { UserContext } from "../../../context/userContext";
import { ProductCart } from "../../../models/ProductCart.model";

interface ProductCartProps {
  product: ProductCart;
  // showToaster: (success: boolean, text: string) => void;
}

const ProductCartItem: FC<ProductCartProps> = ({ product }) => {
  return (
    <>
      <article className="cart-item">
        <img
          src={product.img}
          alt={product.name}
          className="cart-item-img"
        />
        <div className="cart-item-container">
          <h3 className="cart-item-title">{product.name}</h3>
          <div>
            <h4 className="cart-item-price">{product.price} €</h4>
            <div className="quantity">
              <div
                className="quantity-btn down"
                // onClick={() => handleQuantityChange(product.id, -1)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
              <input
                type="number"
                className="quantity-input"
                value={product.quantity}
                readOnly
              />
              <div
                className="quantity-btn up"
                // onClick={() => handleQuantityChange(product.id, 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </article>
      <span className="bar"></span>
    </>
  );
};

export default ProductCartItem;
