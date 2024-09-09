import { 
    FC, 
    useContext, 
    useState 
} from "react";
import "./_PopinLogin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/userContext";
import ButtonLink from "../Shared/ButtonLink/ButtonLink";
import loginService from "../../services/login.service";

interface PopinLoginProps {
    onClose: () => void;
}

const PopinLogin: FC<PopinLoginProps> = ({ onClose }) => {
    const [ signInMode, setSignInMode ] = useState(true);
    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [ error, setError ] = useState("");

    const { signIn } = useContext(UserContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm((prevForm) => ({
            ...prevForm,
            [name]: value.trim(),
        }));
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await loginService.signUp(userForm.firstname, userForm.lastname, userForm.email, userForm.password)
            if (userData) {
                setError("");
                setSignInMode(true);
                return userData;
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                if (error.message.match("Email")) {
                    setError("Cette adresse mail est déjà utilisée")
                }
            }
        }
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginService.signIn(userForm.email, userForm.password)
            .then((res) => {
                const data = res?.data;
                signIn(data.id, data.token);
                onClose();
            })
            .catch(() => {
                console.log(error);
            })
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

                <form className="popin-content-form" onSubmit={signInMode ? handleSignIn : handleSignUp}>
                    {!signInMode && <>
                        <input
                            type="text"
                            placeholder="Nom"
                            name="lastname"
                            className="popin-content-form-input"
                            value={userForm.lastname}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Prénom"
                            name="firstname"
                            className="popin-content-form-input"
                            value={userForm.firstname}
                            onChange={handleInputChange}
                            required
                        />
                    </> }
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="popin-content-form-input"
                        value={userForm.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        className="popin-content-form-input"
                        value={userForm.password}
                        onChange={handleInputChange}
                        required
                    />

                    {error && <span className="popin-error">{error}</span>}
                    
                    <ButtonLink 
                        onClick={signInMode ? (e: React.FormEvent) => handleSignIn(e) : (e: React.FormEvent) => handleSignUp(e)} 
                        buttonText={signInMode ?  
                            "Se connecter" 
                            : "Créer un compte"
                        } 
                        className="popin-content-form-btn"
                    />

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