import React from 'react';
import unChecked_icon from '../../images/EmptyCheckboxIcon.svg'
import checked_icon from '../../images/CheckedCheckboxIcon.svg'
import css from './CustomCheckbox.module.css'

type CustomCheckboxProps = {
  checked: boolean
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked }) => {

  return (
    <div
      className={css.custom_checkbox}
    >
      {checked ? (
        <img src={checked_icon} alt="checked" />
      ) : (
        <img src={unChecked_icon} alt="unChecked" />
      )}
    </div>
  );
};

export default CustomCheckbox;