import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./_Header.scss";
import PopinLogin from "../../../PopinLogin/PopinLogin";
import logo from "../../../../assets/logo_sn.png";

const Header:FC = () => {
    const [showPopin, setShowPopin] = useState(false);

    const onClose = () => {
        setShowPopin(false);
    };

    const handleSignInClick = () => {
        setShowPopin(true);
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
                        <button onClick={handleSignInClick}>Sign In</button>
                    </li>
                </ul>
            </nav>
            {showPopin && <PopinLogin onClose={onClose} />}
        </header>
    )
}

export default Header;