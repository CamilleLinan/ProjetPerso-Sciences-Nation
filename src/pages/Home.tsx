import { FC, useContext } from "react";
import Header from "../components/Shared/Layout/Header/Header";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import {UserContext} from "../context/userContext"


const Home:FC = () => {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser)
    return (
        <>
            <Header />
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            {currentUser && "Hello"}
        </>
    )
}

export default Home;