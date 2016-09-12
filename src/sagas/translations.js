import {take, fork, call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as actionTypes from '../actionTypes/translatorActionTypes';
import translate from '../api/translator';

function* loadTranslations({word}) {
    try {
        const translations = yield call(translate, word);
        yield put({type: actionTypes.LOAD_TRANSLATIONS_SUCCEEDED, translations, word})
    } catch (error) {
        yield put({type: actionTypes.LOAD_TRANSLATIONS_FAILED, error})
    }
}

export default function* watchLoadTranslations() {
    // while(true) {
    //     const action = yield take(actionTypes.LOAD_TRANSLATIONS);
    //     yield fork(loadTranslations, action);
    // }
    yield* takeLatest(actionTypes.LOAD_TRANSLATIONS, loadTranslations);
}