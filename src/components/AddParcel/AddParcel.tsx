import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrowUp from '../../images/arrow_square_up.svg';
import arrowDown from '../../images/arrow_square_down.svg';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import ObjectItem from '../ObjectItem/ObjectItem';
import crossIcon from '../../images/clear_cross.svg';
import PricePartItem from '../PricePartItem/PricePartItem';
import PopapModal from '../PopapModal/PopapModal';
import OrderItemInList from '../OrderItemInList/OrderItemInList';
import ChooseBoxSize from '../ChooseBoxSize/ChooseBoxSize';
import ChooseUsersBoxSize from '../ChooseUsersBoxSize/ChooseUsersBoxSize';
import AddNewObject from '../AddNewObject/AddNewObject';
import css from './AddParcel.module.css';

export type ObjType = {
  first_photo?: string,
  second_photo?: string,
  third_photo?: string,
  fourth_photo?: string,
  order_number?: string,
  object_name: string,
  width: number,
  height: number,
  length: number,
  quantity: number,
  weight: number,
  comment: string,
  box_id?: number,
  items_id?: number,
  measure_unit: 'cm' | 'in',
  size_warning: boolean,
}

type PricePartType = {
  isBoxSize?: boolean,
  name: string,
  price: number,
}

export type BoxType = 'small' | 'medium' | 'large' | 'custom' | '';

