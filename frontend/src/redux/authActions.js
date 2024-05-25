// frontend/src/redux/authActions.js

import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            dispatch(loginSuccess(user));
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
        }
    };
};