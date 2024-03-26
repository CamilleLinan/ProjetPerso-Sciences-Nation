import { FC } from "react";
import "./_Presentation.scss";
import illustration from "../../../assets/illustration.jpg";

const Presentation:FC = () => {
    return (
        <section className="presentation">
            <div className="presentation-container-illustration">
                <img src={illustration} alt="phases de lune" className="presentation-container-illustration-img" />
            </div>
            <div className="presentation-container-text">
                <h3>Découvrez l'élégance de la Science</h3>
                <p>
                    Chez Sciences Nation, nous croyons que la science ne devrait pas 
                    seulement être limitée aux laboratoires et aux salles de classe. 
                    C'est pourquoi nous avons créé une boutique en ligne dédiée à la vente 
                    d'objets de décoration scientifique uniques et abordables, pour apporter 
                    une touche de curiosité et d'élégance à votre quotidien.
                </p>

                <h3>Qualité et accessibilité</h3>
                <p>
                    Chez Sciences Nation, nous nous engageons à offrir des produits de haute 
                    qualité à des prix abordables. Chaque article de notre collection est 
                    soigneusement sélectionné pour son design innovant, sa durabilité et son 
                    rapport qualité-prix exceptionnel.
                </p>

                <h3>Service Clientèle à votre écoute</h3>
                <p>
                    Votre satisfaction est notre priorité absolue. Notre équipe de service 
                    clientèle dévouée est là pour répondre à toutes vos questions, vous guider 
                    dans votre processus d'achat et vous assurer la meilleure expérience possible. 
                    Nous sommes là pour vous accompagner à chaque étape, de la navigation sur notre 
                    site web à la livraison de votre commande à votre porte.
                </p>
            </div>
        </section>
    )
}

export default Presentation;