import { call, put, take } from "redux-saga/effects";
import NetInfo from "@react-native-community/netinfo";
import * as netInfoSubs from "./netInfoChannel";

export function *initialize() {
  try {
    const isConnected = yield call(NetInfo.isConnected.fetch);
    yield put({ type: "NETINFO_CHANGE", isConnected });
  } catch (err) {
    console.log('netInfo.initialize', err);
  }
}

export function* isConnected() {
  const channel = yield call(netInfoSubs.isConnected);

  try {
    while (true) {
      const isConnected = yield take(channel);
      yield put({ type: "NETINFO_CHANGE", isConnected });
    }
  } finally {
  }
}
