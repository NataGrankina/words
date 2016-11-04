/* eslint-disable no-constant-condition */
import { call, put, take, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import * as actionTypes from '../actionTypes/dictionaryActionTypes';
import { loadTranslations, addTranslation } from '../api/dictionary';

function* loadDictionary() {
  try {
    const dictionary = yield call(loadTranslations);
    yield put({ type: actionTypes.LOAD_DICTIONARY_SUCCEEDED, dictionary });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_DICTIONARY_FAILED, error });
  }
}

function* addWord({ word, translation, languageFrom, languageTo }) {
  try {
    const transl = yield call(addTranslation, word, translation, languageFrom, languageTo);
    yield put({ type: actionTypes.ADD_WORD_SUCCEEDED, translation: transl });
  } catch (error) {
    yield put({ type: actionTypes.ADD_WORD_FAILED, error });
  }
}

export function* watchLoadDictionary() {
  yield* takeLatest(actionTypes.LOAD_DICTIONARY, loadDictionary);
}

export function* watchAddWord() {
  while (true) {
    const action = yield take(actionTypes.ADD_WORD);
    yield fork(addWord, action);
  }
}
