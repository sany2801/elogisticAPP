import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { RecipContInfo } from '../RecipeDetails/RecipeDetails';
import croosIcon from '../../images/DiagonalCrossIcon.svg';
import editIcon from '../../images/editIcon.svg';
import css from './ContactInformation.module.css'

type ContactInformationProps = {
  reciInfo?: RecipContInfo,
  setRecipContactInfo?: (info: RecipContInfo | undefined) => void,
  setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const ContactInformation: React.FC<ContactInformationProps> = ({ reciInfo, setRecipContactInfo, setIsInfoModalOpen }) => {
  const userData = useSelector((state: any) => state.data.userInfo);
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsShown(true);
  }

  const handleMouseOut = () => {
    setIsShown(false);
  }

  const handleClear = () => {
    if (setRecipContactInfo) {
      setRecipContactInfo(undefined)
    }
  }

  const handleEdit = () => {
    setIsInfoModalOpen(true);
  }

  return (
    <div id={css.contInfo}>
      <p id={css.infoTitle}>Contact information</p>
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id={css.infoCont}>
        {reciInfo ? (
          <>
            <p><b>{reciInfo.firstName} {reciInfo.lastName}</b></p>
            <p>{reciInfo.mobilePhone}</p>
            <p>{reciInfo.email}</p>
          </>
        ) : (
          <>
            <p><b>{userData?.userprofile.first_name} {userData?.userprofile.last_name}</b></p>
            <p>{userData?.phone_number}</p>
            <p>{userData?.email}</p>
          </>
        )}
        {isShown && <img onClick={handleClear} id={css.cls} src={croosIcon} alt="close" />}
        {isShown && <img onClick={handleEdit} id={css.edit} src={editIcon} alt="edit" />}
      </div>
    </div>
  )
}

export default ContactInformation;