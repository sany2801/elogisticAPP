import React from 'react';
import cssList from './OrderItemInList.module.css';


type OrderItemInListProps = {
  name: string,
  width: number,
  height: number,
  lenght: number,
  amount: number,
}

const OrderItemInList: React.FC<OrderItemInListProps> = ({ name, width, height, lenght, amount }) => {


  return (
    <div className={cssList.item}>
      <div className={cssList.name}>
        <span>{name}</span>
        <span className={cssList.gabarite}>({width}x{height}x{lenght})</span>
      </div>
      <span>x{amount}</span>
    </div>
  );
};

export default OrderItemInList;