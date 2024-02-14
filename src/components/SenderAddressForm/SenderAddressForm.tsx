import React, { useEffect, useState } from 'react';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import CustomInput from '../CustomInput/CustomInput';
import error_icon from '../../images/RedCrossIcon.svg';
import AddressField from '../AddressField/AddressField';
import SenderAddressFormStyle from './SenderAddressForm.module.css';

export type AddressObject = {
  country: string,
  state: string,
  city: string,
  street: string,
  postal_code: string,
  building_number: string,
  apartment: string,
  floor: string,
  elevator?: string
}

type SenderAddressFormProps = {
  formSenderAddress: AddressObject | undefined,
  setFormSenderAddress: (address: AddressObject | undefined) => void,
  isEmptyform?: boolean,
};

const SenderAddressForm: React.FC<SenderAddressFormProps> = ({ formSenderAddress, setFormSenderAddress, isEmptyform }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [addressFromMap, setAddressFromMap] = useState<AddressObject>();
  const [checked, setChecked] = useState<string>('');
  const [isArrorMassageShown, setisArrorMassageShown] = useState<boolean>(false);
  const validData = checked !== '' && isFormValid;

  useEffect(() => {
    const result: AddressObject = {
      country: '',
      state: '',
      city: '',
      street: '',
      postal_code: '',
      building_number: '',
      apartment: '',
      floor: '',
    }

    if (localStorage.getItem('users_address') && !isEmptyform) {
      const address: string[] = localStorage.getItem('users_address')?.split(',') as string[];
      const isFirstNumber: boolean | null = Boolean(address.at(0)?.match(/[0-9]/g));

      if (isFirstNumber) {
        result.country = address.at(-1) || '';
        result.state = address.at(-3) || '';
        result.city = address.at(2) || '';
        result.street = address.at(1) || '';
        result.postal_code = address.at(-2) || '';
        result.building_number = address.at(0) || '';
        setAddressFromMap(result);
      } else {
        result.country = address.at(-1) || '';
        result.state = address.at(-3) || '';
        result.city = address.at(4) || '';
        result.street = address.at(2) || '';
        result.postal_code = address.at(-2) || '';
        result.building_number = address.at(1) || '';
        setAddressFromMap(result);
      }
    }
    validateForm();

    if (formSenderAddress) {
      setAddressFromMap(formSenderAddress);
    }
  }, [formSenderAddress, isEmptyform]);

  const validateForm = (): void => {
    const requiredFields = ['country', 'city', 'street', 'postal_code', 'building_number'];
    let isValid = true;

    requiredFields.forEach((field) => {
      const element = document.querySelector(`#${field}`) as HTMLInputElement;
      if (element && element.value.trim() === '') {
        isValid = false;
      }
    });

    setIsFormValid(isValid);
  };

  const handleSave = () => {
    setisArrorMassageShown(false)

    if (validData) {
      const result: AddressObject = {
        country: '',
        state: '',
        city: '',
        street: '',
        postal_code: '',
        building_number: '',
        apartment: '',
        floor: '',
        elevator: '',
      }

      const countryField = document.querySelector('#country') as HTMLInputElement;
      if (countryField) {
        result.country = countryField.value;
      }
      const cityField = document.querySelector('#city') as HTMLInputElement;
      if (cityField) {
        result.city = cityField.value;
      }
      const stateField = document.querySelector('#state_province') as HTMLInputElement;
      if (stateField) {
        result.state = stateField.value;
      }
      const streetField = document.querySelector('#street') as HTMLInputElement;
      if (streetField) {
        result.street = streetField.value;
      }
      const postalCodeField = document.querySelector('#postal_code') as HTMLInputElement;
      if (postalCodeField) {
        result.postal_code = postalCodeField.value;
      }
      const buildingNumberField = document.querySelector('#building_number') as HTMLInputElement;
      if (buildingNumberField) {
        result.building_number = buildingNumberField.value;
      }
      const apartmentField = document.querySelector('#apartment') as HTMLInputElement;
      if (apartmentField) {
        result.apartment = apartmentField.value;
      }
      const floorField = document.querySelector('#floor') as HTMLInputElement;
      if (floorField) {
        result.floor = floorField.value;
      }
      result.elevator = checked;

      // Setting Sender Address according to the From data
      setFormSenderAddress(result);
      // localStorage.setItem('form_sender_address', JSON.stringify(result));

    } else {
      setisArrorMassageShown(true);
    }
  }

  const handleClear = () => {
    const countryField = document.querySelector('#country') as HTMLInputElement;
    if (countryField) {
      countryField.value = ''
    }
    const cityField = document.querySelector('#city') as HTMLInputElement;
    if (cityField) {
      cityField.value = ''
    }
    const stateField = document.querySelector('#state_province') as HTMLInputElement;
    if (stateField) {
      stateField.value = ''
    }
    const streetField = document.querySelector('#street') as HTMLInputElement;
    if (streetField) {
      streetField.value = ''
    }
    const postalCodeField = document.querySelector('#postal_code') as HTMLInputElement;
    if (postalCodeField) {
      postalCodeField.value = ''
    }
    const buildingNumberField = document.querySelector('#building_number') as HTMLInputElement;
    if (buildingNumberField) {
      buildingNumberField.value = ''
    }
    const apartmentField = document.querySelector('#apartment') as HTMLInputElement;
    if (apartmentField) {
      apartmentField.value = ''
    }
    const floorField = document.querySelector('#floor') as HTMLInputElement;
    if (floorField) {
      floorField.value = ''
    }
    setChecked('');
  }

  const handleChecked = (value: string) => {
    setChecked(value);
    validateForm();
  }

  const handleReselect = () => {
    setFormSenderAddress(undefined)
  }

  return (
    <>
      {formSenderAddress ? (
        <div id={SenderAddressFormStyle.filledSenderAddress}>
          <header>
            <span>Address</span>
          </header>
          <AddressField onClick={handleReselect} object={formSenderAddress} />
        </div>
      ) : (
        <div id={SenderAddressFormStyle.SendAddrWrap}>
          <header>
            <span>Address</span>
            <div id={SenderAddressFormStyle.headerButtons}>
              <DefaultButton disabled={!validData} setState={handleSave} button_text={'Save'} width={96} height={32} />
              <WhiteButton setState={handleClear} button_text={'Clear'} width={96} height={32} />
            </div>
          </header>
          {isArrorMassageShown && (
            <div id={SenderAddressFormStyle.errorMassage}>
              <img src={error_icon} alt="err" />
              Please check that the entered data is correct
            </div>
          )}
          <div id={SenderAddressFormStyle.sendAddrCont}>
            <CustomInput onChange={validateForm} title={'Country*'} value={addressFromMap?.country} />
            <CustomInput onChange={validateForm} title={'City*'} value={addressFromMap?.city} />
            <CustomInput onChange={validateForm} title={'State/Province'} value={addressFromMap?.state} />
            <CustomInput onChange={validateForm} title={'Street*'} value={addressFromMap?.street} />
            <CustomInput onChange={validateForm} title={'Building Number*'} value={addressFromMap?.building_number} />
            <CustomInput onChange={validateForm} title={'Postal Code*'} value={addressFromMap?.postal_code} />
            <CustomInput onChange={validateForm} title={'Apartment'} value={addressFromMap?.apartment} />
            <CustomInput onChange={validateForm} title={'Floor'} value={addressFromMap?.floor} />
          </div>
          <div id={SenderAddressFormStyle.blackLine}></div>
          <div id={SenderAddressFormStyle.elevatorInfo}>
            <span>Freight elevator</span>
            <div id={SenderAddressFormStyle.inputsWrap}>
              <label>
                <input
                  checked={checked === 'available'}
                  onChange={() => handleChecked('available')}
                  type="radio"
                  name="available"
                  className={SenderAddressFormStyle.inpRadio}
                  id="available" />
                Available
              </label>
              <label>
                <input
                  checked={checked === 'not_available'}
                  onChange={() => handleChecked('not_available')}
                  type="radio"
                  name="not_available"
                  className={SenderAddressFormStyle.inpRadio}
                  id="not_available"
                />
                Not available
              </label>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default SenderAddressForm;