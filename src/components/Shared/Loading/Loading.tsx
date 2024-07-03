import { FC } from "react";
import "./_Loading.scss";

const Loading:FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    )
};

export default Loading;