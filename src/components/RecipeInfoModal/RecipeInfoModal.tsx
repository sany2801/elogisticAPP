import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DefaultButton from '../DefaultButton/DefaultButton';
import { RecipContInfo } from '../RecipeDetails/RecipeDetails';
import RecipeInfoModalStyle from './RecipeInfoModal.module.css';

type RecipInfoModalProps = {
  custom?: boolean;
  setCustomPayer?: Dispatch<SetStateAction<boolean>>;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string,
  setRecipContactInfo: React.Dispatch<React.SetStateAction<RecipContInfo | undefined>>,
  data?: RecipContInfo,
};

const RecipeInfoModal: React.FC<RecipInfoModalProps> = (
  { setRecipContactInfo, title, setModal, setCustomPayer, custom, data }) => {
  const [firstName, setFirsname] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isValidMobilePhone = (phone: string): boolean => {
    const phonePattern = /^(\+?\d{1,3}\s?)?(\(?\d{1,2}\)?|\d{3})\s?\d{3}-?\d{2}-?\d{2}$|^\+?\d{11}$/;
    return phonePattern.test(phone);
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
  };

  const isValid = firstName !== '' && lastName !== '' && isValidMobilePhone(mobilePhone) && isValidEmail(email);

  const handleSave = () => {
    if (isValid) {
      const result: RecipContInfo = {
        firstName: firstName,
        lastName: lastName,
        mobilePhone: mobilePhone,
        email: email
      }
      setRecipContactInfo(result);

      if (setModal) setModal(false);
      if (setCustomPayer && custom) setCustomPayer(custom)
    }
  }

  useEffect(() => {
    if (data) {
      setFirsname(data.firstName);
      setLastName(data.lastName);
      setMobilePhone(data.mobilePhone);
      setEmail(data.email);
    }
  }, [data])

  return (
    <div id={RecipeInfoModalStyle.recipeWrap}>
      <p id={RecipeInfoModalStyle.recipeTitle}>{title ? title : "Recipient's contact information"}</p>

      <div id={RecipeInfoModalStyle.recipeForm}>
        <label className={RecipeInfoModalStyle.recipeWr}>
          <span className={RecipeInfoModalStyle.recipeLabel}>First Name*</span>
          <input
            required
            value={firstName}
            onChange={(e) => setFirsname(e.target.value)}
            id='firstName'
            className={RecipeInfoModalStyle.recipeInput}
            type="text"
          />
        </label>
        <label className={RecipeInfoModalStyle.recipeWr}>
          <span className={RecipeInfoModalStyle.recipeLabel}>Last Name*</span>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id='lastName'
            className={RecipeInfoModalStyle.recipeInput}
            type="text"
          />
        </label>
        <label className={RecipeInfoModalStyle.recipeWr}>
          <span className={RecipeInfoModalStyle.recipeLabel}>Mobile Phone*</span>
          <input
            type="tel"
            autoCorrect='on'
            className={RecipeInfoModalStyle.recipeInput}
            value={mobilePhone}
            onChange={(e) => setMobilePhone(e.target.value)}
            id='mobilePhone'
            name="phone"
            placeholder='+111111111111 or + 111 (11) 111-11-11'
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </label>
        <label className={RecipeInfoModalStyle.recipeWr}>
          <span className={RecipeInfoModalStyle.recipeLabel}>Email*</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            required
            title='Enter a valid email address'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            inputMode='email'
            maxLength={320}
            minLength={5}
            size={320}
            name='email'
            className={RecipeInfoModalStyle.recipeInput}
            type="email"
          />
        </label>
      </div>

      <DefaultButton disabled={!isValid} setState={handleSave} button_text={'Save'} width={'100%'} height={40} />
    </div>
  )
}

export default RecipeInfoModal;