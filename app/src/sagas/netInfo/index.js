import { call, put, take } from "redux-saga/effects";
import * as netInfoSubs from "./netInfoChannel";

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
