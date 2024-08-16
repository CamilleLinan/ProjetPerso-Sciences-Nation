/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext } from "react";
import "./_ProductCart.scss";
import { ProductCart as ProductCartModel } from "../../../models/productCart.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";

interface ProductCartProps {
  product: ProductCartModel
  showToaster: (success: boolean, text: string) => void;
  setProductInfos: (productInfos: any) => any;
}

const ProductCart: FC<ProductCartProps> = ({ product, showToaster, setProductInfos }) => {
    const { onAddProductToCart } = useContext(UserContext);

    const handleQuantityChange = (productId: string, amount: number) => {
        setProductInfos((prevProductInfos: any) => {
            const updatedProductInfos = prevProductInfos.map((product: any) => {
                if (product.id === productId) {
                    const newQuantity = product.quantity + amount;
                    return { ...product, quantity: newQuantity > 0 ? newQuantity : 0 };
                }
                return product;
            });
            return updatedProductInfos;
        });
        onAddProductToCart(productId)
            .then(() => {
                showToaster(true, "Produit ajouté au panier !");
            })
    };

  return (
    <>
      <article className="cart-item">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="cart-item-img"
        />
        <div className="cart-item-container">
          <h3 className="cart-item-title">{product.title}</h3>
          <div>
            <h4 className="cart-item-price">{product.price} €</h4>
            <div className="quantity">
              <div
                className="quantity-btn down"
                onClick={() => handleQuantityChange(product.id, -1)}
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
                onClick={() => handleQuantityChange(product.id, 1)}
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

export default ProductCart;
