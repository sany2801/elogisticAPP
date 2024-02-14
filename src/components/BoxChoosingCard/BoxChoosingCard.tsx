import React from 'react';
import { BoxType } from '../AddParcel/AddParcel';
import css from './BoxChoosingCard.module.css';

type BoxChoosingCardProps = {
  image: string;
  name: string;
  width: number;
  length: number;
  height: number;
  chosenParam: 'cm' | 'in';
  chosenBox: BoxType;
  setchosenBox: (box: BoxType) => void;
}

const BoxChoosingCard: React.FC<BoxChoosingCardProps> = (
  { image, name, width, length, height, chosenParam, chosenBox, setchosenBox }) => {

  const getBoxName = () => {
    switch (name) {
      case 'Small box':
        return 'small';
      case 'Medium box':
        return 'medium';
      case 'Large box':
        return 'large';
      default:
        return '';
    }
  }

  const shortName = getBoxName();

  const handleClick = () => {
    setchosenBox(getBoxName())
  }

  return (
    <div onClick={handleClick} className={shortName === chosenBox ? `${css.box} ${css.chosenBoxStyle}` : `${css.box}`}>
      <span className={css.boxTitle}>{name}</span>
      <div className={css.imageContainer}>
        <img src={image} alt={image} />
      </div>
      <div className={css.gabarites}>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Width</span>
          <span className={css.gabariteValue}>{width} {chosenParam}</span>
        </div>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Length</span>
          <span className={css.gabariteValue}>{length} {chosenParam}</span>
        </div>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Height</span>
          <span className={css.gabariteValue}>{height} {chosenParam}</span>
        </div>
      </div>
    </div >
  );
};

export default BoxChoosingCard;