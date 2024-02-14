import React, { useEffect, useState } from 'react';
import img from '../../images/large_box_image.svg';
import WhiteButton from '../WhiteButton/WhiteButton';
import DefaultButton from '../DefaultButton/DefaultButton';
import { BoxType } from '../AddParcel/AddParcel';
import css from './ChooseUsersBoxSize.module.css';

type ChooseUsersBoxSizeProps = {
  chosenParam: 'cm' | 'in';
  setChosenParam: (param: 'cm' | 'in') => void;
  setChosenSizes: (sizes: [number, number, number] | []) => void;
  setActive: (active: boolean) => void;
  setStep: (step: number) => void;
  setchosenBox: (box: BoxType) => void;
  handleUpdateBoxSize: (box: BoxType) => void;
  handleCreateBox: (box: BoxType) => void;
  chosenBox: BoxType;
}

const ChooseUsersBoxSize: React.FC<ChooseUsersBoxSizeProps> = (
  { chosenParam, setChosenParam, setChosenSizes, setActive, setStep, setchosenBox, handleUpdateBoxSize, handleCreateBox, chosenBox }) => {
  const [w, setW] = useState<number>(20);
  const [l, setL] = useState<number>(20);
  const [h, setH] = useState<number>(20);

  const isValidSizes = w > 0 && l > 0 && h > 0;

  const handleW = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) {
      setW(+e.target.value);
    }
  }

  const handleL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) {
      setL(+e.target.value);
    }
  }

  const handleH = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) {
      setH(+e.target.value);
    }
  }

  const handleBack = () => {
    setStep(0);
  }

  const handleSave = () => {
    if (isValidSizes) {
      setchosenBox('custom');
      setStep(0);
      setActive(false);
      if (chosenBox === "") {
        handleCreateBox('custom');
      } else {
        handleUpdateBoxSize('custom');
      }
    }
  }

  useEffect(() => {
    setChosenSizes([w, l, h]);
  }, [h, l, w, setChosenSizes])

  return (
    <>
      <div id={css.paramsWrap}>
        <div id={css.params}>
          <span>Tell us your box details</span>
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

      <div id={css.imageWrap}>
        <img src={img} alt="box" />
      </div>

      <div className={css.gabarites}>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Width</span>
          <input onChange={handleW} value={w} className={css.input} type="number" />
        </div>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Length</span>
          <input onChange={handleL} value={l} className={css.input} type="number" />
        </div>
        <div className={css.gabarite}>
          <span className={css.gabariteTitle}>Height</span>
          <input onChange={handleH} value={h} className={css.input} type="number" />
        </div>
      </div>

      <div id={css.buttons}>
        <WhiteButton setState={handleBack} button_text={'Back'} width={158} height={40} />
        <DefaultButton disabled={!isValidSizes} setState={handleSave} button_text={'Save'} width={158} height={40} />
      </div>
    </>
  );
};

export default ChooseUsersBoxSize;