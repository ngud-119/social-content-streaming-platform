// frontend/src/redux/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        // ...
        default:
            return state;
    }
};

export default authReducer;