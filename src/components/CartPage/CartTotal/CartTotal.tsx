import { FC, useState } from "react";
import "./_CartTotal.scss";
import ButtonMain from "../../Shared/ButtonMain/ButtonMain";
import PaymentForm from "../PaymentForm/PaymentForm";
import Loading from "../../Shared/Loading/Loading";
import { Elements } from "@stripe/react-stripe-js";
import useStripePayment from "../../../hooks/stripePayment.hook";
import { loadStripe } from "@stripe/stripe-js";

interface CartTotalProps {
  totalPrice: string;
}

const stripePromise = loadStripe(
  "pk_test_51PvOlXAVAsukzzrXAfITwl0M4MbPoKCEhMDoQuFCQlMhYeefADxgKEQ6lUvP7SFxHtGZPbjZrJZurdsoevpsYoMN001qI7Id9B"
);

const CartTotal: FC<CartTotalProps> = ({ totalPrice }) => {
  const deliveryPrice = "3,90";
  const totalPriceTTC = (
    parseFloat(totalPrice) + parseFloat(deliveryPrice)
  ).toFixed(2);
  const totalPriceInCents = Math.round(parseFloat(totalPriceTTC) * 100);

  const { clientSecret, error, isLoading } = useStripePayment({
    amount: totalPriceInCents,
  });
  const [openForm, setOpenForm] = useState<boolean>(false);

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
        <span>
          {(parseFloat(totalPrice) + parseFloat(deliveryPrice)).toFixed(2)} €
        </span>
      </div>

      <ButtonMain onClick={() => setOpenForm(true)} text="PASSER AU PAIEMENT" />

      {openForm &&
        (isLoading ? (
          <Loading />
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <p>{error}</p>
        ))}
    </div>
  );
};

export default CartTotal;
