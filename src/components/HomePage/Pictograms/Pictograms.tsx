import { FC } from "react";
import "./_Pictrograms.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const Pictograms:FC = () => {
    return (
        <section className="pictograms">
            <div className="pictograms-container">
                <FontAwesomeIcon icon={faTruckFast} />
                <p>Livraison rapide</p>
            </div>
            <div className="pictograms-container">
                <FontAwesomeIcon icon={faCreditCard} />
                <p>Paiement sécurisé</p>
            </div>
            <div className="pictograms-container">
                <FontAwesomeIcon icon={faHeadphones} />
                <p>Équipe à votre écoute</p>
            </div>
        </section>
    )
}

export default Pictograms;