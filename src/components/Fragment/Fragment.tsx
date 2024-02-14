import React, { Dispatch, SetStateAction } from 'react';
import { RecipContInfo } from '../RecipeDetails/RecipeDetails';
import css from './Fragment.module.css';

type FragmentProps = {
  title: string;
  children: React.ReactNode;
  isSelected?: boolean;
  custom: boolean;
  setCustomPayer?: Dispatch<SetStateAction<boolean>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  setPayer?: Dispatch<SetStateAction<RecipContInfo | undefined>>;
  payer?: RecipContInfo | undefined;
}

const Fragment: React.FC<FragmentProps> = (
  { title, children, setPayer, payer, isSelected, setModal, setCustomPayer, custom }) => {

  const handleClick = () => {
    if (setPayer && payer) setPayer(payer)
    if (setModal) setModal(true);
    if (setCustomPayer) setCustomPayer(custom)
  }

  return (
    <div onClick={handleClick} className={css.detWrap}>
      <span style={{ marginBottom: title === '' ? 'unset' : '8px' }} className={css.subTitle}>
        {title}
      </span>
      <div style={isSelected ? { borderColor: '#D0AC80' } : {}} className={setPayer && payer ? css.hovered : css.detail}>
        {children}
      </div>
    </div>
  );
};

export default Fragment;