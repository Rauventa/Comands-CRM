import axios from 'axios';
import {AUTH_USER_LOGOUT, AUTH_USER_SUCCESS} from "./actionTypes";
import {message} from "antd";

export function authUser(username, password) {
    return async dispatch => {

        try {
            const res = await axios.post('http://5.61.56.234/auth/signin', {
                username: username,
                password: password
            });

            message.success( 'Вы успешно авторизовались');

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);

            const token = localStorage.token;
            const base64Url = token.split('.')[1];
            const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            localStorage.setItem('permissions', JSON.parse(base64).permissions);

            dispatch(authUserSuccess(res.data.token, res.data.username, JSON.parse(base64)))
        } catch (e) {
            console.log(e);
            message.error( 'Ошибка при авторизации')
        }
    }
}

export function userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('permissions');

    return {
        type: AUTH_USER_LOGOUT
    }
}

export function authUserSuccess(token, username, userInfo) {
    return {
        type: AUTH_USER_SUCCESS,
        token,
        username,
        userInfo
    }
}