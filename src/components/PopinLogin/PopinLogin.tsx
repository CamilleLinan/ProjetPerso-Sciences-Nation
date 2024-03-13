import { FC, useContext, useState } from "react";
import "./_PopinLogin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/userContext";

interface PopinLoginProps {
    onClose: () => void;
}

const PopinLogin: FC<PopinLoginProps> = ({ onClose }) => {
    const [ signInMode, setSignInMode ] = useState(true);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const { signIn, signUp } = useContext(UserContext);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSignUp = async () => {
        try {
            await signUp(email, password);
            onClose();
        } catch (error) {
            console.log(error)
            // setError(error.message);
        }
    }

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
            onClose();
        } catch (error) {
            setError("L'email ou le mot de passe est invalide");
        }
    }

    const handleForm = () => {
        setSignInMode((signInMode) => !signInMode);
    }

    return (
        <div className="popin">
            <div className="popin-content">
                <header className="popin-content-header">
                    <h2>{signInMode ? "Se connecter" : "Créer un compte"}</h2>
                    <span className="popin-close" onClick={onClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </header>

                <form className="popin-content-form">
                    <input
                        type="email"
                        placeholder="Email"
                        className="popin-content-form-input"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="popin-content-form-input"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    {error && <span className="popin-error">{error}</span>}
                    
                    <button 
                        onClick={signInMode ? handleSignIn : handleSignUp}
                        className="popin-content-form-btn"
                    >
                        {signInMode ? 
                            "Se connecter" 
                            : "Créer un compte"
                        }
                    </button>

                    <span onClick={handleForm} className="popin-content-link">
                        {signInMode ? 
                            "Pas encore de compte ? S'inscrire" 
                            : "Déjà un compte ? Se connecter"
                        }
                    </span>
                </form>
            </div>
        </div>
    )
}

export default PopinLogin;