import React from 'react';
import add_icon from '../../images/Add.svg'
import DefaultFilterItemStyle from './DefaultFilterItem.module.css'


type DefaultFilterItemProps = {
  handleExtended: () => void;
  title: string
};

const DefaultFilterItem: React.FC<DefaultFilterItemProps> = ({ handleExtended, title }) => {
  return (
    <div onClick={handleExtended} className={DefaultFilterItemStyle.filter_item}>
      <button className={DefaultFilterItemStyle.filter_add_btn}>
        <img src={add_icon} alt='add' />
      </button>
      {title}
    </div>
  );
};

export default DefaultFilterItem;