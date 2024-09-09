import { FC } from "react";
import Banner from "../components/Shared/Banner/Banner";
import DisplayCart from "../components/CartPage/DisplayCart/DisplayCart";

const Cart:FC = () => {
    return (
        <>
            <Banner />
            <DisplayCart />
        </>
    )
}

export default Cart;