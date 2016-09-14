import * as actionTypes from '../actionTypes/authActionTypes';
import {checkTokenExpiry, getToken, getProfile} from '../api/auth';

const initialState = {
    isAuthenticated: checkTokenExpiry(),
    token: getToken(),
    profile: getProfile(),
    error: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCEEDED:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                profile: action.profile,
                error: null
            };
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                profile: null,
                error: action.error
            };
        case actionTypes.LOGOUT_SUCCEEDED:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                profile: null,
                error: null
            };
        default:
            return state;
    }
};