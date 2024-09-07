import { FC } from 'react';
import "./_CartTotal.scss";
import { useNavigate } from 'react-router-dom';

interface CartTotalProps {
    totalPrice: string;
}

const CartTotal: FC<CartTotalProps> = ({ totalPrice }) => {
    const navigate = useNavigate();
    const deliveryPrice = "3,90";

  return (
    <div className="cart-total">
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
  </div>
  );
};

export default CartTotal;