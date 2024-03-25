import { FC, useContext, useState } from "react";
import { UserContext } from "../context/userContext"
import Header from "../components/Shared/Layout/Header/Header";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import Footer from "../components/Shared/Layout/Footer/Footer";
import Introduction from "../components/Introduction/Introduction";
import Presentation from "../components/Presentation/Presentation";
import Pictograms from "../components/Pictograms/Pictograms";

const Home:FC = () => {
    const { currentUser } = useContext(UserContext);
    const [ cartQty, setCartQty ] = useState(0);

    const updateCartQty = (newQty: number | undefined) => {
        if (newQty) {
            setCartQty(newQty);
        }
    }

    return (
        <>
            <Header cartQty={cartQty} />
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            <Introduction />
            <DisplayProducts userId={currentUser?.id} updateCartQty={updateCartQty}/>
            <Presentation />
            <Pictograms />
            <Footer />
        </>
    )
}

export default Home;