import React, { useEffect, useState } from 'react';
import PopapModal from '../PopapModal/PopapModal';
import { ObjType } from '../AddParcel/AddParcel';
import css from './ParcelItemConfirm.module.css';

type ParcelItemConfirmProps = {
  obj: ObjType,
  num: number,
}

const ParcelItemConfirm: React.FC<ParcelItemConfirmProps> = (
  { obj, num }) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [imgArray, setImgArray] = useState<string[]>([]);

  useEffect(() => {
    if (obj.first_photo && obj.first_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray([obj.first_photo])
    } else if (obj.first_photo) {
      setImgArray(['https://elogistapp-backend.herokuapp.com' + obj.first_photo])
    }

    if (obj.second_photo && obj.second_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, obj.second_photo!])
    } else if (obj.second_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + obj.second_photo!])
    }

    if (obj.third_photo && obj.third_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, obj.third_photo!])
    } else if (obj.third_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + obj.third_photo!])
    }


    if (obj.fourth_photo && obj.fourth_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, obj.fourth_photo!])
    } else if (obj.fourth_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + obj.fourth_photo!])
    }

  }, [obj.first_photo, obj.second_photo, obj.third_photo, obj.fourth_photo])

  return (
    <>
      <div onClick={() => setIsActiveModal(true)} className={css.item}>
        <div>
          <span className={css.num}>{num}.</span>&nbsp;&nbsp;
          <span className={css.name}>{obj.object_name}</span>&nbsp;
          <span className={css.num}>{obj.width}x{obj.height}x{obj.length}</span>
        </div>
        <div className={css.name}>x{obj.quantity}</div>
      </div>
      <PopapModal active={isActiveModal} setActive={setIsActiveModal}>
        <>
          {imgArray.length > 0 ? (
            <div className={css.imgWrap}>
              <img src={imgArray.at(0)} id={css.img} alt="img" />
            </div>
          ) : (
            <div id={css.imgPlaceHolder} />
          )}
          <div id={css.itemName}>{obj.object_name}</div>
          <div id={css.itemParams}>
            <span>{obj.quantity}&nbsp;item{obj.quantity > 1 ? 's' : null}</span>
            <span>{obj.weight}&nbsp;{obj.measure_unit}</span>
          </div>
          <div id={css.comment}>
            {obj.comment}
          </div>
        </>
      </PopapModal>
    </>
  );
};

export default ParcelItemConfirm;