const AddParcel: React.FC = () => {
  const [chosenBox, setchosenBox] = useState<BoxType>('');
  const [chosenSizes, setChosenSizes] = useState<[number, number, number] | []>([]);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [listOfObjects, setListOfObjects] = useState<ObjType[] | []>([]);
  const [listOfPriceParts, setListOfPriceParts] = useState<PricePartType[] | []>([{
    isBoxSize: true,
    name: '',
    price: 0,
  }]);
  const [activeModalCHBox, setActiveModalCHBox] = useState<boolean>(true);
  const [activeModalNewObj, setActiveModalNewObj] = useState<boolean>(false);
  const [chosenUnit, setChosenUnit] = useState<'cm' | 'in'>('cm');
  const [boxId, setBoxId] = useState<number>();
  const [step, setStep] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [editedObj, setEditedObj] = useState<ObjType | undefined>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const w = chosenSizes.at(0) || 0;
  const l = chosenSizes.at(1) || 0;
  const h = chosenSizes.at(2) || 0;

  const orderNumber = sessionStorage.getItem('orderNumber');
  const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

  const handleBoxClick = (box: BoxType) => {
    setchosenBox(box);
    setIsListOpen(false);
    handleUpdateBoxSize(box);
  }

  const handleUserItems = () => { }

  const handleNewObject = (itemID?: number) => {
    setActiveModalNewObj(true);
    if (itemID) {
      setEditedObj(listOfObjects.find(obj => obj.items_id === itemID));
    }
  }

  const handleOpen = () => {
    setIsOpened(prev => !prev);
  }

  const getBoxName = () => {
    switch (chosenBox) {
      case 'small':
        return 'Small box';
      case 'medium':
        return 'Medium box';
      case 'large':
        return 'Large box';
      case 'custom':
        return 'Personal box';
      default:
        return 'Nothing is chosen';
    }
  }

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://elogistapp-backend.herokuapp.com/orders/order_information/${passedOrderNumber || orderNumber}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.box) {
        setBoxId(response.data.box.box_id);
      }

      return response;
    } catch (error) {
      alert('Something went wrong, try again');
      console.error(error);
    }
  }, [orderNumber, passedOrderNumber])

  const updateBoxSize = useCallback(async (box: BoxType) => {
    const data = () => {
      if (box === 'custom') {
        return {
          size_box: box,
          custom_width: w?.toString(),
          custom_height: h?.toString(),
          custom_length: l?.toString(),
          cost: 0,
        }
      } else {
        return {
          size_box: box,
          custom_width: "",
          custom_height: "",
          custom_length: "",
          cost: 0,
        }
      }
    }

    try {
      const response = await axios.put(
        `https://elogistapp-backend.herokuapp.com/orders/update_box/${passedOrderNumber || orderNumber}/${boxId}/`,
        data(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      alert('Something went wrong, try again');
      console.error(error);
    }
  }, [w, h, l, passedOrderNumber, orderNumber, boxId])

  const createBox = useCallback(async (box: BoxType) => {
    const data = () => {
      if (box === 'custom') {
        return {
          size_box: box,
          custom_width: w?.toString(),
          custom_height: h?.toString(),
          custom_length: l?.toString(),
        }
      } else {
        return {
          size_box: box,
          custom_width: "",
          custom_height: "",
          custom_length: "",
        }
      }
    }

    try {
      const response = await axios.post(
        `https://elogistapp-backend.herokuapp.com/orders/add_size_box/${passedOrderNumber || orderNumber}/`,
        data(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      alert('Something went wrong, try again');
      console.error(error);
    }

  }, [w, h, l, orderNumber, passedOrderNumber])

  const handleUpdateBoxSize = useCallback(async (box: BoxType): Promise<void> => {
    try {
      const result = await updateBoxSize(box);
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  }, [updateBoxSize])

  const handleCreateBox = useCallback(async (box: BoxType): Promise<void> => {
    if (boxId) {
      handleUpdateBoxSize(box)
    } else {
      createBox(box).then(result => {
        if (result) {
          setBoxId(result.data.box_id);
          sessionStorage.setItem("box_id", result.data.box_id)
          console.log(result);
        }
      })
    }
  }, [boxId, createBox, handleUpdateBoxSize])

  const createObject = async (object: any) => {
    try {
      const response = await axios.post(
        `https://elogistapp-backend.herokuapp.com/orders/add_transportation_items/${passedOrderNumber || orderNumber}/${boxId}/`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      alert('Something went wrong, please try again');
      // window.location.reload();
      console.error(error);
    }
  }

  const getAllItems = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://elogistapp-backend.herokuapp.com/orders/detail_box/${passedOrderNumber || orderNumber}/${boxId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      setListOfObjects(response.data.transportation_items);
    } catch (error) {
      alert('Something went wrong, try again');
      console.error(error);
    }
  }, [passedOrderNumber, orderNumber, boxId]);

  const handleChBox = useCallback((price: number) => {
    setListOfPriceParts(prev => {
      return prev.map(part => {
        if (part.isBoxSize === true) {
          return { ...part, name: chosenBox, price: +price.toFixed(2) };
        }
        return part;
      });
    });
  }, [chosenBox])

  const handleBack = () => {
    navigate('/order/beneficiary');
  }

  const handleNext = () => {
    navigate('/order/confirmation');
  }

  const handleUserBox = () => {
    setStep(1);
  }

  const chooseCustomSizes = () => {
    setchosenBox('custom');
    setIsListOpen(false);
    setStep(1);
    setActiveModalCHBox(true);
  }

  const getDeliveryPrice = (deliveryType: string) => {
    switch (deliveryType) {
      case 'parcel':
        return 10
      case 'moving':
        return 20
      default:
        return 0
    }
  }

  useEffect(() => {
    getData().then(res => {
      if (isFirst) {
        setIsFirst(false);
        setListOfPriceParts(prevState => [...prevState, { name: res?.data.order_type, price: getDeliveryPrice(res?.data.order_type) }]);
        if (res?.data.box) {
          setActiveModalCHBox(false);
          setchosenBox(res?.data.box.size_box);
        }
      }

      if (boxId) {
        getAllItems()
      }

    })
  }, [boxId, chosenBox, getAllItems, getData, isFirst])

  useEffect(() => {
    switch (chosenBox) {
      case 'small':
        handleChBox(20);
        setChosenSizes([20, 30, 50]);
        break;
      case 'medium':
        handleChBox(30);
        setChosenSizes([30, 40, 60]);
        break;
      case 'large':
        handleChBox(40.21);
        setChosenSizes([40, 50, 80]);
        break;
      case 'custom':
        handleChBox(0);
        break;
      default:
        setChosenSizes([])
        break;
    }
  }, [chosenBox, handleChBox])

  return (
    <div id={css.wrap}>
      <div id={css.leftHalf}>
        <div id={css.leftHalfCont}>
          <div id={css.leftHalfHead}>
            <div onClick={() => setIsListOpen(!isListOpen)} id={css.box}>
              <span>{getBoxName()}</span>
              <img
                src={isListOpen ? arrowUp : arrowDown}
                alt="arrow"
              />
              {isListOpen && (
                <div id={css.list}>
                  <div onClick={() => handleBoxClick('small')} className={css.boxItem}>
                    <div className={chosenBox === 'small' ? `${css.defaultBox} ${css.chosenBox}` : `${css.defaultBox}`}>Small box</div>
                    <span className={css.size}>(20x30x50)</span>
                  </div>
                  <div onClick={() => handleBoxClick('medium')} className={css.boxItem}>
                    <div className={chosenBox === 'medium' ? `${css.defaultBox} ${css.chosenBox}` : `${css.defaultBox}`}>Medium box</div>
                    <span className={css.size}>(30x40x60)</span>
                  </div>
                  <div onClick={() => handleBoxClick('large')} className={css.boxItem}>
                    <div className={chosenBox === 'large' ? `${css.defaultBox} ${css.chosenBox}` : `${css.defaultBox}`}>Large box</div>
                    <span className={css.size}>(40x50x80)</span>
                  </div>
                  <div onClick={chooseCustomSizes} className={css.boxItem}>
                    <div className={chosenBox === 'custom' ? `${css.defaultBox} ${css.chosenBox}` : `${css.defaultBox}`}>Personal box</div>
                    {chosenBox === 'custom' && (
                      <span className={css.size}>({w}x{l}x{h})</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div id={css.topButtons}>
              <DefaultButton setState={handleUserItems} button_text={'User Items'} width={132} height={32} />
              <WhiteButton setState={handleNewObject} button_text={'New Object'} width={132} height={32} />
            </div>
          </div>
          <div id={css.leftHalfBody}>
            {listOfObjects.length === 0 ? (
              <div id={css.emptyList}>
                <span>No objects yet</span>
                <span>All objects will be displayed here</span>
              </div>
            ) : (
              <>
                {listOfObjects.map((object: ObjType, index: number) => (
                  <ObjectItem
                    handleNewObject={handleNewObject}
                    key={index}
                    object={object}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div id={css.buttonsWrap}>
          <WhiteButton setState={handleBack} button_text={'Back'} width={176} height={40} />
          <DefaultButton disabled={listOfObjects.length === 0 && chosenBox !== ''} setState={handleNext} button_text={'Next'} width={176} height={40} />
        </div>
      </div>

      <div id={css.rightHalf}>
        <h3>Order Summary</h3>
        <div id={css.priceParts}>
          {listOfPriceParts.map((pricePart: PricePartType, index: number) => {
            return <PricePartItem key={index} name={pricePart.name} price={pricePart.price} />
          })}
          <div className={css.horizontalLine} />
          <div id={css.totalPrice}>
            <span>Total</span>
            <span>$ {((listOfPriceParts as PricePartType[]).reduce((total, part) => total + part.price, 0)).toFixed(2)}</span>
          </div>
        </div>
        <div id={css.ttlWr}>
          <div className={css.horizontalLine} />
          <div onClick={handleOpen} id={css.totalInOrderWrap}>
            <span>Items in order ({listOfObjects.length})</span>
            <img style={isOpened ? {} : { transform: 'rotate(-45deg)' }} id={css.crossIcon} src={crossIcon} alt="open" />
          </div>
        </div>

        {isOpened && (
          <div id={css.listOfItems}>
            {listOfObjects.map((item, i) => {
              return (
                <div key={i} className={css.item}>
                  <OrderItemInList name={item.object_name} width={item.width} height={item.height} lenght={item.length} amount={item.quantity} />
                  <div className={css.horizontalLine} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <PopapModal disableClosing={true} active={activeModalCHBox} setActive={setActiveModalCHBox}>
        {step === 0 && (
          <ChooseBoxSize
            setActive={setActiveModalCHBox}
            chosenParam={chosenUnit}
            setChosenParam={setChosenUnit}
            handleUserBox={handleUserBox}
            handleCreateBox={handleCreateBox}
            chosenBox={chosenBox}
            setchosenBox={setchosenBox}
          />
        )}
        {step === 1 && (
          <ChooseUsersBoxSize
            setStep={setStep}
            setchosenBox={setchosenBox}
            setActive={setActiveModalCHBox}
            chosenParam={chosenUnit}
            setChosenParam={setChosenUnit}
            setChosenSizes={setChosenSizes}
            chosenBox={chosenBox}
            handleUpdateBoxSize={handleUpdateBoxSize}
            handleCreateBox={handleCreateBox}
          />
        )}
      </PopapModal>

      <PopapModal active={activeModalNewObj} setActive={setActiveModalNewObj}>
        <AddNewObject
          editedObj={editedObj}
          orderNumber={orderNumber!}
          setEditedObj={setEditedObj}
          setActiveModalNewObj={setActiveModalNewObj}
          createObject={createObject}
          getAllItems={getAllItems}
          chosenSizes={chosenSizes}
        />
      </PopapModal>
    </div >
  );
};

export default AddParcel;