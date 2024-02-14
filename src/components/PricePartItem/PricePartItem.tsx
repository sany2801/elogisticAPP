import React from 'react';
import pricePartItemcss from './PricePartItem.module.css';

type PricePartItemProps = {
  name: string,
  price: number,
  colr?: string,
}

const PricePartItem: React.FC<PricePartItemProps> = ({ name, price, colr }) => {

  const getBoxName = () => {
    switch (name) {
      case 'small':
        return 'Small box';
      case 'medium':
        return 'Medium box';
      case 'large':
        return 'Large box';
      case 'custom':
        return 'Personal box';
      case 'parcel':
        return 'Parcel';
      case 'moving':
        return 'Moving';
      case 'Standart':
        return 'Standart delivery';
      case 'Fast':
        return 'Fast delivery';
      case 'Extra':
        return 'Extra delivery';
      default:
        return name;
    }
  }

  return (
    <div style={colr ? { color: colr } : {}} className={pricePartItemcss.item} >
      <span>{getBoxName()}</span>
      <span>$ {price.toFixed(2)}</span>
    </div >
  );
};

export default PricePartItem;