import { useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import productService from '../services/product.service';

const useFetchProducts = (productId?: string) => {
    const [ productsData, setProductsData ] = useState<Product[]>([]);
    const [ productData, setProductData ] = useState<Product>();
    const [ error, setError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productService.getAllProducts();
                setProductsData(products);
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des produits, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchProductById = async () => {
            try {
                if (productId) {
                    const product = await productService.getProductById(productId);
                    setProductData(product);
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération du produit, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
        fetchProductById();
    }, [productId]);

    return { productsData, productData, error, isLoading };
};

export default useFetchProducts;