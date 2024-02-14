import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from '../components/Input/Input';
import GoogleSignIn from '../components/GoogleSignIn/GoogleSignIn';
import AppleSignIn from '../components/AppleSignIn/AppleSignIn';
import Loader from '../components/Loader/Loader';
import axios from 'axios';

import { useModal } from '../context/ModalContext/ModalContext';
import PopapModal from '../components/PopapModal/PopapModal';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState(' ');
    const [isLoading, setLoading] = useState(false)
    const [messege_error, setMessege_error] = useState("messege_error")
    const isPasswordValid = password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[/[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(password);
    const isFormValid = isPasswordValid && email;

    const navigate = useNavigate();

    const { setPopupInfo, setShowModal, popupInfo } = useModal();





    const closeModal = () => {
        // setModalActive(false);
        setShowModal(false)

    };

    const handleInputEmailChange = (value: any) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmail(value);
        } else { setPhone_number(value) }
    };
    const handleInputPasswordChange = (value: any) => {
        setPassword(value);
        console.log(value)
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/login/',
                {
                    password: password,
                    email_or_phone_number: email || phone_number
                });

            console.log(response.data.access); // Обработка ответа от бэкэнда
            console.log(response.data.refresh); // Обработка ответа от бэкэнда
            console.log(response.data); // Обработка ответа от бэкэнда
            console.log(response); // Обработка ответа от бэкэнда

            localStorage.setItem("access", response.data.access)
            localStorage.setItem("refresh", response.data.refresh)
            localStorage.setItem("email", email)
            localStorage.setItem("phone", phone_number)
            navigate("/Home/shipments")
        } catch (error) {
            console.error(error);
            setMessege_error("messege_error_active")
            setLoading(false)

        }
    };
    const access = localStorage.getItem("accses")
    console.log(access)
    return (
        <>
            <div className='form_wrapper'>
                <div className='tittle_form'>
                    <h3>Sign in</h3>
                    <p>It’s your first time? <Link to='regist'>Sign up</Link></p>
                </div>
                <div className='social_button'>
                    <GoogleSignIn />
                    <AppleSignIn />
                </div>
                <div className='container'>
                    <hr />
                    <p className='or'>or</p>
                </div>

                <form className='formSignIn' onSubmit={handleSubmit}>
                    <Input type='email' tittle_Value='Phone/Email'
                        onChange={handleInputEmailChange}></Input>
                    <Input onChange={handleInputPasswordChange} type='password' tittle_Value='Password'></Input>
                    <Link className='forgot_btn' to="/password-reset">Forgot?</Link>
                    <span className={messege_error}>Incorrect data. Check that your login and/or password are entered correctly</span>

                    <button className='formSubmit' type='submit' value="Continue" disabled={!isFormValid}>Continue</button>
                </form>
                <p className='form_discription'>By continuing, you agree to eLogistApp’s Terms of Service and Privacy Policy.</p>

                {isLoading ? <Loader /> : ""}

                {popupInfo.showModal && (
                    <PopapModal active={popupInfo.showModal} setActive={closeModal}>
                        <h3 className='tittle_modal'>{popupInfo.title}</h3>
                        <p className='discripton_madal'>{popupInfo.description}</p>
                        <button className='formSubmit' onClick={closeModal}>ok</button>
                    </PopapModal>
                )}

            </div>

        </>
    );
};

export default SignInPage;