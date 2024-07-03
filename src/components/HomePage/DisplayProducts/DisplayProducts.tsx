/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Shared/Loading/Loading";
import Toaster, { ToasterProps } from "../../Shared/Toaster/Toaster";
import useFetchProducts from "../../../hooks/fetchProducts.hook";
import useFetchUserFavorites from "../../../hooks/fetchUserFavorites.hook";
import Product from "../Product/Product";

interface UserInfos {
    userId: string | undefined,
}

const DisplayProducts:FC<UserInfos> = ({ userId }) => {
    const { productsData, errorProductsData, isLoadingProductsData } = useFetchProducts();
    const { userFavoritesData, errorUserFavoritesData } = useFetchUserFavorites(userId);
    const [ toaster, setToaster ] = useState<ToasterProps | null>();
    const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (toaster) {
            if (timer) {
                clearTimeout(timer);
            }
            const newTimer = setTimeout(() => {
                setToaster(null);
            }, 3000);
            setTimer(newTimer);
        }
    }, [toaster]);

    const showToaster = (success: boolean, text: string) => {
        setToaster({ classProp: success ? "success" : "error", toasterText: text });
    };

    return (
        <>
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            {!userFavoritesData && <p>{errorUserFavoritesData}</p>}

            <div className="products-container">
                {isLoadingProductsData && <Loading />}
                {userId && productsData.length > 0 ? <>
                    {productsData.map(product => (
                        <Product
                            key={product.id}
                            userId={userId}
                            product={product}
                            favorites={userFavoritesData}
                            showToaster={showToaster}
                        />
                    ))}
                </> : <> 
                    {errorProductsData} 
                </>}
            </div>
        </section>
        { toaster && <Toaster classProp={toaster.classProp} toasterText={toaster.toasterText} /> }
        </>
    )
}

export default DisplayProducts;