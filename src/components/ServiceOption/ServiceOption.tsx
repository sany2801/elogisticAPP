import React from 'react';
import { ItemWithPrice } from '../Confirmation/Confirmation';
import css from './ServiceOption.module.css';

type ServiceOptionProps = {
  isActive: boolean;
  name: string;
  price: number;
  handleCl: (serv: ItemWithPrice) => void;
}

const ServiceOption: React.FC<ServiceOptionProps> = ({ isActive, name, price, handleCl }) => {

  const handleClick = () => {
    handleCl({ name: name, price: price })
  }

  return (
    <div onClick={handleClick} className={isActive ? css.chosen : css.item}>
      <span className={css.text}>{name}</span>
      <span className={css.price}>{price === 0 ? 'free' : '+' + price.toFixed(2) + ' $'}</span>
    </div >
  );
};

export default ServiceOption;