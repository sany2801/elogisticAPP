import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import { useModal } from '../../context/ModalContext/ModalContext';
import css from './DeleteAccount.module.css';

function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { setPopupInfo, setShowModal } = useModal();
  const navigate = useNavigate();

  const handleChangePassword = (value: string) => {
    const newPassword = value || '';
    setPassword(newPassword);

    const isValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(newPassword);

    setIsPasswordValid(isValid);
  };

  const handleDeleteAccount = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        console.error('Access token is missing');
        return;
      }

      const response = await axios.delete(
        'https://elogistapp-backend.herokuapp.com/accounts/delete-user/',
        {
          data: { password: password },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Delete account response:', response);
      localStorage.clear();

      setPopupInfo({
        showModal: true,
        title: 'Thanks for using eLogistApp',
        description: 'Your account has been deleted',
      });

      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleCancel = () => {
    // Закрываем модальное окно
    setShowModal(false);
  };

  return (
    <div className={css.deleteAccountForm}>
      <h3 className={css.deleteAccountHeader}>Permanently delete account</h3>
      <p className={css.deleteAccountText}>
        Deleting an account is irreversible. You will lose all your data. Are
        you sure you want to delete your account?
      </p>
      <Input
        type="password"
        tittle_Value="Enter your password"
        onChange={handleChangePassword}
        value={password}
      />
      <div className={css.deleteAccountButtons}>
        <button className='formSubmit' onClick={handleCancel}>
          Cancel
        </button>
        <button
          className='formSubmit'
          value="Delete"
          disabled={!isPasswordValid}
          onClick={handleDeleteAccount}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
