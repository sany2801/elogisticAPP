import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fragment from "../Fragment/Fragment";
import ConfirmSection from "../ConfirmSection/ConfirmSection";
import crossIcon from '../../images/DiagonalCrossIcon.svg';
import { getMonthsName } from "../Calendar/Calendar";
import ParcelItemConfirm from "../ParcelItemConfirm/ParcelItemConfirm";
import PricePartItem from "../PricePartItem/PricePartItem";
import ServiceOption from "../ServiceOption/ServiceOption";
import PopapModal from "../PopapModal/PopapModal";
import RecipeInfoModal from "../RecipeInfoModal/RecipeInfoModal";
import { RecipContInfo } from "../RecipeDetails/RecipeDetails";
import WhiteButton from "../WhiteButton/WhiteButton";
import DefaultButton from "../DefaultButton/DefaultButton";
import { ObjType } from "../AddParcel/AddParcel";
import css from "./Confirmation.module.css";

export type ItemWithPrice = {
  name: string,
  price: number,
}

const deliveries: ItemWithPrice[] = [
  {
    name: 'Standart',
    price: 0
  },
  {
    name: 'Fast',
    price: 20.02
  },
  {
    name: 'Extra',
    price: 60
  }
]

const services: ItemWithPrice[] = [
  {
    name: 'Fragile',
    price: 10
  },
  {
    name: 'Insurance ',
    price: 10
  },
  {
    name: 'Extra packaging',
    price: 10
  }
]

const payMethods: string[] = ['Credit card', 'Apple Pay', 'PayPal', 'Payment by details'];

