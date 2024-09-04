import { FC } from "react";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import DisplayCart from "../components/CartPage/DisplayCart/DisplayCart";

const Cart:FC = () => {
    return (
        <>
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            <DisplayCart />
        </>
    )
}

export default Cart;