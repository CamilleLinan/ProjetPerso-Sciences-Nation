import { FC, ReactNode } from "react";
import "./_ButtonMain.scss";

interface ButtonMainProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
    text: string | ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}

const ButtonMain:FC<ButtonMainProps> = ({ onClick, text, type, disabled }) => {
    return (
        <button className="btn-main" onClick={onClick} type={type} disabled={disabled}>
            <span>{text}</span>
        </button>
    )
}

export default ButtonMain;