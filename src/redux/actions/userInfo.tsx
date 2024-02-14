// authActions.ts
import { Action } from 'redux';

// Определение типов экшенов
export enum userInfoTypes {
    SET_USER_DATA = 'SET_USER_DATA',
    // Добавьте другие типы экшенов при необходимости
}
// Интерфейс данных пользователя, соответствующий структуре ответа от бэка
export interface UserInfo {
    phone_number: string,
    email: string,
    email_verified: boolean,
    phone_verified: boolean,
    userprofile: {
        user_type: string,
        first_name: string,
        last_name: string,
        company_name: string
    }
}

// Интерфейс экшена для установки данных пользователя в Redux
interface SetUserInfoAction extends Action {
    type: userInfoTypes.SET_USER_DATA;
    payload: UserInfo; // Замените UserInfo на реальный тип данных пользователя
}

// Создание экшена для установки данных пользователя
export const setUserInfo = (userInfo: UserInfo): SetUserInfoAction => ({
    type: userInfoTypes.SET_USER_DATA,
    payload: userInfo,
});

// Добавьте другие экшены, если необходимо
