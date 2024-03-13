import { FC } from "react";
import Header from "../components/Shared/Layout/Header/Header";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";

const Home:FC = () => {
    return (
        <>
            <Header />
            <Banner
                title="Sciences Nation"
                src={banner}
            />
        </>
    )
}

export default Home;