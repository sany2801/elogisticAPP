import React, { useState } from 'react';
import axios from 'axios';

import INPUT_RADIO from '../InputRadioEmailPhone/InputRadioEmailPhone';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import FormUserInfoStyle from  "./FormUserInfo.module.css"
import InputStyle from '../Input/Input.module.css'

const FormUserInfo = () => {


    const [step, setStep] = useState(1);
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        company_name: "",
        user_type: ""
    })
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const isFormValid = userInfo.user_type;
    const isFormPRValid = userInfo.first_name && userInfo.last_name && isValidPhoneNumber(String(userInfo.phone_number))
    const isFormORValid = userInfo.first_name && userInfo.last_name && isValidPhoneNumber(String(userInfo.phone_number)) && userInfo.company_name

    // console.log(token)
    // console.log(isValidPhoneNumber(undefined))
    const handleChange = (value: string) => {
        setUserInfo({
            first_name: "",
            phone_number: "",
            last_name: "",
            email: "",
            company_name: "",
            user_type: value

        })
        console.log(userInfo)
    }

    const handleInputChange = (value: string, inputName: string) => {
        console.log(value)
        console.log(

        )
        setUserInfo({
            ...userInfo,
            [inputName]: value
        })
    };


    const handlClick = () => {
        console.log(userInfo.user_type)
        setStep(step + 1)
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        console.log('click')
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.put(
                'https://elogistapp-backend.herokuapp.com/accounts/add_user_info/',
                {
                    phone_number: userInfo.phone_number,
                    userprofile: {
                        user_type: userInfo.user_type,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        company_name: userInfo.company_name
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );
            console.log(response); // Обработка ответа от бэкэнда

            navigate("/home")
        } catch (error) {

            console.error(error);
            setLoading(false)

        }

    };


    const handleChangeMobilePhone = (value: string) => {
        setUserInfo({ ...userInfo, phone_number: value })
        console.log(userInfo.phone_number)

    }

    const handlClickBack = () => {
        setStep(step - 1)
        setUserInfo({
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            company_name: "",
            user_type: ""
        })
    }


    return (
        <div className={FormUserInfoStyle.form_user_info}>
            {step === 1 && (
                <div className={FormUserInfoStyle.user_form_content}>
                    <p className={FormUserInfoStyle.tittle}>Welcome to <span>eLogistApp</span></p>
                    <p className={FormUserInfoStyle.description}>Tell us about yourself</p>
                    <INPUT_RADIO onChange={handleChange} />
                    <button onClick={handlClick} className={`formSubmit ${FormUserInfoStyle.start}`} value="Continue" disabled={!isFormValid}>Continue</button>
                </div>
            )}

            {userInfo.user_type === "PR" && step === 2 && (
                <>
                    <h3 className={FormUserInfoStyle.form_user_info_tittle}>Account settings</h3>
                    <Input type='name' inputName='first_name' value={userInfo.first_name} tittle_Value='First Name*' onChange={handleInputChange} />
                    <Input type='name' inputName='last_name' value={userInfo.last_name} tittle_Value='Last Name*' onChange={handleInputChange} />

                    <div className={InputStyle.input_wrapper}>
                        <label htmlFor='phone'>Mobile Phone*</label>
                        <PhoneInput
                            id="phone"
                            className=""
                            value={userInfo.phone_number}
                            onChange={handleChangeMobilePhone}
                            limitMaxLength={true}
                            countryCallingCodeEditable={true}
                        />
                    </div>

                    <div className={FormUserInfoStyle.btn_navigate_formInfo}>
                        <button onClick={handlClickBack} className="formSubmit" value="Back">Back</button>
                        <button onClick={handleSubmit} className="formSubmit" value="Continue" disabled={!isFormPRValid}>Next</button>
                    </div>
                </>
            )}

            {userInfo.user_type === "OR" && step === 2 && (
                <>
                    <h3>Account settings</h3>
                    <Input type='name' inputName='company_name' value={userInfo.company_name} tittle_Value='Company Name' onChange={handleInputChange} />
                    <Input type='name' inputName='first_name' value={userInfo.first_name} tittle_Value='First Name' onChange={handleInputChange} />
                    <Input type='name' inputName='last_name' value={userInfo.last_name} tittle_Value='Last Name' onChange={handleInputChange} />

                    <div className={FormUserInfoStyle.input_wrapper}>
                        <label htmlFor='phone'>Mobile Phone*</label>
                        <PhoneInput
                            id="phone"
                            className={InputStyle.input_wrapper}
                            value={userInfo.phone_number}
                            onChange={handleChangeMobilePhone}
                            limitMaxLength={true}
                            countryCallingCodeEditable={true}
                        />
                    </div>

                    <div className={FormUserInfoStyle.btn_navigate_formInfo}>
                        <button onClick={handlClickBack} className="formSubmit" value="Back">Back</button>
                        <button onClick={handleSubmit} className="formSubmit" value="Continue" disabled={!isFormORValid}>Next</button>
                    </div>
                </>
            )}

            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default FormUserInfo;