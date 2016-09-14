import {fork} from 'redux-saga/effects';
import watchLoadTranslations from './translations';
import {watchLogin, watchLogout} from './auth';

export function* rootSaga() {
    yield [
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadTranslations)
    ];
}