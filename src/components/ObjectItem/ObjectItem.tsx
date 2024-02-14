import React, { useEffect, useState } from 'react';
import axios from 'axios';
import arrowLeft from '../../images/image_arrow_left.svg';
import arrowRight from '../../images/image_arrow_right.svg';
import { ObjType } from '../AddParcel/AddParcel';
import PopapModal from '../PopapModal/PopapModal';
import DotsMenu from '../DotsMenu/DotsMenu';
import WhiteButton from '../WhiteButton/WhiteButton';
import DefaultButton from '../DefaultButton/DefaultButton';
import css from './ObjectItem.module.css';

type ObjectItemProps = {
  object: ObjType,
  handleNewObject: () => void,
}

const ObjectItem: React.FC<ObjectItemProps> = ({ object, handleNewObject }) => {
  const [isImgHovered, setIsImgHovered] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [imgArray, setImgArray] = useState<string[]>([]);
  const [chosenImgIndex, setChosenImgIndex] = useState<number>(0);
  const [choseCardImgInd, setChoseCardImgInd] = useState<number>(0);

  const order_number = sessionStorage.getItem('order_number');
  const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

  const handleMouseEnter = () => {
    setIsImgHovered(true);
  }

  const handleMouseLeave = () => {
    setIsImgHovered(false);
  }

  const handleMoEnter = () => {
    setIsHovered(true);
  }

  const handleMoLeave = () => {
    setIsHovered(false);
  }

  const deleteItem = async (box_id: number, items_id: number) => {
    try {
      const response = await axios.delete(
        `https://elogistapp-backend.herokuapp.com/orders/delete_transportation_items/${passedOrderNumber || order_number}/${box_id}/${items_id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }


  const handleDelItem = (box_id: number, items_id: number) => {
    try {
      deleteItem(box_id, items_id).then(() => {
        setIsDeleteModalOpen(false);
        setIsModalOpen(false);
        window.location.reload();
      })
    } catch (error) {
      alert('Something went wrong');
      setIsDeleteModalOpen(false);
      console.log(error);
    }
  }

  const handleNextImg = () => {
    if (chosenImgIndex < imgArray.length - 1) {
      setChosenImgIndex(prev => prev + 1);
    } else {
      setChosenImgIndex(0);
    }
  }

  const handlePrevImg = () => {
    if (chosenImgIndex > 0) {
      setChosenImgIndex(prev => prev - 1);
    } else {
      setChosenImgIndex(imgArray.length - 1);
    }
  }

  const handleCardNextImg = () => {
    if (choseCardImgInd < imgArray.length - 1) {
      setChoseCardImgInd(prev => prev + 1);
    } else {
      setChoseCardImgInd(0);
    }
  }

  const handleCardPrevImg = () => {
    if (choseCardImgInd > 0) {
      setChoseCardImgInd(prev => prev - 1);
    } else {
      setChoseCardImgInd(imgArray.length - 1);
    }
  }

  useEffect(() => {
    if (object.first_photo && object.first_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray([object.first_photo])
    } else if (object.first_photo) {
      setImgArray(['https://elogistapp-backend.herokuapp.com' + object.first_photo])
    }

    if (object.second_photo && object.second_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, object.second_photo!])
    } else if (object.second_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + object.second_photo!])
    }

    if (object.third_photo && object.third_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, object.third_photo!])
    } else if (object.third_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + object.third_photo!])
    }


    if (object.fourth_photo && object.fourth_photo.includes('https://elogistapp-backend.herokuapp.com')) {
      setImgArray(prev => [...prev, object.fourth_photo!])
    } else if (object.fourth_photo) {
      setImgArray(prev => [...prev, 'https://elogistapp-backend.herokuapp.com' + object.fourth_photo!])
    }

  }, [object.first_photo, object.fourth_photo, object.second_photo, object.third_photo])

  return (
    <>
      <div className={css.objectItem}>
        {imgArray.length > 0 ? (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={css.imgWrapper}>
            <img className={css.objectImage} src={imgArray.at(chosenImgIndex)} alt='obj' />
            {isImgHovered && imgArray.length > 1 && (
              <>
                <img onClick={handlePrevImg} className={css.arrowLeft} src={arrowLeft} alt="prev" />
                <img onClick={handleNextImg} className={css.arrowRight} src={arrowRight} alt="next" />
              </>
            )}
          </div>
        ) : (
          <div className={css.emptyImg} />
        )}
        <div onClick={() => setIsModalOpen(true)} className={css.objectInfo}>
          <span className={css.objectName}>{object.object_name}</span>
          <div className={css.objectParams}>
            <span className={css.objectSizes}>{object.width}x{object.height}x{object.length}</span>
            <span className={css.objectAmount}>x{object.quantity}</span>
          </div>
        </div>
      </div>

      <PopapModal active={isModalOpen} setActive={setIsModalOpen}>
        <>
          {isDeleteModalOpen ? (
            <div id={css.deleteFrame}>
              <div className={css.deleteTitle}>Delete the object</div>
              <div className={css.deleteText}>Are you sure you want to remove this object from the shipment?</div>
              <div className={css.deleteButtons}>
                <WhiteButton setState={() => handleDelItem(object.box_id!, object.items_id!)} button_text={'Delete'} width={188} height={40} />
                <DefaultButton setState={() => setIsDeleteModalOpen(false)} button_text={'Cancel'} width={188} height={40} />
              </div>
            </div>
          ) : (
            <>
              <div onMouseEnter={handleMoEnter} onMouseLeave={handleMoLeave} className={css.cardImgWrap}>
                {imgArray.length > 0 ? (
                  <img className={css.objectImage} src={imgArray.at(choseCardImgInd)} alt='obj' />
                ) : (
                  <div className={css.emptyImgBg} />
                )}
                {isHovered && imgArray.length > 1 && (
                  <>
                    <img onClick={handleCardPrevImg} className={css.arrLeft} src={arrowLeft} alt="prev" />
                    <img onClick={handleCardNextImg} className={css.arrRight} src={arrowRight} alt="next" />
                  </>
                )}
              </div>

              <div className={css.cardTitle}>
                <span className={css.objectName}>{object.object_name}</span>
                <DotsMenu
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  handleNewObject={handleNewObject}
                  items_id={object.items_id}
                />
              </div>

              <div className={css.params}>
                <div className={css.param}>
                  {object.quantity} item{object.quantity > 1 ? 's' : ''}
                </div>
                <div className={css.param}>
                  {object.weight} gr
                </div>
                <div className={css.param}>
                  {object.width}x{object.height}x{object.length} {object.measure_unit}
                </div>
              </div>

              {object.comment !== '' && (
                <div className={css.comment}>
                  {object.comment}
                </div>
              )}
            </>
          )}
        </>
      </PopapModal>
    </>
  );
};

export default ObjectItem;