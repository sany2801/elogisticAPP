// index.ts
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userInfoReducer from '../reducer/userInfoReducer';

// Корневой редьюсер, объединяющий все редьюсеры
const rootReducer = combineReducers({
    data: userInfoReducer,
    // Добавьте другие редьюсеры при необходимости
});

// Создание Redux-стора с применением middleware (например, redux-thunk)
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
