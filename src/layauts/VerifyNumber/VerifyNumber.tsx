import React, {useEffect, useState, forwardRef, MutableRefObject, useImperativeHandle} from 'react';
import axios from 'axios';
import VerifyNumberStyle from "./VerifyNumber.module.css"
import FourDigitInput from '../../components/InputSendCode/InputSendCode';
import PopapModal from '../../components/PopapModal/PopapModal';
import AuthCode from 'react-auth-code-input';
import Loader from '../../components/Loader/Loader';
import "../../components/InputSendCode/InputSendCode.module.css"
import {useSelector} from 'react-redux';


const VerifyNumber = (props: any, ref: any) => {
    const [isLoading, setLoading] = useState(false);
    const [messege_error, setMessege_error] = useState("messege_error");
    const [active_popap, set_active_popap] = useState(false);
    const MAX_CHARACTERS = 6;
    const userData = useSelector((state: any) => state.data.userInfo);
    const [code, setCode] = useState('');

//ИЗМЕНИТЬ НА НУЖНЫЙ ЭНДПОИНТ
    const verifyPhonePut = async () => {// Нужно написать функцию отправки запроса на сервер для получения кода
        set_active_popap(true);
        try {
            // //     // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/phone/', {
                "user_data_key": userData.phone_number,

            });
            setLoading(false)
            console.log('response--->', response); // Обработка ответа от бэкэнда
        } catch (error: any) {
            setLoading(false);
        }
    }

    const verifyPhoneChange = async () => {// Нужно написать функцию отправки запроса на сервер для получения кода
        console.log("Your code has been sent");
        setLoading(true);
        try {
            // //     // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/phone/', {
                "user_data_key": userData.phone_number,
                "code": code,

            });
            setLoading(false)
            console.log('response--->', response); // Обработка ответа от бэкэнда
        } catch (error: any) {
            setLoading(false);
        }
    }

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
            setLoading(false)
        }
    }

    useEffect(() => {
        if (code.length === MAX_CHARACTERS) verifyPhoneChange();
    }, [code])

    const handleVerificationCodeChange = (value: string) => {
        setCode(value);
    }

    useImperativeHandle(ref, () => ({verifyPhonePut}));

    return (

        <div className={VerifyNumberStyle.notificationVerifyNumber}>
            {active_popap ?
                <PopapModal active={active_popap} setActive={set_active_popap}>
                    <div className={VerifyNumberStyle.form_verify_phone}>
                        <h3 className={VerifyNumberStyle.verify_heading}>Verify phone</h3>
                        <span className={messege_error}>Incorrect code. Check and try again.</span>
                        <p className={VerifyNumberStyle.verify_message}> To verify your phone, we've sent a confirmation
                            code to&nbsp;{userData.phone_number} </p>

                        <AuthCode
                            inputClassName={VerifyNumberStyle.input_code}
                            allowedCharacters='numeric'
                            onChange={handleVerificationCodeChange}
                            length={MAX_CHARACTERS}
                            autoFocus={true}
                        />
                        <p className={VerifyNumberStyle.resend_code_btn} onClick={resendCode}> Resend code</p>
                    </div>

                </PopapModal> : ""}
            {isLoading ? <Loader/> : ""}
        </div>
    );
}

export default forwardRef(VerifyNumber);