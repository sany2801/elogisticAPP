import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import ChangePasswordStyle from "./ChangePassword.module.css"

interface ChangePasswordProps{
    active:boolean

}


const ChangePassword: React.FC<ChangePasswordProps> = (props) => {

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);


    const email = useSelector((state: any) => state.data.userInfo.email);

    const isPasswordValid = newPassword === confirmPassword &&
        newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[/[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(newPassword);

    const handleConfirm = async (event: React.FormEvent) => {

        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/change-password/',
                {
                    email,
                    password:newPassword,
                    old_password:oldPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`
                    }
                });

            console.log(response);
            setLoading(false);
            setSuccess(true)


        } catch (error) {

            console.error(error);
            setLoading(false)
        }

    }

    const handleInputOldPassword = (value: string) => {

        setOldPassword(value);
    }

    const handleInputChangePassword = (value: string) => {

        setNewPassword(value);
    };

    const handleInputChangeConfirmPassword = (value: string) => {

        setConfirmPassword(value);
    };

    useEffect(()=>{

        if (props.active){

            setSuccess(false);


        }


    },[props.active]);

    return (
        <>
            {!isSuccess &&
                <form className={ChangePasswordStyle.change_password__form}>
                    <h3 className={ChangePasswordStyle.change_password__form_header}>Change your password</h3>
                    <Input type='confirm_password' tittle_Value='Enter old password'
                           onChange={handleInputOldPassword}


                    ></Input>
                    <Input type='password' tittle_Value='New password'

                           onChange={handleInputChangePassword}

                    ></Input>

                    <Input type='confirm_password' tittle_Value='Repeat password'
                           onChange={handleInputChangeConfirmPassword}
                    ></Input>
                    <button className="formSubmit" value="Confirm" onClick={handleConfirm}
                            disabled={!isPasswordValid}>Confirm
                    </button>
                </form>
            }
            {isLoading ? <Loader/> : ""}
            {isSuccess &&
                <div className={ChangePasswordStyle.success__wrapper}>
                    <svg className={ChangePasswordStyle.success_svg} width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="success">
                            <circle id="Ellipse 5" cx="46" cy="46" r="46" fill="#EEEFD5"/>
                            <circle id="Ellipse 6" cx="46" cy="46" r="32" fill="#C9CB80"/>
                            <path id="Line 6" d="M32.6101 46.6539L43.0192 57.7854L60.7537 37" stroke="white"
                                  strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <p className={ChangePasswordStyle.success_text}>Your password has been successfully changed!</p>
                </div>
            }
        </>
    )
}


export default ChangePassword;