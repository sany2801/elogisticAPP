import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import PhoneNumberInput from '../components/PhoneNumberInput/PhoneNumberInput';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import Input from '../components/Input/Input';
import { useModal } from '../context/ModalContext/ModalContext';

const PasswordCreatePage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(' ')
    const [isLoading, setLoading] = useState(false)
    const [messege_error, setMessege_error] = useState("messege_error")
    const navigate = useNavigate();
    const { setShowModal, popupInfo, setPopupInfo } = useModal();


    const { token } = useParams<{ token: string }>()
    const { MQ } = useParams<{ MQ: string }>()

    const isPasswordValid = password === confirmPassword &&
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[/[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(password)



    const isFormValid = isPasswordValid;


    console.log(token)
    console.log(MQ)
    const handleInputChangePassword = (value: string) => {
        setPassword(value)
    };
    const handleInputChangeConfirmPassword = (value: string) => {
        setConfirmPassword(value)
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        console.log({ password })

        try {
            // Отправляем данные на бэкэнд
            const response = await axios.patch(`https://elogistapp-backend.herokuapp.com/accounts/password_reset_confirm/${MQ}/${token}/`, {
                password,
            });
            console.log(response); // Обработка ответа от бэкэнда

            navigate("/")
            setShowModal(true);
            setPopupInfo({
                title: "Password changed",
                description: "Password was successfully changed",
                showModal: true
            })
        } catch (error) {
            console.error(error);
            setMessege_error("messege_error_active")
            setLoading(false)

        }
    };


    return (
        <div className='form_wrapper'>
            <h3>
                Create new password
            </h3>
            <div>
                <form className='formSignIn' onSubmit={handleSubmit}>
                    <span className={messege_error}>This e-mail is already connected to an existing account.</span>

                    <Input type='password' tittle_Value='Create password'
                        onChange={handleInputChangePassword}
                    ></Input>
                    <Input type='confirm_password' tittle_Value='Confirm password'
                        value={confirmPassword}
                        onChange={handleInputChangeConfirmPassword}
                    ></Input>


                    <button className="formSubmit" value="Continue" disabled={!isFormValid}>Continue</button>
                </form>
                {isLoading ? <Loader /> : ""}
            </div>

        </div>
    );
};

export default PasswordCreatePage;