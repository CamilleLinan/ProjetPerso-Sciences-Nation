import { FC } from "react";
import "./_ButtonMain.scss";

interface ButtonMainProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
    text: string;
}

const ButtonMain:FC<ButtonMainProps> = ({ onClick, text }) => {
    return (
        <button className="btn-main" onClick={onClick}>
            <span>{text}</span>
        </button>
    )
}

export default ButtonMain;