import {fork} from 'redux-saga/effects';
import watchLoadTranslations from './translations';

export function* rootSaga() {
    yield fork(watchLoadTranslations);
}