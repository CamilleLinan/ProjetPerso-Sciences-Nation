import { FC, useContext } from "react";
import { UserContext } from "../context/userContext"
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import DisplayProducts from "../components/HomePage/DisplayProducts/DisplayProducts";
import Introduction from "../components/HomePage/Introduction/Introduction";
import Presentation from "../components/HomePage/Presentation/Presentation";
import Pictograms from "../components/HomePage/Pictograms/Pictograms";

const Home:FC = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            <Introduction />
            <DisplayProducts userId={currentUser?.id} />
            <Presentation />
            <Pictograms />
        </>
    )
}

export default Home;