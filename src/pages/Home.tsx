import { FC } from "react";
import Banner from "../components/Shared/Banner/Banner";
import DisplayProducts from "../components/HomePage/DisplayProducts/DisplayProducts";
import Introduction from "../components/HomePage/Introduction/Introduction";
import Presentation from "../components/HomePage/Presentation/Presentation";
import Pictograms from "../components/HomePage/Pictograms/Pictograms";

const Home:FC = () => {
    return (
        <>
            <Banner />
            <Introduction />
            <DisplayProducts />
            <Presentation />
            <Pictograms />
        </>
    )
}

export default Home;