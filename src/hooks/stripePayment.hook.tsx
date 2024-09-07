import { useEffect, useState } from "react";
import stripeService from "../services/stripeService";

interface StripePaymentProps {
    amount: number;
}

const useStripePayment = ({ amount }: StripePaymentProps) => {
    const [ clientSecret, setClientSecret ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await stripeService.createPaymentIntent(amount);
                setClientSecret(response.clientSecret);
            } catch (err) {
                setError("Une erreur est survenue lors de la création du PaymentIntent, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        if (amount > 0) {
            createPaymentIntent();
        }
    }, [amount]);

    return { clientSecret, error, isLoading };
};

export default useStripePayment;