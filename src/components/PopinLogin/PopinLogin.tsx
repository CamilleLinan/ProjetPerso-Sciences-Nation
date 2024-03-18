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
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const { signIn, signUp } = useContext(UserContext);

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const userName = `${lastName} ${firstName}`;
            await signUp(e, userName, email, password);
            onClose();
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message.match("auth/email-already-in-use")) {
                    setError("Cette adresse mail est déjà utilisée")
                }
                if (error.message.match("auth/weak-password")) {
                    setError("Votre mot de passe doit faire plus de 6 caractères")
                }
            }
        }
    }

    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await signIn(e, email, password);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.match("auth/invalid-credential")) {
                    setError("L'email ou le mot de passe est invalide")
                }
            }
        }
    }

    const handleForm = () => {
        setSignInMode((signInMode) => !signInMode);
        setError("");
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
                    {!signInMode && <>
                        <input
                            type="text"
                            placeholder="Nom"
                            className="popin-content-form-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Prénom"
                            className="popin-content-form-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </> }
                    <input
                        type="email"
                        placeholder="Email"
                        className="popin-content-form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="popin-content-form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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