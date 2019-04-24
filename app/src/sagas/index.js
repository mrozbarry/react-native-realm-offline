import { channel } from "redux-saga";
import { call, fork } from "redux-saga/effects";
import * as netInfo from "./netInfo";
import messages from "./messages";
import offline from "./offline";

export default function*() {
  const shared = yield call(channel);
  yield fork(netInfo.isConnected);
  yield fork(messages, shared);
  yield fork(offline, shared);
}
