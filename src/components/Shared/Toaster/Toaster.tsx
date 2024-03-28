import { FC } from "react";
import './_Toaster.scss';

export interface ToasterProps {
    classProp: string,
    toasterText: string
}

const Toaster:FC<ToasterProps> = ({ classProp, toasterText }) => {
    return (
        <div className={`toaster toaster-${classProp}`}>
            <span className="toaster-text">{toasterText}</span>
        </div>
    )
}

export default Toaster;