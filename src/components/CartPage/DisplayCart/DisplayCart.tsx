/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react";
import "./_DisplayCart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import Loading from "../../Shared/Loading/Loading";
import ProductCartItem from "../ProductCartItem/ProductCartItem";
import Toaster, { ToasterProps } from "../../Shared/Toaster/Toaster";
import useFetchProducts from "../../../hooks/fetchProducts.hook";
import CartTotal from "../CartTotal/CartTotal";

const DisplayCart: FC = () => {
  const { userCart, onAddProduct, onRemoveProduct, onDeleteProductFromCart } =
    useContext(UserContext);
  const {
    productsInfos,
    isLoading: isLoadingProductInfos,
    error: errorProductInfos,
  } = useFetchProducts({
    options: { fetchCartInfos: true },
    userCart: userCart,
  });
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [toaster, setToaster] = useState<ToasterProps | null>();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (toaster) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        setToaster(null);
      }, 3000);
      setTimer(newTimer);
    }
  }, [toaster]);

  const showToaster = (success: boolean, text: string) => {
    setToaster({ classProp: success ? "success" : "error", toasterText: text });
  };

  useEffect(() => {
    const totalPrice = productsInfos.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice.toFixed(2));
  }, [productsInfos]);

  return (
    <>
      <section className="cart">
        <h2 className="cart-title">
          <FontAwesomeIcon icon={faBagShopping} /> Votre panier
        </h2>
        <div className="cart-container">
          {isLoadingProductInfos ? (
            <Loading />
          ) : errorProductInfos ? (
            <p>{errorProductInfos}</p>
          ) : userCart && productsInfos.length > 0 ? (
            <>
              <div>
                <div className="cart-header">
                    <div>
                        <span>Produit</span>
                    </div>
                    <div>
                        <span>Prix</span>
                    </div>
                    <div>
                        <span>Quantité</span>
                    </div>
                    <div>
                        <span>Total</span>
                    </div>
                </div>

                <span className="bar"></span>

                {productsInfos.map((product, i) => (
                  <ProductCartItem
                    key={i}
                    product={product}
                    addProduct={onAddProduct}
                    removeProduct={onRemoveProduct}
                    onDeleteProductFromCart={onDeleteProductFromCart}
                    showToaster={showToaster}
                  />
                ))}
              </div>
              {/* <div className="cart-total">
                <h3 className="cart-total-title">Résumé de votre commande</h3>
                <div className="cart-total-amount">
                  <span>Sous-total:</span> 
                  <span>{totalPrice} €</span>
                </div>
                <div className="cart-total-amount">
                  <span>Livraison:</span> 
                  <span>{deliveryPrice} €</span>
                </div>
                <div className="cart-total-amount bold">
                  <span>Total TTC:</span>
                  <span>{(parseFloat(totalPrice) + parseFloat(deliveryPrice)).toFixed(2)} €</span>
                </div>

                <button
                  className="cart-total-btn-checkout"
                  onClick={() => navigate("/checkout")}
                >
                  <span>Passer au paiement</span>
                </button>
              </div> */}
              <CartTotal totalPrice={totalPrice} />
            </>
          ) : (
            <>
              <p>Votre panier est vide !</p>
            </>
          )}
        </div>
      </section>
      {toaster && (
        <Toaster
          classProp={toaster.classProp}
          toasterText={toaster.toasterText}
        />
      )}
    </>
  );
};

export default DisplayCart;
