import React, { useState, ChangeEvent,useId } from 'react';
import 'react-phone-number-input/style.css'
import InputStyle from "./Input.module.css"
import ModalPasswordValidStyle from "../ModalPasswordValid/ModalPasswordValid.module.css"
import PhoneInput from 'react-phone-number-input'
import bcrypt from "bcrypt"
import ModalPasswordValid from '../ModalPasswordValid/ModalPpasswordValid';

type InputProps = {
    type?: string,
    tittle_Value?: string,
    value?: string,
    initialValue?: string
    inputName?: string,
    onChange: (value: string, name: string) => void,
    onBlur?: () => void,

}

const Input: React.FC<InputProps> = ({ type, tittle_Value, onChange, onBlur, initialValue, inputName }) => {

    const [value, setInputValue] = useState(initialValue);
    const [password, setPassword] = useState("password")
    const [passwordControlClass, setpasswordControlClass] = useState(InputStyle.password_control)
    const [lenght_characters, setLenhgt_Characters] = useState(ModalPasswordValidStyle.close_square)
    const [upper_case_characters, setUpper_case_characters] = useState(ModalPasswordValidStyle.close_square)
    const [special_characters, setspecial_characters] = useState(ModalPasswordValidStyle.close_square)
    const [classModal_error, setClass_modal_error] = useState(ModalPasswordValidStyle.wrapper_modal)
    const [btnSubmitClass, setBtnSubmitClass] = useState('disabled')
    const [btnSubmitState, setBtnSubmitState] = useState(true)
    const newId:string = useId();




    const PasswordControlChenge = () => {
        if (password === "password") {
            setPassword("text")
            setpasswordControlClass(InputStyle.password_control_active)
        }
        else {
            setpasswordControlClass(InputStyle.password_control)
            setPassword('password')
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newName = event.target.name;
        setInputValue(newValue);
        onChange(newValue, newName);

        if (newValue.length >= 8) {
            setLenhgt_Characters(ModalPasswordValidStyle.tick_square)
        } else { setLenhgt_Characters(ModalPasswordValidStyle.close_square) }
        if (/[A-Z]/.test(newValue)) {
            setUpper_case_characters(ModalPasswordValidStyle.tick_square)
        } else { setUpper_case_characters(ModalPasswordValidStyle.close_square) }

        if (/[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(newValue)) {
            setspecial_characters(ModalPasswordValidStyle.tick_square)
        } else { setspecial_characters(ModalPasswordValidStyle.close_square) }
    };


    if (type === "password") {
        return (
            <div className={InputStyle.input_wrapper}>
                <label htmlFor={newId}>{tittle_Value}</label>
                <input className={InputStyle.input_pussword}
                    id={newId}
                    type={password}
                    value={value || ""}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                >

                </input>
                <ModalPasswordValid
                    className={classModal_error}
                    lenght={lenght_characters}
                    upper_case={upper_case_characters}
                    special={special_characters} />
                <div className={passwordControlClass} onClick={PasswordControlChenge}></div>
            </div>

        );
    }
    else if (type === "confirm_password") {
        return (
            <div className={InputStyle.input_wrapper}>
                <label htmlFor={newId}>{tittle_Value}</label>
                <input className={InputStyle.input_pussword}
                    id={newId}
                    type={password}
                    value={value || ""}
                    onBlur={onBlur}
                    name={inputName}
                    onChange={handleInputChange}>

                </input>
                <div className={passwordControlClass} onClick={PasswordControlChenge}></div>
            </div>
        )
    }
    else if (type === "Phone/Email") {
        return (
            <div className={InputStyle.input_wrapper}>
                <label htmlFor="emailInput">{tittle_Value}</label>
                <input className="input_email"
                    id='emailInput'
                    type="text"
                    value={value || ""}
                    name={inputName}
                    onChange={handleInputChange}
                    onBlur={onBlur}

                >

                </input>
            </div>
        )
    }
    else if (type === "email") {
        return (
            <div className={InputStyle.input_wrapper}>
                <label htmlFor="emailInput">{tittle_Value}</label>
                <input className="input_email"
                    id='emailInput'
                    type="email"
                    value={value || ""}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    name={inputName}
                ></input>
            </div>
        )
    }
    else if (type === "name") {
        return (
            <div className={InputStyle.input_wrapper}>
                <label htmlFor={tittle_Value}>{tittle_Value}</label>
                <input className={InputStyle.input_email}
                    id={tittle_Value}
                    type="text"
                    value={value || ""}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    name={inputName}
                ></input>
            </div>
        )
    }

    else if (type === "submit") {
        return (
            <button className={btnSubmitClass} type='submit' value="Continue" disabled={btnSubmitState}>Continue</button>
        )
    }


    else {
        return null
    }
}


export default Input;