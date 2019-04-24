import { fork, takeEvery } from "redux-saga/effects";
import messageSubmit from "./submit";
import poll from "./pollChannel";
import { apiHost } from '../../config';

export default function*(sharedChannel) {
  yield takeEvery("MESSAGE_SUBMIT", messageSubmit, apiHost);
  yield fork(poll, sharedChannel, apiHost);
}
