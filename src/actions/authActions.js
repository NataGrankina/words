import * as actionTypes from '../actionTypes/authActionTypes';


export function login() {
    return {
        type: actionTypes.LOGIN
    }
}
export function loginSucceed(token, profile) {
    return {
        type: actionTypes.LOGIN_SUCCEEDED,
        token,
        profile
    };
}
export function loginFailed(error) {
    return {
        type: actionTypes.LOGIN_FAILED,
        error
    };
}
export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}