import { useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import productService from '../services/product.service';

const useFetchProducts = () => {
    const [ productsData, setProductsData ] = useState<Product[]>([]);
    const [ errorProductsData, setErrorProductsData ] = useState<string>('');
    const [ isLoadingProductsData, setIsLoadingProductsData ] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productService.getAllProducts();
                if (products.length > 0) {
                    setProductsData(products);
                } else {
                    setErrorProductsData("Une erreur est survenue lors de la récupération des produits, veuillez réessayer plus tard.");
                }
            } catch (error) {
                setErrorProductsData("Une erreur est survenue lors de la récupération des produits, veuillez réessayer plus tard.");
            } finally {
                setIsLoadingProductsData(false);
            }
        };

        fetchProducts();
    }, []);

    return { productsData, errorProductsData, isLoadingProductsData };
};

export default useFetchProducts;