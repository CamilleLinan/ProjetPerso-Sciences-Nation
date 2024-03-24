import { FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./_Header.scss";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";
import { UserContext } from "../../../../context/userContext";
import ButtonLink from "../../ButtonLink/ButtonLink";

const Header:FC = () => {
    const { currentUser, logOut } = useContext(UserContext);
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
                            Panier
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