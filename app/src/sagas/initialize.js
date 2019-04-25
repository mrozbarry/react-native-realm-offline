import { call, put } from 'redux-saga/effects';
import * as netInfo from './netInfo';
import * as settings from './settings';

export default function *() {
  yield call(netInfo.initialize);
  yield call(settings.initialize);

  yield put({ type: 'INITIALIZE_APPLICATION_COMPLETE' });
}
