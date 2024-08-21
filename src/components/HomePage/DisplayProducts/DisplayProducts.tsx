/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Shared/Loading/Loading";
import Toaster, { ToasterProps } from "../../Shared/Toaster/Toaster";
import useFetchProducts from "../../../hooks/fetchProducts.hook";
import Product from "../Product/Product";
import { UserContext } from "../../../context/userContext";

const DisplayProducts:FC = () => {
    const { productsData, errorProductsData, isLoadingProductsData } = useFetchProducts();
    const { errorFavorites } = useContext(UserContext);
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
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeart} /></h2>
            {errorFavorites && <p>{errorFavorites}</p>}

            <div className="products-container">
                {isLoadingProductsData && <Loading />}
                {productsData.length > 0 ? <>
                    {productsData.map(product => (
                        <Product
                            key={product.id}
                            product={product}
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