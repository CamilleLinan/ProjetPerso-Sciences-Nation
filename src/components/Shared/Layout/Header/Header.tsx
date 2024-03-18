import { FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./_Header.scss";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";
import { UserContext } from "../../../../context/userContext";

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
                            end to="/"
                        >
                            Panier
                        </NavLink>
                    </li>
                    <li>
                        {currentUser ? 
                            <button 
                            onClick={(e) => logOut(e)} 
                            className="header-nav-btn"
                        >
                            Se déconnecter
                        </button> 
                        : <button 
                        onClick={handleShowPopin} 
                        className="header-nav-btn"
                    >
                        Se connecter
                    </button>}
                        {/* <button 
                            onClick={currentUser ? logOut() : handleShowPopin} 
                            className="header-nav-btn"
                        >
                            {currentUser ? "Se déconnecter" : "Se connecter"}
                        </button> */}
                    </li>
                </ul>
            </nav>
            {showPopin && <PopinLogin onClose={handleShowPopin} />}
        </header>
    )
}

export default Header;