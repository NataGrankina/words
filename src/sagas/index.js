import { fork } from 'redux-saga/effects';
import watchLoadTranslations from './translations';
import { watchLogin, watchLogout } from './auth';

export default function* rootSaga() {
  yield [
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadTranslations)
  ];
}
