import { FC, useContext, useEffect, useState } from "react";
import "./_Header.scss";
import { NavLink } from "react-router-dom";
import ButtonLink from "../../ButtonLink/ButtonLink";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";
import { UserContext } from "../../../../context/userContext";
import useFetchUserCart from "../../../../hooks/fetchUserCart.hook";
// import useFetchUserCart from "../../../../hooks/fetchUserCart.hook";

interface HeaderProps {
    cartQty: number;
}

const Header:FC<HeaderProps> = ({ cartQty }) => {
    const { currentUser, logOut } = useContext(UserContext);
    const [ showPopin, setShowPopin ] = useState(false);
    const { userCartData } = useFetchUserCart(currentUser?.id);
    const [ totalQty, setTotalQty ] = useState<string | null>('0');
    
    useEffect(() => {
        const qtyInStorage = localStorage.getItem('qty');
        if (userCartData && userCartData.products.length > 0) {
            const calculatedTotalQty = userCartData.products.reduce(
                (total, product) => {
                    return total + product.qty;
                }, 0);

            setTotalQty(calculatedTotalQty.toString());
        } else if (qtyInStorage) {
            setTotalQty(qtyInStorage)
        } else {
            setTotalQty('0');
        }
    }, [userCartData]);

    const handleShowPopin = () => {
        setShowPopin((showPopin) => !showPopin);
    }

    return (
        <header className="header">
            <img className="header-logo" src={logo} alt="logo-sciences-nation" />
            <nav className="header-nav">
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => (
                                isActive ? 'header-nav-link header-nav-link-active' 
                                : 'header-nav-link header-nav-link-inactive'
                            )}
                            title="Accueil"
                            end to="/home"
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (
                                isActive ? 'header-nav-link header-nav-link-active' 
                                : 'header-nav-link header-nav-link-inactive'
                            )}
                            title="Panier"
                            end to="/cart"
                        >
                            Panier ({cartQty ? cartQty : totalQty})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (
                                isActive ? 'header-nav-link header-nav-link-active' 
                                : 'header-nav-link header-nav-link-inactive'
                            )}
                            title="Favoris"
                            end to="/favorites"
                        >
                            Favoris
                        </NavLink>
                    </li>
                    <li>
                        <ButtonLink 
                            onClick={currentUser ? 
                                (e: React.MouseEvent<HTMLButtonElement>) => logOut(e) 
                                : handleShowPopin
                            }
                            buttonText={currentUser ? 
                                "Se déconnecter" 
                                : "Se connecter"
                            }
                            className="header-nav-btn" 
                        />
                    </li>
                </ul>
            </nav>
            {showPopin && <PopinLogin onClose={handleShowPopin} />}
        </header>
    )
}

export default Header;