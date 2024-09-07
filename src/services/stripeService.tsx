import axios from "axios";

const clientHTTP = axios.create({
    baseURL: "http://localhost:5011",
});

interface PaymentIntentResponse {
    clientSecret: string;
}

const createPaymentIntent = async (amount: number): Promise<PaymentIntentResponse> => {
    try {
        const response = await clientHTTP.post(`/api/payments/create-payment-intent`, { amount });
        return response.data;
    } catch (error) {
        console.log("Erreur lors de la creation du PaymentIntent :", error);
        throw error;
    }
};

export default { createPaymentIntent };
