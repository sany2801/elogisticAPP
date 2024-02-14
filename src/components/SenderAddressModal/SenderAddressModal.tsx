import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Whitebutton from '../WhiteButton/WhiteButton';
import AddressField from '../AddressField/AddressField';
import { AddressObject } from '../SenderAddressForm/SenderAddressForm';
import SenderAddressModalStyle from'./SenderAddressModal.module.css'

type props = {
  setAddressStep: (step: number) => void,
  setFormSenderAddress: (address: AddressObject | undefined) => void,
};

const SenderAddressModal: React.FC<props> = ({ setAddressStep, setFormSenderAddress }) => {
  const [address, setAddress] = useState<AddressObject>();
  const userData = useSelector((state: any) => state.data.userInfo);

  useEffect(() => {
    setAddress(userData?.address)
  }, [userData?.address])
  
  //use user's address
  const handleChooseAddress = () => {
    setFormSenderAddress(address);
    setAddressStep(2);
  }

  //use address from map
  const handleChooseLocation = () => {
    setAddressStep(1);
  }

  return (
    <>
      <div className={SenderAddressModalStyle.sender_modal}>
        <h3 className={SenderAddressModalStyle.sender_modal_title}>Sender address</h3>
        <p className={SenderAddressModalStyle.sender_modal_subtitle}>provide a pickup address</p>
        {address && (
          <>
            <AddressField width={'100%'} onClick={handleChooseAddress} object={address} />
            <p className={SenderAddressModalStyle.or_text}>OR</p>
          </>
        )}
        <Whitebutton setState={handleChooseLocation} button_text={'Choose location on the map'} width={'100%'} height={40} />
      </div>
    </>
  )
}
export default SenderAddressModal;