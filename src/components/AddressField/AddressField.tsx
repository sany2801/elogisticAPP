import React from 'react';
import { AddressObject } from '../SenderAddressForm/SenderAddressForm';
import css from './AddressField.module.css';

type AddressFieldProps = {
  onClick: () => void;
  object: AddressObject;
  width?: string | number;
};

const AddressField: React.FC<AddressFieldProps> = ({ onClick, object, width }) => {

  return (
    <div style={{ width: width }} onClick={onClick} className={css.sender_modal_defAddress}>
      <span className={css.sender_modal_address}>{`${object.postal_code} ${object.country} ${object.city}`}</span>
      <span className={css.sender_modal_address}>{`${object.street} ${object.building_number}`}</span>
      <span className={css.sender_modal_address}>floor {`${object.floor === '' ? `-` : object.floor} apartment ${object.apartment === '' ? '-' : object.apartment}`}</span>
      {object.elevator === 'available' && (
        <>
          <div className={css.horiz_line}></div>
          <span className={css.sender_modal_elevator}>Freight elevator</span>
        </>
      )}
      {object.elevator === 'not_available' && (
        <>
          <div className={css.horiz_line}></div>
          <span className={css.sender_modal_elevator}>No freight elevator</span>
        </>
      )}
      {object.elevator === '' && (
        <>
          <div className={css.horiz_line}></div>
          <span className={css.sender_modal_elevator}>Don't know about elevator</span>
        </>
      )}
    </div>
  )
}
export default AddressField;