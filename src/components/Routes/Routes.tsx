import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../Shared/Layout/Layout";
import Home from "../../pages/Home";
import Cart from "../../pages/Cart";
import Payment from "../../pages/Payment";

const IndexRoutes:FC = () => {
    const stripePromise = loadStripe("pk_test_51PvOlXAVAsukzzrXAfITwl0M4MbPoKCEhMDoQuFCQlMhYeefADxgKEQ6lUvP7SFxHtGZPbjZrJZurdsoevpsYoMN001qI7Id9B");

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    } />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default IndexRoutes;