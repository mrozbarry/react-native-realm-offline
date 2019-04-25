import { fork, select, takeEvery } from "redux-saga/effects";
import messageSubmit from "./submit";
import poll from "./pollChannel";

export default function*(sharedChannel) {
  const { apiHost } = yield select();
  yield takeEvery("MESSAGE_SUBMIT", messageSubmit, apiHost);
  yield fork(poll, sharedChannel, apiHost);
}
