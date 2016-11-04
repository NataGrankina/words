import { fork } from 'redux-saga/effects';
import watchLoadTranslations from './translations';
import { watchAddWord, watchLoadDictionary } from './dictionary';
import { watchLogin, watchLogout } from './auth';

export default function* rootSaga() {
  yield [
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadTranslations),
    fork(watchLoadDictionary),
    fork(watchAddWord)
  ];
}
