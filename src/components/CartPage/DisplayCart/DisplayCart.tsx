// /* eslint-disable react-hooks/exhaustive-deps */
// import { FC, useEffect, useState } from "react"
// import "./_DisplayCart.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
// import Loading from "../../Shared/Loading/Loading";
// import productService from "../../../services/product.service";
// import { ProductCart as ProductCartModel } from "../../../models/LocalStorage/productLS.model";
// import useFetchUserCart from "../../../hooks/fetchUserCart.hook";
// import ProductCart from "../ProductCart/ProductCart";
// import { ToasterProps } from "../../Shared/Toaster/Toaster";

// interface DisplayCartProps {
//     userId: string | undefined
// }

// const DisplayCart:FC<DisplayCartProps> = ({ userId }) => {
//     const { userCartData, isLoadingUserCartData, errorUserCartData } = useFetchUserCart(userId);
//     const [ productInfos, setProductInfos ] = useState<ProductCartModel[]>([]);
//     const [ totalPrice, setTotalPrice ] = useState<string>("");
//     const [ toaster, setToaster ] = useState<ToasterProps | null>();
//     const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (toaster) {
//             if (timer) {
//                 clearTimeout(timer);
//             }
//             const newTimer = setTimeout(() => {
//                 setToaster(null);
//             }, 3000);
//             setTimer(newTimer);
//         }
//     }, [toaster]);

//     const showToaster = (success: boolean, text: string) => {
//         setToaster({ classProp: success ? "success" : "error", toasterText: text });
//     };

//     useEffect(() => {
//         if (userCartData) {
//             const fetchProductInfos = async () => {
//                 const products = await Promise.all(userCartData.products.map(async (productCart) => {
//                     const productInfo = await productService.getProductById(productCart.productId);
//                     return { ...productInfo, quantity: productCart.qty } as ProductCartModel;
//                 }));
//                 setProductInfos(products);
//             };

//             fetchProductInfos();
//         }
//     }, [userCartData]);

//     useEffect(() => {
//         const totalPrice = productInfos.reduce((acc, product) => acc + product.price * product.quantity, 0);
//         setTotalPrice(totalPrice.toFixed(2));
//     }, [productInfos]);

//     return (
//         <>
//         <section className="cart">
//             <h2 className="cart-title"><FontAwesomeIcon icon={faBagShopping} /> Votre panier</h2>
//             <div className="cart-container">
//                 {isLoadingUserCartData && <Loading />}
//                 {userCartData && userId ? <>
//                     {productInfos.map((product, i) => ( <>
//                         <ProductCart
//                             key={i} 
//                             product={product}
//                             showToaster={showToaster}
//                             setProductInfos={setProductInfos} 
//                         />
//                         {/* <article key={i} className="cart-item">
//                             <img src={product.imageUrl} alt={product.title} className="cart-item-img" />
//                             <div className="cart-item-container">
//                                 <h3 className="cart-item-title">{product.title}</h3>
//                                 <div>
//                                     <h4 className="cart-item-price">{product.price} €</h4>
//                                     <div className="quantity">
//                                         <div className="quantity-btn down" onClick={() => handleQuantityChange(product.id, -1)}>
//                                             <FontAwesomeIcon icon={faMinus} />
//                                         </div>
//                                         <input 
//                                             type="number"
//                                             className="quantity-input" 
//                                             value={product.quantity}
//                                             readOnly 
//                                         />
//                                         <div className="quantity-btn up" onClick={() => handleQuantityChange(product.id, 1)}>
//                                             <FontAwesomeIcon icon={faPlus} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </article>
//                         <span className="bar"></span> */}
//                     </> ))}
//                     <div className="cart-total">Total : {totalPrice} €</div>
//                 </> : <> 
//                     {errorUserCartData} 
//                 </>}
//             </div>
//         </section>
//         </>
//     )
// }

// export default DisplayCart;