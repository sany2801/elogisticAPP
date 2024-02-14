import React, { useState } from 'react';
import Input from '../Input/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal_password_valid from '../ModalPasswordValid/ModalPpasswordValid';
import Loader from '../Loader/Loader';
import CHECK_BOX_INPUT from '../InputCheckbox/CheckBoxInput';
const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(' ')
    const [messege_error, setMessege_error] = useState("messege_error")
    const [isLoading, setLoading] = useState(false)
    const [policy, setPolicy] = useState(false)

    const isPasswordValid = password === confirmPassword &&
        password.length >= 8 &&
        policy &&
        /[A-Z]/.test(password) &&
        /[/[!@#$%^&*()_+\-=\[\]{};':".\\|,<>\/?]+/.test(password) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



    const isFormValid = isPasswordValid && email;


    const handleInputChangeEmail = (value: string) => {
        setEmail(value)
    };
    const handleInputChangePassword = (value: string) => {
        setPassword(value)
    };
    const handleInputChangeConfirmPassword = (value: string) => {
        setConfirmPassword(value)
    };



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        console.log({ email: email, password: password })

        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/register/', {
                email,
                password,
            });
            console.log(response); // Обработка ответа от бэкэнда
            dispatch(
                {
                    type: 'VERIFY_EMAL',
                    payload: email
                }
            )
            localStorage.setItem("email", email)
            navigate("/Accounts/verify-Email")
        } catch (error) {
            console.error(error);
            setMessege_error("messege_error_active")
            setLoading(false)

        }
    };

    const handlePolicyChange = (newChecked: boolean) => {
        setPolicy(newChecked);
    };

    return (
        <div>
            <form className='formSignIn' onSubmit={handleSubmit}>
                <span className={messege_error}>This e-mail is already connected to an existing account.</span>
                <Input type='email' tittle_Value='Email'
                    onChange={handleInputChangeEmail}
                />
                <Input type='password' tittle_Value='Create password'
                    onChange={handleInputChangePassword}

                ></Input>
                <Input type='confirm_password' tittle_Value='Confirm password'
                    value={confirmPassword}
                    onChange={handleInputChangeConfirmPassword}

                ></Input>
                <CHECK_BOX_INPUT
                    onChange={handlePolicyChange}
                    checked={policy}
                />

                <button className="formSubmit" value="Continue" disabled={!isFormValid}>Continue</button>
            </form>
            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default RegistrationForm;