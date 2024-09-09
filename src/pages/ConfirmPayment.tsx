import { FC } from 'react';
import Banner from '../components/Shared/Banner/Banner';
import PaymentStatus from '../components/ConfirmPaymentPage/PaymentStatus';

const ConfirmPayment: FC = () => {
    return (
      <>
        <Banner />
        <PaymentStatus />
      </>
    );
};

export default ConfirmPayment;