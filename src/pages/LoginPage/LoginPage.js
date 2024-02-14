import React from 'react';
import LoginPageStyle from"./LoginPage.module.css"
import "..//..//layauts/form.css"
import { Outlet } from 'react-router-dom';
const LoginPage = () => {


    return (
        <>
        <div className={LoginPageStyle.wrapper_Login_page}>
           
            <div className={LoginPageStyle.logo}></div>
            <div className={LoginPageStyle.form}>
                <div className={LoginPageStyle.form_content}>
                    <Outlet></Outlet>
                </div>
            </div>
            <button className={LoginPageStyle.messeges}></button>
        </div>
        </>
    );
};

export default LoginPage;