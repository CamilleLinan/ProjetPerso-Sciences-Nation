import { FC, useContext, useState } from "react";
import "./_Header.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import ButtonLink from "../../ButtonLink/ButtonLink";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Header:FC = () => {
    const { 
        currentUser, 
        totalCartQty, 
        logOut 
    } = useContext(UserContext);
    const [ showPopin, setShowPopin ] = useState(false);

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
                                isActive ? 'header-nav-link active' 
                                : 'header-nav-link inactive'
                            )}
                            title="Accueil"
                            end to="/home"
                        >
                            <FontAwesomeIcon icon={faEarth} />
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (
                                isActive ? `header-nav-link active ${totalCartQty > 0 ? 'cart' : ''}` 
                                : `header-nav-link inactive ${totalCartQty > 0 ? 'cart' : ''}`
                            )}
                            title="Panier"
                            end to="/cart"
                        >
                            <FontAwesomeIcon icon={faBagShopping} />
                            Panier
                            {totalCartQty > 0 && 
                                <span className="qty">
                                    {totalCartQty}
                                </span>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (
                                isActive ? 'header-nav-link active' 
                                : 'header-nav-link inactive'
                            )}
                            title="Favoris"
                            end to="/favorites"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            Favoris
                        </NavLink>
                    </li>
                    <li>
                        <ButtonLink 
                            onClick={currentUser ? 
                                logOut
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