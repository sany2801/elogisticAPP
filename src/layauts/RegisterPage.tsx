import React from 'react';
import Input from '../components/Input/Input';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';




const RegisterPage = () => {



    return (
        <div className='form_wrapper'>
            <div className='tittle_form'>
                <h3>Sign up</h3>
                <p>Already have an account? <Link to='/'>Sign in</Link></p>
            </div>
            <RegistrationForm />

        </div>
    );
};

export default RegisterPage;