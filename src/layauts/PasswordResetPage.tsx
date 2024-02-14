import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input/Input';
import Loader from '../components/Loader/Loader';
import Modal from '../components/PopapModal/PopapModal';
import { useModal } from '../context/ModalContext/ModalContext';


const PasswordResetPage = () => {
    const [email, set_Email] = useState("")
    const [isLoading, setLoading] = useState(false)
    // const [showSuccessModal, setShowSuccessModal] = useState(false);
    const isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const [stateModal, setStateModal] = useState("")

    const navigate = useNavigate()
    const { setShowModal, popupInfo, setPopupInfo } = useModal();

    const handleInputChange = (value: string) => {
        set_Email(value)
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true)
        console.log({ email })
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/password-reset/',
                {
                    email,
                });
            // localStorage.setItemItem("email", email)
            console.log(response)
            setLoading(false)
            navigate('/')
            setShowModal(true);
            setPopupInfo({
                title: "Check your email",
                description: `Instructions for resetting your password have been sent to ${localStorage.getItem("email")}`,
                showModal: true
            })
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    };


    return (
        <div className='form_wrapper'>
            <Link style={{ marginBottom: "16px" }} to="/">Back</Link>
            <h3>Forgot Password?</h3>
            <p style={{ marginBottom: "32px", fontFamily: "Titillium Web" }}>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
            <form className='formSignIn' onSubmit={handleSubmit}>
                <Input type='email' onChange={handleInputChange} tittle_Value='email'></Input>
                <button className='formSubmit' disabled={!isFormValid} type='submit' value="Send">Send</button>
            </form>
            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default PasswordResetPage;