import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import WhiteButton from '../../components/WhiteButton/WhiteButton'
import css from './Order.module.css'

const Order: React.FC = () => {
  const [activeLink, setActiveLink] = useState("sender");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    let activeLink = "";

    switch (true) {
      case currentPath.includes("sender"):
        activeLink = "sender";
        break;
      case currentPath.includes("beneficiary"):
        activeLink = "beneficiary";
        break;
      case currentPath.includes("add_parcel"):
        activeLink = "add_parcel";
        break;
      case currentPath.includes("notifications"):
        activeLink = "Notifications";
        break;
      case currentPath.includes("confirmation"):
        activeLink = "confirmation";
        break;
      default:
        break;
    }

    setActiveLink((prevActiveLink) => prevActiveLink !== activeLink ? activeLink : prevActiveLink);
  }, [location]);

  const handleSaveAndExit = () => {
    sessionStorage.removeItem('passedOrderNumber');
    navigate('/Home/shipments')
  }

  return (
    <div id={css.order_wrap}>
      <header id={css.order_header}>
        <div id={css.header_top}>
          <h3>New parcel</h3>
          <WhiteButton setState={handleSaveAndExit} button_text={'Exit'} width={140} height={40} />
        </div>
        <div id={css.header_bottom}>
          <div className={`${css.orders_link} ${activeLink === "sender" ? `${css.active_link}` : ''}`} >Sender details</div>
          <div className={css.dot}></div>
          <div className={`${css.orders_link} ${activeLink === "beneficiary" ? `${css.active_link}` : ''}`} >Recipient details</div>
          <div className={css.dot}></div>
          <div className={`${css.orders_link} ${activeLink === "add_parcel" ? `${css.active_link}` : ''}`} >Add parcel</div>
          <div className={css.dot}></div>
          <div className={`${css.orders_link} ${activeLink === "confirmation" ? `${css.active_link}` : ''}`} >Confirmation</div>
        </div>
      </header>
      <Outlet></Outlet>
    </div>
  )
}

export default Order;