import { FC } from 'react';
import "./_PaymentStatus.scss";
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const PaymentStatus: FC = () => {
    const location = useLocation();
    const { success, paymentIntent, error } = location.state || {};
  
    return (
        <section className='confirm-payment'>
            {success ? (
                <div className='confirm-payment-container'>
                    <FontAwesomeIcon icon={faSquareCheck} className='confirm-payment-icon success' />
                    <h2>Paiement réussi !</h2>
                    <p>ID de transaction: {paymentIntent.id}</p>
                    <NavLink to="/home">
                        Retourner à la page d'accueil
                    </NavLink>
                </div>
            ) : (
                <div className='confirm-payment-container'>
                    <FontAwesomeIcon icon={faSquareXmark} className='confirm-payment-icon echec' />
                    <h2>Échec du paiement</h2>
                    <p>{error}</p>
                    <NavLink to="/cart">
                        Retourner à la page du panier
                    </NavLink>
                </div>
            )}
        </section>
    );
};

export default PaymentStatus;