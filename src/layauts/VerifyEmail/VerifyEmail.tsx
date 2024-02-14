import React, { useState } from 'react';
import VerifyEmailStyle from "./VerifyEmail.module.css"
import { Link, useNavigate } from 'react-router-dom';
import FourDigitInput from '../../components/InputSendCode/InputSendCode';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { useStore } from "react-redux";


const VerifyEmail = () => {
    const [isLoading, setLoading] = useState(false)
    const [messege_error, setMessege_error] = useState(VerifyEmailStyle.error_messege)
    const [info_error, setInfo_error] = useState("")
    const resendCode = async () => {
        setLoading(true)
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/email/', {
                "user_data_key": localStorage.getItem('email')
            });
            setLoading(false)
            console.log(response); // Обработка ответа от бэкэнда
        } catch (error: any) {
            setMessege_error(VerifyEmailStyle.error_messege_active)
            setInfo_error(error.response.data.error)
            setLoading(false)
        }
    }

    return (
        <div className={VerifyEmailStyle.form_verify_email}>
            <Link style={{ marginBottom: "16px", }} to="/regist">Back</Link>
            <h3>Verify email address</h3>
            <p style={{ marginBottom: "32px", fontSize: "15px", fontWeight: "400", lineHeight: "20px" }}>Please enter the 6-digit code we sent to&nbsp;
                <span className={VerifyEmailStyle.email_verify_password}>{localStorage.getItem("email")}</span> </p>
            <p className={messege_error}>{info_error}</p>
            <FourDigitInput />
            <p className={VerifyEmailStyle.resend_code_btn} onClick={resendCode}> Resend code</p>
            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default VerifyEmail;