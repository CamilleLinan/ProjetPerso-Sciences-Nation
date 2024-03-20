import { FC, useContext } from "react";
import { UserContext } from "../context/userContext"
import Header from "../components/Shared/Layout/Header/Header";
import Banner from "../components/Shared/Banner/Banner";
import banner from "../assets/banner1.jpg";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";


const Home:FC = () => {
    const { currentUser } = useContext(UserContext);
    console.log('currentUser Home : ', currentUser);

    return (
        <>
            <Header />
            <Banner
                title="Sciences Nation"
                src={banner}
            />
            <DisplayProducts userId={currentUser?.id}/>
        </>
    )
}

export default Home;