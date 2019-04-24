import { eventChannel, END } from "redux-saga";
import { call, put, take } from "redux-saga/effects";

const syncChannel = objects =>
  eventChannel(emitter => {
    const onChanges = collection => {
      try {
        const realmObjects = collection.map(m => m);
        console.log("Read objects", realmObjects);
        emitter(realmObjects);
      } catch (err) {
        console.log("ERROR", err);
      }
    };

    objects.addListener(onChanges);

    return () => {
      objects.removeListener(onChanges);
      emitter(END);
    };
  });

export default function*(sharedChannel, collection, read) {
  const channel = yield call(syncChannel, collection);
  try {
    while (true) {
      const realmObjects = yield take(channel);
      const messages = realmObjects.map(read);
      console.log("reader.messsages", messages);
      yield put({ type: "MESSAGES_SET", messages });
      yield put(sharedChannel, messages);
    }
  } finally {
  }
}
