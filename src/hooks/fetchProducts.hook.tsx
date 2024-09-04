import { useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import productService from '../services/product.service';
import { ProductCart } from '../models/productCart.model';
import { ProductLS } from '../models/LocalStorage/productLS.model';

interface UseFetchProductsOptions {
    fetchAll?: boolean;
    fetchById?: boolean;
    fetchCartInfos?: boolean;
}

interface FetchProductsProps {
    options?: UseFetchProductsOptions,
    productId?: string, 
    userCart?: ProductLS[]
}

const useFetchProducts = ({ options, productId, userCart }: FetchProductsProps) => {
    const [ productsData, setProductsData ] = useState<Product[]>([]);
    const [ productData, setProductData ] = useState<Product>();
    const [ productsInfos, setProductsInfos ] = useState<ProductCart[]>([]);
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

        const fetchProductInfos = async () => {
            try {
                if (userCart && userCart.length > 0) {
                    const products = await Promise.all(userCart.map(async (productCart) => {
                        const productInfo = await productService.getProductById(productCart.productId);
                        return { ...productInfo, quantity: productCart.qty } as ProductCart;
                    }));
                    setProductsInfos(products);
                }
            } catch (error) {
                setError("Une erreur est survenue lors de la récupération des produits du panier, veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };
        
        if (options?.fetchAll) fetchProducts();
        if (options?.fetchById) fetchProductById();
        if (options?.fetchCartInfos) fetchProductInfos();
    }, [options?.fetchAll, options?.fetchById, options?.fetchCartInfos, productId, userCart]);

    return { productsData, productData, productsInfos, error, isLoading };
};

export default useFetchProducts;