// authReducer.ts
import { Reducer } from 'redux';
import { userInfoTypes, UserInfo } from '../actions/userInfo';

// Интерфейс состояния аутентификации и данных пользователя
interface UserInfoState {
    userInfo: UserInfo | null; // Замените UserData на реальный тип данных пользователя
    // Добавьте другие состояния при необходимости
}

// Начальное состояние
const initialState: UserInfoState = {
    userInfo: null,
};

// Редьюсер для обработки экшенов
const userInfoReducer: Reducer<UserInfoState> = (state = initialState, action) => {
    switch (action.type) {
        case userInfoTypes.SET_USER_DATA:
            return {
                ...state,
                userInfo: action.payload,
            };
        // Обработайте другие типы экшенов, если необходимо
        default:
            return state;
    }
};

export default userInfoReducer;
