import { FC } from 'react';
import "./_PaymentForm.scss";
import { 
  CardCvcElement, 
  CardExpiryElement, 
  CardNumberElement,
  useElements, 
  useStripe 
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faCalendar, faLock } from "@fortawesome/free-solid-svg-icons";
import ButtonMain from '../../Shared/ButtonMain/ButtonMain';
import { useNavigate } from 'react-router-dom';

interface PaymentFormProps {
  clientSecret: string;
}

const PaymentForm: FC<PaymentFormProps> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
            console.error("CardNumberElement non trouvé.");
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          navigate('/confirm', { state: { success: true, paymentIntent } });
        } else if (error && (error.code === 'card_declined' || error.code === 'expired_card')) {
          navigate('/confirm', { state: { success: false, error: error.message } });
        } else {
          console.log(error);
        }
    };

    // Test success "4242 4242 4242 4242"
    // Test error "4000 0000 0000 0002"
    // Test expired card "4000 0000 0000 0069"

  return (
    <>
      <form onSubmit={handleSubmit} className='payment-form'>
        <div className="payment-form-item">
            <label className="payment-form-item-label">Numéro de carte</label>
            <CardNumberElement className="StripeElement" />
            <FontAwesomeIcon icon={faCreditCard} className="payment-form-item-icon" />
        </div>

        <div className="payment-form-container">
          <div className="payment-form-item">
              <label className="payment-form-item-label">Date d'expiration</label>
              <CardExpiryElement className="StripeElement" />
              <FontAwesomeIcon icon={faCalendar} className="payment-form-item-icon" />
          </div>

          <div className="payment-form-item">
              <label className="payment-form-item-label">Code de sécurité (CVC)</label>
              <CardCvcElement className="StripeElement" />
              <FontAwesomeIcon icon={faLock} className="payment-form-item-icon" />
          </div>
        </div>

        <ButtonMain type="submit" disabled={!stripe || !elements} text={"PAYER"} />
      </form>
    </>
  );
};

export default PaymentForm;