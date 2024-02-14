import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogin, OverridableTokenClientConfig } from '@react-oauth/google';
import { useJwt, isExpired, decodeToken } from 'react-jwt';
import axios from 'axios';



const GoogleSignIn = () => {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse)



      axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokenResponse.access_token}`
        }
      })
        .then(response => {
          const email = response.data.email;
          console.log("Email пользователя:", email);
        })
        .catch(error => {
          console.error("Ошибка при запросе данных пользователя:", error);
        });
    },
  });




  const handleLoginClick = (overrideConfig?: OverridableTokenClientConfig) => {
    login(overrideConfig); // Вызывает функцию login с опциональным параметром overrideConfig
  };
  function responseGoogle(response: object) {
    console.log(response);
  }

  const responseMessage = (response: object) => {
    console.log(response);
  };
  const errorMessage = (error: object) => {
    console.log(error);
  };
  return (
    <>
      <button className='login-social login-google' onClick={() => handleLoginClick()}>
        <div className='Google-logoBtn logoBtn'></div>Google</button>
    </>
  );
};
export default GoogleSignIn;

