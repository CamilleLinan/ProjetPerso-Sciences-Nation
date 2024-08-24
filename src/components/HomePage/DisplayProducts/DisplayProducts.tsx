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
    const { productsData: products, error: productsError, isLoading: productsAreLoading } = useFetchProducts({
        options: { fetchAll: true }
    });
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
                {productsAreLoading && <Loading />}
                {products.length > 0 ? <>
                    {products.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            showToaster={showToaster}
                        />
                    ))}
                </> : <> 
                    {productsError} 
                </>}
            </div>
        </section>
        { toaster && <Toaster classProp={toaster.classProp} toasterText={toaster.toasterText} /> }
        </>
    )
}

export default DisplayProducts;