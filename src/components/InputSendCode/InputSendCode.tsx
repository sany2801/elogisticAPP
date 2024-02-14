import React from 'react';
import  InputSendCodeStyle from "./InputSendCode.module.css"
import AuthCode from 'react-auth-code-input';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';

const FourDigitInput: React.FC = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState('');
    const [messege_error, setMessege_error] = useState("error_messege")
    const [info_error, setInfo_error] = useState("")
    const [isLoading, setLoading] = useState(false)


    const MAX_CHARACTERS = 6; // Здесь задайте необходимое количество символов


    // const form_valueReducer = useSelector((state: { email: string }) => state.email)
    // const dispatch = useDispatch()
    // console.log(form_valueReducer)


    const handleSubmit = async () => {
        console.log({
            "confirmation_code": value,
            "user_data_key": localStorage.getItem("email")
        })
        setLoading(true)
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/confirm_code/email/', {
                "confirmation_code": value,
                "user_data_key": localStorage.getItem("email")
            });
            console.log(response); // Обработка ответа от бэкэнда
            localStorage.setItem("access", response.data.access)
            localStorage.setItem("refresh", response.data.refresh)
            navigate("/Accounts/userInfo")
            setLoading(false)
        } catch (error: any) {
            setMessege_error("messege_error_active")
            setInfo_error(error.response.data.error)
            setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        if (value.length === MAX_CHARACTERS) {
            console.log("ok")
            console.log(value)
            handleSubmit()
        }
    }, [value]);


    const handleVerificationCodeChange = (code: string) => {
        setValue(code);
    };


    return (
        <>
            <p className={messege_error}>Incorrect code. Check and try again.</p>
            <div className={InputSendCodeStyle.wrapper_input_code}>
                <AuthCode
                    inputClassName={InputSendCodeStyle.input_code}
                    allowedCharacters='numeric'
                    onChange={handleVerificationCodeChange}
                    length={MAX_CHARACTERS}
                    autoFocus={true}
                ></AuthCode>
            </div>
            {isLoading ? <Loader /> : ""}
        </>
    );
};
export default FourDigitInput;
