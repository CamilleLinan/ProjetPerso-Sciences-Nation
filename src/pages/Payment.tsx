import { FC } from "react";
import useStripePayment from "../hooks/stripePayment.hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Loading from "../components/Shared/Loading/Loading";

const Payment:FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { clientSecret, error, isLoading } = useStripePayment({ amount: 5000 });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement!,
            },
        });

        if (stripeError) {
            console.error("Erreur lors du paiement :", stripeError.message);
        } else if (paymentIntent?.status === 'succeeded') {
            console.log("Paiement réussi !");
        }
    };

    // Test success "4242 4242 4242 4242"
    // Test error "4000 0000 0000 0002"
    // Test expired card "4000 0000 0000 0069"

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={isLoading || !stripe || !elements || !clientSecret}>
                {isLoading ? <Loading /> : "Payer"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Payment;