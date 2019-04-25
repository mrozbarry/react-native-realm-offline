import { channel } from "redux-saga";
import { call, fork } from "redux-saga/effects";
import * as netInfo from "./netInfo";
import initialize from "./initialize";
import messages from "./messages";
import offline from "./offline";
import settings from "./settings";

export default function*() {
  yield call(initialize);

  const shared = yield call(channel);
  yield fork(netInfo.isConnected);
  yield fork(messages, shared);
  yield fork(offline, shared);
  yield fork(settings);
}
