import { FC } from "react";
import "./_ButtonLink.scss";

interface ButtonLinkProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    buttonText: string;
    className: string;
  }

const ButtonLink:FC<ButtonLinkProps> = ({ onClick, buttonText, className }) => {
    return (
        <button 
            onClick={onClick}
            className={`${className}  btn-link`}
        >
            {buttonText}
        </button>
    )
}

export default ButtonLink;