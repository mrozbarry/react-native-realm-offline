import { call, fork, takeEvery } from "redux-saga/effects";

function* writeMessage(transform, write, action) {
  yield call(write, transform(action.message));
}

function* writeMessagesFrom(actionType, transform, write) {
  yield takeEvery(actionType, writeMessage, transform, write);
}

const localMessage = message => ({ ...message, source: "local" });
const serverMessage = message => ({ ...message, source: "server" });

export default function*(write) {
  yield fork(writeMessagesFrom, "MESSAGE_SUBMIT", localMessage, write);
  yield fork(writeMessagesFrom, "MESSAGE_INCOMING", serverMessage, write);
}
