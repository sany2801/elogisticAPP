import React, { ReactNode } from "react";
import InputInfo from "../InputInfo/InputInfo";
import css from "./AccountItem.module.css";

type AccountItemProps = {
  title: string;
  img_src: string;
  setState: () => void;
  children: ReactNode;
  address?: any;
};

const AccountItem: React.FC<AccountItemProps> = ({
  title,
  img_src,
  children,
  setState,
  address,
}) => {


  return (
    <>
      {address ? (
        <div className={css.account_item_wrap}>
          <div className={css.title_info}>
            {!address && <img src={img_src} alt={title} />}
            <span>{title}</span>
            <button className={css.edit_btn} onClick={setState}>Edit</button>
          </div>
          <div className={css.extended_info}>
            <InputInfo value={address.country} title="Country" className="" />
            <InputInfo value={address.city} title="City" className="" />
            <InputInfo value={address.state} title="State/Province" className="" />
            <InputInfo value={address.street} title="Street" className="" />
            <InputInfo
              value={address.building_number}
              title="Building number"
              className=""
            />
            <InputInfo
              value={address.postal_code}
              title="Postal code"
              className=""
            />
            <InputInfo value={address.apartment} title="Apartment" className="" />
            <InputInfo value={address.floor} title="Floor" className="" />
          </div>
        </div >
      ) : (
        <div onClick={setState} className={`${css.account_item_wrap} ${css.clickable}`}>
          <div className={css.title_info}>
            <img src={img_src} alt={title} />
            <span>{title}</span>
          </div>
        </div >
        
      )}

      {children}
         
    </>
  );
};

export default AccountItem;
