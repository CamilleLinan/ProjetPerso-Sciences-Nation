import { FC, useContext } from "react";
import { UserContext } from "../context/userContext";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import DisplayCart from "../components/CartPage/DisplayCart/DisplayCart";

const Cart:FC = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            <DisplayCart userId={currentUser?.id} />
        </>
    )
}

export default Cart;