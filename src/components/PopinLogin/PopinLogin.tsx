import { FC, useState } from "react";
import { auth } from "../../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface PopinLoginProps {
    onClose: () => void;
}

const PopinLogin: FC<PopinLoginProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onClose();
        } catch (error) {
            console.log(error)
            // setError(error.message);
        }
    }

    return (
        <div className="popin">
            <div className="popin-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>S'inscrire</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleSignUp}>S'inscrire</button>
            </div>
        </div>
    )
}

export default PopinLogin;