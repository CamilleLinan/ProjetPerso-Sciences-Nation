import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./_Header.scss";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";

const Header:FC = () => {
    const [showPopin, setShowPopin] = useState(false);

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
                        <button onClick={handleShowPopin} className="header-nav-btn">Se connecter</button>
                    </li>
                </ul>
            </nav>
            {showPopin && <PopinLogin onClose={handleShowPopin} />}
        </header>
    )
}

export default Header;