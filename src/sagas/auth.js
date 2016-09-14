import {take, fork, call, put} from 'redux-saga/effects';
import {auth0login, auth0logout} from '../api/auth';
import * as actionTypes from '../actionTypes/authActionTypes';

function* login() {
    try {
        const {token, profile} = yield call(auth0login);
        yield put ({type: actionTypes.LOGIN_SUCCEEDED, token, profile});
    } catch (error) {
        yield put({type: actionTypes.LOGIN_FAILED, error})
    }
}

function* logout() {
    auth0logout();
    yield put ({type: actionTypes.LOGOUT_SUCCEEDED});
}

export function* watchLogin() {
    while(true) {
        const action = yield take(actionTypes.LOGIN);
        yield fork(login, action);
    }
}

export function* watchLogout() {
    while(true) {
        const action = yield take(actionTypes.LOGOUT);
        yield fork(logout, action);
    }
}