import { call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

function *read(key, type, fallback = '') {
  const value = yield call(AsyncStorage.getItem, key);
  yield put({ type, value: (value || fallback) });
}

export function *initialize() {
  yield call(read, 'settings/apiHost', 'APIHOST_SET', 'http://localhost:8080');
}

function *write(key, action) {
  yield call(AsyncStorage.setItem, key, action.value);
}


export default function*() {
  yield takeEvery('APIHOST_SET', write, 'settings/apiHost');
}
