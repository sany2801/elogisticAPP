import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Calendar, { SelectedDate } from '../Calendar/Calendar';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import NewParcelItem from '../NewParcelItem/NewParcelItem';
import SenderAddressForm, { AddressObject } from '../SenderAddressForm/SenderAddressForm';
import SenderFilledDate from '../SenderFilledDate/SenderFilledDate';
import RecipeInfoModal from '../RecipeInfoModal/RecipeInfoModal';
import ContactInformation from '../ContactInformation/ContactInformation';
import Loader from '../Loader/Loader';
import css from './RecipeDetails.module.css';

export type RecipContInfo = {
  firstName: string,
  lastName: string,
  mobilePhone: string,
  email: string,
}

type BeneficiaryDataType = {
  consignee_email: string,// "user@example.com"
  consignee_first_name: string,
  consignee_last_name: string,
  consignee_phone_number: string,
  consignee_country: string,
  consignee_city: string,
  consignee_state_or_province: string,
  consignee_street: string,
  consignee_building_number: string,
  consignee_postal_code: string,
  consignee_apartment: string,
  consignee_floor: string,
  admission_date: string,// "2019-08-24"
  admission_start_time: string,
  admission_end_time: string,
  elevator: string //"yes" | 'no
}

const RecipeDetails: React.FC = () => {
  const [formRecipAddress, setFormRecipAddress] = useState<AddressObject | undefined>();
  const [recipContactInfo, setRecipContactInfo] = useState<RecipContInfo | undefined>();
  const [date, setDate] = useState<SelectedDate>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isWhenModalOpen, setIsWhenModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const isValidData = formRecipAddress !== undefined && date !== undefined && recipContactInfo !== undefined;
  const orderNumber = sessionStorage.getItem('orderNumber');
  const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

  const handleOpenForm = () => {
    setIsFormOpen(true);
  }

  const handleBack = () => {
    navigate('/Order/sender_details')
  }

  const putSenderData = async () => {
    const benefData: BeneficiaryDataType = {
      consignee_email: recipContactInfo?.email as string,
      consignee_first_name: recipContactInfo?.firstName as string,
      consignee_last_name: recipContactInfo?.lastName as string,
      consignee_phone_number: recipContactInfo?.mobilePhone as string,
      consignee_country: formRecipAddress?.country as string,
      consignee_city: formRecipAddress?.city as string,
      consignee_state_or_province: formRecipAddress?.state as string,
      consignee_street: formRecipAddress?.street as string,
      consignee_building_number: formRecipAddress?.building_number as string,
      consignee_postal_code: formRecipAddress?.postal_code as string,
      consignee_apartment: formRecipAddress?.apartment as string,
      consignee_floor: formRecipAddress?.floor as string,
      admission_date: `${date?.year}-${date?.month}-${date?.day}`,
      admission_start_time: date?.time?.split('-').at(0)?.trim() as string,
      admission_end_time: date?.time?.split('-').at(1)?.trim() as string,
      elevator: formRecipAddress?.elevator === 'available' ? 'yes' : 'no',
    }

    try {
      const response = await axios.put(
        `https://elogistapp-backend.herokuapp.com/orders/add_consignee_data/${passedOrderNumber || orderNumber}/`,
        {
          consignee: benefData
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
        navigate('/Order/add_parcel');
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    setIsLoading(true);
    setFormRecipAddress(undefined)
    getData().then(res => {
      if (res) {
        const data = res?.data;
        console.log(data);
        if (data.consignee) {
          setIsFormOpen(true);
          setFormRecipAddress({
            country: data.consignee.consignee_country,
            state: data.consignee.consignee_state_or_province,
            city: data.consignee.consignee_city,
            street: data.consignee.consignee_street,
            postal_code: data.consignee.consignee_postal_code,
            building_number: data.consignee.consignee_building_number,
            apartment: data.consignee.consignee_apartment,
            floor: data.consignee.consignee_floor,
            elevator: data.consignee.elevator,
          })
          setDate({
            year: +data.consignee.admission_date.slice(0, 4),
            month: +data.consignee.admission_date.slice(5, 7),
            day: +data.consignee.admission_date.slice(-2),
            time: data.consignee.admission_start_time.slice(0, 5) + ' - ' + data.consignee.admission_end_time.slice(0, 5),
          })
          setRecipContactInfo({
            firstName: data.consignee.consignee_first_name,
            lastName: data.consignee.consignee_last_name,
            mobilePhone: data.consignee.consignee_phone_number,
            email: data.consignee.consignee_email,
          })
        }
      }
    })

  }, [getData])

  return (
    <>
      {isLoading && <Loader />}
      {isFormOpen ? <SenderAddressForm
        isEmptyform={true}
        setFormSenderAddress={setFormRecipAddress}
        formSenderAddress={formRecipAddress}
      /> : (
        <NewParcelItem
          isModalOpen={isAddressModalOpen}
          setIsModalOpen={setIsAddressModalOpen}
          action={handleOpenForm}
          step={0} title={'Address'}
          isActive={true}
        />
      )}

      {date && !isWhenModalOpen ? (
        <SenderFilledDate
          setIsWhenModalOpen={setIsWhenModalOpen}
          setDate={setDate}
          date={date}
        />
      ) : (
        <NewParcelItem
          isModalOpen={isWhenModalOpen}
          setIsModalOpen={setIsWhenModalOpen}
          title={'When'}
          isActive={formRecipAddress !== undefined}
          step={0}
        >
          <Calendar
            setIsWhenModalOpen={setIsWhenModalOpen}
            date={date}
            setDate={setDate}
          />
        </NewParcelItem>
      )}

      {recipContactInfo && !isInfoModalOpen ? (
        <ContactInformation
          setRecipContactInfo={setRecipContactInfo}
          reciInfo={recipContactInfo}
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
            data={recipContactInfo}
            setRecipContactInfo={setRecipContactInfo}
            setModal={setIsInfoModalOpen}
          />
        </NewParcelItem>
      )}

      <div id={css.btnWrp}>
        <WhiteButton setState={handleBack} button_text={'Back'} width={176} height={40} />
        <DefaultButton disabled={!isValidData} setState={handleNext} button_text={'Next'} width={176} height={40} />
      </div>
      <div id={css.emptySpace} />
    </>
  )
}

export default RecipeDetails;