import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Modal from '../modal/PopapModal';
// import setUserInfo
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userInfo';


interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access'))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'))
    // const form_valueReducer = useSelector((state: any) => state)
    // console.log(form_valueReducer.data)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        const getUserPersonalData = async () => {
            try {
                if (!accessToken && !refreshToken) {
                    // console.log("Токены отсутствуют!!! Авторизируйтесь заново")
                    navigate('/');
                }
                else {
                    // console.log("Токены присутствуют")
                    const response = await axios.get(
                        "https://elogistapp-backend.herokuapp.com/accounts/user_personal_data/",

                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access")}`,
                            },
                        }
                    );

                    setLoading(false)
                    // ТУТ НУЖНО ВНЕ СТИ ДАННЫЕ  В REDUX
                    dispatch(setUserInfo(response.data))
                    // console.log(response)
                    if (!response.data.userprofile) {
                        navigate("/Accounts/userInfo")
                    }
                }
            } catch (error) {
                if (!tokenRefreshed) {
                    // console.log("Пробуем обновить токен");
                    try {
                        const response = await axios.post(
                            "https://elogistapp-backend.herokuapp.com/accounts/refresh_token/",
                            {
                                "refresh": refreshToken
                            });
                        // console.log(response)
                        localStorage.setItem("access", response.data.access)
                        getUserPersonalData()

                    } catch (error) {
                        // console.log(error)
                        // console.log("Не удалось обновить токен, перенаправляем на страницу авторизации");
                        navigate("/")
                    }
                }
                else {
                    // console.log("Не удалось обновить токен, перенаправляем на страницу авторизации");
                    navigate("/")
                }
            }
        };
        if (!accessToken && !refreshToken) {
            // console.log("Токены отсутствуют!!! Авторизируйтесь заново")
            navigate('/');
        } else {
            getUserPersonalData();
        }
    }, [navigate, accessToken, refreshToken, tokenRefreshed]);

    return <>

        {children}
        {isLoading ? <Loader /> : ""}

    </>;
};

export default RequireAuth;