const Confirmation: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [prices, setPrices] = useState<ItemWithPrice[]>([]);
  const [payer, setPayer] = useState<RecipContInfo>();
  const [newBenefModal, setNewBenefModal] = useState<boolean>(false);
  const [isCustomPayer, setIsCustomPayer] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>('');
  const [isCodeWindowOpen, setIsCodeWindowOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [shipper, setShipper] = useState<RecipContInfo>();
  const [consignee, setConsignee] = useState<RecipContInfo>();
  const [promoCode, setPromoCode] = useState<ItemWithPrice>();
  const navigate = useNavigate();

  const totalPrice = prices && ((prices as ItemWithPrice[]).reduce((total, part) => total + part.price, 0) + (promoCode?.price ?? 0)).toFixed(2);
  const orderNumber = sessionStorage.getItem('orderNumber');
  const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

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
      return response;
    } catch (error) {
      console.error(error);
    }
  }, [orderNumber, passedOrderNumber]);

  const getPayerStr = () => {
    if (JSON.stringify(payer) === JSON.stringify(shipper)) {
      return 'PBS'
    } else if (JSON.stringify(payer) === JSON.stringify(consignee)) {
      return 'PBR'
    } else {
      return 'PBTP'
    }
  }

  const getDelivIndex = () => {
    for (let i = 0; i < deliveries.length; i++) {
      const element = deliveries[i].name;
      if (prices.some(item => item.name === element)) {
        return i + 1
      }
    }
  }

  const sendData = async () => {

    const result = {
      total_cost: +totalPrice,
      payment: {
        who_payer: getPayerStr(),
        payment_method: payMethods.indexOf(payment) + 1,
        // third_person_email: "",
      },
      delivery_option: getDelivIndex(),
    }
    console.log(result);

    try {
      const response = await axios.put(
        `https://elogistapp-backend.herokuapp.com/orders/order_add_payer_and_delivery_options/${passedOrderNumber || orderNumber}/`,
        result,
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

  const getBoxPrice = (boxName: string) => {
    switch (boxName) {
      case 'small':
        return 10
      case 'medium':
        return 15
      case 'large':
        return 20
      case 'custom':
        return 0
      default:
        return 0
    }
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

  const getDayName = (day: number) => {
    switch (day) {
      case 0:
        return 'Sun'
      case 1:
        return 'Mon'
      case 2:
        return 'Tue'
      case 3:
        return 'Wed'
      case 4:
        return 'Thu'
      case 5:
        return 'Fri'
      case 6:
        return 'Sat'
      default:
        return 'Error'
    }
  }

  const handleDelivery = (deliv: ItemWithPrice) => {
    setPrices(prices => prices?.map(item => {
      if (item.name === 'Standart' || item.name === 'Fast' || item.name === 'Extra') {
        return deliv;
      } else {
        return item;
      }
    }))
  }

  const handlServs = (serv: ItemWithPrice) => {
    setPrices(prices => {
      const foundIndex = prices?.findIndex(item => item.name === serv.name);
      if (foundIndex === -1) {
        return [...prices, serv];
      } else {
        return prices.filter(item => item.name !== serv.name);
      }
    });
  }

  const handleNewBenef = () => {
    setNewBenefModal(true)
  }

  const handlePayment = (payment: string) => {
    setPayment(payment);
  }

  const handleBack = () => {
    navigate('/Order/add_parcel');
  }

  const handleApplyCode = () => {
    if (code !== '') {
      setPromoCode({
        name: code,
        price: -200.01,
      })
      setIsCodeWindowOpen(false);
    }
  }

  const handleConfirm = () => {
    sendData().then((response) => {
      if (response) {
        sessionStorage.removeItem('passedOrderNumber');
        navigate('/Home/shipments');
      } else {
        alert('Something went wrong');
      }
    })
  }

  useEffect(() => {
    getData().then((response) => {
      if (response) {
        console.log(response.data);
        setData(response.data);
      }
    });
  }, [getData]);

  useEffect(() => {
    if (data) {
      setPrices([
        {
          name: data.box.size_box,
          price: getBoxPrice(data.box.size_box)
        },
        {
          name: data.order_type,
          price: getDeliveryPrice(data.order_type)
        },
        deliveries[0]
      ]);
      setShipper({
        firstName: data.shipper.shipper_first_name,
        lastName: data.shipper.shipper_last_name,
        mobilePhone: data.shipper.shipper_phone_number,
        email: data.shipper.shipper_email
      })
      setConsignee({
        firstName: data.consignee.consignee_first_name,
        lastName: data.consignee.consignee_last_name,
        mobilePhone: data.consignee.consignee_phone_number,
        email: data.consignee.consignee_email,
      })
      setPayer({
        firstName: data.shipper.shipper_first_name,
        lastName: data.shipper.shipper_last_name,
        mobilePhone: data.shipper.shipper_phone_number,
        email: data.shipper.shipper_email
      })
    }
  }, [data])

  return (
    <div id={css.mWr}>
      <div>
        <div className={css.wr}>
          <ConfirmSection title={'Sender details'}>
            {data && data.shipper ? (
              <div className={css.detailsWrap}>
                <Fragment title={'Address'} custom={false}>
                  <>
                    <div className={css.data}>
                      <div className={css.text}>
                        {data.shipper.shipper_postal_code}&nbsp;
                        {data.shipper.shipper_country}&nbsp;
                        {data.shipper.shipper_city}
                      </div>
                      <div className={css.text}>
                        {data.shipper.shipper_street}&nbsp;
                        {data.shipper.shipper_building_number}
                      </div>
                      <div className={css.text}>
                        Floor:&nbsp;{data.shipper.shipper_floor}&nbsp;
                        Apartment:&nbsp;{data.shipper.shipper_apartment}
                      </div>
                    </div>
                    <div className={css.detailLine} />
                    <div className={css.elevator}>
                      {data.shipper.elevator === 'Yes' ? 'Freight elevator' : 'No freight elevator'}
                    </div>
                  </>
                </Fragment>

                <Fragment title={'When'} custom={false}>
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>Date:</b>&nbsp;
                      {data.shipper.departure_date.slice(-2)}&nbsp;
                      {getMonthsName(+data.shipper.departure_date.slice(5, 7))}&nbsp;
                      {data.shipper.departure_date.slice(0, 4)}&nbsp;
                      <span className={css.day}>
                        ({getDayName(new Date(data.shipper.departure_date).getDay())})
                      </span>
                    </div>
                    <div className={css.text}>
                      <b>Time:</b>&nbsp;
                      {data.shipper.departure_start_time.slice(0, 5)}&nbsp;
                      -&nbsp;
                      {data.shipper.departure_end_time.slice(0, 5)}
                    </div>
                  </div>
                </Fragment>

                <Fragment title={"Contact information"} custom={false}>
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>
                        {data.shipper.shipper_first_name}&nbsp;
                        {data.shipper.shipper_last_name}
                      </b>
                    </div>
                    <div className={css.text}>
                      {data.shipper.shipper_email}
                    </div>
                    <div className={css.text}>
                      {data.shipper.shipper_phone_number}
                    </div>
                  </div>
                </Fragment>
              </div>
            ) : (
              <>There is no data !</>
            )}
          </ConfirmSection>

          <ConfirmSection title={'Recipient details'}>
            {data && data.consignee ? (
              <div className={css.detailsWrap}>
                <Fragment title={'Address'} custom={false}>
                  <>
                    <div className={css.data}>
                      <div className={css.text}>
                        {data.consignee.consignee_postal_code}&nbsp;
                        {data.consignee.consignee_country}&nbsp;
                        {data.consignee.consignee_city}
                      </div>
                      <div className={css.text}>
                        {data.consignee.consignee_street}&nbsp;
                        {data.consignee.consignee_building_number}
                      </div>
                      <div className={css.text}>
                        Floor:&nbsp;{data.consignee.consignee_floor}&nbsp;
                        Apartment:&nbsp;{data.consignee.consignee_apartment}
                      </div>
                    </div>
                    <div className={css.detailLine} />
                    <div className={css.elevator}>
                      {data.consignee.elevator === 'Yes' ? 'Freight elevator' : 'No freight elevator'}
                    </div>
                  </>
                </Fragment>

                <Fragment title={'When'} custom={false}>
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>Date:</b>&nbsp;
                      {data.consignee.admission_date.slice(-2)}&nbsp;
                      {getMonthsName(+data.consignee.admission_date.slice(5, 7))}&nbsp;
                      {data.consignee.admission_date.slice(0, 4)}&nbsp;
                      <span className={css.day}>
                        ({getDayName(new Date(data.consignee.admission_date).getDay())})
                      </span>
                    </div>
                    <div className={css.text}>
                      <b>Time:</b>&nbsp;
                      {data.consignee.admission_start_time.slice(0, 5)}&nbsp;
                      -&nbsp;
                      {data.consignee.admission_end_time.slice(0, 5)}
                    </div>
                  </div>
                </Fragment>

                <Fragment title={"Contact information"} custom={false}>
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>
                        {data.consignee.consignee_first_name}&nbsp;
                        {data.consignee.consignee_last_name}
                      </b>
                    </div>
                    <div className={css.text}>
                      {data.consignee.consignee_email}
                    </div>
                    <div className={css.text}>
                      {data.consignee.consignee_phone_number}
                    </div>
                  </div>
                </Fragment>
              </div>
            ) : (
              <>There is no data !</>
            )}
          </ConfirmSection>

          <ConfirmSection title={'Parcel details'}>
            {data && data.box ? (
              <div id={css.parcel}>
                <div className={css.parcelTitle}>
                  {data.box.size_box.slice(0, 1).toUpperCase()}
                  {data.box.size_box.slice(1)}&nbsp;
                  box
                </div>
                <div id={css.itemsWrap}>
                  <div className={css.verticalLine} />
                  <div className={css.items}>
                    {data.box.transportation_items.map((item: ObjType, i: number) => {
                      return (
                        <ParcelItemConfirm
                          obj={item}
                          num={i + 1}
                          key={i}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <>There is no data !</>
            )}
          </ConfirmSection>

          <ConfirmSection title={'Additional services'}>
            <div className={css.detailsWrap}>
              {services.map((serv: ItemWithPrice, i: number) => {
                return (
                  <ServiceOption
                    isActive={!!prices?.some(item => item.name === serv.name)}
                    handleCl={handlServs}
                    name={serv.name}
                    price={serv.price}
                    key={i}
                  />)
              })}
            </div>
          </ConfirmSection>

          <ConfirmSection title={'Delivery option'}>
            <div className={css.detailsWrap}>
              {deliveries.map((deliv: ItemWithPrice, i: number) => {
                return (
                  <ServiceOption
                    isActive={!!prices?.some(item => item.name === deliv.name)}
                    name={deliv.name}
                    price={deliv.price}
                    handleCl={handleDelivery}
                    key={i}
                  />)
              })}
            </div>
          </ConfirmSection>

          <ConfirmSection title={'Who pays for the order'}>
            <div className={css.detailsWrap}>
              {data && data.shipper ? (
                <Fragment
                  setCustomPayer={setIsCustomPayer}
                  custom={false}
                  setPayer={setPayer}
                  payer={shipper}
                  isSelected={JSON.stringify(payer) === JSON.stringify(shipper)}
                  title={""}
                >
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>
                        {shipper?.firstName}&nbsp;
                        {shipper?.lastName}
                      </b>
                    </div>
                    <div className={css.text}>
                      {shipper?.email}
                    </div>
                    <div className={css.text}>
                      {shipper?.mobilePhone}
                    </div>
                  </div>
                </Fragment>
              ) : (null)}
              {data && data.consignee ? (
                <Fragment
                  setCustomPayer={setIsCustomPayer}
                  custom={false}
                  setPayer={setPayer}
                  payer={consignee}
                  isSelected={JSON.stringify(payer) === JSON.stringify(consignee)}
                  title={""}
                >
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>
                        {consignee?.firstName}&nbsp;
                        {consignee?.lastName}
                      </b>
                    </div>
                    <div className={css.text}>
                      {consignee?.email}
                    </div>
                    <div className={css.text}>
                      {consignee?.mobilePhone}
                    </div>
                  </div>
                </Fragment>
              ) : (null)}

              {isCustomPayer ? (
                <Fragment
                  custom={true}
                  setModal={setNewBenefModal}
                  isSelected={true}
                  title={""}
                >
                  <div className={css.data}>
                    <div className={css.text}>
                      <b>
                        {payer?.firstName}&nbsp;
                        {payer?.lastName}
                      </b>
                    </div>
                    <div className={css.text}>
                      {payer?.email}
                    </div>
                    <div className={css.text}>
                      {payer?.mobilePhone}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div onClick={handleNewBenef} id={css.anotherPerson}>Another person</div>
              )}
              <PopapModal active={newBenefModal} setActive={setNewBenefModal}>
                <RecipeInfoModal
                  setModal={setNewBenefModal}
                  title={"Beneficiary’s contact information"}
                  setRecipContactInfo={setPayer}
                  setCustomPayer={setIsCustomPayer}
                  custom={true}
                />
              </PopapModal>
            </div>

          </ConfirmSection>

          <div id={css.payMethod}>Select a payment method</div>
          <div className={css.paymentsWr}>
            {payMethods.map((pay: string, i: number) => {
              return (
                <div
                  onClick={() => handlePayment(pay)}
                  className={payment === pay ? css.selectedPay : css.payMent}
                  key={i}
                >
                  {pay}
                </div>
              )
            })}
          </div>
        </div >

        <div id={css.buttons}>
          <WhiteButton
            setState={handleBack}
            button_text={"Back"}
            width={140}
            height={40}
          />
          <DefaultButton
            disabled={payment === ''}
            setState={handleConfirm}
            button_text={"Confirm order"}
            width={200}
            height={40}
          />
        </div>
      </div>

      <aside>
        <span id={css.sideTitle}>Order Summary</span>
        <div id={css.PriceItems}>
          {prices && prices.map((item: ItemWithPrice, i: number) => {
            return <PricePartItem key={i} name={item.name} price={item.price} />
          })}

          {promoCode ? (
            <PricePartItem colr={'#D0AC80'} name={promoCode.name} price={promoCode.price} />
          ) : null}
        </div>
        <div className={css.greyLine} />
        <div id={css.totalPrice}>
          <span>Total</span>
          <span>$ {totalPrice}</span>
        </div>
        <div className={css.greyLine} />
        {isCodeWindowOpen ? (
          <>
            <div
              onClick={() => setIsCodeWindowOpen(false)}
              id={css.promoText}
            >
              <div>I have a promo code</div>
              <img src={crossIcon} alt="close" />
            </div>
            <input
              id={css.PromoInput}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
            />

            <DefaultButton
              disabled={code === ''}
              setState={handleApplyCode}
              button_text={"Apply"}
              width={"100%"}
              height={32}
            />
          </>
        ) : (
          <>
            {promoCode ? (
              <div
                onClick={() => setIsCodeWindowOpen(true)}
                id={css.promoText}
              >
                Change promo code
              </div>
            ) : (
              <div
                onClick={() => setIsCodeWindowOpen(true)}
                id={css.promoCodeText}
              >
                I have a promo code
              </div>
            )}
          </>
        )}
      </aside>
    </div >
  );
};

export default Confirmation;
