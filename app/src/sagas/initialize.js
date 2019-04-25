import { all, call, put } from 'redux-saga/effects';
import * as netInfo from './netInfo';
import * as settings from './settings';

export default function *() {
  yield all([
    call(netInfo.initialize),
    call(settings.initialize),
  ]);
  yield put({ type: 'INITIALIZE_APPLICATION_COMPLETE' });
}
