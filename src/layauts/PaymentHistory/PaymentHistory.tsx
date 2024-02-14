import React, { Suspense } from 'react';
import css from './PaymentHistory.module.css';

const LazyListOfPayments = React.lazy(() => import('../../components/ListOfPayments/ListOfPayments'));

const PaymentHistory: React.FC = () => {

  return (
    <div id={css.pageWrap}>
      <header>
        <h2>Payment history</h2>
      </header>
      <Suspense fallback={'Loading...'}>
        <LazyListOfPayments />
      </Suspense>
    </div >
  );
};

export default PaymentHistory;