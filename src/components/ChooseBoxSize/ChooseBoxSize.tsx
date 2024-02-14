import React from 'react';
import { useNavigate } from 'react-router-dom';
import smallBox from '../../images/small_box_img.svg';
import mediumBox from '../../images/medium_box_image.svg';
import largeBox from '../../images/large_box_image.svg';
import WhiteButton from '../WhiteButton/WhiteButton';
import DefaultButton from '../DefaultButton/DefaultButton';
import BoxChoosingCard from '../BoxChoosingCard/BoxChoosingCard';
import { BoxType } from '../AddParcel/AddParcel';
import css from './ChooseBoxSize.module.css';


type ChooseBoxSizeProps = {
  chosenBox: BoxType;
  setchosenBox: (box: BoxType) => void;
  handleCreateBox: (box: BoxType) => void;
  setActive: (active: boolean) => void;
  handleUserBox: () => void;
  chosenParam: 'cm' | 'in';
  setChosenParam: (param: 'cm' | 'in') => void;
}

const ChooseBoxSize: React.FC<ChooseBoxSizeProps> = (
  { chosenBox, setchosenBox, setActive, handleUserBox, handleCreateBox, chosenParam, setChosenParam }) => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/order/beneficiary');
  }

  const handleConfirm = () => {
    handleCreateBox(chosenBox);
    setActive(false);
  }


  return (
    <>
      <div id={css.title}>Which pack size is right for you</div>
      <div id={css.subTitle}>All items should fit in the box you choose</div>

      <div id={css.paramsWrap}>
        <div id={css.params}>
          <span>Units</span>
          <label className={chosenParam === 'cm' ? `${css.chosenCm}` : `${css.notChosenCm}`}>
            <input
              className={css.inp}
              checked={chosenParam === 'cm'}
              onChange={() => setChosenParam('cm')}
              type="radio"
              value="cm"
              name="cm"
              id="cm"
            />
            cm
          </label>
          <label className={chosenParam === 'in' ? `${css.chosenIn}` : `${css.notChosenIn}`}>
            <input
              className={css.inp}
              checked={chosenParam === 'in'}
              onChange={() => setChosenParam('in')}
              type="radio"
              value="in"
              name="in"
              id="in"
            />
            in
          </label>
        </div>
      </div>

      <div id={css.boxes}>
        <BoxChoosingCard chosenBox={chosenBox} setchosenBox={setchosenBox} image={smallBox} name={'Small box'} width={20} length={30} height={50} chosenParam={chosenParam} />
        <BoxChoosingCard chosenBox={chosenBox} setchosenBox={setchosenBox} image={mediumBox} name={'Medium box'} width={30} length={40} height={60} chosenParam={chosenParam} />
        <BoxChoosingCard chosenBox={chosenBox} setchosenBox={setchosenBox} image={largeBox} name={'Large box'} width={40} length={50} height={80} chosenParam={chosenParam} />
      </div>

      <div id={css.buttons}>
        <WhiteButton setState={handleBack} button_text={'Back'} width={316} height={40} />
        {chosenBox === '' || chosenBox === 'custom' ? (
          <DefaultButton setState={handleUserBox} button_text={'I have my own box'} width={316} height={40} />
        ) : (
          <DefaultButton setState={handleConfirm} button_text={'Confirm'} width={316} height={40} />
        )}
      </div>
    </>
  );
};

export default ChooseBoxSize;