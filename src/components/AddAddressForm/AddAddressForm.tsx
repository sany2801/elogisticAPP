import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WhiteButton from '../WhiteButton/WhiteButton';
import Loader from '../Loader/Loader';
import CustomInput from '../CustomInput/CustomInput';
import css from './AddAddressForm.module.css';

type Add_address_formProps = {
  setState: () => void;
};

type UsersAddress = {
  apartment: string,
  building_number: string,
  city: string,
  country: string,
  floor: string,
  postal_code: string,
  state: string,
  street: string,
}

const AddAddressForm: React.FC<Add_address_formProps> = ({ setState }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success_status, setSuccess_status] = useState<string>('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const fields = ['country', 'state_province', 'city', 'street', 'postal_code', 'building_number', 'apartment', 'floor'];
    const address: UsersAddress = {
      apartment: '',
      building_number: '',
      city: '',
      country: '',
      floor: '',
      postal_code: '',
      state: '',
      street: ''
    }

    fields.forEach((field) => {
      const element = document.querySelector(`#${field}`) as HTMLInputElement | null;
      if (element) {
        if (field === 'state_province') {
          address.state = element.value;
        }
        address[field as keyof UsersAddress] = element.value;
      }
    });
    setIsLoading(true);
    patch_address(address);
  };

  const patch_address = async (value: any) => {
    try {
      const response = await axios.patch(
        'https://elogistapp-backend.herokuapp.com/accounts/add_address/',
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setIsLoading(false);
      setSuccess_status("Address has been added !");
      window.location.reload();
      return response;
    } catch (error) {
      setSuccess_status('Something went wrong !');
      setIsLoading(false);
      console.error(error);
    }
  }

  const validateForm = (): void => {
    const requiredFields = ['country', 'state_province', 'city', 'street', 'postal_code', 'building_number'];
    let isValid = true;
    requiredFields.forEach((field) => {
      const element = document.querySelector(`#${field}`) as HTMLInputElement;
      if (element && element.value.trim() === '') {
        isValid = false;
      }
    });

    setIsFormValid(isValid);
  };

  useEffect(() => {
    if (localStorage.getItem('users_address')) {
      const address: string[] = localStorage.getItem('users_address')?.split(',') as string[];
      const isFirstElemnumber: boolean | null = Boolean(address.at(0)?.match(/[0-9]/g));

      if (isFirstElemnumber) {
        const countryElement = document.querySelector('#country') as HTMLInputElement;
        if (countryElement) {
          countryElement.value = address.at(-1) || '';
        }
        const stateElement = document.querySelector('#state_province') as HTMLInputElement;
        if (stateElement) {
          stateElement.value = address.at(-3) || '';
        }
        const cityElement = document.querySelector('#city') as HTMLInputElement;
        if (cityElement) {
          cityElement.value = address.at(2) || '';
        }
        const streetElement = document.querySelector('#street') as HTMLInputElement;
        if (streetElement) {
          streetElement.value = address.at(1) || '';
        }
        const postal_codeElement = document.querySelector('#postal_code') as HTMLInputElement;
        if (postal_codeElement) {
          postal_codeElement.value = address.at(-2) || '';
        }
        const building_numberElement = document.querySelector('#building_number') as HTMLInputElement;
        if (building_numberElement) {
          building_numberElement.value = address.at(0) || '';
        }
      } else {
        const countryElement = document.querySelector('#country') as HTMLInputElement;
        if (countryElement) {
          countryElement.value = address.at(-1) || '';
        }
        const stateElement = document.querySelector('#state') as HTMLInputElement;
        if (stateElement) {
          stateElement.value = address.at(-3) || '';
        }
        const cityElement = document.querySelector('#city') as HTMLInputElement;
        if (cityElement) {
          cityElement.value = address.at(4) || '';
        }
        const streetElement = document.querySelector('#street') as HTMLInputElement;
        if (streetElement) {
          streetElement.value = address.at(2) || '';
        }
        const postal_codeElement = document.querySelector('#postal_code') as HTMLInputElement;
        if (postal_codeElement) {
          postal_codeElement.value = address.at(-2) || '';
        }
        const building_numberElement = document.querySelector('#building_number') as HTMLInputElement;
        if (building_numberElement) {
          building_numberElement.value = address.at(1) || '';
        }
      }

      validateForm();
    }
  }, []);

  return (
    <>
      <div id={css.form_content_wrap}>

        <div id={css.form_header}>
          <h3>Add address</h3>
          {success_status}
        </div>

        <form onSubmit={handleSave} >
          <div id={css.form_cont}>
            <div className={css.form_half}>
              <CustomInput title={'Country*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'State/Province*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'Building number*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'Apartment'} value={undefined} onChange={validateForm} />
            </div>
            <div className={css.form_half}>
              <CustomInput title={'City*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'Street*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'Postal code*'} value={undefined} onChange={validateForm} />
              <CustomInput title={'Floor'} value={undefined} onChange={validateForm} />
            </div>
          </div>

          <div id={css.btns_wrap}>
            <button id={isFormValid ? `${css.submition_btn}`
                : `${css.invalid_submition_btn}`} type="submit" disabled={!isFormValid}>
              Save
            </button>
            <WhiteButton setState={setState} button_text={'Choose another point'} width={245} height={40} />
          </div>
        </form>

      </div>
      {isLoading ? <Loader /> : ""}
    </>
  )
};

export default AddAddressForm;
