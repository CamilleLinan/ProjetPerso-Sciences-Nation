import { FC, useState } from "react";
import './_Toaster.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export interface ToasterProps {
    classProp: string,
    toasterText: string
}

const Toaster:FC<ToasterProps> = ({ classProp, toasterText }) => {
    const [ showToaster, setShowToaster ] = useState<boolean>(true);
    
    const onClose = () => {
        setShowToaster(false);
    }

    return (
        <>{ showToaster &&
            <div className={`toaster toaster-${classProp}`}>
                <span className="toaster-text">{toasterText}</span>
                <span className="toaster-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </span>
            </div>
        }</>
    )
}

export default Toaster;