import { call, put } from "redux-saga/effects";

const makeFetch = body => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" }
});

const sendMessage = (apiHost, message) =>
  fetch(apiHost, makeFetch(message))
    .then(response => {
      return Promise.all([response.status, response.json()]);
    })
    .then(([status, response]) => {
      console.log("response:", status, response);
    });

export default function*(apiHost, payload) {
  console.log("messages.submit", { apiHost, payload });
  const { message } = payload;
  try {
    yield call(sendMessage, apiHost, message);
    yield put({ type: "MESSAGE_ADD", message });
  } catch (err) {
    console.log("Unable to submit message", err);
  }
}
