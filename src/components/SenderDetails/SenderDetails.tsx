import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewParcelItem from '../NewParcelItem/NewParcelItem';
import SenderAddressModal from '../SenderAddressModal/SenderAddressModal';
import SenderAddressForm, { AddressObject } from '../SenderAddressForm/SenderAddressForm';
import Map from '../Map/Map';
import Calendar, { SelectedDate } from '../Calendar/Calendar';
import SenderFilledDate from '../SenderFilledDate/SenderFilledDate';
import ContactInformation from '../ContactInformation/ContactInformation';
import DefaultButton from '../DefaultButton/DefaultButton';
import RecipeInfoModal from '../RecipeInfoModal/RecipeInfoModal';
import { RecipContInfo } from '../RecipeDetails/RecipeDetails';
import Loader from '../Loader/Loader';
import css from './SenderDetails.module.css'

type SenderDataType = {
  shipper_first_name: string,
  shipper_last_name: string,
  shipper_phone_number: string,
  shipper_email: string, //"user@example.com"
  shipper_country: string,
  shipper_city: string,
  shipper_state_or_province: string,
  shipper_street: string,
  shipper_building_number: string,
  shipper_postal_code: string,
  shipper_apartment: string,
  shipper_floor: string,
  departure_date: string, //"2019-08-24"
  departure_start_time: string,
  departure_end_time: string,
  elevator: string, //"yes" | "no"
}

const SenderDetails: React.FC = () => {
  const navigate = useNavigate();
  const [formSenderAddress, setFormSenderAddress] = useState<AddressObject | undefined>();
  const [senderInfo, setSenderInfo] = useState<RecipContInfo | undefined>()
  const [addressStep, setAddressStep] = useState<number>(0);
  const [date, setDate] = useState<SelectedDate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isWhenModalOpen, setIsWhenModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  const validData = formSenderAddress !== undefined && date !== undefined;
  const orderNumber = sessionStorage.getItem('orderNumber');
  const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

  const handleChooseLocation = () => {
    setAddressStep(2);
  }

  const putSenderData = async () => {
    const senderData: SenderDataType = {
      shipper_first_name: senderInfo?.firstName as string,
      shipper_last_name: senderInfo?.lastName as string,
      shipper_phone_number: senderInfo?.mobilePhone as string,
      shipper_email: senderInfo?.email as string,
      shipper_country: formSenderAddress?.country as string,
      shipper_city: formSenderAddress?.city as string,
      shipper_state_or_province: formSenderAddress?.state as string,
      shipper_street: formSenderAddress?.street as string,
      shipper_building_number: formSenderAddress?.building_number as string,
      shipper_postal_code: formSenderAddress?.postal_code as string,
      shipper_apartment: formSenderAddress?.apartment as string,
      shipper_floor: formSenderAddress?.floor as string,
      departure_date: `${date?.year}-${date?.month}-${date?.day}`,
      departure_start_time: date?.time?.split('-').at(0)?.trim() as string,
      departure_end_time: date?.time?.split('-').at(1)?.trim() as string,
      elevator: formSenderAddress?.elevator === 'available' ? 'yes' : 'no'
    }
    console.log(senderData);

    try {
      const response = await axios.put(
        `https://elogistapp-backend.herokuapp.com/orders/add_shipper_data/${passedOrderNumber || orderNumber}/`,
        {
          shipper: senderData
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      alert('Something went wrong, try again');
      console.error(error);
    }
  }

  const handleNext = async (): Promise<void> => {
    try {
      const result = await putSenderData();
      if (result) {
        console.log(result);
        navigate('/Order/beneficiary');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getUsersData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://elogistapp-backend.herokuapp.com/accounts/user_personal_data/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      alert('Something went wrong: didn\'t manage to get a user\'s data.');
      console.error(error);
    }
  }, [])

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://elogistapp-backend.herokuapp.com/orders/order_information/${passedOrderNumber || orderNumber}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      alert('Something went wrong, try again');
      console.error(error);
    }
  }, [orderNumber, passedOrderNumber])

  useEffect(() => {
    getData().then(res => {
      if (res) {
        const data = res?.data;
        console.log(data);
        if (data.shipper) {
          setAddressStep(2);
          setFormSenderAddress({
            country: data.shipper.shipper_country,
            state: data.shipper.shipper_state_or_province,
            city: data.shipper.shipper_city,
            street: data.shipper.shipper_street,
            postal_code: data.shipper.shipper_postal_code,
            building_number: data.shipper.shipper_building_number,
            apartment: data.shipper.shipper_apartment,
            floor: data.shipper.shipper_floor,
            elevator: data.shipper.elevator,
          })
          setDate({
            year: +data.shipper.departure_date.slice(0, 4),
            month: +data.shipper.departure_date.slice(5, 7),
            day: +data.shipper.departure_date.slice(-2),
            time: data.shipper.departure_start_time.slice(0, 5) + ' - ' + data.shipper.departure_end_time.slice(0, 5),
          })
          setSenderInfo({
            firstName: data.shipper.shipper_first_name,
            lastName: data.shipper.shipper_last_name,
            mobilePhone: data.shipper.shipper_phone_number,
            email: data.shipper.shipper_email,
          })
        } else {
          getUsersData().then(res => {
            if (res) {
              setSenderInfo({
                firstName: res.data.userprofile.first_name,
                lastName: res.data.userprofile.last_name,
                mobilePhone: res.data.phone_number,
                email: res.data.email,
              })
            }
          })
        }
      }
    })

  }, [getData, getUsersData])

  return (
    <>
      {isLoading && <Loader />}
      {addressStep === 2 ? (
        <SenderAddressForm
          setFormSenderAddress={setFormSenderAddress}
          formSenderAddress={formSenderAddress}
        />
      ) : (
        <NewParcelItem
          isModalOpen={isAddressModalOpen}
          setIsModalOpen={setIsAddressModalOpen}
          step={addressStep}
          title={'Address'}
          isActive={true}
        >
          <SenderAddressModal
            setFormSenderAddress={setFormSenderAddress}
            setAddressStep={setAddressStep}
          />
          <Map setState={handleChooseLocation} />
        </NewParcelItem>
      )}

      {date && !isWhenModalOpen ? (
        <SenderFilledDate
          setDate={setDate}
          date={date}
          setIsWhenModalOpen={setIsWhenModalOpen}
        />
      ) : (
        <NewParcelItem
          isModalOpen={isWhenModalOpen}
          setIsModalOpen={setIsWhenModalOpen}
          title={'When'}
          isActive={formSenderAddress !== undefined}
          step={0}
        >
          <Calendar
            date={date}
            setDate={setDate}
            setIsWhenModalOpen={setIsWhenModalOpen}
          />
        </NewParcelItem>
      )}

      {senderInfo && date && !isInfoModalOpen ? (
        <ContactInformation
          reciInfo={senderInfo}
          setRecipContactInfo={setSenderInfo}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
      ) : (
        <NewParcelItem
          isModalOpen={isInfoModalOpen}
          setIsModalOpen={setIsInfoModalOpen}
          title={'Contact information'}
          isActive={date !== undefined}
          step={0}
        >
          <RecipeInfoModal
            data={senderInfo}
            setRecipContactInfo={setSenderInfo}
            setModal={setIsInfoModalOpen}
          />
        </NewParcelItem>
      )}

      <div id={css.nextBtn}>
        <DefaultButton disabled={!validData} setState={handleNext} button_text={'Next'} width={176} height={40} />
      </div>
      <div id={css.emptySpace} />
    </>
  )
}
export default SenderDetails;