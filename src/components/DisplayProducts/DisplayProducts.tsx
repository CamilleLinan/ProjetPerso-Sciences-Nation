import { FC, useEffect, useState } from "react"
import "./_DisplayProducts.scss";
import { Product } from "../../models/product.model";
import ProductsService from "../../services/products.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const DisplayProducts:FC = () => {
    const [ productsData, setProductsData ] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await ProductsService.getAllProducts();
                setProductsData(products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])
    console.log(productsData);

    return (
        <section className="products">
            <h2 className="products-title">Nos coups de coeur <FontAwesomeIcon icon={faHeartSolid} /></h2>
            <div className="products-container">
                {productsData.map((product, i) => (
                    <article key={i} className="products-item">
                        <img src={product.imageUrl} alt={product.title} className="products-item-img" />
                        <div className="products-item-container">
                            <h3 className="products-item-title">{product.title}</h3>
                            <FontAwesomeIcon icon={faHeartRegular} />
                        </div>
                        <h4 className="products-item-price">{product.price} $</h4>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default DisplayProducts;