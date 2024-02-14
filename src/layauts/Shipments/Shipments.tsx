import React, { Suspense, useState } from 'react';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import PopapModal from '../../components/PopapModal/PopapModal';
import ChooseYourOption from '../../components/ChooseYourOption/ChooseYourOption';
import css from './Shipments.module.css'

const LazyListOfOrders = React.lazy(() => import('../../components/ListOfOrders/ListOfOrders'));

const Shipments: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [shownSubMenu, setShownSubMenu] = useState<number>(-1);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleNewOrder = () => {
    setShownSubMenu(-1);
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className={css.page_wrap}>
      <div id={css.shipments_header}>
        <h2>Shipments</h2>
        <DefaultButton setState={handleNewOrder} button_text={'New Order'} width={140} height={32} />
      </div>
      <PopapModal active={isModalOpen} setActive={setIsModalOpen}>
        <ChooseYourOption />
      </PopapModal>

      <div id={css.tabs_wrap}>
        <div id={css.greyLine} />
        <div className={value === 0 ? `${css.activeTab} ${css.tab}` : `${css.tab}`} onClick={() => handleChange(0)}>
          All
        </div>
        <div className={value === 1 ? `${css.activeTab} ${css.tab}` : `${css.tab}`} onClick={() => handleChange(1)}>
          Active
        </div>
        <div className={value === 2 ? `${css.activeTab} ${css.tab}` : `${css.tab}`} onClick={() => handleChange(2)}>
          Drafts
        </div>
        <div className={value === 3 ? `${css.activeTab} ${css.tab}` : `${css.tab}`} onClick={() => handleChange(3)}>
          Archive
        </div>
      </div>
      {value === 0 && (
        <ErrorBoundary>
          <Suspense fallback={'Loading...'}>
            <LazyListOfOrders />
          </Suspense>
        </ErrorBoundary>
      )}
      {value === 1 && (
        <div>
          Active
        </div>
      )}
      {value === 2 && (
        <ErrorBoundary>
          <Suspense fallback={'Loading...'}>
            <LazyListOfOrders isDraft={true} shownSubMenu={shownSubMenu} setShownSubMenu={setShownSubMenu} />
          </Suspense>
        </ErrorBoundary>
      )}
      {value === 3 && (
        <div>
          Archive
        </div>
      )}
    </div >
  );
};

export default Shipments;