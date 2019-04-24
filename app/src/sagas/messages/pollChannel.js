import { eventChannel, END } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";

const fetchMessages = (apiHost, after) =>
  fetch(`${apiHost}?after=${after}`)
    .then(response => response.json())
    .catch(err => {
      console.log("fetchMessages.err", err);
      return { messages: [] };
    });

const pollChannel = (apiHost, initialAfter) =>
  eventChannel(emitter => {
    let after = initialAfter;
    let handle = null;

    const poll = async () => {
      const { messages } = await fetchMessages(apiHost, after);
      const max = Math.max(after, ...messages.map(m => m.createdAt));
      after = messages.length > 0 ? max + 1 : after;

      emitter(messages);
    };

    poll().then(() => {
      handle = setInterval(poll, 5000);
    });

    return () => {
      clearInterval(handle);
      emitter(END);
    };
  });

export default function*(sharedChannel, apiHost) {
  const messages = yield take(sharedChannel);

  const latestMessage = Math.max(-1, ...messages.map(m => m.createdAt));

  const channel = yield call(pollChannel, apiHost, latestMessage + 1);
  try {
    while (true) {
      const messages = yield take(channel);
      for (const message of messages) {
        yield put({ type: "MESSAGE_INCOMING", message });
      }
    }
  } finally {
    console.log("message poll terminated");
  }
}
