import React from 'react';
import AccountsStyle from"./Accounts.module.css"
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Accounts = () => {

    const currentPath = window.location.pathname;
    const access_token = localStorage.getItem("access")
    const refresh_token = localStorage.getItem("refresh")
    const navigate = useNavigate()

    const logOut = async () => {

        try {
            const response = await axios.post("https://elogistapp-backend.herokuapp.com/accounts/logout/", {
                "refresh": refresh_token
            },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            navigate('/')
            localStorage.clear()
            console.log(response)
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div className={AccountsStyle.wrapper_accounts}>
            <div className={AccountsStyle.header}>
                <div className={AccountsStyle.logo_wraapper}></div>
                {currentPath === "/Accounts/userInfo" && (
                    <p className={AccountsStyle.btn_log_out} onClick={logOut}>Log out</p>
                )}
            </div>
            <div className={AccountsStyle.form_content}>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Accounts;