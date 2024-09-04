/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import "./_ProductCartItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProductCart } from "../../../models/productCart.model";

interface ProductCartProps {
  product: ProductCart;
  addProduct: (productId: string) => void,
  removeProduct: (productId: string) => boolean,
  onDeleteProductFromCart: (productId: string) => void,
  showToaster: (success: boolean, text: string) => void;
}

const ProductCartItem: FC<ProductCartProps> = ({ product, removeProduct, addProduct, onDeleteProductFromCart, showToaster }) => {
  const [showPopinDelete, setShowPopinDelete] = useState(false);

  const handleQty = (action: string, productId: string) => {
    try {
      if (action === "ADD") {
        addProduct(productId);
        showToaster(true, "Quantité augmentée !");
      } else {
        const isRemoved = removeProduct(productId);
        if (isRemoved) {
          showToaster(true, "Quantité diminuée !");
        } else {
          setShowPopinDelete(true);
        }
      }
    } catch {
      showToaster(false, "Une erreur interne est survenue");
    }
  }

  const deleteProduct = (productId: string) => {
    try {
      onDeleteProductFromCart(productId);
      setShowPopinDelete(false);
      showToaster(true, "Produit retiré du panier !");
    } catch {
      showToaster(false, "Une erreur interne est survenue");
    }
  }

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
                onClick={() => handleQty("REMOVE", product.id)}
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
                onClick={() => handleQty("ADD", product.id)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </article>
      {showPopinDelete && (
        <div className="popin-delete-container">
          <div className="popin-delete-dialog">
            <span>Voulez-vous vraiment retirer cet article du panier ?</span>
            <div className="popin-delete-btns">
              <button onClick={() => deleteProduct(product.id)} className="popin-delete-btns-btn">Oui</button>
              <button onClick={() => setShowPopinDelete(false)} className="popin-delete-btns-btn">Non</button>
            </div>
          </div>
        </div>
      )}
      <span className="bar"></span>
    </>
  );
};

export default ProductCartItem;
