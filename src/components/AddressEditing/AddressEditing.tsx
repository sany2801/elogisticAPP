/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import PopapModal from '../PopapModal/PopapModal';
import Map from '../Map/Map';
import AddAddressForm from '../AddAddressForm/AddAddressForm';

type Address_editingProps = {
  is_active_modal: boolean,
  setIs_active_modal: any;
};

const AddressEditing: React.FC<Address_editingProps> = ({ is_active_modal, setIs_active_modal }) => {
  const [step, setStep] = useState<number>(1);

  const moveForword = () => {
    setStep(prev => prev + 1)
  }

  const moveBack = () => {
    setStep((prev: number) => {
      if (prev > 1) {
        return prev - 1
      }
      return prev
    })
  }

  return (
    <>
      {step === 1 && (
        <PopapModal
          deletePadding={true}
          active={is_active_modal}
          setActive={setIs_active_modal}
          children={<Map setState={moveForword} />}
        />
      )}
      {step === 2 && (
        <PopapModal
          active={is_active_modal}
          setActive={setIs_active_modal}
          children={<AddAddressForm setState={moveBack} />}
        />
      )}
    </>
  );
};

export default AddressEditing;